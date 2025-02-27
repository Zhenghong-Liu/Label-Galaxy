<template>
	<div class="game_wrapper">
		<div class="showBomb_wrapper">
			<div class="showBomb">关卡：{{ level }}</div>
			<div class="showBomb">还剩{{total_bombs}}颗雷</div>
			<div class="showBomb" v-if="pass_game">"恭喜你🎉；通关啦"</div>
		</div>
		
	  <div class="showBomb_wrapper">
	    <h3 class="showBomb">请选择游戏难度：</h3>
	        <input class="input_style" type="radio" value="easy" v-model="difficulty" name="difficulty"/>
	        <p class="showBomb2">简单</p>
	        <input class="input_style" type="radio" value="median" v-model="difficulty" name="difficulty"/>
	        <p class="showBomb2">中等</p>
	        <input class="input_style" type="radio" value="master" v-model="difficulty" name="difficulty"/>
	        <p class="showBomb2">大师</p>
	        <input class="input_style" type="radio" value="ultimate" v-model="difficulty" name="difficulty"/>
	        <p class="showBomb2">终极</p>
	  </div>
		
		<div class="grid-container">
			<div class="grid" :style="gridVariables" @contextmenu.prevent="">
				<span v-for="(cell, index) in cells" :key="index" class="cell" :class="{
            'flaged-cell': isFlag(cell),
            'opened-cell': isOpne(cell),
			'bomb-cell': isBomb(cell),
			'guess-bomb-cell': isGuessBomb(cell),
			'guess-blank-cell': isGuessBlank(cell)
          }" @click="toggleCell(cell)" @contextmenu.prevent="setFalg(cell)"> {{cell.numBombAroud}}</span>
			</div>
			<div class="controls">
				<!-- <p style="font-size: 20px; font-weight: bold;">帮助标注</p> -->
				<p style="font-size: 20px; font-weight: bold;">小红帮我标</p>
				<input class="checkbox" type="checkbox" v-model="isHelpFlag" />
				<button @click="cleanBlanks">小红帮我开</button>
				<button @click="thinkBlocks">小红帮我想</button>
			</div>
		</div>
	</div>
</template>

<script>
import { isReactive } from 'vue';

	export default {
		name: "Bombs",
		data() {
			return {
				gridSize_col: 30, // 默认30列  // 30
				gridSize_row: 16, // 默认16行  // 20
				cells: [],
				total_bombs: 99,  //99 //130
				first_click: true, // 起点
				end: null, // 终点
				level: 1 ,// 当前关卡
				game_over: false,
				pass_game: false,
				isHelpFlag: false,
				ans: new Array(12).fill(-1),
				blank_set: new Set(),
				difficulty: 'master'
			};
		},
		computed: {
			gridVariables() {
				return {
					'--grid-size-col': this.gridSize_col, // 动态设定列数
					'--grid-size-row': this.gridSize_row // 动态设定行数
				};
			},
			caculatedNum() {
				let count = 0;
				for (let cell of this.cells){
					count += this.isGuessBomb(cell) + this.isGuessBlank(cell)
				}
				
				return count;
			}
		},
		watch: {
			difficulty(newVal, oldVal) {
				let memo = {
					"easy": [9, 9, 10],
					"median": [16, 16, 40],
					"master": [16, 30, 99],
					"ultimate": [20, 30, 130]
				}
				let memo_num = memo[newVal];
				this.gridSize_row = memo_num[0]
				this.gridSize_col = memo_num[1]
				this.total_bombs = memo_num[2]
				
				this.prepare();
				this.generateBombs();
				this.caculateAround();
				this.bombs_for_check_pass = this.total_bombs;
				this.ans = new Array(12).fill(-1);
				this.first_click = true;
				this.pass_game = false;
				this.game_over = false;
				
			}
		},
		methods: {
			prepare(){
				this.cells = [];
				let isOpen = false;
				let isFlag = false;
				let isBomb = false;
				let numBombAroud = -1;
				for (let x = 0; x < this.gridSize_row; x++) {
					for (let y = 0; y < this.gridSize_col; y++) {
						this.cells.push({
							x,
							y,
							isOpen,
							isFlag,
							isBomb,
							numBombAroud
						});
					}
				}
			},
			isOpne(cell) {
				// return true;
				return cell.isOpen;
			},
			isFlag(cell) {
				return cell.isFlag;
			},
			isBomb(cell) {
				return cell.isBomb && this.game_over && !cell.isFlag;
			},
			isGuessBomb(cell){
				return this.ans[cell.x * this.gridSize_col + cell.y] === 1 && !cell.isFlag && !cell.isOpen;
			},
			isGuessBlank(cell){
				return this.ans[cell.x * this.gridSize_col + cell.y] === 0 && !cell.isFlag && !cell.isOpen;
			},
			toggleCell(cell, deep = 0) {
				// console.log(deep)
				// 检查第一次的点击
				if (this.first_click && cell.isBomb) {
					let idx = cell.x * this.gridSize_col + cell.y;
					while (this.cells[idx].isBomb) {
						this.prepare();
						this.generateBombs();
						this.caculateAround();
					}
					cell = this.cells[idx];
				} 
				
				// 踩到雷雷
				if (cell.isBomb && ! cell.isFlag) {
					alert("game Over !!!");
					this.game_over = true;
				}
				
				
				if (cell.isFlag) {
					cell.isFlag = false;
					this.total_bombs += 1;
					return;
				}
				if (cell.isOpen){
					// return;
					let item = cell.x * this.gridSize_col + cell.y;
					let neightbor_list = this.getNeighbor(item);
					let flaged = 0;
					for (let neightbor of neightbor_list) {
						flaged += this.cells[neightbor].isFlag;
					}
					if (flaged == cell.numBombAroud) {
						for (let neightbor of neightbor_list) {
							if (! this.cells[neightbor].isFlag && ! this.cells[neightbor].isOpen)
								this.toggleCell(this.cells[neightbor], deep + 1)
							// not_opened += ! this.cells[neightbor].isOpen;
						}
					}
				}else {
					cell.isOpen = true;
					let item = cell.x * this.gridSize_col + cell.y;
					let neightbor_list = this.getNeighbor(item);
					for (let neightbor of neightbor_list) {
						if (this.cells[neightbor].numBombAroud == "" || cell.numBombAroud == "") {
							this.toggleCell(this.cells[neightbor], deep + 1);
						}
					}
					
					
				}
				this.first_click = false;
				if (deep === 0) {
					this.findBombBlanks((cell) => {cell.isFlag=true;});
					this.checkPass();
				}
				
			},
			checkPass(){
				let num = 0;
				for (let i=0; i < this.cells.length; i++){
					// num += this.cells.isFlag;
					num += this.cells[i].isOpen;
				}
				// console.log(num, this.cells.length - this.total_bombs)
				if (num === this.cells.length - this.bombs_for_check_pass) {
					this.pass_game = true;
				}
			},
			setFalg(cell) {
				if (cell.isOpen)
					return;
				
				if (! cell.isFlag) {
					cell.isFlag = true;
					this.total_bombs -= 1;
				}else{
					cell.isFlag = false;
					this.total_bombs += 1;
				}
			},
			generateUniqueRandomNumbers(count, min, max) {
			    const numbers = new Set();
			    while (numbers.size < count) {
			        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			        numbers.add(randomNumber);
			    }
			    return Array.from(numbers);
			},
			generateBombs() {
				// console.log(this.cells)
				let bomb_array = this.generateUniqueRandomNumbers(this.total_bombs, 0, this.gridSize_col * this.gridSize_row);
				let x = 0;
				let y = 0;
				// console.log(bomb_array.length);
				for (let item of bomb_array) {
					y = item % this.gridSize_col;
					x =  Math.floor( item / this.gridSize_col);
					this.cells[item].numBombAroud = "雷";
					this.cells[item].isBomb = true;
				}
			},
			get2idx(item) {
				return {
					x: Math.floor(item / this.gridSize_col),
					y: item % this.gridSize_col
				};
			},
			getItemIndex(x, y) {
				return x * this.gridSize_col + y;
			},
			getNeighbor(item) {
				const neighbor_list = [];
				let idx2dim = this.get2idx(item);
				for (let i = -1; i < 2; i++) {
					for (let j = -1; j < 2; j++) {
						let newX = idx2dim.x + i;
						let newY = idx2dim.y + j;
						if (newX < 0 || newX >= this.gridSize_row)
							continue
						if (newY < 0 || newY >= this.gridSize_col)
							continue
						
						let idx1dim = this.getItemIndex(newX, newY);
						neighbor_list.push(idx1dim);
					}
				}
				return neighbor_list;
			},
			caculateAround(){
				const total_length = this.gridSize_col * this.gridSize_row;
				
				for (let item=0; item < total_length; item++) {
					let num_bomb = 0;
					if (this.cells[item].isBomb){
						continue; 
					}
					
					let neighbor_list = this.getNeighbor(item);
					// break;
					for (let neightbor of neighbor_list) {
						num_bomb += this.cells[neightbor].isBomb;
					}
					this.cells[item].numBombAroud = num_bomb != 0 ? num_bomb : "";
				}
			},
			findBombBlanks(call_back) {
				
				const total_length = this.gridSize_col * this.gridSize_row;
				
				for (let item=0; item < total_length; item++) {
					let blank_num = 0;
					if (! this.cells[item].isOpen){
						continue; 
					}
					
					let neightbor_list = this.getNeighbor(item);
					
					for (let neightbor of neightbor_list) {
						blank_num += ! this.cells[neightbor].isOpen;
					}
					if (blank_num === this.cells[item].numBombAroud && this.isHelpFlag) {
						for (let neightbor of neightbor_list) {
							if (this.cells[neightbor].isOpen)
								continue
							if (! this.cells[neightbor].isFlag)
								this.total_bombs -= 1;
							// this.cells[neightbor].isFlag = true;
							call_back(this.cells[neightbor]);
							
						}
					}
				}
				
			},
			cleanBlanks() {
				
				const total_length = this.gridSize_col * this.gridSize_row;
				
				for (let item=0; item < total_length; item++) {
					let blank_num = 0;
					if (! this.cells[item].isOpen){
						continue; 
					}
					
					let neightbor_list = this.getNeighbor(item);
					
					for (let neightbor of neightbor_list) {
						blank_num += this.cells[neightbor].isFlag;
					}
					if (blank_num === this.cells[item].numBombAroud) {
						for (let neightbor of neightbor_list) {
							if (this.cells[neightbor].isOpen)
								continue
							if (! this.cells[neightbor].isFlag)
								// this.cells[neightbor].isOpen = true;
								this.toggleCell(this.cells[neightbor])
							
						}
					}
				}
				
			},
			findBlanks() {
				
				const total_length = this.gridSize_col * this.gridSize_row;
				
				for (let item=0; item < total_length; item++) {
					let open_num = 0;
					let flag_num = 0;
					if (! this.cells[item].isOpen){
						continue; 
					}
					
					let neightbor_list = this.getNeighbor(item);
					
					for (let neightbor of neightbor_list) {
						open_num += ! this.cells[neightbor].isOpen;
						flag_num += this.cells[neightbor].isFlag;
					}
					if (open_num === this.cells[item].numBombAroud) {
						for (let neightbor of neightbor_list) {
							if (this.cells[neightbor].isOpen)
								continue
							if (! this.cells[neightbor].isFlag)
								this.total_bombs -= 1;
							// this.cells[neightbor].isFlag = true;
							// call_back(this.cells[neightbor]);
							this.ans[neightbor] = 1;
							
						}
					}
					if (flag_num === this.cells[item].numBombAroud) {
						for (let neightbor of neightbor_list) {
							if (this.cells[neightbor].isOpen)
								continue
							if (! this.cells[neightbor].isFlag)
								// this.cells[neightbor].isOpen = true;
								// this.toggleCell(this.cells[neightbor])
								this.ans[neightbor] = 0;
							
						}
					}
				}
				
			},
			thinkBlocks(){				
				let n = this.gridSize_col * this.gridSize_row;
				this.dfn = new Array(2 * n).fill(0);
				this.low = new Array(2 * n).fill(0);
				this.scc = new Array(2 * n).fill(0);
				this.ans = new Array(n).fill(0);
				this.stack = [];
				this.instack = new Array(2 * n).fill(false);
				this.graph = Array.from({length: 2 * n}, () => []);
				this.timestamp = 0;
				this.scc_cnt = 0;
				
				this.build_map(); // 建图；
				
				for (let i = 0; i < 2*n; i++){
					if (this.dfn[i] === 0){
						this.tarjan(i);
					}
				}
				console.log(this.scc)
				// 检查是否存在矛盾
				for (let i=0; i< n; i++) {
					if (this.scc[i] === this.scc[i+n]) {
						this.ans[i] = -1;
					}
				}
				
				for (let i=0; i<n; i++) {
					if (this.ans[i] === -1) continue;
					this.ans[i] = this.scc[i] > this.scc[i+n] ? 1 : 0;
				}
				console.log(this.ans);
				// console.log(this.blank_set);
				// this.floedWarshall();
				
				// for (let i=0; i < n; i++){
				// 	if (this.reachable[i][i+n] || this.reachable[i+n][i]) {
				// 		continue;
				// 	}
				// 	this.ans[i] = -1;
				// }
				
				for (let i=0; i<n; i++){
					if (this.blank_set.has(i)){
						let visited = new Array(2 * n).fill(false);
						// if (this.ans[i] === 1){
						// 	console.log("this is me");
						// 	console.log(this.dfs(i, i+n, visited));
						// 	// console.log(this.isReachable(i+n, i, 0));							
						// }
						// if (this.ans[i] === 0){
						// 	console.log("this is not me");
						// 	console.log(this.dfs(i+n, i, visited));							
						// 	// console.log(this.isReachable(i, i+n, 0));
						// }
						if (this.ans[i] === 1 && this.dfs(i, i+n, visited)) {
							continue;
						} else if (this.ans[i] === 0 && this.dfs(i+n, i, visited)) {
							continue;
						}
						
					}
					this.ans[i] = -1;
					
				}
				
				// 查一下有没有捡漏的。
				this.findBlanks();
				
				alert("我🧐算完啦，算出来"+this.caculatedNum+"个方格。");
				// console.log(this.ans);
			},
			build_map(){
				const total_length = this.gridSize_col * this.gridSize_row;
				this.blank_set = new Set();
				for (let item=0; item < total_length; item++) {
					let blank_num = 0;
					let flag_num = 0;
					if (! this.cells[item].isOpen){
						continue; 
					}
					
					let neightbor_list = this.getNeighbor(item);
					const blank_list = [];
					
					for (let neightbor of neightbor_list) {
						if (!this.cells[neightbor].isFlag && !this.cells[neightbor].isOpen) {
							blank_list.push(neightbor);
							this.blank_set.add(neightbor);
						}
						flag_num += this.cells[neightbor].isFlag;
					}
					blank_num = blank_list.length;  // 计算这个长度。
					// console.log(blank_list);
					if (this.cells[item].numBombAroud - flag_num === 1) {
						for (let guess_true_cell of blank_list) {
							for (let other_cell of blank_list) {
								if (guess_true_cell === other_cell)
									continue
								this.graph[guess_true_cell + total_length].push(other_cell);
							}
						}
					}
					if (blank_num - this.cells[item].numBombAroud + flag_num === 1) {
						for (let guess_false_cell of blank_list) {
							for (let other_cell of blank_list) {
								if (guess_false_cell === other_cell)
									continue
								this.graph[guess_false_cell].push(other_cell + total_length);
							}
						}
					}
				}
			},
			tarjan(x){
				this.dfn[x] = this.low[x] = ++this.timestamp;
				this.stack.push(x);
				this.instack[x] = true;
				
				for (const neighbor of this.graph[x]) {
					if (this.dfn[neighbor] === 0){
						this.tarjan(neighbor);
						this.low[x] = Math.min(this.low[x], this.low[neighbor]);
					} else if (this.instack[neighbor]) {
						this.low[x] = Math.min(this.low[x], this.dfn[neighbor]);
					}
				}
				
				if (this.dfn[x] === this.low[x]) {
					this.scc_cnt++;
					while (true) {
						const  y = this.stack.pop();
						this.instack[y] = false;
						this.scc[y] = this.scc_cnt;
						if (y === x) break;
					}
				}
			},
			floedWarshall() {
				let n = this.gridSize_col * this.gridSize_row;
				//构造可达矩阵
				this.reachable = Array.from({length: 2 * n}, () => Array(2 * n).fill(0));
				
				for (let i = 0; i < 2 * n; i++) {
					for (let j of this.graph[i]) {
						this.reachable[i][j] = 1;
					}
				}
				
				//Floed-Warshall
				for (let k=0; k < 2* n; k++) {
					for (let i=0; i < 2*n; i++){
						for (let j=0; j < 2*n; j++){
							this.reachable[i][j] |= this.reachable[i][k] & this.reachable[k][j];
						}
					}
				}
				
			},
			isReachable(start, end, deep=0) {
				if (deep == 20)
					return false
				for (let neighbor of this.graph[start]) {
					if (neighbor === end)
						return true;
					this.isReachable(neighbor, end, deep+1);
				}
				return false;
			},
			dfs(start, end, visited) {
			    if (start === end) return true;
			    visited[start] = true;
			    for (let neighbor of this.graph[start]) {
			        if (!visited[neighbor]) {
			            if (this.dfs(neighbor, end, visited)) return true;
			        }
			    }
			    return false;
			},
			hasPath() {
				alert("hello world");
			}


		},
		beforeMount() {
			window.addEventListener('keydown', (e)=> {if (e.key === 's') {this.game_over=true;}});
			window.addEventListener('keyup', ()=> {this.game_over=false;});
			this.prepare();
			this.generateBombs();
			this.caculateAround();
			this.bombs_for_check_pass = this.total_bombs;
			
		}
	};
</script>

<style scoped>
	
	.game_wrapper{
		display: block;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--grid-size-col), 30px);
		grid-template-rows: repeat(var(--grid-size-row), 30px);
		gap: 2px;
	}
	
	.showBomb_wrapper{
		display: flex;
		width: 1000px;
		height: 30px;
		/*border: 1px solid red;*/
		margin: 10px 0;
	}
	
	.showBomb {
		font-size: 20px;
		font-weight: bold;
		margin: 0 100px 0 16px;
		position: relative;
	}
	
	.showBomb2 {
		font-size: 20px;
		font-weight: bold;
		margin: 0 16px 0 0;
	}
	
	.showBomb::before {
		position: absolute;
		background-color: lightseagreen;
		width: 5px;
		height: 20px;
		content: "";
		left: -15px;
		top: 5px;
		border-radius: 3px;
	}

	.cell {
		width: 30px;
		height: 30px;
		background-color: lightgray;
		cursor: pointer;
		font-size: 0;
		/* display: none; */
	}

	.opened-cell {
		background-color: white;
		border: 1px solid lightgray;
		font-size: 20px;
		text-align: center;
		font-weight: bold;
	}
	
	/* .opened-cell::before {
		position: absolute;
		content: "雷";
		text-align: center;
		left: -1px;
		top: -1px;
		width: 30px;
		height: 30px;
		font-size: 20px;
	} */

	.flaged-cell {
		background-color: red;
	}

	.bomb-cell {
		background-color: lightblue;
		/* background-color: white; */
		border: 1px solid lightgray;
		font-size: 20px;
		text-align: center;
		font-weight: bold;
	}
	
	.guess-bomb-cell {
		background-color: blue;
	}
	
	.guess-blank-cell {
		background-color: green;
	}

	.controls {
		margin-top: 20px;
		text-align: center;
		display: flex;
		width: 1000px;
	}
	
	.checkbox{
		/* border: 10px solid red; */
		display: block;
		width: 25px;
		transition: all 3s ease;
		margin: 0px 50px 0px 10px;
	}

	button {
		padding: 10px;
		cursor: pointer;
		font-size: 16px;
		margin: 0px 50px 0px 0px;
	}
	
	.input_style {
		font-weight: bold;
		font-size: 20px;
		display: block;
	}
</style>