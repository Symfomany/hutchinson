<template>
  <div class="Main">
    <gmap-map
     :options="options"
      :center="{lat:45.764043, lng:4.835659}"
      :zoom="14"
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
  </div>
</template>

<script>

export default {
  name: 'main',
  data () {
    return {
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      markers: [
        {
          position: {lat: 45.764043, lng: 4.835659},
        },
        { 
          position: {lat: 45.760738, lng: 4.832225},
        },
        {
          position: {lat: 45.756097, lng: 4.835165},
        },
        {
          position: {lat: 45.752893, lng: 4.827998},
        }
          

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
        },
    }
  },
    methods: {
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = `<div class="contentInfo">
            <h3>Lyon</h3>
            <p>2 projets</p>
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
<style lang="scss">
  #map{
    width: 100%;
    height: 100vh;
  }
</style>
