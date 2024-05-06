<template>
	<div id="">
		<h1 class="container" @click="back">404</h1>
		<h3 class="expectation">敬请期待 ！！！</h3>
	</div>
</template>

<script>
	export default{
		name: "Error",
		methods:{
			back(){
				this.$router.push('/main')
			}
		}
	}
</script>

<style scoped>
	.container{
		margin: 100px auto;
		/*width: 100px;*/
		font-size: 200px;
		/*box-shadow: 0 0 30px black;*/
	}
	.expectation{
		font-size: 20px;
		color: #99A7AF;
		margin-left: 50px;
	}
</style>