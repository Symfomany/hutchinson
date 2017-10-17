// Axios Module
import axios from 'axios';


/**
* Store Formations
*/
export let Store = {
    state: {
        markers: [],
        formations: [],
        word: '',
        loaded: false,
        limit: 10
    },
    loadDatas(url = "http://localhost:3000/datas") {
        return axios.get(url).then((response) => {
            this.state.formations = response.data;
            this.loadMarkers();
            console.log(this.state.markers)
        });
    },

    filterDatas() {

        let url = "http://localhost:3000/datas"

        return axios.get(url).then((response) => {
            this.state.formations = response.data;
            this.loadMarkers();
        });
    },

    loadMarkers() {
        this.state.markers = [];
        for (let formation of this.state.formations) {
            if (formation.gps) {
                this.state.markers.push({
                    gps: {
                        lat: formation.gps.lat,
                        lng: formation.gps.lng
                    },
                    name: formation.name,
                    description: formation.description,
                });
            }
        }
    },


};