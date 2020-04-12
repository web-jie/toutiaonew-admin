import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element 插件
import {
  Button,
  Select,
  Container,
  Header, 
  Main,
  Form,
  Input,
  FormItem,
  Row,
} from 'element-ui';
// 导入全局样式
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

//注册element ui的组件
Vue.use(Row)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
