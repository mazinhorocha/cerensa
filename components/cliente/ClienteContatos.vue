<template>
    <v-container class="mt-5">
        <v-divider inset dark></v-divider>
        <v-row>
            <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="cliente.contacts"
                  sort-by="name"
                  elevation="2"
                >
                  <template #top>
                  <v-toolbar flat>
                      <v-toolbar-title>CONTATOS</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark class="mb-2" @click="showContactForm = true">
                          NOVO CONTATO
                      </v-btn>
                  </v-toolbar>
                  </template>

                  <template #item.actions="{item, index}">
                  <v-icon small class="mr-2" @click="switchAction('update', index, item)">
                      mdi-pencil
                  </v-icon>
                  <v-icon small @click="remove(index)">
                      mdi-delete
                  </v-icon>
                  </template>
                </v-data-table>
            </v-col>
        </v-row>

        <v-dialog
            v-model="deleteConfirm" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    deseja remover
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="deleteConfirm = false">
                    Cancelar
                </v-btn>
                <v-btn color="green darken-1" text @click="remove()">
                    Remover
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
          v-model="showContactForm"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Contato</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-select v-model="contact.type" :items="['PHONE', 'EMAIL']" label="Tipo*" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="contact.value" label="Contato" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-select v-model="contact.active" :items="['true', 'false']" label="Ativo*" required></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>* Campos Requeridos</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showContactForm = false">
                Cancelar
              </v-btn>
              <v-btn v-show="formAction ==='create'" color="blue darken-1" text @click="create()">
                Salvar
              </v-btn>

              <v-btn v-show="formAction ==='update'" color="blue darken-1" text @click="update()">
                Atualizar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    export default {
        props: [
            'cliente'
        ],

        data: () => ({
          showContactForm: false,
          deleteConfirm: false,
          formAction: null,
          editIndex: null,

          headers: [
            { text: 'Tipo', value: 'type', align: 'left'},
            { text: 'Contato', value: 'value', align: 'left'},
            { text: 'Status', value: 'active', align: 'left' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'right' },
          ],

          contact: {
            type: null,
            active: null,
            value: null
          }
        }),

        methods: {
          switchAction(action, index, item){
            this.showContactForm = true;
            this.formAction = action;
            this.editIndex = index;
            this.contact = item;
          },

          create(){
            this.cliente.contacts.push(this.contact)
            this.showContactForm = false;
            this.updateStore()
          },

          update(){
            this.cliente.contacts[this.editIndex] = this.contact;
            this.showContactForm = false;
            this.updateStore()
          },

          remove(index){
            this.cliente.contacts.splice(index, 1)
            this.updateStore()
          },

          updateStore(client){
            this.$store.commit('cliente/updateCliente', this.client)
          }
        }
    }
</script>
