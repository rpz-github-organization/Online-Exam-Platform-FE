<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'home',
  components: {
    Login,
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-top: 10%;
  .logo {
    width: 50px;
  }
}
</style>
