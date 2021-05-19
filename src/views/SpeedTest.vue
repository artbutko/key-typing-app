<template>
  <div class="speed-test">
    <div id='input-card'>
      <p v-for="(item, index) in fetchedArrayString"
            :key="index"
            :class="[index === 0 ? 'current' : '']"
            :id='`letter-${index}`'
            :style='listItemStyle(item)'
            class='letter'
      >
        {{item}}
      </p>
    </div>
    <SpeedOfTyping
      v-if='isNotCompleted'
      :symbols="countOfLettersTyped"
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
      fetchedArrayString: [
        'Q', 'W', 'E', 'R', 'T', 'Y', ',', 'q', 'w', 'e', 'r',
        't', 'y', ' ', 'T', 'Y', 'W', 'E', 'R', 'T', 'Y', 'W',
        'E', 'R', 'T', 'Y', 'W', 'E', 'R', 'T', 'Y'
      ],
      providedKeys: ['Shift', 'Tab', 'CapsLock', 'Alt', 'Meta'],
      currentLetter: 0,
      isNotCompleted: true,
      countOfLettersTyped: 0,
      isStringTyped: false,
      typingErrors: 0
    }
  },
  methods: {
    removeStyleClass (elementId, tokens) {
      document
        .getElementById(elementId)
        .classList
        .remove(tokens)
    },
    addStyleClass (elementId, tokens) {
      document
        .getElementById(elementId)
        .classList
        .add(tokens)
    },
    keyDown (event) {
      if (event.key === this.fetchedArrayString[this.currentLetter]) {
        this.removeStyleClass(`letter-${this.currentLetter}`, 'current')
        this.removeStyleClass(`letter-${this.currentLetter}`, 'current-error')
        this.addStyleClass(`letter-${this.currentLetter}`, 'past')
        this.currentLetter += 1
        if (this.currentLetter + 1 === this.fetchedArrayString.length) {
          this.isStringTyped = true
        } else {
          this.countOfLettersTyped++
        }
        this.addStyleClass(`letter-${this.currentLetter}`, 'current')
      } else if (!this.providedKeys.find((key) => key === event.key)) {
        this.addStyleClass(`letter-${this.currentLetter}`, 'current-error')
        this.typingErrors++
      }
    },
    openResultsModal () {
      this.isNotCompleted = false
      this.$bvModal.show('results-modal')
    },
    listItemStyle (i) {
      if (i === ' ') return 'white-space: pre'
      return ''
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

.current {
  background-color: #4d5e57;
  color: bisque;
  width: 30px;
  border-radius: 3px;
}

.current-error {
  background-color: #4f2f2f;
  color: bisque;
  width: 30px;
  border-radius: 3px;
}

.past {
  color: dimgray;
}

.letter {
  text-align: center;
  font-size: 24px;
  display: inline-block;
}
</style>
