import store from './store';
import Vue from 'vue';
import axios from 'axios';
import env from './env';
import router from './router';

const mapCookieToObject = (cookie) => {
  return {
    token: cookie.token,
    user:  cookie.user,
  }
};

const mapObjectToCookie = (object) => {
  return {
    token: object.token,
    id: object.user.id,
    user: object.user,
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
      getAllNotifications(response.data.user.id);
      resolve();
    }).catch((error) => {
      reject(error);
    })
  });
};

const getAllNotifications = (user_id) => {
  const notifUrl = `${env.url}/users/${user_id}/notifications`;
  let config = {
    headers: {
      Authorization: `Bearer ${store.getters['auth/token']}`,
    }
  };
  
  axios(notifUrl, config)
    .then((response) => {
      const notifications = response.data.notifications;
      store.dispatch('notification/setNotifs', notifications);
    })
};

const logout = () => {
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

export {setStateFromCookie, loginAndRedirectTo, logout, getAllNotifications};
