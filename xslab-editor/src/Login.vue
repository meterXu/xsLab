<script>
import {types} from 'xxweb-utils'
export default {
  name:'Login',
  data(){
    return {
      form:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    onLogin(){
      if(this.form.username==='admin'&&this.form.password==='xslab666@dkkj.com'){
        this.$ls.set(types.ACCESS_TOKEN,'Bearer afewafaew')
        this.$router.push({name:'Index',query:{Authorization:'afewafaew'}})
      }else{
        this.$Message.error('用户名或密码不正确！')
      }
    }
  }
}
</script>

<template>
<div class="login">
  <div class="login-wrap">
    <h1 class="title">xslab</h1>
    <Form>
      <FormItem label="用户名" prop="username">
        <Input v-model="form.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="form.password" placeholder="请输入密码"/>
      </FormItem>
    </Form>
    <div>
      <Button type="primary" style="width: 100%;" @click="onLogin">登录</Button>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
.login{
  .title{
    text-align: center;
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrap{
    width: 600px;
  }
}
</style>