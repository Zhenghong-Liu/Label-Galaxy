import Vue from 'vue'
import Router from 'vue-router'
import CuteButton from '@/components/CuteButton'
import CardLayout from '@/components/CardLayout'
import StarLabel from '@/components/page/StarLabel'
import Customize from '@/components/page/Customize'
import FitsReader from '@/components/page/FitsReader'
import Error from '@/components/404'


Vue.use(Router)

export default new Router({
//	mode:'history',
  routes: [
  	{
  		path:'/',
  		redirect:'/login',
  	},
  	{
      path: '/login',
      name: 'CuteButton',
      component: CuteButton
   	},
    {
      path: '/main',
      name: 'CardLayout', 
      component: CardLayout
    },
    {
    	path: '/starlabel',
    	name: StarLabel,
    	component: StarLabel
    },
    {
    	path: '/customize',
    	name: Customize,
    	component: Customize
    },
    {
    	path: '/fitsreader',
    	name: FitsReader,
    	component: FitsReader
    },
    {
    	path: '*',
    	name: Error,
    	component: Error
    }
    
  ]
})
