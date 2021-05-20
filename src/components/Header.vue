<template>
  <div id='header' class='p-2'>
      <button
        id='change-mode'
        class='change-mode_button'
        :class='mode'
        onclick='this.blur();'
        @click="$emit('toggle')">
        <font-awesome-icon
          v-show="mode === 'dark'"
          :icon="['fas', 'moon']"
          size='2x'
          class='dark-icon'
        />
        <font-awesome-icon
          v-show="mode === 'light'"
          :icon="['fas', 'sun']"
          size='2x'
          class='light-icon'
        />
      </button>
      <b-tooltip target="change-mode">Поменять оформление</b-tooltip>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: ['mode']
}
</script>

<style scoped lang="scss">
@import "~@/scss/colors";

#header {
  height: 10vh;
}

.change-mode_button {
  height: 50px;
  width: 50px;
  border: none;
  outline: none;
  align-items: center;
  float: right;
  background-color: transparent;
}

.dark-icon {
  color: $white;
}

.light-icon {
  color: $black;
}
</style>
