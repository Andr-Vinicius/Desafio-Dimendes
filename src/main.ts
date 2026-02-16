import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'
import axios from 'axios'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(PrimeVue)

app.use(router)
app.mount('#app')

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      router.push('/');
    }
    return Promise.reject(error);
  }
);


