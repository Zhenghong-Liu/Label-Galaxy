<template>
	<div class="">
		<div class="frame">
			<div class="container" v-for="(item,index) in config">
				<Card class="card" :title="item.title" :path="item.path" :router="item.router"></Card>
			</div>
		</div>

		<div>
			<el-upload
		      drag
		      action="#"
		      :show-file-list="false"
		      :on-success="handleUploadSuccess"
		      :on-change="handleUploadChange"
		      :before-upload="beforeUpload"
		    >
		      <i class="el-icon-upload"></i>
		      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		      <div class="el-upload__tip" slot="tip">您可以在此处自由的上传自己的网页组件</div>
		    </el-upload>

			<el-dialog :visible.sync="dialogVisible" title="上传中，请稍后……" @close="resetProgress">
				<div style="text-align: center;">
					<el-progress :percentage="progress" />
				</div>
			</el-dialog>
		</div>
	</div>

</template>

<script>
	import Card from './Card'
	import CardConfig from '@/assets/card/CardConfig.json'
	export default {
		name: "CardLayout",
		components: {
			Card
		},
		data() {
			return {
				config: CardConfig,

				dialogVisible: false,
			      progress: 0,
			      timer: null,
			      loadingTime: 200, // 默认加载时间为30秒
			    upload_file : "GMM标注"
			}
		},
		methods: {
			beforeUpload(file) {
		      // 记录文件名
		      this.upload_file = file.name.replace(/\.[^/.]+$/, "");;
		      // 打开弹窗并启动进度条
		      this.openDialog();
		      // 阻止文件上传
		      return false;
		    },
			handleUploadSuccess(response, file) {
		      // 处理上传成功的逻辑
		      this.upload_file = file.name;
		      console.log(this.upload_file)
		      this.openDialog();
		    },
		    handleUploadChange(file, fileList) {
		      // 处理文件状态变化的逻辑
		      if (file.status === 'success') {
		        this.upload_file = file.name;
		      }
		    },
			openDialog() {
				this.dialogVisible = true;
				this.startProgress();
			},
			closeDialog() {
				this.dialogVisible = false;
				this.resetProgress();
			},
			startProgress() {
				this.progress = 0;
//				根据设定的加载时间计算进度条的更新间隔
				const interval = this.loadingTime;  
				this.timer = setInterval(() => {
					this.progress += Math.round(Math.random() * 10);
					if(this.progress >= 100) {
						clearInterval(this.timer);
						this.dialogVisible = false;
					}
				}, interval);
			},
			resetProgress() {
				clearInterval(this.timer);
				this.progress = 0;
				
				this.config.push(
					{
						"title":this.upload_file,
						"path": "./icons/Variable",
						"router": "/newpage"
					}
				)
			},
		},
	}
</script>

<style scoped>
	.frame {
		/*flex: inherit;*/
	}
	
	.container {
		/*width: ;*/
		display: inline-block;
		/*行内排列*/
		margin-right: 20px;
		margin-bottom: 30px;
	}
	
	.file_class {
		width: 100px;
		height: 100px;
	}
</style>