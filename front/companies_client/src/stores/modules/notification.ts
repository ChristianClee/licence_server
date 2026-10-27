import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    visible: false,
    text: '',
    color: 'error' as string,
    timeout: 5000,
  }),
  actions: {
    show(text: string, color = 'error', timeout = 4000) {
      this.text = text
      this.color = color
      this.timeout = timeout
      this.visible = true
    },
    error(text: string) {
      this.show(text, 'error')
    },
    success(text: string) {
      this.show(text, 'success')
    },
  },
})