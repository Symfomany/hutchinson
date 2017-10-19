// Axios Module
import axios from 'axios';



/**
* Store Formations
*/
export let Store = {
    state: {
        markers: [],
        liste: [],
        formations: [],
        word: '',
        loaded: false,
        limit: 10
    },
    loadDatas(url = "http://localhost:3000/datas") {
        return axios.get(url).then((response) => {
            this.state.formations = response.data;
            console.log(response.data);
            this.loadMarkers();
        });
    },

    loadListe(id = undefined, url = "http://localhost:3000/datas") {
        if (id) {
            return axios.get(url + '/' + id).then((response) => {
                this.state.liste = response.data.projets;
            });
        } else {
            return axios.get(url).then((response) => {
                let projects = response.data.map((elt) => elt.projets)
                this.state.liste = [].concat(...projects);
            });
        }

    },

    filterDatas() {
        this.state.markers = this.state.markers.filter((elt) => {
            let regex = new RegExp(this.state.word, 'i')
            return regex.test(elt.name);
        });
    },

    loadMarkers() {
        this.state.markers = [];
        for (let formation of this.state.formations) {

            if (formation.long && formation.lat) {
                this.state.markers.push({
                    gps: {
                        lat: formation.lat,
                        lng: formation.long
                    },
                    id: formation.id,
                    name: formation.nom,
                    adresse: formation.adresse,
                    ville: formation.ville,
                    cp: formation.cp,
                    nbProjet: formation.nbProjet
                });

            }

        }
    },


    find(id, url = "http://localhost:3000/datas") {
        // id => projet != site
        return axios.get(url + '/1').then((response) => {
            return response.data.projets[0];
        });
    },

};