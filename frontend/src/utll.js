import store from './store';
import Vue from 'vue';

const setStateFromCookie = () => {
  const authCookie = Vue.cookies.get('currentUser');
  if(authCookie) {
    store.dispatch('auth/setTokenAndUserId', {
      token: authCookie.token,
      user: {
        id: authCookie.user_id
      }
    });
  }
};

export {setStateFromCookie};
