<template>
  <div class="home">
    <router-link class='center' to='/speed-test'>
      <button class='button-outline button-start px-3'>
        Начать тестирование
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  position: relative;
}

.button-start {
  font-size: 36px;
  height: auto;
}

.center {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
