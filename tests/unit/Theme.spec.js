import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import Vue from 'vue'
Vue.config.ignoredElements = ['b-tooltip', 'font-awesome-icon']

describe('Тестирование темы', () => {
  it('Prop для mode равный dark определяет класс .dark', () => {
    const mode = 'dark'
    const wrapper = shallowMount(Header, {
      propsData: { mode }
    })
    expect(wrapper.find('.dark').exists()).toBeTruthy()
  })
  it('Prop для mode равный dark не определяет класс .light', () => {
    const mode = 'dark'
    const wrapper = shallowMount(Header, {
      propsData: { mode }
    })
    expect(wrapper.find('.light').exists()).toBeFalsy()
  })
  it('Prop для mode равный light определяет класс .light', () => {
    const mode = 'light'
    const wrapper = shallowMount(Header, {
      propsData: { mode }
    })
    expect(wrapper.find('.light').exists()).toBeTruthy()
  })
  it('Prop для mode равный light не определяет класс .dark', () => {
    const mode = 'light'
    const wrapper = shallowMount(Header, {
      propsData: { mode }
    })
    expect(wrapper.find('.dark').exists()).toBeFalsy()
  })
})
