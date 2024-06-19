import Vue from 'vue'
import Router from 'vue-router'
import CuteButton from '@/components/CuteButton'
import CardLayout from '@/components/CardLayout'
import StarLabel from '@/components/page/StarLabel'
import Customize from '@/components/page/Customize'
import FitsReader from '@/components/page/FitsReader'
import NewPage from '@/components/page/NewPage'
//import GmmLabel from '@/components/page/GMM'
import GmmLabel from '@/components/page/gmm2/gmm'
import Character from '@/components/page/Character'
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
    	path: '/gmm',
    	name: GmmLabel,
    	component: GmmLabel
    },
    {
    	path: '/character',
    	name: Character,
    	component: Character
    },
    {
    	path: '/newpage',
    	name: NewPage,
    	component: NewPage
    },
    {
    	path: '*',
    	name: Error,
    	component: Error
    }
    
  ]
})
