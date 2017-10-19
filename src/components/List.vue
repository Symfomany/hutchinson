<template>
    <v-layout row id="list">
        <v-flex xs12>
        <v-card>
            <v-toolbar color="white--text" style="background-color: #1976d2!important;">
            <v-toolbar-title v-if="show">{{ liste.liste.length }} projet<span v-if="liste.liste.length">s</span></v-toolbar-title>
            <v-toolbar-title style="width: 100%;" v-if="!show">
                <v-text-field
                    color="white"
                    ref="searchtext"
                    v-model="search.word"
                    @keyup="searching"
                    clearable
                    hide-details
                    prepend-icon="search"
                    :prepend-icon-cb="search"
                    label="Recherchez un projet"
                    autofocus
                    @blur="afficher"
                    single-line></v-text-field>
            </v-toolbar-title>
            <v-spacer v-if="show"></v-spacer>
            <v-btn color="white--text" v-if="show" @click="changing" icon>
                <v-icon>search</v-icon>
            </v-btn>
            </v-toolbar>
            <v-list two-line>
            <template v-for="item,index in liste.liste">
                <v-divider v-if="index > 0"></v-divider>
                <v-list-tile avatar  v-bind:key="item.name" @click="go(item.id)">
                
                <v-list-tile-avatar>
                    <img :src="'../static/img/' + item.photo"/>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </template>
            </v-list>
         </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { Store } from '@/Store';
import { EventBus } from '@/EventBus';

export default {
  name: 'list',
  created(){
    let id = this.$route.params.id;
    Store.loadListe(id).then((res) => {
        Store.state.loaded = true;
    });
  },
  data () {
    return {
        liste: Store.state,
        show: true,
        search: Store.state,
    }
  },
  methods: {
    go(item){
        this.$router.push({name: 'detail', params: { id: item }})
    },

    afficher(){
        if (this.search.word.length < 2) {
            this.show = true
        }
    },

    changing(){
        this.show = !this.show;
    },

    searching(){
        if (this.search.word.length >= 3) {
            Store.filterDatas();
            EventBus.$emit('update');
        } else {
            Store.loadDatas();
            Store.state.limit = 300;
            EventBus.$emit('update');
        }
    },
  }
}
</script>

<style lang="scss">
#list .application--light .btn{
    background-color: transparent !important;
}
#list .application--light .input-group input{
    color: white !important;
    font-size: 1.5rem;
}

</style>
