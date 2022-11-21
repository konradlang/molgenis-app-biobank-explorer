import { createLocalVue, shallowMount } from '@vue/test-utils'
import BiobankCard from '@/components/cards/BiobankCard'
import { baseGetters, mockState } from '../../mockData'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BiobankCard', () => {
  let propsData, stubs, store

  const selectedCollections = jest.fn().mockReturnValue([])

  beforeEach(() => {
    store = new Vuex.Store({
      state: mockState(),
      getters: {
        ...baseGetters,
        selectedCollections
      }
    })

    propsData = {
      biobank: {
        id: 'biobank-1',
        name: 'Dummy biobank',
        collections: [{
          name: 'z',
          type: [{ label: 'col-type-a' }],
          sub_collections: [{
            type: [{ label: 'col-type-b' }],
            sub_collections: []
          }]
        },
        {
          name: 'a',
          type: [{ label: 'col-type-d' }],
          sub_collections: [{
            type: [{ label: 'col-type-e' }],
            sub_collections: []
          }]
        }]
      }
    }
    stubs = ['router-link', 'router-view', 'font-awesome-icon']
  })

  it('can check if any collection of the biobank has been selected', () => {
    selectedCollections.mockReturnValue(['a'])

    const wrapper = shallowMount(BiobankCard, { localVue, store, propsData, stubs })
    expect(wrapper.vm.biobankInSelection).toBeTruthy()
  })

  it('can create a biobank viewmodel based on columns that are marked showOnBiobankCard', () => {
    const wrapper = shallowMount(BiobankCard, { localVue, store, propsData, stubs })
    expect(wrapper.vm.biobankcardViewmodel).toStrictEqual({
      attributes: [{
        column: 'quality',
        label: 'Quality labels:',
        type: 'quality',
        value: undefined
      },
      {
        column: 'collection_types',
        label: 'Collection types:',
        type: 'array',
        value: ['col-type-a', 'col-type-b', 'col-type-d', 'col-type-e']
      },
      {
        column: 'juridical_person',
        label: 'Juridical person:',
        type: 'string',
        value: ''
      },
      {
        column: 'capabilities',
        label: 'Biobank capabilities:',
        type: 'mref',
        value: []
      }]
    })
  })
})
