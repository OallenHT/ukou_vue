<template>

    <div>
        <el-row :gutter="24" style="overflow-y: hidden">
            <el-col :span="8" :offset="8">
                <div>
                    <el-form style="width: 800px; margin-top: 150px; line-height: 1" :label-position="labelPosition" :rules="loginRules" label-width="100px" :model="loginForm" ref="loginForm">
                        <el-form-item style="margin-left: 125px">
                            <h2>登录</h2>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" style="width: 400px;">
                            <el-input v-model="loginForm.email" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" style="width: 400px">
                            <el-input show-password v-model="loginForm.password" clearable></el-input>
                        </el-form-item>

                        <el-form-item style="margin-top:-10px;margin-bottom:-5px;" >
                            <el-checkbox v-model="checked" style="color:#a0a0a0;margin-top:-10px;">记住密码</el-checkbox>
                        </el-form-item>

                        <el-form-item style="margin-left: 70px">
                            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                            <el-button type="primary" @click="drawer = true">注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

        </el-row>


        <el-drawer
                title="注 册"
                :before-close="handleClose"
                :visible.sync="drawer"
                direction="rtl"
                custom-class="demo-drawer"
                ref="drawer">

            <div class="drawer_content">
                <el-form :model="registerForm" :rules="registerRules" style="margin-left: 85px;">
                    <el-form-item label="昵称" prop="name" style="width: 400px;">
                        <el-input v-model="registerForm.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" style="width: 400px;">
                        <el-input v-model="registerForm.email" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="width: 400px">
                        <el-input show-password v-model="registerForm.password" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword" style="width: 400px">
                        <el-input show-password v-model="registerForm.checkPassword" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div class="drawer_footer" style="margin-left: 85px;">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '注 册' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>

</template>


<script>

    import qs from 'qs'


    export default {
        name: "Login",

        created() {
            axios.defaults.withCredentials = true;
            axios.get("http://localhost:8088/user/getSession").then(res => {
                this.loginSession = res.data;
            });
        },

        mounted() {
            this.getCookie();
        },

        data() {
            // 手机号验证
            /*var checkPhone = (rule, value, callback) => {
                const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
                if (!value) {
                    return callback(new Error('电话号码不能为空'))
                }
                setTimeout(() => {

                    if (!Number.isInteger(+value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        if (phoneReg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('电话号码格式不正确'))
                        }
                    }
                }, 100)
            };*/


            var checkNameUnique = (rule, value, callback) => {
                axios.get("http://localhost:8088/user/checkName?name=" + value).then(res => {

                    console.log(res);
                    if (res.data) {
                        return callback(new Error('昵称已存在'))
                    }
                })
            };

            var checkEmailUnique = (rule, value, callback) => {
                axios.get("http://localhost:8088/user/checkEmail?email=" + value).then(res => {
                    if (res.data) {
                        return callback(new Error('邮箱已存在'))
                    }
                })
            };


            var checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            };

            var checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                labelPosition: 'right',
                checked: true,
                loginSession: null,
                loginForm: {
                    email: '',
                    password: ''
                },

                loginRules: {
                    email: [
                        { required: true, validator: checkEmail, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },

                registerRules: {
                    name: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' },
                        { required: true, validator: checkNameUnique, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: checkEmail, trigger: 'blur' },
                        { required: true, validator: checkEmailUnique, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                    checkPassword: [
                        {required: true, validator: checkPassword, trigger: 'blur' }
                    ],
                },

                drawer: false,
                loading: false,

                registerForm: {
                    name: '',
                    email: '',
                    password: '',
                    checkPassword: ''
                },
                formLabelWidth: '80px',
                timer: null,
            };
        },

        methods: {
            //验证码
            checkCaptcha() {

                const self = this;
                let captcha = new TencentCaptcha('1302384151', (rsp) => {
                    console.log(rsp);
                    if (rsp.ret === 0) {
                        //当ret是0得时候代表成功填写了验证码，我在里面进行了axios操作。
                        axios.post("http://localhost:8088/user/login", qs.stringify(this.loginForm)).then(res=>{

                            console.log('res=>',res);
                            if (res.data) {
                                self.$message.success('登录成功！');

                                if (self.checked == true) {
                                    // console.log("checked == true");
                                    //传入账号名，密码，和保存天数3个参数
                                    self.setCookie(self.loginForm.email, self.loginForm.password, 7);
                                } else {
                                    // console.log("清空Cookie");
                                    //清空Cookie
                                    self.clearCookie();
                                }
                            } else {
                                this.$message.error('用户名或密码不正确');
                            }
                        });
                    } else {
                        this.$message({
                            message: '验证不通过',
                            type: 'warning'
                        })
                    }
                }, {});
                captcha.show();
            },


            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');
                        this.checkCaptcha();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /*resetForm(formName) {
                this.$refs[formName].resetFields();
            }*/

            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要提交表单吗？')
                    .then(_ => {
                        this.loading = true;
                        this.timer = setTimeout(() => {
                            done();

                            //提交表单
                            axios.post("http://localhost:8088/user/addUser", qs.stringify(this.registerForm)).then(res=>{

                                console.log('res=>',res);
                                if (res.data == 1) {
                                    this.$message({
                                        message: '注册成功！',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message.error('注册失败...');
                                }
                            });

                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 2000);
                    })
                    .catch(_ => {});
            },
            cancelForm() {
                this.loading = false;
                this.drawer = false;
                clearTimeout(this.timer);
            },



            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie =
                    "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie =
                    "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },

            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split("="); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == "userName") {
                            this.loginForm.email = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == "userPwd") {
                            this.loginForm.password = arr2[1];
                        }
                    }
                }
            },

            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            },

        }
    }
</script>

<style scoped>

</style>