<template>
  <v-app id="app">
    <div id="loader" v-if="loader">
      <div class="spinner"></div>
    </div>

    <navbar v-if="!loader"></navbar>
    <main  v-if="!loader" id="main">
      <v-content>
        <v-container>
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
  components: {navbar: Navbar},
  data(){
    return {
      loader: true
    }
  },
  created(){
    setTimeout(() => {
        this.loader=false;
    },1500)
  }
}
</script>

<style lang="scss" scoped>
.hide{
  opacity: 0;
}
#loader{
   -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    -o-transition: all .3s ease-in;
    transition: all .3s ease-in;
    z-index: 10000001;
    background-color: #142559;
    width: 100%;
    height: 100vh;
    padding-top: 10%;
}

.spinner {
  width: 40px;
  height: 40px;
  background-color: white;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

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
