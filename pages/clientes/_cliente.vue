<template>
  <v-container>
    <v-card class="pb-6">
      <v-toolbar flat>
        <v-toolbar-title>CLIENTE</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <NuxtLink to="/clientes" class="text-decoration-none">
          <v-btn>
            <v-icon>mdi-arrow-left</v-icon>
            VOLTAR
          </v-btn>
        </NuxtLink>
      </v-toolbar>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="2" md="2" sm="12">
              <v-text-field
                v-model="cliente.id"
                label="ID"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field
                v-model="cliente.name"
                :rules="rules.name"
                label="Nome"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field
                v-model="cliente.type"
                :rules="rules.type"
                label="Tipo"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field
                v-model="cliente.federalDocument"
                :rules="rules.federalDocument"
                label="CPF/CNPJ"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-text-field
                v-model="cliente.stateDocument"
                label="RG/IE"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="12">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate"
                    clearable
                    label="Nascimento"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date = null"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @change="menu1 = false"
                ></v-date-picker>
              </v-menu>
              <!-- <v-text-field v-model="cliente.birthDate" label="Nascimento" outlined dense></v-text-field> -->
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3>Endereço</h3>
            </v-col>
            <v-col cols="3" md="3" sm="12">
              <v-text-field
                v-model="cliente.address.zipCode"
                :rules="rules.zipCode"
                label="CEP"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field
                v-model="cliente.address.street"
                :rules="rules.street"
                label="Rua"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="12">
              <v-text-field
                v-model="cliente.address.number"
                :rules="rules.number"
                label="Número"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field
                v-model="cliente.address.complement"
                label="Complemento"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field
                v-model="cliente.address.district"
                :rules="rules.district"
                label="Bairro"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field
                v-model="cliente.address.city"
                :rules="rules.city"
                label="Cidade"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-text-field
                v-model="cliente.address.state"
                :rules="rules.state"
                label="Estado"
                outlined
                dense
              ></v-text-field>
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

    <v-dialog v-model="validationDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Erro!</v-card-title>
        <v-card-text>Verifique os campos obrigatórios!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="validationDialog = false">
            Entendi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="saveDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Atenção</v-card-title>
        <v-card-text>Funcionalidade de gravação não disponível!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveDialog = false">
            Entendi
          </v-btn>
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
  asyncData({ params }) {
    const clientID = params.cliente
    return { clientID }
  },

  data() {
    return {
      menu1: false,
      overlay: false,
      saveDialog: false,
      validationDialog: false,
      valid: true,
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
        contacts: [],
      },
      rules: {
        name: [(v) => !!v || 'Nome é requerido'],
        type: [(v) => !!v || 'Tipo é requerido'],
        federalDocument: [(v) => !!v || 'CPF/CNPJ é requerido'],
        zipCode: [(v) => !!v || 'Cep é requerido'],
        street: [(v) => !!v || 'Endereço é requerido'],
        number: [(v) => !!v || 'Número é requerido'],
        district: [(v) => !!v || 'Bairro é requerido'],
        city: [(v) => !!v || 'Cidade é requerido'],
        state: [(v) => !!v || 'Estado é requerido'],
      },
    }
  },

  async fetch() {
    this.overlay = true
    const data = await this.$axios.$get(
      `https://api-test.cerensa.com/v3/talents/people/${this.clientID}`
    )
    this.cliente = data
    this.overlay = false
  },

  computed: {
    formatDate() {
      return this.cliente.birthDate
        ? this.$moment(this.cliente.birthDate).format('DD/MM/YYYY')
        : this.$moment().format('DD/MM/YYYY')
    },
  },

  methods: {
    validate() {
      if(!this.$refs.form.validate())
        return this.validationDialog = true
      this.saveDialog = true
    },
  },
}
</script>
