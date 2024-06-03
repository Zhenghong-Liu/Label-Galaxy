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