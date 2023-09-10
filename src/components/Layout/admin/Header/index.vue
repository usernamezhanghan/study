<template>
  <div class="admin-header space-between">
    <div class="header-left align-center">
      <img class="project-logo" src="@/assets/imgs/account/logo@2x.png" />
      <p class="project-name">admin管理后台</p>
    </div>

    <Dropdown placement="bottom-end">
      <div class="header-avatar align-center">
        <Avatar class="avatar-img">{{ fullName }}</Avatar>
      </div>
      <template #list>
        <DropdownMenu class="user-drop">
          <ul class="menu">
            <li class="menu-item" @click="toUpdatePwd">
              <i class="iconfont icon-mima icon-pc-nav"></i>
              <span class="ellipsis">修改密码</span>
            </li>
            <li class="menu-item" @click="handleLogout">
              <i class="iconfont icon-tuichu icon-pc-nav"></i>
              <span class="ellipsis">退出登录</span>
            </li>
          </ul>
        </DropdownMenu>
      </template>
    </Dropdown>
    <change-password v-model="pwdModal" @close-modal="clsoseModal"></change-password>
  </div>
</template>

<script lang="ts" setup>
  import { computed,ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Avatar } from 'view-ui-plus';
  import { AdminNames } from '@/router/routerNames';
  import ChangePassword from '@/views/account/pwd.vue'

  const router = useRouter();

  const pwdModal = ref(false)

  const fullName = computed(() => {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      let info = JSON.parse(userInfo);
      if (info && info.fullName) {
        return info.fullName.substring(info.fullName.length - 2);
      }
    }

    return null;
  });

  function toUpdatePwd() {
    // console.log('up');
    // router.push({
    //   name: AdminNames.AccountUpdatePassword
    // });
    pwdModal.value = true;
  }

  function handleLogout() {
    localStorage.removeItem('userInfo');
    router.push({
      name: AdminNames.AccountLogin
    });
  }

  function clsoseModal(val:boolean){
    pwdModal.value = val;
  }
</script>

<style lang="scss" scoped>
  .admin-header {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 56px;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 #e5e5e5;

    .project-logo {
      width: 32px;
      height: 23px;
      margin-right: 12px;
    }

    .project-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .header-avatar {
      width: 28px;
      height: 56px;
      cursor: pointer;
      border-radius: 50%;

      .avatar-img {
        width: 28px;
        height: 28px;
        color: #fff;
        font-size: 12px;
        line-height: 28px;
        background-color: #f90;
        border-radius: 50%;
      }
    }

    .user-drop {
      .menu {
        margin-top: 4px;
        margin-bottom: 3px;

        .menu-item {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 24px;
          line-height: 48px;
          cursor: pointer;

          &:hover {
            background-color: rgba(65, 130, 250, 0.05);
          }

          .icon-pc-nav {
            margin-right: 10px;
            margin-top: 5px;
            font-size: 20px;
          }
        }

        .menu-active {
          color: #2381ff;
          background-color: rgba(65, 130, 250, 0.05);
        }
      }
    }
  }
</style>
