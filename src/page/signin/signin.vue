<template>
  <div class="signWrapper">
    <h1>登录页面</h1>
    <el-form
      ref="formRef"
      :model="signinForm"
      label-width="120px"
      class="sign-wrapper"
    >
      <el-form-item
        prop="username"
        label="username"
        :rules="[
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="signinForm.username" />
      </el-form-item>
      <el-form-item
        prop="password"
        label="password"
        :rules="{
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }"
      >
        <el-input v-model="signinForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)"
          >Submit</el-button
        >
        <router-link to="/signup" style="margin: 0 18px">
          <el-button type="primary">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import type { FormInstance } from "element-plus";
  import http from "../../http";
  import { useRouter } from "vue-router";
  const formRef = ref<FormInstance>();
  const signinForm = reactive<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        console.log(signinForm);
        http({
          url: "/api/user/signin",
          method: "post",
          data: {
            username: signinForm.username,
            password: signinForm.password,
          },
        }).then((res) => {
          if (res.data.code === 0) {
            const data = res.data.data;

            router.replace("/home");
          }
        });
      } else {
        console.log("校验不通过");
        return false;
      }
    });
  };
</script>
<style lang="scss" scoped>
  .signWrapper {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      margin-bottom: 1em;
    }
    .sign-wrapper {
      width: 500px;
      height: 400px;
    }
  }
</style>
