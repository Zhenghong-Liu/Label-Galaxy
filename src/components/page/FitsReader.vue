<template>
  <div>
  	<div class="file_wrapper">
  		<input class="file_class" type="file" @change="readFitsFile" />
    	<label class="file_class" for="downsample">Downsampling Factor:</label>
    	<select v-model="downsampleFactor" @change="renderFitsImage">
	      <option value="1">1x</option>
	      <option value="2">2x</option>
	      <option value="4">4x</option>
	      <option value="8">8x</option>
	      <option value="16">16x</option>
	    </select>
  	</div>
    <canvas ref="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fitsData: null,
      downsampleFactor: 1,
    };
  },
  methods: {
    readFitsFile(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        this.parseFITS(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    },
    parseFITS(arrayBuffer) {
      const dataView = new DataView(arrayBuffer);
      const header = this.parseHeader(dataView);
      const { width, height } = this.getDimensionsFromHeader(header);
      const imageData = this.extractImageData(dataView, header, width, height);
      this.fitsData = {
        width,
        height,
        data: imageData,
      };
      this.renderFitsImage();
    },
    parseHeader(dataView) {
      let header = '';
      let offset = 0;
      while (true) {
        const chunk = this.getString(dataView, offset, 80 * 36);
        header += chunk;
        offset += 80 * 36;
        if (chunk.includes('END')) {
          break;
        }
      }
      return header;
    },
    getString(dataView, offset, length) {
      let str = '';
      for (let i = 0; i < length; i++) {
        str += String.fromCharCode(dataView.getUint8(offset + i));
      }
      return str;
    },
    getDimensionsFromHeader(header) {
      const naxis1 = this.getHeaderValue(header, 'NAXIS1');
      const naxis2 = this.getHeaderValue(header, 'NAXIS2');
      return { width: parseInt(naxis1), height: parseInt(naxis2) };
    },
    getHeaderValue(header, keyword) {
      const regex = new RegExp(`${keyword}\\s*=\\s*(\\d+)`);
      const match = header.match(regex);
      return match ? match[1] : null;
    },
    extractImageData(dataView, header, width, height) {
      const headerSize = Math.ceil(header.length / 2880) * 2880; // header size is multiple of 2880 bytes
      const imageData = new Float32Array(width * height);
      let offset = headerSize;
      for (let i = 0; i < imageData.length; i++) {
        imageData[i] = dataView.getFloat32(offset, false); // big-endian
        offset += 4;
      }
      return imageData;
    },
    zscale(data, width, height) {
      const npix = width * height;
      const sortedData = Array.from(data).sort((a, b) => a - b);

      const centerPixel = sortedData[Math.floor(npix / 2)];
      const firstQuartile = sortedData[Math.floor(npix / 4)];
      const thirdQuartile = sortedData[Math.floor((3 * npix) / 4)];

      const z1 = centerPixel - 2.5 * (thirdQuartile - firstQuartile);
      const z2 = centerPixel + 2.5 * (thirdQuartile - firstQuartile);

      return { z1, z2 };
    },
    renderFitsImage() {
      if (!this.fitsData) {
        return;
      }

      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const { width, height, data } = this.fitsData;
      const downsampleFactor = parseInt(this.downsampleFactor);
      const dsWidth = Math.floor(width / downsampleFactor);
      const dsHeight = Math.floor(height / downsampleFactor);
      const imageData = ctx.createImageData(dsWidth, dsHeight);
      const canvasData = imageData.data;
      
      //清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { z1, z2 } = this.zscale(data, width, height);
      const range = z2 - z1;

      for (let y = 0; y < dsHeight; y++) {
        for (let x = 0; x < dsWidth; x++) {
          const pixelIndex = (y * downsampleFactor) * width + (x * downsampleFactor);
          const pixelValue = data[pixelIndex];
          const normalizedPixel = ((pixelValue - z1) / range) * 255;
          const clampedPixel = Math.max(0, Math.min(255, normalizedPixel));
          const index = (y * dsWidth + x) * 4;
//        if (clampedPixel > 0 && clampedPixel < 255) console.log(clampedPixel);
          canvasData[index] = clampedPixel; // Red
          canvasData[index + 1] = clampedPixel; // Green
          canvasData[index + 2] = clampedPixel; // Blue
          canvasData[index + 3] = 255; // Alpha
        }
      }
//	  console.log(imageData)
      ctx.putImageData(imageData, 0, 0);
    },
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
.file_class{
	display: inline-block;
	text-align: center;
	margin: 10px auto;
}
.file_wrapper{
	display: block;
}
</style>






<!--<template>
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
</script>-->