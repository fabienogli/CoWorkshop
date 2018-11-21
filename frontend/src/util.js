import store from './store';
import Vue from 'vue';
import axios from 'axios';
import env from './env';
import router from './router';

const mapCookieToObject = (cookie) => {
  return {
    token: cookie.token,
    user: {id: cookie.id}
  }
};

const mapObjectToCookie = (object) => {
  return {
    token: object.token,
    id: object.user.id,
  }
};

const setStateFromCookie = () => {
  const authCookie = Vue.cookies.get('currentUser');  //@TODO check cookie integrity
  if (authCookie) {
    const auth = mapCookieToObject(authCookie);
    store.dispatch('auth/setTokenAndUserId', auth);
  }
};

const loginAndRedirectTo = (email, password, route = '/') => {
  return new Promise((resolve, reject) => {
    login(email, password).then(() => {
      redirectTo(route);
      resolve();
    }).catch((error) => {
      reject(error);
    })
  });
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const loginUrl = `${env.url}/login`;
    const payload = createPayload(email, password);
    axios.post(loginUrl, payload).then((response) => {
      setAuth(response.data);
      resolve();
    }).catch((error) => {
      reject(error);
    })
  });
};

const logout = () => {
  console.log("Dans logout");
  store.dispatch('auth/logout');
  Vue.cookies.remove('currentUser');
  router.push({name: 'login'});
};

const createPayload = (email, password) => {
  return {
    auth: {
      email,
      password
    }
  }
};

const setAuth = (auth) => {
  store.dispatch('auth/setTokenAndUserId', auth);
  const cookie = mapObjectToCookie(auth);
  Vue.cookies.set('currentUser', cookie);
};

const redirectTo = (route) => {
  router.push(route);
};

export {setStateFromCookie, loginAndRedirectTo, logout};
