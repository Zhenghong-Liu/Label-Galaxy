<template>
	<div id="">
		<div class="frame">
			<lottie :options="{animationData: dataJson, loop: true, }" v-on:animCreated="createLottie" />
		</div>
	</div>
</template>

<script>
	import dataJson from '@/assets/card/标签.json'
	export default {
		name: 'Star',
		data() {
			return {
				dataJson,
				anim: '',
			}
		},
		methods: {
			/**
			 * 创建lottie实例
			 */
			createLottie(anim, index) {
				this.anim = anim
			},
			/**
			 * 停止动画
			 */
			stopLottie() {
				this.anim.stop()
			},
			/**
			 * 播放动画
			 */
			stopLottie() {
				this.anim.play()
			},
			/**
			 * 暂停动画
			 */
			pauseLottie() {
				this.anim.pause()
			},
		}

	}
</script>

<style>

</style>