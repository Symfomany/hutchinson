<template>
    <v-layout row>
        <v-flex xs12>
        <v-card>
            <v-toolbar  color="cyan" dark>
            <v-toolbar-title>Liste des projets (9/{{ markers.markers.length }})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            </v-toolbar>
            <v-list two-line>
            <template v-for="item,index in markers.markers">
                <v-divider v-if="item.divider" v-bind:inset="item.inset"></v-divider>
                <v-list-tile avatar v-else v-bind:key="item.name" @click="go(item.id)">
                
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

export default {
  name: 'list',
  created(){
      if (Store.state.loaded === false) {
        Store.loadDatas().then(() => {
          Store.state.loaded = true;
        });
      }
  },
  data () {
    return {
        markers: Store.state
    }
  },
  methods: {
    go(item){
        console.log(item)
        this.$router.push({name: 'detail', params: { id: item }})
    }
  }
}
</script>

<style lang="scss">
</style>
