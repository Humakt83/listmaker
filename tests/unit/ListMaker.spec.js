import { shallowMount, createLocalVue } from '@vue/test-utils'
import ListMaker from '@/components/ListMaker.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  actions: {
    fetchStoredList: jest.fn()
  },
  getters: {
    getList: () => { return {name: 'default', items: []}}
  }
})

describe('ListMaker.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(ListMaker, {store, localVue})
    wrapper.setData({fetched: true})
    expect(wrapper.find('#addItemToList').element.getAttribute('value')).toEqual('ADD ITEM')
  })
})
