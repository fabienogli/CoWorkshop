import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true,
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: HelloWorld,
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  //The route and its subroutes need auth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/token'] === '') {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath}
      });
    } else {
      next();
    }
  }
  //the route must be guest
  else if (to.matched.some(record => record.meta.guest)) {
    if(store.getters['auth/token'] === '') {
      next();
    } else {
      next(false);
    }
  }
});

export default router;
