<template>
	<div class="frame">
		<div class="container" v-for="(item,index) in config">
			<Card class="card"  :title="item.title" :path="item.path" :router="item.router"></Card>
		</div>
	</div>
</template>

<script>
	import Card from './Card'
	import CardConfig from '@/assets/card/CardConfig.json'
	export default{
		name:"CardLayout",
		components: {
		    Card
		},
		data(){
			return{
				config: CardConfig
			}
		}
	}
</script>

<style scoped>
	.frame{
		/*flex: inherit;*/
	}
	
	.container{
		/*width: ;*/
		display: inline-block; /*行内排列*/
		margin-right: 20px;
		margin-bottom: 30px;		
	}
</style>