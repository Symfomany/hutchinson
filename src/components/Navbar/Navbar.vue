<template>
  <div class="Navbar">
   <v-toolbar fixed dark color="grey lighten-4" >
        <v-layout> 
          <v-flex xs12 md3>
            <router-link to="/"><v-toolbar-title><img alt="Hutchinson Logo" id="imgLogo" src="../../assets/logoHutchinson.png" /></v-toolbar-title></router-link>
          </v-flex>
          <v-flex  class="hidden-xs-only" xs8 id="searchBlock">
            <v-text-field
              append-icon="search"
              label="Recherchez un projet"
              :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
              v-model="search.word"
            ></v-text-field>
          </v-flex>
        </v-layout> 
        
          <v-spacer class="hidden-xs-only"></v-spacer>
          
            <v-btn class="hidden-xs-only" round @click="go('map')" color="rounded primary" >
              <v-icon >map</v-icon>Carte
            </v-btn>
            <v-btn class="hidden-xs-only" round @click="go('list')" color="rounded primary" >
              <v-icon >list</v-icon>Liste
            </v-btn>
    </v-toolbar>

    <div id="btns">
        <v-btn  round @click="go('map')" color="rounded primary" >
          <v-icon >map</v-icon>Carte
        </v-btn>
        <v-btn  round @click="go('list')" color="rounded primary" >
          <v-icon >list</v-icon>Liste
        </v-btn>
      </div>


  </div>
</template>

<script>
import { Store } from '@/Store';
import { EventBus } from '@/EventBus';

export default {
  name: 'navbar',
  data () {
    return {
      search: Store.state
    }
  },
  methods: {
    go(action = 'list'){
      this.$router.push({ name: action}) 
    }
  },
  watch: {
      "search.word": function () {
        if (this.search.word.length >= 3) {
          Store.filterDatas();
          EventBus.$emit('update');
        } else {
          Store.loadDatas();
          Store.state.limit = 300;
          EventBus.$emit('update');
        }
      }
  }
}
</script>

<style lang="scss">

@media only screen and (max-width: 599px){
  #btns{
    position: fixed;
    z-index: 10000;
    bottom: 1%;
    left: 20%;
    width: 400px;
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
   
  }
}
</style>
