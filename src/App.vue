<template>
  <div id="app">

    <el-container>
      <el-header>

        <el-menu
                router
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#fff"
                text-color="#000"
                active-text-color="#F8A1EE">
          <el-menu-item index="/home" router style="margin-left: 80px">HOME</el-menu-item>
          <el-menu-item index="/jpAnime" router>JpAnime</el-menu-item>
          <el-menu-item index="/cnAnime" router>CnAnime</el-menu-item>
          <el-menu-item index="/hot" router>HOT</el-menu-item>





          <router-link v-if="loginSession == null" to="/login" style="float: right; margin-right: 100px; outline: none;">

            <v-dropdown :data="menuRegister" @item-click="itemClick">
              <a href="javascript:void(0)" class="ant-dropdown-link ant-dropdown-trigger">

                <el-avatar style="margin-top: 7px; border: 0;"
                           src=""></el-avatar>

              </a>
            </v-dropdown>

          </router-link>

          <router-link v-else to="" style="float: right; margin-right: 100px; outline: none;">

            <v-dropdown :data="menuLogin" @item-click="itemClick">
              <a href="javascript:void(0)" class="ant-dropdown-link ant-dropdown-trigger">

                <el-avatar style="margin-top: 7px; border: 0;"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

              </a>
            </v-dropdown>

          </router-link>








        </el-menu>


      </el-header>



      <el-main>
        <router-view></router-view>
      </el-main>




      <!--<el-footer></el-footer>-->


    </el-container>



  </div>
</template>

<script>
  export default {

    created() {
      axios.defaults.withCredentials = true;
      axios.get("http://localhost:8088/user/getSession").then(res => {
        if (res.data) {
          this.loginSession = res.data;
        } else {
          this.loginSession = null;
        }

      });
    },

    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        loginSession: null,

        menuRegister: [
          {content: '个人信息'},
          {content: '上传作品'},
          {content: '注册/登录'},
        ],
        menuLogin: [
          {content: '个人信息'},
          {content: '上传作品'},
          {content: '退出登录'},
        ],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      itemClick(data) {

        // alert(data);
        if (data.content == '个人信息') {
          this.$router.push({path: '/userInfo'})
        } else if (data.content == '上传作品') {
          this.$router.push({path: '/uploadWorks'})
        } else if (data.content == '注册/登录') {
          this.$router.push({path: '/login'})
        } else if (data.content == '退出登录') {
          axios.post("http://localhost:8088/user/logout").then(res => {
            if (res.status == 200) {
              this.$message.success('成功推出！');
            }

          });
        }


      }
    }
  }
</script>

<style>
  body{
    margin: 0;
  }
</style>
