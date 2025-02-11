<template>
	<div class="game_wrapper">
		<div class="show_wrapper">
			<h2 class="show">分数：{{snake.length}}</h2>
			<div class="show">
				<p class="input_style">行列数： </p>
				<input class="input_style" v-model="gridSize" placeholder="行列数" />
			</div>

			<div class="show">
				<p class="input_style">时间间隔（ms）： </p>
				<input class="input_style" v-model="timeInterval" placeholder="时间间隔" style="width: 160px;" />
			</div>

			<button class="show input_style" @click="reboot">开始</button>
		</div>

		<!-- 游戏网格 -->
		<div class="grid" :style="gridVariables">
			<span v-for="(cell, index) in grid" :key="index" class="cell" :class="{ 'snake-body': isSnake(cell) , 'food' : isFood(cell), 'snake-head': isSnakeHead(cell) }"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Snake",
		data() {
			return {
				gridSize: 10, // 10x10 网格
				snake: [{
					x: 5,
					y: 5
				}], // 蛇的初始位置
				food: [{
					x: 3,
					y: 3
				}],
				direction: 'right', // 初始方向
				last_direction: 'right',
				timeInterval: 500,
			};
		},
		computed: {
			// 计算属性：生成一个 10x10 网格的坐标
			grid() {
				let cells = [];
				for(let y = 0; y < this.gridSize; y++) {
					for(let x = 0; x < this.gridSize; x++) {
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
					'--grid-size': this.gridSize, // 将 gridSize 赋值给 CSS 变量
				};
			},
		},
		methods: {
			isSnake(cell) {
				return this.snake.some(segment => segment.x === cell.x && segment.y === cell.y);
			},
			isSnakeHead(cell) {
				return this.snake[0].x == cell.x && this.snake[0].y == cell.y;
			},
			isFood(cell) {
				return this.food.some(segment => segment.x === cell.x && segment.y === cell.y);
			},
			getRandomIndex() {
				return {
					x: Math.floor(Math.random() * this.gridSize),
					y: Math.floor(Math.random() * this.gridSize)
				};
			},
			randomPoint() {
				let randomPoint = this.getRandomIndex();
				while(this.isSnake(randomPoint)) {
					randomPoint = this.getRandomIndex();
				}
				return randomPoint;
			},
			moveSnake() {
				let head = { ...this.snake[0]
				}; // 复制蛇头
				let head_copy = { ...this.snake[0]
				}; // 复制蛇头
				if(this.direction === 'up') head.y--;
				if(this.direction === 'down') head.y++;
				if(this.direction === 'left') head.x--;
				if(this.direction === 'right') head.x++;

				// 更新last_direction
				this.last_direction = this.direction;

				// 边界检测（防止穿墙）
				if(head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
					alert('你撞墙了，Game Over!');
					clearInterval(this.gameLoop);
					return;
				}

				let tail = this.snake.pop(); // 移除尾部

				if(head.x == this.food[0].x && head.y == this.food[0].y) {
					this.snake.push(tail);
					this.food[0] = this.randomPoint()
				}

				if(this.isSnake(head)) {
					alert('你咬到了自己，Game Over!');
					clearInterval(this.gameLoop);
				}

				this.snake.unshift(head); // 在头部添加新位置

				if(this.snake.length == this.gridSize * this.gridSize) {
					alert('通关啦！！！！');
					clearInterval(this.gameLoop);
				}
			},
			changeDirection(event) {
				const key = event.key;
				if(key === 'ArrowUp' && this.last_direction !== 'down') this.direction = 'up';
				if(key === 'ArrowDown' && this.last_direction !== 'up') this.direction = 'down';
				if(key === 'ArrowLeft' && this.last_direction !== 'right') this.direction = 'left';
				if(key === 'ArrowRight' && this.last_direction !== 'left') this.direction = 'right';
			},
			reboot() {
				window.addEventListener('keydown', this.changeDirection);
				this.gameLoop = setInterval(this.moveSnake, this.timeInterval); // 每 500ms 移动一次

				this.snake[0] = this.getRandomIndex();
				this.food[0] = this.randomPoint();
				if(this.snake[0].x >= this.gridSize * 0.5) {
					this.direction = 'left';
					this.last_direction = 'left';
				}
			}
		},
		mounted() {
			window.addEventListener('keydown', this.changeDirection);
			this.gameLoop = setInterval(this.moveSnake, this.timeInterval); // 每 500ms 移动一次
		},
		created() {
			this.snake[0] = this.getRandomIndex();
			this.food[0] = this.randomPoint();
			if(this.snake[0].x >= this.gridSize * 0.5) {
				this.direction = 'left';
				this.last_direction = 'left';
			}
		},
		beforeDestroy() {
			window.removeEventListener('keydown', this.changeDirection);
			clearInterval(this.gameLoop);
		}
	};
</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--grid-size), 30px);
		grid-template-rows: repeat(var(--grid-size), 30px);
		gap: 2px;
	}
	
	.cell {
		width: 30px;
		height: 30px;
		background-color: lightgray;
	}
	
	.snake-body {
		background-color: green;
	}
	
	.food {
		background-color: slateblue;
	}
	
	.snake-head {
		background-color: red;
	}
	
	.game_wrapper {
		display: flex;
	}
	
	.show {
		font-weight: bold;
		/* text-align: center; */
		/* border: 1px solid red; */
		display: flex;
		margin: 0 0 10px 0;
	}
	
	.show_wrapper {
		width: 400px;
		/* border: 1px solid red; */
		margin: 0 100px 0 0;
	}
	
	.input_style {
		font-weight: bold;
		font-size: 20px;
		display: block;
	}
</style>