<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-data-table
          :headers="headers"
          :items="clients"
          sort-by="name"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>CLIENTES</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
               <v-btn  color="primary" dark class="mb-2" @click="onCreate">
                  CADASTRAR NOVO                
                </v-btn>                         
            </v-toolbar>
          </template>

          <template #item.actions="{ item }">
            <nuxt-link :to="'clientes/'+ item.id">
              <v-icon small class="mr-2">
                mdi-pencil
              </v-icon>
            </nuxt-link>
            <v-icon small @click="onDelete()">
              mdi-delete
            </v-icon>
          </template>      
        </v-data-table>        
      </v-col>
    </v-row>    

    <v-dialog v-model="dialogCreate" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Funcionalidade não disponível</v-card-title>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Funcionalidade não disponível</v-card-title>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {

    data: () => ({
      dialogCreate: false,
      dialogDelete: false,
      search: null,

      headers: [
        { text: 'ID', value: 'id'},
        { text: 'Nome', value: 'name', align: 'start'},
        { text: 'Tipo', value: 'type' },
        { text: 'Estado)', value: 'state' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],    
    }),

    async fetch () {
      if(this.clients.length > 0)
        return;
      const data = await this.$axios.$get('https://api-test.cerensa.com/v3/talents/people')
      this.$store.commit('cliente/addClient', data.results)
    },

    computed: {
      clients () {
        const data = this.$store.state.cliente.list;
        return data;
      }
    },

    methods: {
      onCreate () {
        this.dialogCreate = true
      },

      onUpdate ({item}) {
        console.log(item)
      },

      onDelete () {
        console.log('Deletar:', true)
        this.dialogDelete = true
      },
    },
  }
</script>
