<template>
  <div class="login-content">
    <p class="login-label">欢迎登录</p>
    <Form ref="form" :model="loginModel" :rules="ruleValidate">
      <FormItem prop="loginName">
        <Input
          class="reset-font-size"
          size="large"
          clearable
          v-model="loginModel.loginName"
          @on-enter="loginSubmit"
          placeholder="用户名"
        ></Input>
      </FormItem>

      <FormItem prop="password">
        <Input
          class="reset-font-size"
          size="large"
          clearable
          v-model="loginModel.password"
          type="password"
          @on-enter="loginSubmit"
          placeholder="密码"
          style="font-size: 14px"
        ></Input>
      </FormItem>

      <Button
        type="primary"
        size="large"
        @click="loginSubmit"
        :loading="isLoading"
        :disabled="disabledBtn || isLoading"
        style="width: 100%"
      >
        登录
      </Button>
    </Form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';

  import { login } from '@/api/account/account';
  import { AdminNames } from '@/router/routerNames';
  import { type ILogin } from '@/types/account/account';

  const disabledBtn = computed(() => {
    if (loginModel.value.loginName && loginModel.value.password) {
      return false;
    }

    return true;
  });

  const isShowLoginForm = ref(true);

  const loginModel = ref<ILogin>({
    loginName: '',
    password: ''
  });

  const ruleValidate = reactive({
    loginName: [{ required: true, message: '请输入用户名！', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码！', trigger: 'blur' }]
  });

  const isLoading = ref(false);
  const form = ref();

  const sliderCaptchaModalShow = ref(false);
  const router = useRouter();

  async function loginSubmit() {
    const myForm: any = unref(form);
    if (!myForm) {
      return;
    }

    let valid = await myForm.validate();
    if (valid) {
      const params = {
        loginName: loginModel.value.loginName.trim(),
        password: loginModel.value.password
      };

      try {
        isLoading.value = true;
        let res = await login(params);
        isLoading.value = false;

        if (res.code === '1') {
          if (res.msgCode === 'user.e0001') {
            sliderCaptchaModalShow.value = true;
          }

          return;
        }

        localStorage.setItem('userInfo', JSON.stringify(res.data));

        if (res.data.defaultPwFlg) {
          isShowLoginForm.value = false;

          return;
        }

        router.push({
          name: AdminNames.ContentCenter
        });
      } catch (error) {
        isLoading.value = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-content {
    color: #333;
    text-align: center;

    .login-label {
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      text-align: left;
    }
  }
</style>

<style lang="scss">
  .login-content {
    .reset-font-size {
      .ivu-input-large {
        font-size: 14px;
      }
    }
  }
</style>
