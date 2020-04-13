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
  Table,
  TableColumn,
  Pagination,
  Radio,
  RadioGroup,
  Upload,
  CheckboxGroup,
  Checkbox,
  Dialog,
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
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
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


// 路由守卫
// to表示要去的那个页面的路由信息
// from表示是从哪个页面跳转过去的
// next是个函数，必须要调用才会执行下个页面（类似于express里面的中间件）
router.beforeEach((to, from, next) => {
	if (to.path !== "/login") {
		const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};

		// 需要校验是否有token，并且用户是否是管理员
		if(userJson.token && userJson.user.role.type === "admin"){
			next();
		}else{
			// 如果不满足上面的条件，就跳转到登录页
			next("/login");
		}
	} else {
		// 如果是登录页,直接跳转
		next();
	}
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
