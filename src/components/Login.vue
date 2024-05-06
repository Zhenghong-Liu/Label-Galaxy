<template>
	<div id="">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<h3 class="title">欢迎登陆</h3>
			<el-form-item label="账号" prop="age">
				<el-input class="white-bkg" v-model.number="ruleForm.age"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input class="white-bkg" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="submit-button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button class="white-bkg button" @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	
	export default {
		name: 'Login',
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			return {
				ruleForm: {
					pass: '',
					age: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					age: [{
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$router.push('/main')
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>


<style scoped>
	.demo-ruleForm{
		width: 350px;
		margin: 150px auto;
		/*border: 1px solid #DCDFE6;*/
		padding: 20px 80px 20px 20px;
		border-radius: 5px;
		/*box-shadow: 0 0 30px #DCDFE6;*/
	}
	.title{
		text-align: center;
		padding: 0 0 0 60px;
	}
	.submit-button{
		background-color: #ff8108;
		border: none;
	}
	.white-bkg{
		border: none;
	}
	
	.button{
		background-color: #F4E19C;
	}
	
	.white-bkg :hover{
		border: 1px solid #F4E19C;
	}
	
	.white-bkg :focus{
		border: 1px solid #F4E19C;
	}
	
</style>