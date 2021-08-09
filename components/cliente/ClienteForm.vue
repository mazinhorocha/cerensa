<template>
  <v-container>
    <v-row>
      <v-col v-if="formAction == 'update'" cols="2" md="2" sm="12">
        <v-text-field v-model="id" label="ID" dense></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-text-field v-model="name" label="Nome" dense></v-text-field>
      </v-col>
      <v-col cols="4" md="4" sm="12">
        <v-select v-model="type" :items="types" label="Tipo" dense></v-select>
      </v-col>
      <v-col cols="4" md="4" sm="12">
        <v-text-field v-model="federalDocument" label="CPF/CNPJ" dense></v-text-field>
      </v-col>
      <v-col cols="4" md="4" sm="12">
        <v-text-field v-model="stateDocument" label="RG/IE" dense></v-text-field>
      </v-col>
      <v-col cols="4" md="4" sm="12">
        <v-text-field v-model="birthDate" label="Nascimento" dense></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h3>Endereço</h3>
      </v-col>
      <v-col cols="3" md="3" sm="12">
        <v-text-field v-model="zipCode" label="CEP" dense></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-text-field v-model="street" label="Rua" dense></v-text-field>
      </v-col>
      <v-col cols="3" md="3" sm="12">
        <v-text-field v-model="number" label="Número" dense></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-text-field v-model="complement" label="Complemento" dense></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-text-field v-model="district" label="Bairro" dense></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-text-field v-model="city" label="Cidade" dense></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-text-field v-model="state" label="Estado" dense></v-text-field>
      </v-col>
      <v-col cols="12" md="12" sm="6">
        <v-btn class="success">Salvar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
   props: [
    // eslint-disable-next-line vue/require-prop-types
    'formAction'
  ],

  data(){
    return {
      client: {
        id: null,
        name: null,
        type: null,
        federalDocument: null,
        stateDocument: null,
        birthDate: null,
        zipCode: null,
        street: null,
        number: null,
        complement: null,
        district: null,
        city: null,
        state: null,
      },

      types: ['NATURAL', 'LEGAL'],
    }
  },

  methods: { 
    submitForm(){
      if(this.formAction === 'create')
        this.onCreate(this.client)
      else  
        this.onUpdate(this.client)
    },   
    onCreate(){

    },
    onUpdate(){

    },
  }
}
</script>
