<template>
  <v-app id="app">
  <div id="loader" v-if="loader">
    <div class="spinner" >
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
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
    }, 1000)
  }
}
</script>


<style>
@font-face {
  font-family: sanspro;
  src: url(sanspro.otf);
}
*{
  font-family: sanspro;
}
</style>
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
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: white;
  height: 100%;
  width: 6px;
  display: inline-block;
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
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
