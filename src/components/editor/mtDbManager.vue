<template>
  <div id="mtDbManager">
    <ul id="mtDbManager_ul" v-if="!isShowDbProp">
        <li v-for="(item, i) in editorData.databaseList" :key="i" @click="showDbProp(i)">
          <Card :bordered="false">
            <p slot="title">{{item.type|getTitleByType}}</p>
            <div class="mt_db_content">
              <div class="mt_db_icon">
                <img :src="item.type|getIconByType"/>
              </div>
              <div class="mt_db_remark">
                <p class="mt_db_title">{{item.text}}</p>
                <p class="mt_db_address">{{item.ipAddress}}:{{item.port}}</p>
              </div>
            </div>
          </Card>
        </li>
      <li @click="addDbProp">
        <Card :bordered="false">
          <p slot="title">添加数据源</p>
          <div class="mt_db_content">
            <div class="mt_db_icon">
              <img src="../../assets/dataSourceIcon/dataSource_add.svg"/>
            </div>
            <div class="mt_db_remark">
              <p class="mt_db_title">新数据源</p>
              <p class="mt_db_address">点击添加</p>
            </div>
          </div>
        </Card>
      </li>
    </ul>
    <div id="dbProp" v-if="isShowDbProp">
      <div id="dbPropContent">
        <Form ref="formValidate" :label-width="100" :model="activeDbProp" :rules="ruleValidate">
          <FormItem label="类型" prop="type" style="text-align: left">
            <RadioGroup v-model="activeDbProp.type" type="button">
              <Radio v-for="(item, id) in commonData.dataSourceType" :label="item.value" :key="id"><span>{{item.text}}</span></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="名称" prop="text">
            <Input v-model="activeDbProp.text" placeholder="请输入名称..."/>
          </FormItem>
          <FormItem label="地址" prop="ipAddress">
            <Input v-model="activeDbProp.ipAddress" placeholder="请输入地址..."/>
          </FormItem>
          <FormItem label="端口" prop="port">
            <Input v-model="activeDbProp.port" placeholder="请输入端口..."/>
          </FormItem>
          <FormItem label="实例/数据库" prop="schemas">
            <Input v-model="activeDbProp.schemas" placeholder="请输入实例/数据库..."/>
          </FormItem>
          <FormItem label="用户名" prop="username">
            <Input v-model="activeDbProp.username" placeholder="请输入用户名..."/>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="activeDbProp.password" placeholder="请输入密码..."/>
          </FormItem>
          <FormItem style="text-align: left">
            <Button type="success" @click="saveDbProp">验证&保存</Button>
            <Button v-if="activeDbProp.value" type="error" style="margin-left: 8px" @click="delDbProp">删除</Button>
            <Button type="info" style="margin-left: 8px" @click="setDbPropBack">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import editorData from '@/data/editorData'
import commonData from '@/data/resources/commonData'
export default {
  name: 'mtDbManager',
  data () {
    return {
      editorData: editorData,
      commonData: commonData,
      isShowDbProp: false,
      activeDbProp: {
        value: null,
        type: null,
        text: null,
        ipAddress: null,
        port: null,
        schemas: null,
        username: null,
        password: null
      },
      activeDbIndex: null,
      ruleValidate: {
        type: [
          { required: true, message: '类型必选', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        ipAddress: [
          { required: true, message: '地址必填', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '端口必填', trigger: 'blur' }
        ],
        schemas: [
          { required: true, message: '实例/数据库必填', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
    getIconByType: function (value) {
      switch (value) {
        case '1' : {
          return require('../../assets/dataSourceIcon/oracle_logo.gif')
        }
        case '2': {
          return require('../../assets/dataSourceIcon/sql_server_logo.svg')
        }
        case '3': {
          return require('../../assets/dataSourceIcon/mysql_logo.svg')
        }
      }
    },
    getTitleByType: function (value) {
      switch (value) {
        case '1' : {
          return 'ORACLE'
        }
        case '2': {
          return 'SQLSERVER'
        }
        case '3': {
          return 'MYSQL'
        }
      }
    }
  },
  methods: {
    showDbProp (index) {
      this.activeDbIndex = index
      this.activeDbProp = this.editorData.databaseList[index]
      this.isShowDbProp = true
    },
    addDbProp () {
      this.isShowDbProp = true
      this.activeDbProp = {
        value: null,
        type: null,
        text: null,
        ipAddress: null,
        port: null,
        schemas: null,
        username: null,
        password: null
      }
    },
    setDbPropBack () {
      this.isShowDbProp = false
    },
    saveDbProp () {
      let that = this
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          that.$ajax.post(that.commonConfig.baseUrl + this.commonConfig.actionUrl.SaveDataSource, that.activeDbProp).then(c => {
            if (c.data) {
              if (c.data.code) {
                that.$Message.success('保存成功!')
                if (!that.activeDbProp.value) { // 新增
                  that.activeDbProp.value = c.data.oid
                  that.editorData.databaseList.push(that.activeDbProp)
                }
                that.isShowDbProp = false
              } else {
                if (c.data.msg) {
                  that.$Message.error(c.data.msg)
                } else {
                  that.$Message.error('保存失败!')
                }
              }
            } else {
              that.$Message.error('保存失败!')
            }
          }).catch(c => {
            that.$Message.error(c.message)
          })
        }
      })
    },
    delDbProp () {
      let that = this
      this.$Modal.confirm({
        title: '删除确认',
        okText: '删除',
        content: '确定删除这个数据源吗?',
        onOk: function () {
          if (that.activeDbProp.value) {
            that.$ajax.post(that.commonConfig.baseUrl + this.commonConfig.actionUrl.DelDataSource, {
              oid: that.activeDbProp.value
            }).then(c => {
              if (c.data) {
                that.$Message.success('删除成功!')
                that.editorData.databaseList.splice(that.activeDbIndex, 1)
                that.isShowDbProp = false
              } else {
                that.$Message.error('删除失败!')
              }
            }).catch(c => {
              that.$Message.error(c.message)
            })
          } else {
            that.$Message.success('删除成功!')
            that.isShowDbProp = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  #mtDbManager{
    width: 100%;
    min-height: 100%;
    background: var(--db-bg-color,#d0d0d0);
    text-align: center;
  }
  #mtDbManager_ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap:wrap;
  }
  #mtDbManager_ul li{
    list-style: none;
    margin: 20px 20px;
    cursor: pointer;
  }
  .mt_db_content{
    width: 240px;
    height: 90px;
    padding-top: 10px;
  }
  .mt_db_icon,.mt_db_remark{
    display: inline-block;
    float: left;
  }
  .mt_db_icon{
    width: 84px;
  }
  .mt_db_remark{
    margin-left: 10px;
    width: 130px;
  }
  .mt_db_icon img{
    width: 100%;
  }
  .mt_db_title{
    font-size: 18px;
    width: 100%;
  }
  #dbProp{
    width: 600px;
    height: 500px;
    margin-top: 100px;
    display: inline-block;
    background: var(--prop-bg-color,#fff);
    border-radius: 5px;
  }
  #dbPropContent{
    width: 400px;
    margin: 80px auto 0;
  }
  .ivu-form-item{
    margin-bottom: 20px !important;
  }
  .mt_db_title{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .mt_db_address{
    word-break: break-all;
  }
</style>
