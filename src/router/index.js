import Vue from 'vue'
import Router from 'vue-router'
import CalcForm from '../components/CalcForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CalcForm',
      component: CalcForm
    }
  ]
})
