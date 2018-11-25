import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectForm from '@/components/ProjectForm'
import store from '@/store'

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import NotFound from '@/components/NotFound'
import Projects from '@/components/Projects'
import TagForm from '@/components/TagForm'
import Tags from '@/components/Tags'

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
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/works',
      name: 'workList',
      component: Projects,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/works/new',
      name: 'work',
      component: ProjectForm,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/tags/new',
      name: 'tag',
      component: TagForm,
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
