<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-data-table
          :headers="headers"
          :items="clients"
          sort-by="name"
          class="text-left"
        >
          <template #top>
            <v-row>
              <v-col cols="12" md="12">
                <v-toolbar flat>
                  <v-toolbar-title>CLIENTES</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" dark class="mb-2" @click="onCreate">
                    CADASTRAR NOVO
                  </v-btn>
                </v-toolbar>
              </v-col>
              <v-col cols="12" md="12">
                <v-toolbar flat>
                  <v-text-field
                    v-model="searchName"
                    label="Pesquisar Nome"
                    append-icon="mdi-magnify"
                    outlined filled dense
                    clearable
                    @click:append="findByname"
                    @click:clear="$fetch"
                  ></v-text-field>
                </v-toolbar>
              </v-col>
            </v-row>
          </template>

          <template #item.actions="{ item }">
            <nuxt-link :to="'clientes/' + item.id">
              <v-icon small class="mr-2"> mdi-pencil </v-icon>
            </nuxt-link>
            <v-icon small @click="onDelete()"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Atenção</v-card-title>
        <v-card-text>Funcionalidade não disponível</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Entendi </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    dialog: false,
    searchName: null,

    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Nome', value: 'name', align: 'start' },
      { text: 'Tipo', value: 'type' },
      { text: 'Estado', value: 'state' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  async fetch() {
    this.overlay = true
    const data = await this.$axios.$get(
      'https://api-test.cerensa.com/v3/talents/people'
    )
    this.$store.commit('cliente/createClient', data.results)
    this.overlay = false
  },

  computed: {
    clients() {
      const data = this.$store.state.cliente.list
      return data
    },
  },

  methods: {
    onCreate() {
      this.dialog = true
    },

    onUpdate({ item }) {
      console.log(item)
    },

    onDelete() {
      this.dialog = true
    },

    async findByname(){
      this.overlay = true
      const data = await this.$axios.$get(
        `https://api-test.cerensa.com/v3/talents/people?name=*${this.searchName}*`
      )
      this.$store.commit('cliente/createClient', data.results)
      this.overlay = false
    }
  },
}
</script>
