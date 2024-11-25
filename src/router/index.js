import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import AdminPortal from '../components/AdminPortal.vue';
import TransferMoney from '../components/TransferMoney.vue';
import UserList from '../components/UserList.vue';
import UserCreate from '../components/UserCreate.vue';
import UserEdit from '../components/UserEdit.vue';
import Dashboard from "@/components/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/admin', name: 'AdminPortal', component: AdminPortal },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: '/transfer', name: 'TransferMoney', component: TransferMoney },
  { path: '/admin/users', name: 'UserList', component: UserList },
  { path: '/admin/users/create', name: 'UserCreate', component: UserCreate },
  { path: '/admin/users/:id/edit', name: 'UserEdit', component: UserEdit, props: true },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;