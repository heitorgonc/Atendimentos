<template>
    <v-container fluid class="content pa-0 ma-0">
        <div class="container">
            <h1 class="title">Técnicos Hypersoft</h1>
            <template>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa"
                            single-line hide-details @input="change"></v-text-field>
                            <v-col cols="12" sm="2">
                                <v-select v-model="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="change"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="tecnicos"  class="elevation-1 mt-5" :search="search" dense :items-per-page="itemsPerPage" 
                    hide-default-footer :page.sync="page" @page-count="pageCount = $event">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn :to="{ name: 'editarTecnico', params:{codigo: item.codigo}, query:{tecnico: item}}" 
                            class="edit" plain icon>
                                <v-icon small>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                    <div class="text-center pt-2 pb-2">
                        <v-pagination v-model="page" :length="maxPage" @input="loadTecnicos"></v-pagination>
                    </div>
                </v-card>
            </template>
            <div class="col-12">
                <v-btn class="btn btn-red mt-5" to="/tecnicos/cadastro">Cadastrar Técnico</v-btn>
                <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos">Voltar</v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            search: '',
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'codigo',
                },
                { text: 'Nome', value: 'nome' },
                { text: 'Telefone', value: 'telefone' },
                {text: 'Ações', value: 'actions', sortable: false}
            ],
            
        }
    },
    methods:{
        loadTecnicos(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
                search: this.search
            }
            this.$store.dispatch('loadTecnicos', pagination).catch(() => this.erroBar = true)
        },
        change(){
            this.page = 1
            this.loadTecnicos()
        }
    },
    computed:{
        tecnicos(){
            return this.$store.getters.tecnicos
        },
        page:{
            get(){
                return this.$store.getters.page
            },
            set(page){
                this.$store.commit('setPage', page)
            }
        },
        itemsPerPage:{
            get(){
                return this.$store.getters.itemsPerPage
            },
            set(itemsPerPage){
                this.$store.commit('setItemsPerPage', itemsPerPage)
            }
        },
        maxPage(){
            return this.$store.getters.maxPage
        },
        erroBar:{
            get(){
                return this.$store.getters.erroBar
            },
            set(erroBar){
                this.$store.commit('setErroBar', erroBar)
            }
        }
    },
    created(){
        this.loadTecnicos()
    },
    beforeRouteLeave(to, from, next){
        this.page = 1
        this.itemsPerPage = 5
        next()
    }
}
</script>