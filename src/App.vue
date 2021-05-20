<template>
  <div id="app" :class="mode">
    <Header :mode='mode' @toggle='toggle'/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: { Header },
  data () {
    return {
      mode: 'light'
    }
  },
  methods: {
    toggle () {
      this.mode = this.mode === 'dark' ? 'light' : 'dark'
    }
  }
}
</script>

<style lang="scss">
@import './scss/app.scss';
* {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.app {
  min-height: 100vh;
  width: 100vh;
}
</style>
