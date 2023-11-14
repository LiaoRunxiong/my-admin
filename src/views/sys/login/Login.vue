<template>
  <div class="login">
    login
    <div class="login-box">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="true"
        ref="loginForm"
      >
        <a-form-item
          label="手机号"
          name="account"
          :rules="[{ required: true, message: '请输入手机号!' }]"
        >
          <a-input v-model:value="formState.account" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          label="验证码"
          name="verifyCode"
          :rules="[{ required: true, message: '请输入验证码!' }]"
        >
          <a-input v-model:value="formState.verifyCode" />
        </a-form-item>
        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>
        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <div class="verify-code">
            <img :src="verifyCodeImg" @click="getVerifyCodeImg" />
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" @click="loginbyPhone2">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { getVerifyCode, loginByPassword } from "./api";
import { reactive, ref } from "vue";
import { useUser } from "@/hooks/useUser";
import { Form, Input, Checkbox, Button } from "ant-design-vue";

export default {
  name: "",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-input-password": Input.Password,
    "a-checkbox": Checkbox,
    "a-button": Button,
  },
  props: {},
  setup() {
    console.log(
      71,
      process.env.NODE_ENV,
      process.env,
      import.meta,
      import.meta.env,
      import.meta.url,
      new URL(import.meta.url)
    );
    const { loginbyPhone } = useUser();
    const loginForm = ref(null);
    const formState = reactive({
      account: "",
      password: "",
      verifyCode: "",
      verifyCodeKeyId: "",
      remember: true,
    });
    const verifyCodeImg = ref("");
    const getVerifyCodeTag = ref(false);

    const getVerifyCodeImg = () => {
      if (getVerifyCodeTag.value) {
        return;
      }
      getVerifyCodeTag.value = true;
      getVerifyCode()
        .then((res) => {
          verifyCodeImg.value = res.data.image;
          formState.verifyCodeKeyId = res.data.imageKeyId;
        })
        .catch((err) => {})
        .finally(() => {
          getVerifyCodeTag.value = false;
        });
    };
    const loginbyPhone2 = async () => {
      try {
        let values = await loginForm.value.validate();
        values.verifyCodeKeyId = formState.verifyCodeKeyId;
        await loginbyPhone(values);
      } catch (error) {
        console.log("err:", error);
      }
    };

    getVerifyCodeImg();

    return {
      formState,
      loginbyPhone2,
      verifyCodeImg,
      getVerifyCodeImg,
      loginForm,
    };
  },
};
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background-color: aqua;

  .verify-code {
    width: 100px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
