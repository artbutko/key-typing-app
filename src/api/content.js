import axios from 'axios'

export default {
  getTextForTest () {
    return axios.get('http://numbersapi.com/random/year?json')
  }
}
