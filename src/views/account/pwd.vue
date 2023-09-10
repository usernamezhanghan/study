<template>
  <Modal
    :value="value"
    :title="'修改密码'"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :width="500"
    class="reset-modal"
  >
    <div class="password-update">
      <div class="login-wrapper">
        <div class="login-content">
          <!-- <p class="login-label">修改密码</p> -->

          <Form ref="form" :model="loginModel" :rules="ruleValidate" label-position="left" :label-width="80">
            <FormItem prop="oldPassword" label="原密码">
              <Input
                v-model="loginModel.oldPassword"
                :type="isOldPassword ? 'password' : 'text'"
                @on-enter="passSubmit"
                placeholder="请输入"
                style="width: 380px"
              >
                <template #suffix>
                  <i
                    class="iconfont pwd-off-icon"
                    :class="{ 'icon-yincang': isOldPassword, 'icon-xianshi': !isOldPassword }"
                    @click="changeOldPasswordType"
                  ></i>
                </template>
              </Input>
              <Poptip
                trigger="hover"
                class="form-poptip"
                width="145"
                :word-wrap="true"
                content="6-20位字符、必须包含数字、字母、不能包含空格和中文字符"
              >
                <a class="iconfont icon-lib-instructions icon-form"></a>
              </Poptip>
            </FormItem>

            <FormItem prop="password" label="新密码">
              <Input
                v-model="loginModel.password"
                :type="isPassword ? 'password' : 'text'"
                @on-enter="passSubmit"
                placeholder="请输入"
                style="width: 380px"
              >
                <template #suffix>
                  <i
                    class="iconfont pwd-off-icon"
                    :class="{ 'icon-yincang': isPassword, 'icon-xianshi': !isPassword }"
                    @click="changePasswordType"
                  ></i>
                </template>
              </Input>
              <Poptip
                trigger="hover"
                class="form-poptip"
                width="145"
                :word-wrap="true"
                transfer
                content="6-20位字符、必须包含数字、字母、不能包含空格和中文字符"
              >
                <a class="iconfont icon-yiwen icon-form"></a>
              </Poptip>
            </FormItem>

            <FormItem prop="passwordCheck" label="确认密码">
              <Input
                v-model="loginModel.passwordCheck"
                :type="isConfirmPassword ? 'password' : 'text'"
                @on-enter="passSubmit"
                placeholder="请输入"
                style="width: 380px"
              >
                <template #suffix>
                  <i
                    class="iconfont pwd-off-icon"
                    :class="{
                      'icon-yincang': isConfirmPassword,
                      'icon-xianshi': !isConfirmPassword
                    }"
                    @click="changeConfirmPasswordType"
                  ></i>
                </template>
              </Input>
            </FormItem>

          </Form>
        </div>
      </div>
    </div>

    <template #footer>
      <Button type="text" @click="cancel">取消</Button>
      <Button
        class="pwd-btn"
        type="primary"
        @click="passSubmit"
        :loading="isLoading"
      >
        确定
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref, computed, onMounted , defineProps,defineEmits } from 'vue';
  import { useRouter } from 'vue-router';

  // import GlobalHeader from '@/components/Layout/admin/Header/index.vue';
  import { updatePassword } from '@/api/account/account';
  import { AdminNames } from '@/router/routerNames';
  import { Message } from 'view-ui-plus';

  const prop = defineProps({
    value:{
      type: Boolean,
      default:false
    }
  })

  const loginModel = ref({
    oldPassword: '',
    password: '',
    passwordCheck: ''
  });

  const disabledBtn = computed(() => {
    if (
      loginModel.value.oldPassword &&
      loginModel.value.password &&
      loginModel.value.passwordCheck
    ) {
      return false;
    }

    return true;
  });

  const ruleValidate = reactive({
    oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
    passwordCheck: [{ required: true, validator: validatePasswordCheck, trigger: 'blur' }]
  });

  function validatePassword(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入新密码！'));
    } else if (loginModel.value.password) {
      // eslint-disable-next-line no-invalid-regexp
      let reg = '(?!.*[\u4E00-\u9FA5\\s])(?!^[a-zA-Z]+$)(?!^[0-9]+$)(?!^[^a-zA-Z0-9]+$)^.{6,20}$';
      const pwdRegex = new RegExp(reg);

      if (!pwdRegex.test(loginModel.value.password)) {
        callback(new Error('6-20位字符、必须包含数字、字母、不能包含空格和中文字符'));
      } else {
        callback();
      }
    }
  }

  function validatePasswordCheck(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入确认密码！'));
    } else if (value !== loginModel.value.password) {
      callback(new Error('密码与确认密码不一致！'));
    } else {
      callback();
    }
  }

  const isOldPassword = ref(true);

  function changeOldPasswordType() {
    isOldPassword.value = !isOldPassword.value;
  }

  const isPassword = ref(true);

  function changePasswordType() {
    isPassword.value = !isPassword.value;
  }

  const isConfirmPassword = ref(true);

  function changeConfirmPasswordType() {
    isConfirmPassword.value = !isConfirmPassword.value;
  }

  const isLoading = ref(false);
  const form = ref();
  const router = useRouter();

  async function passSubmit() {
    const myForm: any = unref(form);
    if (!myForm) {
      return;
    }

    let valid = await myForm.validate();
    if (valid) {
      if(loginModel.value.password===loginModel.value.oldPassword){
        Message.error('新密码不能与旧密码相同，请重新输入！')
        return;
      }
      try {
        isLoading.value = true;
        let res = await updatePassword({
          oldPwd: loginModel.value.oldPassword,
          newPwd: loginModel.value.password
        });
        isLoading.value = false;

        if (res.code === '0') {
          localStorage.removeItem('userInfo');
          emit('close-modal',false)
          router.push({
            name: AdminNames.AccountLogin
          });
        }
      } catch (error) {
        isLoading.value = false;
      }
    }
  }

  function toHome() {
    router.push({
      name: AdminNames.UserCenter
    });
  }

  const isLogin = computed(() => {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      let info = JSON.parse(userInfo);
      if (info && info.jwt) {
        return true;
      }
    }

    return false;
  });

  onMounted(() => {
    if (!isLogin.value) {
      router.push({
        name: AdminNames.AccountLogin
      });
    }
  });

  function visibleChange(val:any){
    if(!val){
      emit('close-modal',val)
      form.value.resetFields();
    }
    else{
      isOldPassword.value = true;
      isPassword.value = true;
      isConfirmPassword.value = true;
    }
  }

  function cancel(){
    emit('close-modal',false)
  }

  const emit = defineEmits(['close-modal'])
</script>

<style lang="scss" scoped>
  .password-update {
    width: 100%;
    // height: 100vh;
    // background-image: url(../../assets/imgs/account/password_bj@2x.png);
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: 100% 100%;

    .login-wrapper {
      display: flex;
      justify-content: center;
      // padding-top: 56px;

      .login-content {
        width: 466px;
        // padding: 32px 24px;
        // margin-top: 24px;
        color: #333;
        text-align: center;
        background: #fff;
        // border-radius: 8px;
        // box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.06);

        .login-label {
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 600;
          line-height: 22px;
          text-align: left;
        }

        .pwd-btn {
          width: 100%;
          margin-bottom: 16px;
        }

        .pwd-skip {
          color: #666;
        }
      }
    }

    .form-poptip {
      position: absolute;
      top: 0;
      right: 32px;
      line-height: 35px;

      .icon-form {
        color: #999;
      }
    }
  }
</style>

<style lang="scss">
  .password-update {
    .login-wrapper {
      .ivu-input-suffix i {
        color: #999;
      }
    }
  }
</style>
