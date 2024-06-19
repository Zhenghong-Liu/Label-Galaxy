<template>
  <div class="gaussian-control">
    <label>均值: <input type="range" v-model="mean" @input="updateGaussian" min="0" max="50" step="0.01"/></label>
    <label>方差: <input type="range" v-model="variance" @input="updateGaussian" min="0" max="100" step="1"/></label>
    <label>峰值: <input type="range" v-model="a" @input="updateGaussian" min="0" max="4000" step="10"/></label>
    <button @click="$emit('deleteGaussian')">删除</button>
  </div>
</template>

<script>
export default {
  name: 'GaussianControl',
  props: ['gaussian'],
  data() {
    return {
      mean: this.gaussian.mean ,
      variance: this.gaussian.variance,
      a:this.gaussian.a
    };
  },
  watch: {
    mean(newValue){
    	this.mean = newValue
    },
    variance(newValue){
    	this.variance = newValue
    },
    a(newValue){
    	this.a = newValue
    }
  },
  methods: {
    updateGaussian() {
      this.gaussian.mean = this.mean
      this.gaussian.variance = this.variance
      this.gaussian.a = this.a
      this.$emit('updateGaussian', this.gaussian);
    },
  },
};
</script>

<style scoped>
	@font-face { 
		font-family: "calligraphy";
		/*src: url(../assets/font/chinese/chinese.font.ttf);*/
		src: url(../../../assets/font/almm/AlimamaDongFangDaKai-Regular.ttf);
		/*src: url(../assets/font/pRAV9S9rN78N/cbpO6bHD763b.woff2);*/
	}
	
	.gaussian-control {
	  width: 90%;
	  display: flex;
	  align-items: center;
	  padding: 1%;
	  margin: 1% 5%;
	  box-shadow: 0 0 2px #C3C3C3;
	}
	.gaussian-control label {
	  margin-right: 10%;
	  font-family: "calligraphy";
	}
	
	.gaussian-control label input {
	  display: block;
	}
	
	button{
		width: 6%;
		height: 30px;
		font-size: 18px;
		padding: 5px;
		border: none;
		background-color: #8DADF2;
		box-shadow: 0 0 2px #DCDFE6;
		border-radius: 5px;
		font-family: "calligraphy";
	}
	
	button:hover{
		box-shadow: 0 0 5px black;
	}
	
	button:active{
		box-shadow: none;
	}
	
</style>
