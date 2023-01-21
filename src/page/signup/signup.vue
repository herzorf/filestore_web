<template>
  <div class="signWrapper">
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import type { FormInstance } from "element-plus";
  import http from "../../http";

  const formRef = ref<FormInstance>();
  const signinForm = reactive<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        console.log(signinForm);
        http({
          url: "/api/user/signup",
          method: "post",
          data: {
            username: signinForm.username,
            password: signinForm.password,
          },
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
    .sign-wrapper {
      width: 500px;
      height: 400px;
    }
  }
</style>
