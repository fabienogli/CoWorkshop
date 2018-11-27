import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import store from '@/store'

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import NotFound from '@/components/NotFound'
import Projects from '@/components/Projects'
import Tags from '@/components/Tags'
import NotificationDrawer from '@/components/NotificationDrawer'
import {getAllNotifications} from "@/util";

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
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true,
      }
    },
    {
      path: '/',
      name: 'home',
      text: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/works',
      name: 'works',
      text: "Projects",
      component: Projects,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/tags',
      name: 'tags',
      text: "Tags",
      component: Tags,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: NotificationDrawer,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ]
});

const routeRequireAuth = (route) => {
  return route.matched.some(record => record.meta.requiresAuth)
};

const routeIsGuest = (route) => {
  return route.matched.some(record => record.meta.guest)
};

const tokenExists = () => {
  return store.getters['auth/token'] !== '';
};

const tokenDoesNotExist = () => {
  return !tokenExists();
};

const refreshNotifs = () => {
  const shouldRefresh = store.getters['notification/shouldRefresh'];
  if(shouldRefresh) {
    getAllNotifications(store.getters['auth/user_id']);
    store.dispatch('notification/setRefresh', false);
  } else {
    console.log('didnot refresh ;)')
  }
};

router.beforeEach((to, from, next) => {
  if (routeRequireAuth(to)) {
    if (tokenDoesNotExist()) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      });
    } else {
      refreshNotifs();
      next();
    }
  } else if (routeIsGuest(to)) {
    if (tokenDoesNotExist()) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

export default router;
