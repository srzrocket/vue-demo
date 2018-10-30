
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import HelloWorld from '@/components/HelloWorld'
import HelloVue from '@/components/day01/HelloVue'
import HelloVue1 from '@/components/day01/HelloVue1'
import HelloVue2 from '@/components/day01/HelloVue2'
Vue.use(Router);
Vue.use(ElementUI);
Vue.prototype.$http = axios;


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/day01',
      name: 'HelloVue',
      component: HelloVue
    },
    {
      path: '/day011',
      name: 'HelloVue1',
      component: HelloVue1
    },
    {
      path: '/day012',
      name: 'HelloVue2',
      component: HelloVue2
    }
  ]
});
