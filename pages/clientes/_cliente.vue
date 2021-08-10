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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="2" md="2" sm="12">
              <v-text-field v-model="cliente.id" label="ID" outlined dense disabled></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field v-model="cliente.name" label="Nome" outlined dense required></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field v-model="cliente.type" label="Tipo" outlined dense required></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field v-model="cliente.federalDocument" label="CPF/CNPJ" outlined dense required></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field v-model="cliente.stateDocument" label="RG/IE" outlined dense></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field v-model="cliente.birthDate" label="Nascimento" outlined dense></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3>Endereço</h3>
            </v-col>
            <v-col cols="3" md="3" sm="12">
              <v-text-field v-model="cliente.address.zipCode" label="CEP" outlined dense></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field v-model="cliente.address.street" label="Rua" outlined dense></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="12">
              <v-text-field v-model="cliente.address.number" label="Número" outlined dense></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field v-model="cliente.address.complement" label="Complemento" outlined dense></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field v-model="cliente.address.district" label="Bairro" outlined dense></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field v-model="cliente.address.city" label="Cidade" outlined dense></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field v-model="cliente.address.state" label="Estado" outlined dense></v-text-field>
            </v-col>
          </v-row>

          <cliente-contatos :cliente="cliente"></cliente-contatos>

          <v-row>
            <v-col cols="12" md="12" sm="6">
              <v-btn class="success" @click="validate()">Atualizar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
   </v-card>

    <v-dialog v-model="saveDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Funcionalidade de gravação não disponível</v-card-title>
      </v-card>
    </v-dialog>

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
      saveDialog: false,
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

  methods: {
    validate () {
      this.$refs.form.validate()
      this.saveDialog = true;
    }
  },

  async fetch(){
    this.overlay = true;
      const data = await this.$axios.$get(`https://api-test.cerensa.com/v3/talents/people/${this.clientID}`)
      this.cliente = data;
    this.overlay = false;
  }
}
</script>
