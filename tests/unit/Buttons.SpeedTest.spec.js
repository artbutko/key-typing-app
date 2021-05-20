import { mount } from '@vue/test-utils'
import SpeedTest from '@/views/SpeedTest'
import Vue from 'vue'
Vue.config.ignoredElements = ['b-row', 'b-col', 'font-awesome-icon']

describe('Тестирование кнопок SpeedTest.vue', () => {
  it('Нажатие на "repeat-timer_button"', async () => {
    const wrapper = mount(SpeedTest)
    wrapper.find('.repeat-timer_button').trigger('click')
    expect(wrapper.vm.currentTime).toBe(0)
    expect(wrapper.vm.currentLetter).toBe(0)
    expect(wrapper.vm.isCompleted).toBe(false)
    expect(wrapper.vm.typingErrors).toBe(0)
    expect(wrapper.vm.accuracy).toBe(100)
    expect(wrapper.vm.letterPerMinute).toBe(0)
  })
  it('Нажатие на "repeat-text_button"', async () => {
    const wrapper = mount(SpeedTest)
    wrapper.find('.repeat-text_button').trigger('click')
    expect(wrapper.vm.currentTime).toBe(0)
    expect(wrapper.vm.currentLetter).toBe(0)
    expect(wrapper.vm.isCompleted).toBe(false)
    expect(wrapper.vm.typingErrors).toBe(0)
    expect(wrapper.vm.accuracy).toBe(100)
    expect(wrapper.vm.letterPerMinute).toBe(0)
  })
})
