<template>
  <div class="Main">

    <gmap-map
     :options="options"
      :center="{lat:47.081012, lng:2.398782}"
      :zoom="6"
      map-type-id="terrain"
      id="map"
      ref="map"
    >
     <gmap-marker
     :icon="icon"
     v-for="(m, index) in markers.markers"
     :key="index"
     :position="m.gps"
     :clickable="true"
     @click="toggleInfoWindow(m,index)"
    >
    </gmap-marker>
    
     <gmap-info-window :options="infoOptions" class="infoBulle"
       :position="infoWindowPos" :opened="infoWinOpen"
       :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
  </gmap-map>
  </div>
</template>

<script>
import { Store } from '@/Store';
import { EventBus } from '@/EventBus';

export default {
  name: 'main',
  data () {
    return {
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      markers: Store.state,
      currentMidx: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -40,
          minWidth: 400
        }
      },
        center: { lat: 45.76440947770659, lng: 4.843597412109375 },
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
        },
    }
  },
  created(){
      if (Store.state.loaded === false) {
        Store.loadDatas().then(() => {
          Store.state.loaded = true;
        });
      }

    EventBus.$on('update', () => this.infoWinOpen = false);

  },
  methods: {
        toggleInfoWindow: function (marker, idx) {
            this.infoWindowPos = marker.gps;
            this.infoContent = `<div class="contentInfo">
                                    <h3>${marker.name}</h3>
                                    <p>${marker.description}</p>
                                </div>`;

            if (this.currentMidx == idx) {
                this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
                this.infoWinOpen = true;
                this.currentMidx = idx;
                this.$refs.map.panBy(10, 10)
            }
            
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #map{
    width: 100%;
    height: 100%;
    position: absolute; top: 0; right: 0; bottom: 0; left: 0;
    height:-webkit-fill-available;
  }

  .contentInfo {
    border-radius: 5px;
    background-color: #E00025;
    color: white;
  }
  
  .contentInfo .center {
    display: block;
    text-align: center;
  }
  
  .contentInfo p {
    font-size: 14px;
  }
  
  .contentInfo h3 {
    color: #E00A49;
    font-size: 21px;
    text-transform: uppercase;
  }
  
  .gm-style-iw {
    width: 400px;
    min-height: 250px;
  }
</style>
