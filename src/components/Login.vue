<template>
  <div class="m-5 container form-wrap">
    <h1 class="m-3">Welcome To The Photoshop</h1>
    <form @submit.prevent="LoginUser">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
        >
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
        >
      </div>
      <button type="submit" class="btn btn-outline-info btn-dark">Log In</button>
      <p>Don't have an account ?<router-link class="d-inline-block nav-link" to="/signup">Sign Up</router-link></p>
    </form>
    <div class="text-red-600 m-3">{{ error }}</div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data: () => ({username:"",password:"",email:"",error:""}),
  methods:{
    ...mapActions({
      login:'auth/loginUser'
    }),
    async LoginUser(){
      try {
        await this.login({
          username:this.username,
          password:this.password
        })
        await this.$router.push('/albums')
      }
      catch (error){
        console.log(error)
        this.error = error
      }
    }
  },

  name: "Login"
}
</script>

<style lang="sass" scoped>
h1
  font-size: 28px
</style>