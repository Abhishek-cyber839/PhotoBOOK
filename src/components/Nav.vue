<template>
  <div>
    <nav class="navbar navbar-expand-lg  text-white bg-dark">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div v-if="!user" class="navbar-nav ml-auto">
          <router-link class="nav-item nav-link active" to="#">Login<span class="sr-only">(current)</span></router-link>
          <router-link class="nav-item nav-link" to="/signup">Sign Up</router-link>
          <router-link class="nav-item nav-link" to="/about">About</router-link>
        </div>
        <div v-if="user" class="navbar-nav ml-auto">
          <div class="nav-item nav-link active" >Welcome {{ user.username }}<span class="sr-only">(current)</span></div>
          <div class="nav-item nav-link cursor-pointer" v-on:click="logout">Logout</div>
          <router-link class="nav-item nav-link" to="/about">Albums</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Nav",
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logoutUser");
      await this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
}
</script>

<style lang="sass" scoped>

.active
  font-weight: bolder

</style>