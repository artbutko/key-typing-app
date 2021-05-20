<template>
  <div class="speed-test">
    <div id='input-card'>
      <p v-for="(item, index) in fetchedArrayString"
            :key="index"
            :class="[index === 0 ? 'current-letter' : '']"
            :id='`letter-${index}`'
            :style='listItemStyle(item)'
            class='letter'
      >
        {{item}}
      </p>
    </div>
    <SpeedOfTyping
      v-if='isNotCompleted'
      :symbols="currentLetter"
      :is-string-typed="isStringTyped"
      @open-results-modal='openResultsModal'
    />
    <div>
      Ошибок: {{ typingErrors }}
    </div>
    <b-modal id='results-modal' title='nice'>
      <p class="my-4">Hello from modal!</p>
    </b-modal>
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
      fetchedArrayString: 'Мама мыла раму',
      permittedKeys: ['Shift', 'Tab', 'CapsLock', 'Alt', 'Meta'],
      currentLetter: 0,
      isNotCompleted: true,
      isStringTyped: false,
      typingErrors: 0
    }
  },
  methods: {
    keyDown (event) {
      if (event.key === this.fetchedArrayString[this.currentLetter]) {
        let passedElement = document.getElementById(`letter-${this.currentLetter}`)
        passedElement.classList.remove('current-letter', 'error-letter')
        passedElement.classList.add('passed-letter')

        this.currentLetter += 1

        if (this.currentLetter === this.fetchedArrayString.length) {
          this.isStringTyped = true
          document.removeEventListener('keydown', this.keyDown)
        }

        let currentElement = document.getElementById(`letter-${this.currentLetter}`)
        if (currentElement) {
          currentElement.classList.add('current-letter')
        }
      } else if (!this.permittedKeys.find((key) => key === event.key)) {
        let currentErrorElement = document.getElementById(`letter-${this.currentLetter}`)
        currentErrorElement.classList.add('error-letter')
        currentErrorElement.innerText = event.key
        setTimeout(() => {
          currentErrorElement.innerText = this.fetchedArrayString[this.currentLetter]
        }, 100)
        this.typingErrors++
      }
    },
    openResultsModal () {
      this.isNotCompleted = false
      this.$bvModal.show('results-modal')
    },
    listItemStyle (i) {
      return i === ' ' ? 'white-space: pre' : ''
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

#input-card {
  width: 400px;
  height: 100px;
  border: 2px #4f2f2f solid;
}

.current-letter {
  width: 30px;
  border-radius: 3px;
}

.light .current-letter {
  background-color: #4d5e57;
  color: bisque;
}

.dark .current-letter {
  background-color: bisque;
  color: #4d5e57;
}

.error-letter {
  background-color: #4f2f2f;
  color: bisque;
  width: 30px;
  border-radius: 3px;
}

.passed-letter {
  color: dimgray;
}

.letter {
  text-align: center;
  font-size: 24px;
  display: inline-block;
}
</style>
