<template>
  <div>
    {{ currentTime }}
    <div>
      символов: {{ symbols }}
      <div :key="currentTime">
        скорость: {{ letterPerMinute}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeedOfTyping',
  props: {
    symbols: {
      type: Number,
      required: true
    },
    isStringTyped: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      currentTime: 0,
      timer: null,
      letterPerMinute: 0
    }
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {
    this.stopTimer()
  },
  methods: {
    startTimer () {
      this.timer = setInterval(() => {
        this.currentTime++
        this.letterPerMinute = Math.ceil((this.symbols / this.currentTime) * 60)
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    }
  },
  watch: {
    isStringTyped: {
      handler (val) {
        if (val) {
          this.stopTimer()
          this.$emit('open-results-modal')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
