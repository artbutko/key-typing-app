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
* {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.app {
  min-height: 100vh;
  width: 100vh;
}

.light {
  background-color: #EFEEEE;
  color: darkslategrey;
  transition: 0.2s;
  button {
    border-radius: 5px;
    outline: none;
  }
  .button-outline {
    border: 2px darkslategrey solid;
    color: darkslategrey;
    background-color: transparent;
  }
}

.dark {
  background-color: dimgray;
  color: bisque;
  transition: 0.2s;
  button {
    border-radius: 5px;
    outline: none;
  }
  .button-outline {
    border: 2px bisque solid;
    color: bisque;
    background-color: transparent;
  }
}
</style>
