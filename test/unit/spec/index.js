import { shallowMount, createLocalVue } from '@vue/test-utils'
// import app from '@/modules/welcome.vue'
// import i18nManager from '@/i18n'

describe('welcome component', () => {
  let wrapper
  let localVue
  let tester
  beforeEach(() => {
    localVue = createLocalVue()

    tester = localVue.extend({
      render(h) {
        return h('button')
      }
    })

    wrapper = shallowMount(tester, {
      localVue
    })
  })
  it('should render correct', () => {
    expect(wrapper.html()).to.equal('<button></button>')
  })
})
