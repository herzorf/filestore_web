<template>
  <div class="homeWrapper">
    <div>
      <h1>用户名 : {{ userInfo?.Username || "" }}</h1>
      <br />
    </div>
    <el-upload
      ref="upload"
      :limit="1"
      :auto-upload="false"
      accept="image/*"
      :http-request="uploadImage"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      {{ "    " }}
      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
      <br />
      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
    <div class="fileList">
      <el-table :data="fileList" style="width: 100%">
        <el-table-column prop="FileName" label="文件名" width="160" />
        <el-table-column prop="FileHash" label="文件哈希" width="160" />
        <el-table-column prop="FileSize" label="文件大小" width="160">
          <template #default="scope">
            {{ calFileSize(scope.row.FileSize / 1024) }}
          </template>
        </el-table-column>
        <el-table-column prop="Username" label="用户名" width="160" />
        <el-table-column prop="UploadAt" label="上传时间" width="160" />
        <el-table-column prop="LastUpdated" label="最后修改时间" width="160" />
        <el-table-column prop="option" label="操作" fixed="right" width="320">
          <template #default="scope">
            <el-button
              type="success"
              @click="() => downloadImage(scope.row.Location)"
              >下载</el-button
            >
            <el-button
              type="primary"
              @click="() => previewImage(scope.row.Location)"
              >预览</el-button
            >
            <el-button
              type="danger"
              @click="() => deleteImage(scope.row.FileHash)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="imageDialogVisible">
      <div class="flexCenter">
        <el-image :src="previewImageSrc" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup name="Home">
  import { ref } from "vue";
  import http from "../../http";
  import type { UploadInstance } from "element-plus";
  let username = localStorage.getItem("username") || undefined;
  let userInfo = ref();
  const fileList = ref();
  const imageDialogVisible = ref(false);
  const previewImageSrc = ref("");
  const calFileSize = (size: number) => {
    if (size / 1024 > 1) {
      return (size / 1024).toFixed(2) + "M";
    } else {
      return size.toFixed(2) + "k";
    }
  };
  http({
    url: "/api/user/info",
    method: "post",
    data: {
      username,
    },
  }).then((res) => {
    userInfo.value = res.data.data;
  });
  const previewImage = (url: string) => {
    previewImageSrc.value = url;
    imageDialogVisible.value = true;
  };
  const downloadImage = (url: string) => {
    var elemIF = document.createElement("iframe");
    elemIF.src = url;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
  };
  const deleteImage = (hash: string) => {
    http({
      url: "/api/file/delete",
      method: "post",
      data: { filehash: hash },
    }).then((res) => {
      if (res.data.code === 0) {
        getfileMeta();
      }
    });
  };
  const getfileMeta = () => {
    http({
      url: "/api/user/filemeta",
      method: "post",
      data: {
        username,
        limit: 10,
      },
    }).then((res) => {
      if (res.data.code === 0) {
        fileList.value = res.data.data;
      }
    });
  };
  getfileMeta();

  const upload = ref<UploadInstance>();
  const submitUpload = () => {
    upload.value!.submit();
  };
  const uploadImage = (param: any) => {
    const formData = new FormData();
    formData.append("file", param.file);
    formData.append("username", username || "");
    http({
      url: "/api/file/upload",
      method: "post",
      data: formData,
    }).then((res) => {
      if (res.status === 200) {
        upload.value!.clearFiles();
        getfileMeta();
      }
    });
  };
</script>
<style lang="scss" scoped>
  .homeWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 200px;
    .fileList {
      width: 100%;
    }
    .flexCenter {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
