<template>
	<div class="game_wrapper">
		<div class="show">
		<div >关卡：</div>
		<input class="input_style" v-model="level" />
		</div>
		<!-- 游戏网格 -->
		<div class="grid-container">
			<div class="grid" :style="gridVariables">
				<span v-for="(cell, index) in grid" :key="index" class="cell" :class="{ 'snake-body': isSnake(cell) , 
				'snake-head': isSnakeHead(cell) ,
				'wall': isWall(cell),
				'snake-left': getSnakeDirection(cell) ? getSnakeDirection(cell).left : undefined,
				'snake-right': getSnakeDirection(cell) ? getSnakeDirection(cell).right : undefined,
				'snake-top': getSnakeDirection(cell) ? getSnakeDirection(cell).top : undefined,
				'snake-bottom': getSnakeDirection(cell) ? getSnakeDirection(cell).bottom : undefined,
				}"></span>
			</div>

			<!-- 操作按钮 -->
			<div class="controls">
				<button @click="loadLevel()">重置</button>
				<button @click="changeDirectionTo('up')">上</button>
				<button @click="loadLevel()">跳转</button>
				<button @click="changeDirectionTo('left')">左</button>
				<button @click="changeDirectionTo('down')">下</button>
				<button @click="changeDirectionTo('right')">右</button>
			</div>
		</div>

	</div>
</template>

<script>
	import levels from '@/components/pagedata/oneDraw/data.json'; // ✅ 直接导入 JSON

	export default {
		name: "OneDraw",
		data() {
			return {
				gridSize_col: 9, // 10x10 网格
				gridSize_row: 5,
				snake: [{
					x: 2,
					y: 2
				}], // 蛇的初始位置
				direction: 'right', // 初始方向
				walls: [],
				level: 1 //当前关卡

			};
		},
		computed: {
			// 计算属性：生成一个 10x10 网格的坐标
			grid() {
				let cells = [];
				for(let y = 0; y < this.gridSize_row; y++) {
					for(let x = 0; x < this.gridSize_col; x++) {
						cells.push({
							x,
							y
						});
					}
				}
				return cells;
			},
			gridVariables() {
				return {
					'--grid-size-col': this.gridSize_col, // 将 gridSize 赋值给 CSS 变量
					'--grid-size-row': this.gridSize_row, // 将 gridSize 赋值给 CSS 变量
				};
			},
		},
		watch: {
			level(newValue){
				if (newValue) {
					this.level = parseInt(newValue);	
				}
				
			}
		},
		methods: {
			isSnake(cell) {
				return this.snake.some(segment => segment.x === cell.x && segment.y === cell.y);
			},
			isSnakeHead(cell) {
				return this.snake[0].x == cell.x && this.snake[0].y == cell.y;
			},
			isWall(cell) {
				return this.walls.some(([wx, wy]) => wx === cell.x && wy === cell.y);
			},
			moveSnake() {
				let head = {
					...this.snake[0]
				}; // 复制蛇头
				if(this.direction === 'up') head.y--;
				if(this.direction === 'down') head.y++;
				if(this.direction === 'left') head.x--;
				if(this.direction === 'right') head.x++;

				// 边界检测（防止穿墙）
				if(head.x < 0 || head.x >= this.gridSize_col || head.y < 0 || head.y >= this.gridSize_row) {
					// alert('你撞墙了，Game Over!');
					return;
				}

				if(this.isWall(head)) {
					return
				}

				if(this.isSnake(head)) {
					if(head.x == this.snake[1].x && head.y == this.snake[1].y) {
						this.snake.shift();
					}
					// alert('你咬到了自己，Game Over!');
					return
				}

				this.snake.unshift(head); // 在头部添加新位置

				if(this.snake.length + this.walls.length == this.gridSize_col * this.gridSize_row) {
					alert("通关啦！！！")
					this.level += 1
					this.loadLevel()
				}
			},
			changeDirection(event) {
				const key = event.key;
				if(key === 'ArrowUp') this.direction = 'up';
				if(key === 'ArrowDown') this.direction = 'down';
				if(key === 'ArrowLeft') this.direction = 'left';
				if(key === 'ArrowRight') this.direction = 'right';
				this.moveSnake();
			},
			changeDirectionTo(direction) {
				this.direction = direction;
				this.moveSnake();
			},
			getSnakeDirection(cell) {
				const index = this.snake.findIndex(segment => segment.x === cell.x && segment.y === cell.y);
				if(index === -1) return null; // 不是蛇身

				const prev = this.snake[index - 1];
				const next = this.snake[index + 1];

				return {
					left: prev && prev.x === cell.x - 1 || next && next.x === cell.x - 1,
					right: prev && prev.x === cell.x + 1 || next && next.x === cell.x + 1,
					top: prev && prev.y === cell.y - 1 || next && next.y === cell.y - 1,
					bottom: prev && prev.y === cell.y + 1 || next && next.y === cell.y + 1,
				};
			},
			loadLevel() {
				this.snake = [{
						x: 2,
						y: 2
					}]
				const currentLevel = levels.find(l => l.level === this.level);
				console.log(currentLevel)
				if(currentLevel) {
					this.snake[0] = {
						x: currentLevel.snakeStart[0],
						y: currentLevel.snakeStart[1]
					};
					this.walls = currentLevel.walls;
					
					this.gridSize_row = currentLevel.size[0];
					this.gridSize_col = currentLevel.size[1];
				}else {
					this.level = 1
					this.loadLevel()
				}
			}
		},
		mounted() {
			this.loadLevel();
			window.addEventListener('keydown', this.changeDirection);
		},
		beforeDestroy() {
			window.removeEventListener('keydown', this.changeDirection);
		}
	};
</script>

<style scoped>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--grid-size-col), 30px);
		grid-template-rows: repeat(var(--grid-size-row), 30px);
		gap: 2px;
	}
	
	.cell {
		width: 30px;
		height: 30px;
		background-color: lightgray;
	}
	
	.snake-body {
		background-color: green;
		position: relative;
	}
	
	.snake-body::before,
	.snake-body::after {
		content: "";
		position: absolute;
		background-color: green;
	}
	
	.snake-left::before,
	.snake-left::after {
		width: 2px;
		height: 100%;
		left: -2px;
		top: 0;
	}
	
	.snake-right::before .snake-right::after {
		width: 2px;
		height: 100%;
		right: -2px;
		top: 0;
	}
	
	.snake-top::before {
		width: 100%;
		height: 2px;
		top: -2px;
		left: 0;
	}
	
	.snake-bottom::after {
		width: 100%;
		height: 2px;
		bottom: -2px;
		left: 0;
	}
	
	.snake-head {
		background-color: red;
	}
	
	.wall {
		background-color: black;
	}
	
	.game_wrapper {
		display: block;
	}
	
	.show {
		font-weight: bold;
		font-size: 20px;
		text-align: center;
		margin: 0 0 100px 0;
		display: flex;
	}
	
	.input_style {
		font-weight: bold;
		font-size: 20px;
		display: block;
	}
	
	.controls {
		display: grid;
		grid-template-columns: repeat(3, 60px);
		/* 2行3列，每个按钮宽度60px */
		grid-template-rows: repeat(2, 60px);
		/* 2行布局 */
		gap: 10px;
		margin: 20px 0px 0px 100px;
	}
	
	.grid-container {
		margin:auto 30%;
		/*border: 1px solid red;*/
		display:  flex;
	}
	
	button {
		padding: 10px;
		margin: 0;
		cursor: pointer;
		font-size: 16px;
	}
	
	@media (max-width: 768px) {
		.grid-container {
			flex-direction: column;
			margin: 0px;
		}
		
		.grid {
			margin: 15%;
		}
	}
</style>