import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      }
    },
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    }
  ]
});

const routeRequireAuth = (route) => {
  return route.matched.some(record => record.meta.requiresAuth)
};

const routeIsGuest = (route) => {
  return route.matched.some(record => record.meta.guest)
};

const tokenExists = () => {
  return store.getters['auth/token'] !== '';
};

const tokenDoesNotExist = () => {
  return !tokenExists();
};

router.beforeEach((to, from, next) => {
  if(routeRequireAuth(to)) {
    if (tokenDoesNotExist()) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath}
      });
    } else {
      next();
    }
  } else if (routeIsGuest(to)) {
    if(tokenDoesNotExist()) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

export default router;
