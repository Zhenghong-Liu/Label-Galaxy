<template>
	<div class="chart_wrapper">
		<div class="full">
			<div class="upper" style="width: 80%;height: 80%;">
				<div id="main" style="width: 80%;height: 100%;"></div>
				<div class="button_area">
					<button type="button" @click="LoadUnknownData">待定数据</button>
					<button type="button" @click="LoadBasicData">参考数据</button>
					<button type="button" @click="GenerateNewPeak">高斯生成</button>
				</div>
			</div>
			
			<div class="bottom">
				<div v-for="(gaussian, index) in gaussians.series" :key="index" class="gaussian-controls">
			      <GaussianControl :gaussian="gaussian" @updateGaussian="updateGaussian(index, $event)" @deleteGaussian="deleteGaussian(index)"/>
			   </div>
			</div>

		</div>
	</div>

</template>

<script>
	import * as echarts from 'echarts';
	import * as siren from './gaussian'
	import GaussianControl from './GaussianControl.vue';
	import z01 from '../../pagedata/gmm/z=0.1.json'
	import z02 from '../../pagedata/gmm/z=0.2.json'

	export default {
		name: 'GmmLabel',
		components: {
		    GaussianControl,
		},
		data(){
			return{
				gaussians : new siren.Gaussian_series()
			}
		},
		mounted() {
			this.initLineChart();
		},
		methods: {
			LoadUnknownData(){
				siren.displayRandomData(z01)
			},
			LoadBasicData(){
				siren.displayRandomData(z02)
			},
			GenerateNewPeak(){
				siren.recordClickPosition(siren.generateGaussian, this.gaussians)
			},
			updateGaussian(index, gaussian) {
		      this.gaussians.series[index] = gaussian;
		      console.log(this.gaussians)
		      this.updateChart();
		    },
		    deleteGaussian(index) {
		      this.gaussians.delete_element(index);
		      this.updateChart();
		    },
		    updateChart() {
		     	siren.displayGaussian(this.gaussians, this.gaussians.series.length);
		    },
		},
		mounted(){
		}
	};
</script>

<style scoped>
	@font-face { 
		font-family: "calligraphy";
		/*src: url(../assets/font/chinese/chinese.font.ttf);*/
		src: url(../../../assets/font/almm/AlimamaDongFangDaKai-Regular.ttf);
		/*src: url(../assets/font/pRAV9S9rN78N/cbpO6bHD763b.woff2);*/
	}
	.full {
		width: 100vw;
		height: 100vh;
	}
	
	#main {
		width: 100%;
		height: 100%;
	}
	
	button {
		width: 90%;
		height: 30%;
		margin: 20% 0;
		font-size: 20px;
		border: none;
		background-color: #8DADF2;
		box-shadow: 0 0 5px #DCDFE6;
		border-radius: 20px;
		font-family: "calligraphy";
	}
	
	button:hover{
		box-shadow: 0 0 5px #999;
	}
	
	button:active{
		box-shadow: none;
	}
	
	.upper{
		padding: 20px;
		position: relative;
		display: inline-block;
		/*border: 1px solid red;*/
		border-radius: 50px;
		box-shadow: 0 0 20px #DCDFE6;
	}
	
	.button_area{
		position: absolute;
		display: inline-block;
		/*border: 1px solid blue;*/
		width: 12%;
		height: 50%;
		right: 8%;
		/*bottom: 10px;*/
		top: 10%;
	}
	
	.bottom{
		/*border: 1px solid red;*/
		width: 80%;
		margin: 0 auto;
	}
</style>