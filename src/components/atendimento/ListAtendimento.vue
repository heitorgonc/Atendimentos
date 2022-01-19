<template>
    <v-container fluid class="content pa-0 ma-0">
        <div class="container">
            <h1 class="title">Atendimentos Hypersoft</h1>
            <template>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa rápida" single-line hide-details></v-text-field>
                            <v-col cols="12" sm="2">
                                <v-select :value="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="itemsPerPage = parseInt($event, 10)"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="header" :items="atendimentos"  class="elevation-1 mt-5" :search="search" dense :items-per-page="itemsPerPage" 
                    hide-default-footer :page.sync="page" @page-count="pageCount = $event">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn :to="{ name: 'editarAtendimento', params:{codigo: item.codigo}, query:{atendimento: item}}" 
                            class="edit" plain icon>
                                <v-icon small>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                    <div class="pt-2 pb-2">
                        <v-pagination v-model="page" :length="pageCount"></v-pagination>
                    </div>
                </v-card>
            </template>
            <div class="col-12">
                <v-btn class="btn btn-red mt-5" to="/atendimentos/cadastro">Cadastrar Atendimento</v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            search: '',
            dialog: false,
            header:[
                {text: '#', align: 'start', sortable: 'true', value: 'codigo' },
                {text: 'Técnico', value: 'tecnicoCodigo'},
                {text: 'Cliente', value: 'clienteCodigo'},
                {text: 'Solicitante', value: 'solicitante'},
                {text: 'Relato', value: 'relato'},
                {text: 'Data', value: 'data'},
                {text: 'Ações', value: 'actions', sortable: false}
            ]
        }
    },
    methods:{
        loadAtendimentos(){
            this.$store.dispatch('loadAtendimentos')
        },
    },
    created(){
        this.loadAtendimentos()
    },
    computed:{
        atendimentos(){
            return this.$store.getters.atendimentos
        }
    }
}
</script>