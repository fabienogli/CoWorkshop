
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import env from '@/env';

class Http {
  constructor() {
    this.initService()
  }
  
  initService() {
    let service = axios.create({
      baseURL: env.url,
    });
    service.interceptors.request.use(
      config => {
        config.headers.Accept = 'application/json';
        const token = store.getters['auth/token'] || '';
        if (token !== '') {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    service.interceptors.response.use(null, Http.handleError);
    this.service = service
  }
  
  static handleError(error) {
    if(error.response && error.response.status === 401) {
      router.push('/login');
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
  
}

const http = new Http();

export default http.service;
