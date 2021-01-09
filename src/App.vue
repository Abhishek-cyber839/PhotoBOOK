<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<style lang="sass">
@import "~bootstrap"


#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


.nav-link:hover
  color: white

form
  width: 35%
  background-color: #2c3e50
  color: aliceblue
  padding: 20px

.form-wrap
  display: flex
  flex-direction: column
  align-items: center


</style>
<script>
import Nav from "@/components/Nav";
import {mapActions} from 'vuex';

export default {
  mounted() {
    this.authAction()
  },
  components: {Nav},
  methods:{
    ...mapActions({
      authAction:'auth/authAction'
    })
  }
}
</script>