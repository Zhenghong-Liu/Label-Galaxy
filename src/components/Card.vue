<template>
	<div class="frame" @click="router2workspace">
		<component :is="Star" :path="icon"/> <!--加载动态组件-->
		<a class="button" @click="router2workspace">
			<span class="button__text" >{{title}}</span>
		</a>
		
	</div>
</template>

<script>
	export default{
		name:'Card',
		data(){
			return{
				Star : null, //动态地选择组件,
			}
		},
		props : {
			title: {
				type: String,
				required: true,
				default: '星系标注'
			},
			path: {
				type: String,
				required: true,
				default: './icons/Star'
			},
			router: {
				type: String,
				required: true,
				default: "/starlabel"
			}
		},
		created(){
			console.log(this.path)
			import(`${this.path}.vue`).then(module => { //动态地读入组件路径
		       	this.Star = module.default;
		      }).catch(error => {
		        console.error("Component loading failed:", error);
		      });
		},
		methods:{
			router2workspace(){
				this.$router.push(this.router)
			}
		}
	}
</script>

<style scoped>
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	/*@font-face {
	  font-family: "阿里妈妈东方大楷 Regular";font-weight: 400;src: url("//at.alicdn.com/wf/webfont/wQLAq4xKiPzK/OZgd9v5uJAFz.woff2") format("woff2"),
	  url("//at.alicdn.com/wf/webfont/wQLAq4xKiPzK/uISWlh3opdcH.woff") format("woff");
	  font-display: swap;
	}*/
	@font-face { 
		font-family: "calligraphy";
		/*src: url(../assets/font/chinese/chinese.font.ttf);*/
		src: url(../assets/font/almm/AlimamaDongFangDaKai-Regular.ttf);
		/*src: url(../assets/font/pRAV9S9rN78N/cbpO6bHD763b.woff2);*/
	}
	.frame{
		width: 300px;
		height: 400px;
		border: 1px solid #8DADF2;
		border-radius: 20px;
		box-shadow: 0 0 5px #8DADF2;
	}
	.frame:hover{
		/*border: 1px solid #8DADF2;*/
		/*box-shadow: 0 0 5px #42B983;*/
		box-shadow: 0 0 10px #8DADF2;
		
	}
	
	.button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;

            box-sizing: border-box;
            width: 250px;
            height: 40px;

            text-decoration: none;
            border: solid 3px #8DADF2;
            border-radius: 40px;
            background: #8DADF2;
            position: relative;
            box-shadow: 0 0 5px #DCDFE6;
        }
    .button__text{
    	position: relative;
    	font-size: 20px;
        letter-spacing: 10px;
        color: black;
        /*font-family: "阿里妈妈东方大楷 Regular" !important;*/
        font-family: "calligraphy";
    }
    
</style>