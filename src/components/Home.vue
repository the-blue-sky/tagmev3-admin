<template>
  <el-container class="home-container">
    <!--   头部   -->
    <el-header>
      <span class="title">电商后台管理系统</span>
      <el-button type="danger" @click="logout" class="exist_btn">退出登录</el-button>
    </el-header>
    <el-container>
      <!--   左边栏   -->
      <el-aside width="200px">
        <!--    router表示开启路由跳转 跳转规则是导航后缀变成:index的值    -->
        <el-menu background-color="#333744" text-color="#fff" unique-opened router>
          <!--     冒号表示用变量 for循环的key必须绑定     -->
          <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
            <template slot="title"><i class="el-icon-message"></i>
              <span>{{ menu.title }}</span>
            </template>
            <!--       index如果相同则会一起选中 key如果相同直接报错     -->
            <el-menu-item :index="item.path" v-for="item in menu.children" :key="item.id">
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--   中部   -->
      <el-main>
        <!--    路由占位符 放在这表示路由中该组件下的所有子组件都在这显示    -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Users from "@/components/user/Users";

export default {
  name: "Home",
  // components: {Users},
  data() {
    return {
      // 如果方法中的返回值需要被template使用 需要先赋值给data数据集 然后返回
      menuList: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login")
      this.$message.success("注销成功")
    },
    async getMenuList() {
      const {data: response} = await this.axios.get("/menu/list");
      if (response.code !== 1) {
        return this.$message.error("获取菜单列表失败")
      } else {
        this.menuList = response.data
      }
      console.log(response)
    }
  }
}
</script>

<style scoped>

.el-header {
  background-color: #373D41;
  display: flex;
  /*justify-content: end;*/
  /*padding-left: 0;*/
  align-items: center;
  font-size: 25px;
  color: #ffffff;
}

.el-aside {
  background-color: #333744;
}

.el-menu {
  border-right: 0;
}


.el-main {
  background-color: #EAEDF1;
}

.home-container {
  height: 100%;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.exist_btn {
  position: absolute;
  right: 2%;
}

.template {
  color: #ffffff;
}

</style>
