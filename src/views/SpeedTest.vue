<template>
  <div class="speed-test">
    <b-row class='center'>
      <b-col
        v-if='!isCompleted'
        id='input-card'
        :key='isNeedRerender'
        cols='8'
      >
          <p v-for="(item, index) in fetchedString"
             :key="index"
             :class="[index === 0 ? 'current-letter' : '']"
             :id='`letter-${index}`'
             :style='listItemStyle(item)'
             class='letter'
          >
            {{item}}
          </p>
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            <InfoCard
              icon='crosshairs'
              title='Точность'
              :number='+accuracy'
              sign='%'
            />
          </b-col>
          <b-col>
            <InfoCard
              icon='tachometer-alt'
              title='Скорость'
              :number='letterPerMinute'
              sign='зн./мин'
            />
          </b-col>
          <b-col v-if='isCompleted'>
            <InfoCard
              icon='medal'
              title='Результат'
              :number='fetchedString.length'
              sign='символов'
            />
          </b-col>
          <b-col cols='4' v-if='isCompleted'></b-col>
          <b-col>
            <button
              class='repeat-timer_button'
              onclick='this.blur();'
              @click='repeatTimer'>
              Заново
            </button>
            <button
              class='repeat-text_button'
              onclick='this.blur();'
              @click='reloadText()'>
              Обновить текст
            </button>
          </b-col>
          <b-col cols='4' v-if='isCompleted'></b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import contentApi from '@/api/content'
import InfoCard from '@/components/InfoCard'

export default {
  name: 'SpeedTest',
  components: { InfoCard },
  data () {
    return {
      fetchedString: '',
      permittedKeys: ['Shift', 'Tab', 'CapsLock', 'Alt', 'Meta', 'Control'],
      currentLetter: 0,
      isNeedRerender: false,
      isCompleted: false,
      typingErrors: 0,
      accuracy: 100,
      currentTime: 0,
      letterPerMinute: 0
    }
  },
  async beforeCreate () {
    try {
      this.fetchedString = (await contentApi.getTextForTest()).data.text
    } catch (e) {
      this.makeToast(
        'danger',
        'Ошибка загрузки строки',
        'Попробуйте перезагрузить страницу или обратиться к администратору ресурса')
    }
  },
  methods: {
    keyDown (event) {
      if (this.isCyrillic(event.key)) {
        this.stopTimer()
        this.makeToast(
          'danger',
          'Ошибка раскладки',
          'Для продолжения смените раскладку клавиатуры!')
        this.startTimer()
      } else if (event.key === this.fetchedString[this.currentLetter]) {
        let passedElement = document.getElementById(`letter-${this.currentLetter}`)
        passedElement.classList.remove('current-letter', 'error-letter')
        passedElement.classList.add('passed-letter')

        this.currentLetter += 1

        if (this.currentLetter === this.fetchedString.length) {
          document.removeEventListener('keydown', this.keyDown)
          this.stopTimer()
          this.isCompleted = true
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
          currentErrorElement.innerText = this.fetchedString[this.currentLetter]
        }, 100)
        this.typingErrors++
        this.accuracy = ((1 - (this.typingErrors / this.fetchedString.length)) * 100)
          .toFixed(2)
      }
    },
    listItemStyle (i) {
      return i === ' ' ? 'white-space: pre' : ''
    },
    startTimer () {
      this.timer = setInterval(() => {
        this.currentTime++
        this.letterPerMinute = Math.ceil((this.currentLetter / this.currentTime) * 60)
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    repeatTimer () {
      this.stopTimer()
      document.addEventListener('keydown', this.keyDown)
      this.isCompleted = false
      this.accuracy = 100
      this.currentTime = 0
      this.letterPerMinute = 0
      this.currentLetter = 0
      this.typingErrors = 0
      this.isNeedRerender = !this.isNeedRerender
      this.startTimer()
    },
    async reloadText () {
      try {
        this.fetchedString = (await contentApi.getTextForTest()).data.text
        await this.repeatTimer()
      } catch (e) {
        this.makeToast(
          'danger',
          'Ошибка перезагрузки строки',
          'Попробуйте перезагрузить страницу или обратиться к администратору ресурса')
      }
      this.repeatTimer()
    },
    isCyrillic (letter) {
      return /[а-я]/i.test(letter)
    },
    makeToast (variant = null, title, message) {
      this.$bvToast.toast(message, {
        toaster: 'b-toaster-top-left',
        title: title,
        variant: variant,
        solid: true
      })
    }
  },
  mounted () {
    document.addEventListener('keydown', this.keyDown)
    this.startTimer()
  },
  destroyed () {
    document.removeEventListener('keydown', this.keyDown)
    this.stopTimer()
  }
}
</script>

<style scoped lang="scss">
@import "~@/scss/_colors.scss";

.speed-test {
  min-height: 90vh;
  padding: 5% 25% 0;
}

#input-card {
  max-width: 600px;
  min-width: 200px;
  height: auto;
  min-height: 330px;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.dark {
  #input-card {
    border: 3px $white solid;
  }
  .current-letter, .error-letter {
    color: $black;
  }
  .repeat-text_button {
    color: $white;
    border: 2px $white solid;
  }
}

.light {
  #input-card {
    border: 3px $black solid;
  }
  .current-letter, .error-letter {
    color: $white;
  }
  .repeat-timer_button {
    background-color: $black;
  }
  .repeat-text_button {
    color: $black;
    border: 2px $black solid;
  }
}

.current-letter {
  border-radius: 10px;
  background-color: $green;
}

.error-letter {
  background-color: $red;
  border-radius: 10px;
}

.passed-letter {
  color: $light-blue;
}

.letter {
  text-align: center;
  font-size: 24px;
  display: inline-block;
}

.repeat-timer_button {
  width: 170px;
}

.repeat-text_button {
  width: 170px;
  box-sizing: border-box;
  background-color: transparent;
}
</style>
