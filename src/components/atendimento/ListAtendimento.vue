<template>
    <v-container fluid class="content pa-0 ma-0">
        <div class="container">
            <h4 class="title">Atendimentos Hypersoft</h4>
            <template>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-text-field v-model="searchCli" append-icon="mdi-magnify" label="Pesquisa por Cliente"
                            single-line hide-details @input="change" v-if="searchAtend == true"></v-text-field>
                            <v-text-field v-model="searchTec" append-icon="mdi-magnify" label="Pesquisa por Técnico"
                            single-line hide-details @input="change" v-else></v-text-field>
                            <v-col cols="12" sm="2">
                                <v-select v-model="searchAtend" label="Pesquisar por" type="boolean" hide-selected
                                :items="searchs" item-text="nome" item-value="valor" @input="clear"></v-select>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-select v-model="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="change"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="atendimentos"  class="elevation-1 mt-5" dense
                    :items-per-page="itemsPerPage" hide-default-footer :page.sync="page" @page-count="pageCount = $event" 
                    :sort-desc="true">
                        <template v-slot:[`item.data`]="{item}">
                            <span>
                                {{new Date(item.data).getDate()+'/'
                                +(new Date(item.data).getMonth()+1)+'/'
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
                        <v-pagination v-model="page" :length="maxPage" @input="listAtendimentos"></v-pagination>
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
            searchCli: '',
            searchTec: '',
            page: 1,
            itemsPerPage: 5,
            searchAtend: true,
            headers:[
                {text: '#', align: 'start', sortable: 'true', value: 'codigo' },
                {text: 'Técnico', value: 'tecnico.nome'},
                {text: 'Cliente', value: 'cliente.fantasia'},
                {text: 'Solicitante', value: 'solicitante'},
                {text: 'Relato', value: 'relato'},
                {text: 'Canal', value: 'canalComunicacao'},
                {text: 'Data', value: 'data'},
                {text: 'Ações', value: 'actions', sortable: false}
            ],
            searchs: [
                {nome: 'Cliente', valor: true},
                {nome: 'Técnico', valor: false}
            ]
        }
    },
    methods:{
        loadAtendimentos(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('loadAtendimentos', pagination).catch(() => this.erroBar = true)
        },
        change(){
            this.page = 1
            this.listAtendimentos()
        },
        listAtendimentos(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
                searchCli: this.searchCli,
                searchTec: this.searchTec,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listAtendimentos', pagination).catch(() => this.erroBar = true)
        },
        clear(){
            this.searchCli = ''
            this.searchTec = ''
        }
    },
    created(){
        this.listAtendimentos()
    },
    computed:{
        atendimentos(){
            return this.$store.getters.atendimentos
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
        },
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        }
    }
}
</script>