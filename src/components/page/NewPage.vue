<template>
  <div id="app">
  	<div class="upper">
		"组件已上传，请等待管理员审核。"
	</div>
    <button ref="button" @click="createParticles" class="particle-button">催一下</button>
    <div v-for="(particle, index) in particles" :key="index" :style="particle.style" class="particle"></div>
  </div>
</template>

<script>
export default {
	name: "NewPage",
  data() {
    return {
      particles: [],
    };
  },
  methods: {
    createParticles() {
      const buttonRect = this.$refs.button.getBoundingClientRect();
      const buttonCenter = {
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2 - 50,
      };

      for (let i = 0; i < 100; i++) { // 创建 20 个粒子
        const size = Math.random() * 10 + 5 + 'px';
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        const destination = {
          left: Math.random() * window.innerWidth + 'px',
          top: Math.random() * window.innerHeight + 'px',
        };
        const particle = {
          style: {
            position: 'absolute',
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '50%',
            left: buttonCenter.x + 'px',
            top: buttonCenter.y + 'px',
            transform: `translate(-50%, -50%)`,
            transition: 'all 2s, opacity 2s',
          },
        };
        this.particles.push(particle);

        // 使用 setTimeout 确保动画能被触发
        setTimeout(() => {
          particle.style.left = destination.left;
          particle.style.top = destination.top;
          particle.style.opacity = 0;
        }, 0);

        setTimeout(() => {
          this.particles.splice(this.particles.indexOf(particle), 1);
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
	@font-face { 
		font-family: "calligraphy";
		/*src: url(../assets/font/chinese/chinese.font.ttf);*/
		src: url(../../assets/font/almm/AlimamaDongFangDaKai-Regular.ttf);
		/*src: url(../assets/font/pRAV9S9rN78N/cbpO6bHD763b.woff2);*/
	}
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  /*display: flex;*/
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.upper{
	font-family: "calligraphy";
	font-size: 30px;
}

.particle-button {
  padding: 10px 20px;
  font-size: 20px;
  z-index: 1;
}

button{
	font-family: "calligraphy";
	margin: 100px;
	position: relative;
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	background-color: #8DADF2;
	outline: none;
	filter: drop-shadow(0 0 4px rgba(0,0,0,0.3));
}

button:active{
	filter:none
}

.particle {
  position: absolute;
  opacity: 1;
}
</style>

























<!--<template>
	<div class="full">
	<div class="">
		{{message}}
	</div>
	<div class="">
		<button id="button" class="button" @click="bumb">push管理员</button>
	</div>
		
	</div>
</template>

<script>
	export default {
		name: "NewPage",
		data() {
			return {
				message: "组件已上传，请等待管理员审核。",
			}
		},
		methods:{
			bumb(){
				for (let i = 0; i<50; i++) {
					let spark = document.createElement('i')
					spark.classList.add('spark')
					
					const randomX = (Math.random() - 0.5) * window.innerWidth;
					const randomY = (Math.random() - 0.5) * window.innerHeight;
					
					spark.style.setProperty('--x', randomX + 'px')
					spark.style.setProperty('--y', randomY + 'px')
					
					const duration = Math.random() * 2 + 0.5
					
					spark.style.animation = 'animate '+ duration+'s ease-out forwards'
					
					const randomSize = Math.random() * 8 + 2
					spark.style.width = randomSize + 'px'
					spark.style.height = randomSize + 'px'
					document.body.appendChild(spark)
					
					
					
					
					setTimeout(function(){
						spark.remove()
					}, 2000);
				}
			}
		}
//		mounted(){
//			let button = document.getElementById('button')
//			button.add
//		}
	}
</script>

<style scoped>
	@font-face { 
		font-family: "calligraphy";
		/*src: url(../assets/font/chinese/chinese.font.ttf);*/
		src: url(../../assets/font/almm/AlimamaDongFangDaKai-Regular.ttf);
		/*src: url(../assets/font/pRAV9S9rN78N/cbpO6bHD763b.woff2);*/
	}
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: "calligraphy";
	}
	.full{
		font-family: "calligraphy";
		font-size: 30px;
		
		display: flex;
		justify-content: center;
		overflow: hidden;
	}
	
	.button{
		font-family: "calligraphy";
		margin: 100px;
		font-size: 20px;
		position: relative;
		padding: 10px 20px;
		border: none;
		border-radius: 10px;
		background-color: #8DADF2;
		outline: none;
		filter: drop-shadow(0 0 4px rgba(0,0,0,0.3));
	}
	
	.spark:nth-child(even){
		background: transparent;
		border: 1px solid #fff;
	}
	
	.spark{
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		pointer-events: none;
		background: #0a87ff;
		z-index: 10;
		/*animation: animate 2s linear forwards;*/
	}
	
	@keyframes animate{
		0%{
			opacity: 1;
			transform: translate(0,0);
		}
		100%{
			opacity: 0;
			transform: translate(var(--x),var(--y));
		}
	}
</style>-->