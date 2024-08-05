import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogsView from '../views/BlogsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import ProfileView from '../views/ProfileView.vue'
import waitView from '../views/waitView.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPreview from '../views/BlogPreview.vue'
import ViewBlog from '../views/ViewBlog.vue'
import EditBlog from '../views/EditBlog.vue'
import UsersView from '../views/UsersView.vue'
 


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta:{
      title : "Home"
    }
  }, {
    path: '/UsersView',
    name: 'UsersView',
    component: UsersView,
    meta:{
      title : "UsersView"
    }
  }, 
  {
    path: '/RegisterView',
    name: 'RegisterView',
    component: RegisterView,
     meta:{
      title : "RegisterView"
    }
  },  
  {
    path: '/blogsView',
    name: 'BlogsView',
    component: BlogsView,
     meta:{
      title : "BlogsView"
    }
  },  {
    path: '/PostPreview',
    name: 'BlogPreview',
    component: BlogPreview,
     meta:{
      title : "BlogPreview"
    }
  }, {
    path: '/view-blog/:blogId',
    name: 'ViewBlog',
    component: ViewBlog,
     meta:{
      title : "ViewBlog"
    }
  }, 

  
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword,
     meta:{
      title : "ForgetPassword"
    }
  },  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost,
     meta:{
      title : "CreatePost"
    }
    
  }, {
    path: '/EditBlog',
    name: 'EditBlog',
    component: EditBlog,
     meta:{
      title : "EditBlog"
    }
    
  },
    {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword,
     meta:{
      title : "ForgetPassword"
    }
  },    {
    path: '/waitView',
    name: 'waitView',
    component: waitView,
     meta:{
      title : "waitView"
    }
  },  
  {
    path: '/profileView',
    name: 'ProfileView',
    component: ProfileView,
     meta:{
      title : "ProfileView"
    }
  },  
  {
    path: '/adminView',
    name: 'AdminView',
    component: AdminView,
     meta:{
      title : "AdminView"
    }
  },  
  {
    path: '/loginView',
    name: 'LoginView',
    component: LoginView,
     meta:{
      title : "LoginView"
    }
  }, 
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
  });
export default router
