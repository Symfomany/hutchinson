<template>
  <v-app id="app">
    <navbar></navbar>
    <main id="main">
      <v-content>
        <v-container fluid transition="slide-x-transition">
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar/Navbar'
export default {
  name: 'app',
  components: {navbar: Navbar}
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#main{
  margin-top: 60px; 
}
#app {
}
@media only screen and (max-width: 599px){
  .container {
      padding: 0px;
  }
}
</style>
