<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="indigo" dark>

            <v-breadcrumbs divider="/">
                <v-breadcrumbs-item 
                    v-for="item in items" :key="item.text"
                    :disabled="item.disabled"
                >{{ item.text }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-toolbar>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Nom du projet</span><br>
            <span>Nouveau essui-glace révolutionnaire  {{  $route.params.id }}</span><br>
          </div>
        </v-card-title>

        <v-card-title>
          <div>
            <span class="grey--text">Description</span><br>
            <span>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a laoreet magna. Curabitur sodales ligula vitae ipsum imperdiet egestas. Nunc eget fermentum dui. Suspendisse vel risus at arcu condimentum fringilla. Sed dui lectus, condimentum eu ligula et, pharetra molestie tellus. Quisque vulputate tellus non turpis egestas blandit. Nunc ac metus nec lacus accumsan lobortis. Pellentesque tempor justo in velit dignissim, sit amet iaculis tellus egestas. Vestibulum eget urna ac nisi molestie efficitur. Maecenas interdum vulputate lorem, at mattis sapien finibus quis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mollis mattis odio vel varius.
                </p>
            </span><br>
          </div>
        </v-card-title>

        <v-card-title>
          <div>
            <span class="grey--text">Niveau de maturité</span><br>
            <span>
                65/100 <br />
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star_half</i>
            </span>
            <br>
          </div>
        </v-card-title>


        <v-card-title>
          <div>
            <span class="grey--text">Référents</span><br>
            <ul>
                <li>Nicolas Dupont <span class="grey--text">nicolas@dupont.fr</span></li>
                <li>Nicolas Durand <span class="grey--text">julien.durand@hutchinson.fr</span></li>
            </ul>
          </div>
        </v-card-title>


        <v-card-title>
          <div>
            <span class="grey--text">Activités rattachées</span><br>
            <v-chip color="primary" text-color="white">Activité 1</v-chip>
            <v-chip color="primary" text-color="white">Activité 2</v-chip>
            <v-chip color="primary" text-color="white">Activité 3</v-chip>
          </div>
        </v-card-title>
        
        <v-card-title>
          <div>
            <span class="grey--text">Technologies</span><br>
            <v-chip color="secondary" text-color="white">Technologies 1</v-chip>
            <v-chip color="secondary" text-color="white">Technologies 2</v-chip>
            <v-chip color="secondary" text-color="white">Technologies 3</v-chip>
          </div>
        </v-card-title>


        <v-card-title>
           <p class="grey--text">Fournisseurs utilisées</p><br />
           <v-layout style="width: 100%">
            <v-flex lg6 xs12 @click="go(1)">
                <v-card color="darken-2" >
                <v-container fluid grid-list-lg>
                        <div>
                        <div class="headline"><span class="primary--text">Fournisseur 1</span></div>
                        <div>Foster the People</div>
                        <ul>
                            <li><span class="grey--text">Dupont@free.fr</span></li>
                            <li><span class="grey--text">Durand@gmail.com</span></li>
                            <li><span class="grey--text">julien.boyer@yahoo.fr</span></li>
                        </ul>
                        </div>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex lg6 xs12 @click="go(2)">
                <v-card color="darken-2" >
                <v-container fluid grid-list-lg>
                        <div>
                        <div class="headline"><span class="primary--text">Fournisseur 2</span></div>
                        <div>Foster the People</div>
                        <ul>
                            <li><span class="grey--text">Dupont@free.fr</span></li>
                            <li><span class="grey--text">Durand@gmail.com</span></li>
                            <li><span class="grey--text">julien.boyer@yahoo.fr</span></li>
                        </ul>
                        </div>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

        </v-card-title>


         <v-card-title>
            <span class="grey--text">Localisation</span><br>
            <gmap-map
                :options="options"
                :center="{lat:45.764043, lng:4.835659}"
                :zoom="15"
                map-type-id="terrain"
                id="map"
                >
                <gmap-marker
                :options="infoOptions"
                class="infoBulle"
                :opened="infoWinOpen"
                :content="infoContent"
                :icon="icon"
                v-for="(m, index) in markers"
                :key="index"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @closeclick="infoWinOpen=false"
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

export default {
  name: 'list',
  data () {
    return {
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
      markers: [
        {
          position: {lat: 45.764043, lng: 4.835659},
        },
      ],
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -40,
          minWidth: 400
        }
      },
       icon: require('@/assets/gmap_marker.png'),
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
    .application--light a{
        color: white;
    }
    .indigo{
        background-color: #E00025 !important;
    }
    #map{
        width: 100%;
        height: 250px;
    }
</style>
