<template>
	<div class="markdown-content" v-html="renderedMarkdown"></div>
</template>

<script>
	import markdownIt from 'markdown-it'
	import 'markdown-it-highlightjs' // markdown-it插件，用于与highlight.js集成  
	import 'highlight.js/styles/default.css' // 引入highlight.js的默认样式  
	import mathjax from 'markdown-it-mathjax3';

	export default {
		props: {
			markdown: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				renderedMarkdown: ''
			}
		},
		mounted() {
			this.renderMarkdown()
		},
		watch: {
			markdown(newVal) {
				this.renderMarkdown(newVal)
			}
		},
		methods: {
			renderMarkdown(markdownText = this.markdown) {
				const md = markdownIt({
						html: true, // 允许HTML标签  
						linkify: true, // 自动识别链接  
						typographer: true // 启用一些语言替换和格式化的东西  
					})
					.use(require('markdown-it-highlightjs'), {
						// 传递给highlight.js的选项  
						// 例如，你可以在这里指定要加载的语言  
//						languages: ['javascript', 'python']  
					})
				
				md.use(mathjax)

				this.renderedMarkdown = md.render(markdownText)

				// 手动调用highlightBlock来高亮代码块  
				// 这通常是在markdown-it-highlightjs插件内部完成的，但如果你需要更细粒度的控制，可以手动调用  
				// 注意：这通常不是必要的，除非你有特殊需求  
//				 document.querySelectorAll('pre code').forEach((block) => {  
//				   hljs.highlightBlock(block)  
//				 })  
			}
		}
	}
</script>

<style scoped>
	.markdown-content {
		/* 字体样式 */
		font-family: 'Arial', sans-serif;
		font-size: 16px;
		line-height: 1.6;
		/* 颜色 */
		color: aliceblue;
		background-color: #8DADF2;
		/* 布局 */
		padding: 20px;
		margin: 20px 40px 20px 40px;
		border-radius: 20px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		text-align: left;
		/* 其他样式 */
		/* ... */
	}
</style>

<style>
	.markdown-content pre code {
		/*color: powderblue;*/
		background-color: seashell;
		border-radius: 20px;
	}
	
	/* 如果你还想为特定的元素添加样式，比如标题或段落，  
   你可以使用markdown-it生成的HTML结构来编写更具体的CSS选择器。  
   例如，markdown-it通常会将标题渲染为<h1>到<h6>标签。 */
	
	.markdown-content h1,
	.markdown-content h2,
	.markdown-content h3,
	.markdown-content h4,
	.markdown-content h5,
	.markdown-content h6 {
		/* 标题样式 */
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: bold;
		/* ... */
	}
	
	.markdown-content p {
		/* 段落样式 */
		margin-bottom: 15px;
		/* ... */
	}
	/* 更多的样式... */
</style>