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

          <router-link to="/login" style="float: right; margin-right: 100px; outline: none;">
            <el-avatar style="margin-top: 7px; border: 0;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  body{
    margin: 0;
  }
</style>
