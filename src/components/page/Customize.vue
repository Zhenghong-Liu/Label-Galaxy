<template>
	<div class="">
		<!--这里是自定义页面-->
		<p class="token">total token : {{token}}</p>
		<div class="textarea-container">
			<textarea class="form-control custom-textarea" v-model="message"></textarea>
		</div>

		<!--<button @click="hhh">发送</button>-->
		<el-button type="success" class="button" @click="UpdateFromAPI" :loading="loading">发送</el-button>
		<MarkDown :markdown="result"></MarkDown>
	</div>
</template>

<script>
	import { baidu } from '../pagedata/baiduAPI/baiduApi'
	import MarkDown from '../pagedata/baiduAPI/MarkDown'

	//	const baidu = require('../pagedata/baiduAPI/baiduApi');
	export default {
		name: "Customize",
		data() {
			return {
				message: "请帮我写一份使用AstroQuery的Vizier检索I/345/gaia2星表里M3附近3角分范围内，亮于19等的天体。",
				token: 0,
				result: "要使用`astroquery`的`Vizier`服务来检索`I/345/gaia2`星表中M3（三角座星系团）附近3角分范围内，亮于19等的天体，你需要遵循以下步骤：\n\n首先，你需要安装`astroquery`（如果还没有安装的话）：\n\n```bash\npip install astroquery\n```\n\n然后，你可以使用以下Python脚本来完成检索：\n\n```python\nfrom astropy import units as u\nfrom astropy.coordinates import SkyCoord\nfrom astroquery.vizier import Vizier\n\n# M3的中心坐标（这里使用示例坐标，你可能需要查找准确的坐标）\nm3_center = SkyCoord(ra=15.8088*u.degree, dec=+34.0222*u.degree, frame='icrs')\n\n# 搜索半径为3角分\nsearch_radius = 0.05 * u.degree  # 3角分转换为度\n\n# Vizier查询参数\nvizier = Vizier(catalog=\"I/345/gaia2\")\n\n# 设置查询条件：位置、亮度等\nvizier.ROW_LIMIT = -1  # 取消返回的行数限制（如果有的话）\nquery_conditions = {\n    'Vmag': '<19',  # 亮度小于19等\n    'Pos': m3_center.to_string('hmsdms'),  # 转换为hmsdms格式用于查询\n    'SR': search_radius.to(u.arcmin).value  # 搜索半径转换为角分\n}\n\n# 执行查询\nresult_table = vizier.query_region(m3_center, radius=search_radius, **query_conditions)\n\n# 打印结果\nprint(result_table)\n\n# 如果你想要将结果保存到文件，可以使用astropy的Table的write方法\n# result_table.write('m3_gaia2_results.csv', format='csv')\n```\n\n**注意**：\n\n1. 我假设了M3的中心坐标，但在实际应用中，你应该查找并使用正确的坐标。\n2. `Vizier`的`query_region`方法可能不支持直接传递亮度限制作为参数，因此我们在`query_conditions`字典中设置了`Vmag`条件。不过，这取决于`I/345/gaia2`星表是否支持在Vizier查询中直接设置这样的条件。如果不支持，你可能需要在下载数据后，在本地对数据进行筛选。\n3. 我设置了`vizier.ROW_LIMIT = -1`来取消返回的行数限制，但并非所有Vizier服务都支持这个参数。如果不支持，你可能需要处理分页返回的结果。\n4. `SR`参数通常接受角分的值，但具体取决于Vizier服务的实现。如果它不接受角分，你可能需要将其转换为度。\n5. 请确保你的网络连接稳定，因为查询可能会花费一些时间，特别是当没有设置行限制且结果集很大时。",
				loading: false
			}
		},
		components: {
			MarkDown,
		},
		methods: {
			UpdateFromAPI() {
				console.log(this.message)
				this.loading = true
				const context = {
					"messages": [{
						"role": "user",
						"content": this.message
					}],
					"disable_search": false,
					"enable_citation": false
				}
				baidu(context, (result, token) => {
					this.result = result
					this.token += token
					this.loading = false
				})

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
	
	.token{
		position: absolute;
		top: 172px;
		right: 380px;
		color: black;
		font-size: 10px;
		z-index: 3;
	}
</style>
