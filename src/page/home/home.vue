<template>
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
<style lang=""></style>
