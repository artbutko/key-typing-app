<template>
  <div id='info-card'>
    <div id='title'>
      <font-awesome-icon :icon="['fas', icon]" size="lg"/> {{ title }}
    </div>
    <div id='main-stats'>
      <div id='number'> {{ number }} </div>
      <div id='sign'> {{ sign }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    sign: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/scss/_colors.scss";

#info-card {
  height: 100px;
  width: 170px;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  margin-bottom: 15px;
}

.dark #info-card {
  color: $yellow;
}

.light #info-card {
  color: $dark-blue;
}

#title {
  text-transform: uppercase;
}

#number {
  font-size: 32px;
  font-weight: bold;
  line-height: 0.8;
  float: left;
  display: inline-block;
}

#sign {
  font-size: 16px;
  float: left;
  margin-left: 4px;
  bottom: 0;
}

#main-stats {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
