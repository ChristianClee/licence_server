import { defineStore } from 'pinia'
import { http } from '@/stores/index'
import axios from 'axios'
import { e_route } from '@/stores/routePaths'
import { e_permissionRole_column } from '@/stores/columnsDb'

interface RequestsState {
  licences: any;
  permission: e_permissionRole_column | null;
  isInitialized: boolean;
}

const useAuthorizationStore = defineStore('authorization', {
  state: (): RequestsState => ({
    licences: null,
    permission: null,
    isInitialized: false,
  }),

  getters: {
    hasError: (state): any => state.licences,
  },

  actions: {
    async sendLogin(password:string, email:string) {
      const path = `/login${e_route.passwords}`
      try{
        const responce = await http.post(path, { password, email })
        await this.setRole()
      }catch(e){
        console.error(e);
        throw e
      }
    },

    async setRole() {
      const path = `${e_route.myrole}`
      try{
        const response = (await http.get(path)).data as { permission: e_permissionRole_column }
        this.permission = response.permission
        this.isInitialized = true
      }catch(e){
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          this.permission = null
        }else{
          console.error(e);
        }
      }
    },

  },
})

export { useAuthorizationStore }