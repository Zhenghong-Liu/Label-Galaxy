<template>
	<div>
		<input type="file" @change="readFitsFile" />
		<div v-if="fitsData">
			FITS 文件内容: {{ fitsData }}
		</div>
	</div>
</template>

<script>
	import { FITS } from 'fitsjs';

	export default {
		name: "FitsReader",
		data() {
			return {
				fitsData: null,
			};
		},
		methods: {
			readFitsFile(event) {
				const file = event.target.files[0];
				if(!file) {
					return;
				}
				//				var f = FITS.Parser("../pagedata/fitsreader/R0200298T.fits")
				//				console.log(f)
				const reader = new FileReader();
				reader.onload = (e) => {
					const arrayBuffer = e.target.result;
					console.log(arrayBuffer)
					FITS.DataUnit(arrayBuffer).then((fits) => {
						// 处理FITS文件
						this.fitsData = fits.hdus[0].data; // 假设我们只读取第一个HDU的数据
					});
				};
				reader.readAsArrayBuffer(file);
			},
		},
		created() {
			// Define a callback function for when the FITS file is received
			var callback = function() {

				// Get the first header-dataunit containing a dataunit
				var hdu = this.getHDU();

				// Get the first header
				var header = this.getHeader();

				// or we can do
				var header = hdu.header;

				// Read a card from the header
				var bitpix = header.get('BITPIX');

				// Get the dataunit object
				var dataunit = hdu.data;

				// or we can do
				var dataunit = this.getDataUnit();

				// Do some wicked client side processing ...
			}

			// Set path to FITS file
			var url = "../pagedata/fitsreader/R0200298T.fits";

			// Initialize a new FITS File object
			var fits = new FITS(url, callback);
			console.log(fits)
		}
	};
</script>