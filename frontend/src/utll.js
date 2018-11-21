import store from './store';
import Vue from 'vue';
import axios from 'axios';
import env from './env';

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
  if(authCookie) {
    const auth = mapCookieToObject(authCookie);
    store.dispatch('auth/setTokenAndUserId', auth);
  }
};


const loginAndRedirectTo = (email, password, route='/home') => {
  login.then(() => {
    redirectTo(route);
    return Promise.resolve();
  }).catch((error) => {
    return Promise.error(error);
  })
};

const login = (email, password) => {
  const loginUrl = `${env.url}/login`;
  const payload = createPayload(email, password);
  axios.post(loginUrl, payload).then((response) => {
    setAuth(response.data);
    return Promise.resolve();
  }).catch((error) => {
    return Promise.error(error);
  })
};

const createPayload = (email, password) => {
  return {
    auth: {
      "email": email,
      "password": password
    }
  }
};

const setAuth = (auth) => {
  this.$store.dispatch('auth/setTokenAndUserId', auth);
  const cookie = mapObjectToCookie(auth);
  this.$cookies.set('currentUser', cookie);
};

const redirectTo = (route) => {
  router.push(route);
};

export {setStateFromCookie, loginAndRedirectTo};
