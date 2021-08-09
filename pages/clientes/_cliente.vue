<template>
  <v-container>
   <v-card>
     <v-toolbar flat>
          <v-toolbar-title>CLIENTE</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link to="/clientes" class="btn grey lighten-4">
            <v-btn  color="grey lighten-4" class="mb-2">VOLTAR</v-btn>
          </nuxt-link>                         
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="2" md="2" sm="12">
            <v-text-field v-model="cliente.id" label="ID" dense></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-text-field v-model="cliente.name" label="Nome" dense></v-text-field>
          </v-col>
          <v-col cols="4" md="4" sm="12">
            <v-text-field v-model="cliente.type" label="Tipo" dense></v-text-field>
          </v-col>
          <v-col cols="4" md="4" sm="12">
            <v-text-field v-model="cliente.federalDocument" label="CPF/CNPJ" dense></v-text-field>
          </v-col>
          <v-col cols="4" md="4" sm="12">
            <v-text-field v-model="cliente.stateDocument" label="RG/IE" dense></v-text-field>
          </v-col>
          <v-col cols="4" md="4" sm="12">
            <v-text-field v-model="cliente.birthDate" label="Nascimento" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Endereço</h3>
          </v-col>
          <v-col cols="3" md="3" sm="12">
            <v-text-field v-model="cliente.address.zipCode" label="CEP" dense></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-text-field v-model="cliente.address.street" label="Rua" dense></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="12">
            <v-text-field v-model="cliente.address.number" label="Número" dense></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-text-field v-model="cliente.address.complement" label="Complemento" dense></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-text-field v-model="cliente.address.district" label="Bairro" dense></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-text-field v-model="cliente.address.city" label="Cidade" dense></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-text-field v-model="cliente.address.state" label="Estado" dense></v-text-field>
          </v-col>
        </v-row>
      </v-container>
   </v-card>

    <v-spacer></v-spacer>
    <cliente-contatos :contatos="cliente.contacts"></cliente-contatos>

    <v-row>
      <v-col cols="12" md="12" sm="6">
        <v-btn class="success">Atualizar</v-btn>
      </v-col>
    </v-row>

   <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </v-container>
</template>

<script>
export default {
  asyncData({params}){ 
    const clientID = params.cliente;
    return  { clientID };
  },

  data(){
    return {
      overlay: false,

      cliente: {
        id: null,
        name: null,
        type: null,
        federalDocument: null,
        stateDocument: null,
        birthDate: null,
        anualBilling: null,
        address: {
          zipCode: null,
          street: null,
          number: null,
          complement: null,
          district: null,
          city: null,
          state: null,
        },
        contacts: []
      }
    }
  },

  async fetch(){
    this.overlay = true;
      const data = await this.$axios.$get(`https://api-test.cerensa.com/v3/talents/people/${this.clientID}`)
      this.cliente = data;
    this.overlay = false;
    // this.$store.commit('cliente/addClient', data.results)
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    },
  }
}
</script>
