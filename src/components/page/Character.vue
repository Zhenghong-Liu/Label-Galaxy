<template>
	<div class="">
		<div class="textarea-container">
			<textarea class="form-control custom-textarea" v-model="message" placeholder="请在此输入的文本"></textarea>
		</div>

		<MarkDown :markdown="result" v-if="show"></MarkDown>
	</div>
</template>

<script>
	import MarkDown from '../pagedata/baiduAPI/MarkDown'

	export default {
		name: "Character",
		data() {
			return {
				message: "",
				result: ""
			}
		},
		components: {
			MarkDown,
		},
		computed:{
			show(){
				return this.message.length > 0
			}
		},
		watch:{
			message : function(newValue, oldValue){
				this.result = newValue
			}
		}
	}
</script>

<style scoped>
	@font-face { 
		font-family: "calligraphy";
		/*src: url(../assets/font/chinese/chinese.font.ttf);*/
		src: url(../../assets/font/almm/AlimamaDongFangDaKai-Regular.ttf);
		/*src: url(../assets/font/pRAV9S9rN78N/cbpO6bHD763b.woff2);*/
	}
	
	.textarea-container {
		display: inline;
		position: relative;
	}
	
	.custom-textarea {
		width: 60%;
		height: 150px;
		padding: 10px;
		margin-bottom: 20px;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-sizing: border-box;
		/* Ensure padding does not affect final width */
		font-size: 16px;
		letter-spacing: 2px;
		font-family: "calligraphy";
		resize: none;
		/* Disable resizing of textarea */
	}
	/* Custom styles for focused textarea */
	
	.custom-textarea:focus {
		border-color: #4A90E2;
		box-shadow: 0 0 8px rgba(74, 144, 226, 0.6);
		outline: none;
		/* Remove default browser outline */
	}
	
	.custom-textarea::-webkit-scrollbar{
     width: 3px ;
     height: 3px ;
	}
	.custom-textarea::-webkit-scrollbar-thumb {
	    border-radius: 1px ;
	      -moz-border-radius: 3px ;
	      -webkit-border-radius: 3px ;
	      background-color: #c3c3c3 ;
	}
	.custom-textarea:focus::-webkit-scrollbar-thumb{
		background-color: #8DADF2 ;
	}
	.custom-textarea::-webkit-scrollbar-track {
	    background-color: transparent ;
	}
	
	.button{
		position: absolute;
		
		top: 160px;
		right: 270px;
	}
	
</style>