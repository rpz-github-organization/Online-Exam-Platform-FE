<template>
  <div id="app">
    <div v-if="this.isLogin === true">
      <Pheader />
    </div>
    <div class="header"></div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Pheader from '@/components/Pheader.vue';

export default {
  name: 'app',
  components: {
    Pheader,
  },
  computed: {
    ...mapState(['isLogin']),
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: inline;
}
.header{
  margin-bottom: 60px;
}
#nav {
  padding: 50px;

  a, a:hover, a:visited, a:link {
    text-decoration: none
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
