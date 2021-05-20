<template>
  <div class="home">
    <router-link class='center' to='/speed-test'>
      <button class='button-start'>
        Начать печатать
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
  padding: 0 15px 0 15px;
}

.center {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
