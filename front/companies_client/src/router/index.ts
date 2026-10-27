import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../components/layouts/AuthLayout.vue'
import ContentLayout from '../components/layouts/ContentLayout.vue'
import RegistrationView from '../views/authorization/Autorization.vue'
import PreviewView from '../views/preview/PreviewView.vue'
import { useAuthorizationStore } from '@/stores/modules/authorization.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { 
    path: '/auth',
    component: AuthLayout,
    children:
    [
      { path: 'registration', name: 'registration', component: RegistrationView },
    ]
  },
  { path: '/',
    component: ContentLayout,
    children: 
    [
      { path: 'preview', name: 'preview', component: PreviewView },
    ]
  }
],
})

router.beforeEach(async(to) =>{
  const store = useAuthorizationStore()
  let isAuth = store.permission

  if(! store.isInitialized ){
    await store.setRole()
    isAuth = store.permission
  }

  console.log(isAuth);
  if(! isAuth ){
    if( to.name !== 'registration' ){
      return {name: 'registration'}
    }
  } 
})


export default router
