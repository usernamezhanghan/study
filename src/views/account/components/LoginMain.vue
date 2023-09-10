<template>
  <div class="account-container">
    <div class="project-info">
      <img class="project-logo" src="@/assets/imgs/account/logo@2x.png" />
      <p class="project-name">admin</p>
      <img class="arr-banner" src="@/assets/imgs/account/banner_2@2x.png" />
    </div>

    <div class="account-wrapper">
      <img class="account-banner" src="@/assets/imgs/account/banner@2x.png" />

      <div class="account-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .account-container {
    position: relative;
    height: 100vh;
    min-height: 900px;
    background-image: url(../../../assets/imgs/account/bj@2x.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .project-info {
      position: relative;
      display: flex;
      align-items: center;
      width: 1233px;
      padding-top: 120px;
      margin: 0 auto;

      .project-logo {
        width: 71px;
        height: 53px;
      }

      .project-name {
        margin-left: 30px;
        font-size: 40px;
        font-weight: 600;
        line-height: 46px;
        color: #333;
      }

      .arr-banner {
        position: absolute;
        top: 100px;
        right: -26px;
        width: 160px;
        height: 160px;
      }
    }

    .account-wrapper {
      display: flex;
      width: 1233px;
      padding-top: 57px;
      margin: 0 auto;

      .account-banner {
        width: 600px;
        height: 640px;
      }
    }

    .account-view {
      width: 406px;
      height: 100%;
      padding: 32px 24px;
      margin-top: 130px;
      margin-left: 228px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.06);
    }
  }
</style>
