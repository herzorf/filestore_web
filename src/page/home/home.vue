<template>
  <div class="homeWrapper">
    <div>
      <h1>home</h1>
      <div>{{ userInfo }}</div>
    </div>
    <el-upload
      ref="upload"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :data="uploadData"
      :on-success="handleExceed"
      action="/api/file/upload"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
    <div class="fileList">
      <el-table :data="fileList" style="width: 100%">
        <el-table-column prop="FileName" label="文件名" width="180" />
        <el-table-column prop="FileHash" label="文件哈希" width="180" />
        <el-table-column prop="FileSize" label="文件大小" width="180" />
        <el-table-column prop="Username" label="用户名" width="180" />
        <el-table-column prop="UploadAt" label="上传时间" width="180" />
        <el-table-column prop="LastUpdated" label="最后修改时间" width="180" />
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup name="Home">
  import { reactive, ref } from "vue";
  import http from "../../http";
  import { genFileId } from "element-plus";
  import type {
    UploadInstance,
    UploadProps,
    UploadRawFile,
  } from "element-plus";
  let username = localStorage.getItem("username") || undefined;
  let token = localStorage.getItem("token") || undefined;
  let userInfo = ref();
  const fileList = ref();
  const uploadData = { username: localStorage.getItem("username") };
  http({
    url: "/api/user/info",
    method: "post",
    data: {
      username,
      token,
    },
  }).then((res) => {
    userInfo.value = res.data.data;
  });
  http({
    url: "/api/user/filemeta",
    method: "post",
    data: {
      username,
      token,
      limit: 10,
    },
  }).then((res) => {
    if (res.data.code === 0) {
      fileList.value = res.data.data;
    }
  });

  const upload = ref<UploadInstance>();

  const handleExceed: UploadProps["onExceed"] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
  };

  const submitUpload = () => {
    upload.value!.submit();
  };
</script>
<style lang="scss" scoped>
  .homeWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 200px;
    .fileList {
      width: 80%;
    }
  }
</style>
