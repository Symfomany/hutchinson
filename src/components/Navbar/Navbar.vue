<template>
  <div class="Navbar">
   <v-toolbar fixed dark color="grey lighten-4" >
        <v-layout class="hidden-xs-only"> 
          <v-flex xs3>
            <router-link to="/"><v-toolbar-title><img alt="Hutchinson Logo" id="imgLogo" src="../../assets/logoHutchinson.png" /></v-toolbar-title></router-link>
          </v-flex>
          <v-flex xs8 id="searchBlock">
            <v-text-field
              append-icon="search"
              label="Recherchez un projet"
              :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
              v-model="search"
            ></v-text-field>
          </v-flex>
        </v-layout> 
        
        <div id="btns">
          <v-spacer class="hidden-xs-only"></v-spacer>
          <v-btn round @click="go('map')" color="rounded primary" >
            <v-icon >map</v-icon>Carte
          </v-btn>
          <v-btn round @click="go('list')" color="rounded primary" >
            <v-icon >list</v-icon>Liste
          </v-btn>
        </div>
    </v-toolbar>

  

  </div>
</template>

<script>

export default {
  name: 'navbar',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    go(action = 'list'){
      this.$router.push({ name: action}) 
    }
  }
}
</script>

<style lang="scss">

@media only screen and (max-width: 599px){
  #btns{
    margin: 0 auto;
  }
}
.application--light .list{
    height: 100vh;
    overflow: auto;
}

.application--light .btn{
  background-color: #142559 !important;
}

#searchBlock{
  margin-top: 5px;
}
.cyan{
  background-color: #142559 !important;
}
img#imgLogo{
  width: 60%;
  height: 29px;
  margin-top: 20px;
}
@media only screen and (max-width : 420px) {
  img#imgLogo{
    width: 80%;
  }
}
</style>
