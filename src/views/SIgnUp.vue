<template>
  <div class="m-5 container form-wrap">
    <h1 class="m-3">Join Now</h1>
    <!-- user details are not correct   -->
    <form v-if="!confirmPassword" @submit.prevent="signUp">
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
        <label for="email" class="form-label">E-mail</label>
        <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
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
        <small class="form-text text-white">Your password should be at least 8 characters long.</small>
      </div>
      <button type="submit" class="btn btn-outline-info btn-dark">Sign Up</button>
      <p>Already have an account ?<router-link class="d-inline-block nav-link" to="/">Log In</router-link></p>
    </form>
    <div v-if="error" class="text-red-600 m-3">{{ error.message }}</div>
   <!--  user details are all correct  -->
    <div v-if="confirmPassword" class="w-4/12 m-auto">
      <h3>Enter your code. Please check your email</h3>
      <div class="flex flex-col mt-2">
        <label class="block text-gray-700 text-sm font-bold" for="c-password">Code</label>
        <input
            id="c-password"
            class="shadow appearance-none border
            border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none
            focus:shadow-outline"
            type="text"
            v-model="code"
        >
        <button class="btn-outline-info btn-dark btn" @click="confirmSignUp">Confirm Code</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    username: "",
    password: "",
    email: "",
    error: "",
    confirmPassword: false,
    code: "",
  }),
  methods: {
    async signUp() {
      if (!this.email || !this.password) {
        return;
      }
      try {
        await this.$store.dispatch("auth/SignupUser", {
          username: this.username,
          password: this.password,
          email: this.email,
        });
        this.confirmPassword = true;
      } catch (error) {
        console.log(error.message)
        this.error = error;
      }
    },
    async confirmSignUp() {
      if (!this.username || !this.code) {
        return;
      }
      try {
        const { username, password, code } = this;
        this.error = ""
        await this.$store.dispatch("auth/ConfirmSignupUser", {
          username,
          code,
        });
        await this.$store.dispatch("auth/loginUser", {
          username,
          password,
        });
        await this.$router.push("/albums");
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  }
}
</script>

<style lang="sass" scoped>
h1
  font-size: 28px
</style>