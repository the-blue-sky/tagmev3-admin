<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片  -->
    <el-card>
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <!--      v-model可以直接把值赋给控件 叫双向绑定      -->
            <el-input placeholder="昵称模糊搜索..." v-model="queryInfo.nickName">
              <el-button slot="append" icon="el-icon-search" @click="searchByNickName"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="addDialogFormVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!--  列表  -->
    <el-table :data="userList" style="width: 100%" stripe border size="medium"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
      <el-table-column type="selection" sortable fixed="left"></el-table-column>
      <el-table-column label="#" type="index" sortable></el-table-column>
      <el-table-column prop="id" label="ID" sortable width="100px"></el-table-column>
      <el-table-column prop="avatar" label="头像"></el-table-column>
      <el-table-column prop="nickName" label="昵称" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="realName" label="真实姓名" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="createAt" label="创建时间" sortable min-width="90px"></el-table-column>
      <el-table-column prop="type" label="类型" sortable :formatter="typeFormatter"></el-table-column>
      <el-table-column prop="active" label="状态" sortable>
        <template slot-scope="scope">
          <el-switch
              :active-value="1" :inactive-value="0" v-model="scope.row.active" @change="handleSwitchChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  对话框  -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible" :close-on-click-modal="false" :rules="addFormRules">
      <el-form :model="addUserInfo">
        <el-form-item label="昵称">
          <el-input v-model="addUserInfo.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserInfo.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号类型">
          <el-select v-model="addUserInfo.type" placeholder="请选择">
            <el-option label="测试账号" value="-1"></el-option>
            <el-option label="管理员" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="会员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editDialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editUserInfo">
        <el-form-item label="头像">
          <el-input v-model="editUserInfo.avatar" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editUserInfo.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="editUserInfo.realName" auto-complete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item label="密码">-->
        <!--          <el-input v-model="editUserInfo.password" auto-complete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="账号类型">
          <el-select v-model="editUserInfo.type" placeholder="请选择">
            <el-option label="测试账号" value="-1"></el-option>
            <el-option label="管理员" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="会员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Users",
  created() {
    this.listUsers()
  },
  data() {
    return {
      queryInfo: {
        nickName: "",
        pageNum: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,

      // dialogTableVisible: false,
      addDialogFormVisible: false,
      editDialogFormVisible: false,

      addUserInfo: {
        nickName: "",
        password: 111111,
        type: "",
      },
      editUserInfo: {
        id: "",
        avatar: "",
        nickName: "",
        realName: "",
        // password: "",
        type: "",
      },

      addFormRules: {
        nickName: [
          {required: true, message: "请输入昵称", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    async listUsers() {
      this.queryInfo.nickName = "";
      const {data: response} = await this.axios.get("/user_account/listuserspage", {
        params: this.queryInfo
      });
      console.log(response.data.records);
      this.userList = response.data.records
      this.total = response.data.total
    },
    async searchByNickName() {
      const {data: response} = await this.axios.get("/user_account/listuserspage", {
        params: this.queryInfo
      });
      console.log(response.data.records);
      this.userList = response.data.records
      this.total = response.data.total
    },
    async handleEdit(row) {
      this.editDialogFormVisible = true
      this.editUserInfo.id = row.id
      this.editUserInfo.nickName = row.nickName
      this.editUserInfo.avatar = row.avatar
      this.editUserInfo.realName = row.realName
      // let str = null;
      // switch (row.type) {
      //   case -1:
      //     str = "测试账号"
      //     break
      //   case 0:
      //     str = "管理员"
      //     break
      //   case 1:
      //     str = "普通用户"
      //     break
      //   case 2:
      //     str = "会员"
      //     break
      //   default:
      //     str = ""
      //     break
      // }
      this.editUserInfo.type = row.type
    },
    async editConfirm() {
      const {data: response} = await this.axios.post("/user_account/updatebyid", this.editUserInfo);
      if (response.code === 1) {
        this.$message.success(response)
        this.editDialogFormVisible = false
        await this.listUsers()
      } else {
        this.$message.error(response)
      }
    },
    async handleSwitchChange(row) {
      const {data: response} = await this.axios.post("/user_account/switch", {
        "userId": row.id,
        "active": row.active,
      });
      if (response.code === 1) {
        this.$message.success(response)
      } else {
        this.$message.error(response)
      }
      await this.listUsers()
    },
    async handleSizeChange(val) {
      this.queryInfo.pageSize = val;
      await this.listUsers()
    },
    async handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
      await this.listUsers()
    },
    async addUser() {
      // post请求直接传对象 用RequestBody接收 大括号括起来的是键值对
      const {data: response} = await this.axios.post("/user_account/add", this.addUserInfo);
      if (response.code === 1) {
        this.$message.success(response)
        this.addDialogFormVisible = false
        await this.listUsers()
      } else {
        this.$message.error(response)
      }
    },
    typeFormatter(row, column) {
      const map = row[column.property];
      let str = null;
      switch (map) {
        case -1:
          str = "测试账号"
          break
        case 0:
          str = "管理员"
          break
        case 1:
          str = "普通用户"
          break
        case 2:
          str = "会员"
          break
        default:
          str = map + ""
          break
      }
      return str;
    }
  }
}
</script>

<style scoped>

/*.el-pagination {*/
/*  position: fixed;*/
/*}*/

</style>
