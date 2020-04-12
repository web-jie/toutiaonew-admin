import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入axios组件
import axios from 'axios'
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
  Message,
  Aside,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Menu,
  MenuItem,
  Submenu,
} from 'element-ui';
// 导入全局样式
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';

// 把axios绑定到原型
Vue.prototype.$axios = axios
Vue.prototype.$message = Message;
// 配置axios的基准路径
axios.defaults.baseURL = "http://localhost:3000"

Vue.config.productionTip = false

//注册element ui的组件
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Aside)
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
