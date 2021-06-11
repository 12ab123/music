import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'




Vue.use(VueRouter)

const router =  new VueRouter({
    routes
})




// router.afterEach((to,from)=>{
//     this.$store.commit(isLoading,false)
// })


export default router