<template>
  <div class="speed-test">
    <!--    <button-->
    <!--        class="neo-button btn-before">-->
    <!--      Убрать первый символ-->
    <!--    </button>-->
    <div id="type" class="mx-auto" :key=isRerender>
      {{ fetchedString }}
    </div>
    <SpeedOfTyping
      :symbols="countOfLettersTyped"
      :is-string-typed="isStringTyped"
    />
  </div>
</template>

<script>
import SpeedOfTyping from '@/components/SpeedOfTyping'

export default {
  name: 'SpeedTest',
  components: { SpeedOfTyping },
  comments: {
    SpeedOfTyping
  },
  data () {
    return {
      fetchedString: 'QWERTYUIOPASDFGHJKLZXCVBNM',
      isRerender: true,
      countOfLettersTyped: 0,
      isStringTyped: false,
      typingErrors: 0
    }
  },
  methods: {
    keyDown (event) {
      if (event.key === this.fetchedString[0]) {
        this.fetchedString = this.fetchedString.substring(1)
        if (!this.fetchedString.length) {
          this.isStringTyped = true
        }
        this.countOfLettersTyped++
      } else {
        this.typingErrors++
        document.getElementById('type').classList.add('handler')
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', this.keyDown)
  }
}
</script>

<style scoped lang="scss">
.speed-test {
  height: 100vh;
}

.neo-button {
  padding: 10px;
  background-color: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
}

.btn-before {
  box-shadow:
    6px 6px 16px 0 rgba(0, 0, 0, 0.25),
    -6px -6px 12px 0 rgba(255, 255, 255, 0.3);
}

.btn-after {
  box-shadow:
    6px 6px 16px 0 rgba(255, 255, 255, 0.3) inset,
    -6px -6px 12px 0 rgba(0, 0, 0, 0.25) inset;
}

#type {
  padding-left: 50px;
  height: 200px;
  width: 100%;
  font-size: 98px;
  text-align: left;
}

#type:first-letter {
  color: darkslategrey;
}

.handler::first-letter{
  color: #4f2f2f !important;
}
</style>
