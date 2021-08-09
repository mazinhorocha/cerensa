<template>    
    <v-container class="mt-5">
        <v-divider inset dark></v-divider>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="contatos"
                    sort-by="name"
                    elevation="2"
                >
                    <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>CONTATOS</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" @click="onCreate">
                            NOVO CONTATO                
                        </v-btn>                         
                    </v-toolbar>
                    </template>

                    <template #item.actions="{ item }">
                    <v-icon small class="mr-2" @click="onUpdate()">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="onDeleteConfirm()">
                        mdi-delete
                    </v-icon>
                    </template>      
                </v-data-table>
            </v-col>
        </v-row>

        <v-dialog
            v-model="deleteConfirm" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Open Dialog
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    deseja remover
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="deleteConfirm = false">
                    Cancelar
                </v-btn>
                <v-btn color="green darken-1" text @click="onDelete">
                    Remover
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    export default {
        props: [
            'contatos'
        ],

        data: () => ({
            deleteConfirm: false,
            headers: [
                { text: 'Tipo', value: 'type', align: 'left'},
                { text: 'Contato', value: 'value', align: 'left'},
                { text: 'Status', value: 'active', align: 'left' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'right' },
            ],   
        }),

        methods: {
            onCreate(){

            },
            onUpdate(){

            },
            onDeleteConfirm(){
                this.deleteConfirm = true;
            },
            onDelete(){
                this.deleteConfirm = false;
            }
        }
    }
</script>