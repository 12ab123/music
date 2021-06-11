import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'


import router from '@/router/index.js'
import store from '@/vuex/index.js'

Vue.config.productionTip = false
import { Tabbar, TabbarItem, Button, Icon, Swipe, SwipeItem, Lazyload, Tab, Tabs, Popup, Cell, List, Toast  } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(List);
Vue.use(Toast)


import {ISLOADING} from '@/vuex/mutations-types'


// router.beforeEach((to,from,next)=>{
//   store.commit(ISLOADING,true)
//   next()
// })


// router.afterEach((to,from) => {
//   store.commit(ISLOADING,false)
// })



export default  new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


