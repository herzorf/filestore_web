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
      :on-success="updateSuccess"
      :http-request="uploadImage"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      {{ "   " }}
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
        <el-table-column prop="FileSize" label="文件大小" width="160" />
        <el-table-column prop="Username" label="用户名" width="160" />
        <el-table-column prop="UploadAt" label="上传时间" width="160" />
        <el-table-column prop="LastUpdated" label="最后修改时间" width="160" />
        <el-table-column prop="option" label="操作" fixed="right" width="320">
          <el-button type="success">下载</el-button>
          <el-button type="primary">预览</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup name="Home">
  import { ref } from "vue";
  import http from "../../http";
  import type { UploadInstance } from "element-plus";
  let username = localStorage.getItem("username") || undefined;
  let userInfo = ref();
  const fileList = ref();
  http({
    url: "/api/user/info",
    method: "post",
    data: {
      username,
    },
  }).then((res) => {
    userInfo.value = res.data.data;
  });
  const updateSuccess = () => {
    upload.value!.clearFiles();
    getfileMeta();
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
  }
</style>
