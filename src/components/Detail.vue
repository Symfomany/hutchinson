<template>
  <v-layout id="detail">
    <v-flex xs12>
    <v-progress-circular v-if="!item.nom" indeterminate v-bind:size="50" color="primary"></v-progress-circular>

      <v-card v-else>
        <v-toolbar style="background-color: rgb(25, 118, 210) !important;">
            <v-toolbar-title class="white--text">{{ item.nom }}</v-toolbar-title>
        
        </v-toolbar>
        <v-card-media :src="'../static/img/' + item.photo" height="width:100;200px">
         </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Nom du projet</span><br>
            <span>{{ item.nom }}</span><br>
          </div>
        </v-card-title>

        <v-card-title>
          <div>
            <span class="grey--text">Description</span><br>
            <span>
                <p v-html="item.description">
                </p>
            </span><br>
          </div>
        </v-card-title>

        <v-card-title>
          <div>
            <span class="grey--text">Niveau de maturité</span><br>
            <span>
                <i  v-for="(index,item) in item.niveau" :key="index" class="material-icons">star</i>
                {{ item.niveau }}/10 
            </span>
            <br>
          </div>
        </v-card-title>


        <v-card-title>
          <div>
            <span class="grey--text">Référents</span><br>
            <ul>
                <li :key="index" v-for="(it,index) in item.referents">{{ it.name }} <span ><a class="pink--text" :href="'mailto:'+it.email">{{ it.email }}</a></span></li>
            </ul>
          </div>
        </v-card-title>


        <v-card-title>
          <div>
            <span class="grey--text">Activités rattachées</span><br>
            <v-chip :key="index" v-for="(activite,index) in item.activites" color="primary" text-color="white">{{ activite }}</v-chip>
          </div>
        </v-card-title>
        
        <v-card-title>
          <div>
            <span class="grey--text">Technologies</span><br>
            <v-chip :key="index" v-for="(tech,index) in item.technologies" color="secondary" text-color="white">{{ tech }}</v-chip>
          </div>
        </v-card-title>


        <v-card-title>
           <p class="grey--text">Fournisseurs utilisées</p><br />
           <v-layout :key="index" @click="go(index)" v-for="(fournisseur,index) in item.fournisseurs" style="width: 100%">
                <v-card color="darken-2" >
                    <v-container fluid grid-list-lg>
                        <div>
                            <div class="headline"><span class="primary--text">{{ fournisseur.name }}</span></div>
                            <div>{{ fournisseur.description }}</div>
                            <ul>
                                <li><span class="grey--text">{{ fournisseur.email }}</span></li>
                                <li><span class="grey--text">{{ fournisseur.phone }}</span></li>
                            </ul>
                        </div>
                    </v-container>
                </v-card>
        </v-layout>

        </v-card-title>


         <v-card-title>
            <span class="grey--text">Localisation</span><br>
            <gmap-map
                :options="options"
                :center="center"
                :zoom="15"
                map-type-id="terrain"
                id="map"
                >
                <gmap-marker
                :icon="icon"
                v-for="(m, index) in markers"
                :key="index"
                :position="m.gps"
                :clickable="true"
                :draggable="false"
                >
                <gmap-info-window :options="infoOptions" class="infoBulle" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent"
                    @closeclick="infoWinOpen=false"></gmap-info-window>
                </gmap-marker>
            </gmap-map>
        </v-card-title>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Store } from '@/Store';

export default {
  name: 'detail',
  created(){
    Store.find(this.$route.params.id).then((res) => {
        this.item = res;
        this.markers = [res];
        this.center = {lng: res.gps.lng, lat: res.gps.lat};
    });
  },
  data () {
    return {
          item: {},
          items: [
          {
            text: 'Home',
            disabled: false
          },
          {
            text: 'Nouveau essui-glace révolutionnaire',
            disabled: true
          }
        ],
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      markers: [],
      center: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -40,
          minWidth: 400
        }
      },
       icon: require('@/assets/marker.png'),
       options: {
          disableDefaultUI: false,
          styles: [
              {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#444444"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#f2f2f2"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 45
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#46bcec"
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              }
          ]
        }
    }
  },
  methods: {
    go(item){
        this.$router.push({name: 'detail', params: { id: item }})
    }
  }
}
</script>

<style lang="scss" scoped>
    .flex.xs12{
      cursor: pointer;   
    }
    .application--light .breadcrumbs li .breadcrumbs__item--disabled, .application--light .breadcrumbs li .breadcrumbs__item a{
        color: white !important;
    }
    .indigo{
        background-color: #E00025 !important;
    }
    #map{
        width: 100%;
        height: 250px;
    }
</style>
