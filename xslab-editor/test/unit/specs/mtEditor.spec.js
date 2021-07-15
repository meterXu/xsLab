import Vue from 'vue'
import mtEditor from '@/components/mtEditor'

describe('mtEditor.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(mtEditor)
    const vm = new Constructor().$mount()
    expect(vm.$ref.download.style)
      .toEqual('display: none;')
  })
})
