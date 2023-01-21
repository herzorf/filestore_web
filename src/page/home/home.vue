<template>
  <div>
    <h1>home</h1>
    <div>{{ userInfo }}</div>
  </div>
</template>
<script lang="ts" setup name="Home">
  import { reactive, ref } from "vue";
  import http from "../../http";
  let username = localStorage.getItem("username") || undefined;
  let token = localStorage.getItem("token") || undefined;
  let userInfo = ref();
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
</script>
<style lang=""></style>
