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
                                <v-select v-model="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="changeItemsPerPage"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="atendimentos"  class="elevation-1 mt-5" :search="search" dense :items-per-page="itemsPerPage" 
                    hide-default-footer :page.sync="page" @page-count="pageCount = $event" :sort-desc="true">
                        <template v-slot:[`item.data`]="{item}">
                            <span>
                                {{new Date(item.data).getDate()+'/'
                                +new Date(item.data).getMonth()+1+'/'
                                +new Date(item.data).getFullYear()+' '
                                +(new Date(item.data).getHours()-3)+':'
                                +new Date(item.data).getMinutes()}}
                            </span>
                        </template>
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
                        <v-pagination v-model="page" :length="maxPage" @input="loadAtendimentos"></v-pagination>
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
            pageCount: 0,
            search: '',
            headers:[
                {text: '#', align: 'start', sortable: 'true', value: 'codigo' },
                {text: 'Técnico', value: 'tecnico.nome'},
                {text: 'Cliente', value: 'cliente.fantasia'},
                {text: 'Solicitante', value: 'solicitante'},
                {text: 'Relato', value: 'relato'},
                {text: 'Data', value: 'data'},
                {text: 'Ações', value: 'actions', sortable: false}
            ]
        }
    },
    methods:{
        loadAtendimentos(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage
            }
            this.$store.dispatch('loadAtendimentos', pagination).catch(error => console.log(error))
        },
        changeItemsPerPage(){
            this.page = 1
            this.loadAtendimentos()
        }
    },
    created(){
        this.loadAtendimentos()
    },
    computed:{
        atendimentos(){
            return this.$store.getters.atendimentos
        },
        totalItems(){
            return this.$store.getters.totalItems
        },
        itemsPerPage:{
            get(){
                return this.$store.getters.itemsPerPage
            },
            set(itemsPerPage){
                this.$store.commit('setItemsPerPage', itemsPerPage)
            }
        },
        page:{
            get(){
                return this.$store.getters.page
            },
            set(page){
                return this.$store.commit('setPage', page)
            }
        },
        maxPage:{
            get(){
                return this.$store.getters.maxPage
            },
            set(maxPage){
                return this.$store.commit('setMaxPage', maxPage)
            }
        }
    }
}
</script>