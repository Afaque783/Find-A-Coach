import {createRouter,createWebHistory} from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import CoachList from './pages/coaches/CoachesList.vue';
import ContactCoach from './pages/requests/ContactCoaches.vue';
import RequestRecieved from './pages/requests/RequestRecieved.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/coaches'},
        {path:'/coaches',component:CoachList},
        {
            path:'/coaches/:id',
            component:CoachDetail,
            props:true,
            children:[
                {path:'contact',component:ContactCoach} // /coaches/afa/contact
            ]
        },
        {path:'/register',component:CoachRegister, meta:{requiresAuth:true}},
        {path:'/requests',component:RequestRecieved,meta:{requiresAuth:true}},
        {path:'/auth', component:UserAuth, meta:{requiresUnauth: true}},
        {path:'/:notFound(.*)',component:NotFound}
    ]
});

router.beforeEach((to,_,next)=>{
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches');
    }else{
        next();
    }
});

export default router;