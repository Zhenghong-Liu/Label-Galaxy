// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lottie from 'vue-lottie';
import fabric from 'fabric';




Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('lottie',lottie);
Vue.use(fabric);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})