<!--
	待办事项：
	诈骗模式
	只做原型，不做功能
	一：Label Galaxy
	1：做一个label galaxy的专业模式，专业模式中包含许多按钮，但是都不管用。按钮一定要多，显得专业。
	2：在简易版中不检测是否提交正确的标注，在专业版中，只要提交，一定弹出一个“请勿随意提交”的弹窗
	3：在演示时，简易版正常标注，专业版随意标注，达到诈骗的目的
	
	二：添加一个上传组件的功能
	1：在主页中添加一个上传主页的输入框，默认提示：“在此自由的上传您的功能组件🙂”
	2：这时候添加一个弹窗，弹窗上给一个100s的进度条。
	3：上传之后在主页上多出一个卡片。
	
	三：添加GMM组件
	1：可实现曲线数据的可视化
	2：实现数据交互功能
	
-->


<template>
	<div class="chart_wrapper">
		<div ref="lineChart" style="width: 600px; height: 400px;"></div>
	</div>
  
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'GmmLabel',
  mounted() {
    this.initLineChart();
  },
  methods: {
    initLineChart() {
      const chartDom = this.$refs.lineChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '折线图示例'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      };
 
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
	.chart_wrapper{
		margin:0px auto;
		width: 600px;
		height: 400px;
		/*border: 1px solid red;*/
	}
</style>