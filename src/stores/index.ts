import { defineStore } from 'pinia'

import { getApiList } from '../server'

import type { Children, RootObject, ChinaAdd, ChinaTotal, LocalCityNCOVDataList } from './type'

export const useStore = defineStore({
  id: 'china',
  state: () => ({
    list: <RootObject>{},
    items: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <LocalCityNCOVDataList[]>[]
  }),
  getters: {

  },
  actions: {
    async getList() {
      const result = await getApiList()
      this.list = result
      this.chinaAdd = result.diseaseh5Shelf.chinaAdd
      this.chinaTotal = result.diseaseh5Shelf.chinaTotal
      this.cityDetail = result.localCityNCOVDataList.slice(0, 10)
    }
  }
})
