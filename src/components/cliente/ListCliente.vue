<template>
    <v-container fluid class="content pa-0 ma-0">
        <div class="container">
            <h4 class="title">Clientes Hypersoft</h4>
            <template>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa por Fantasia do Cliente"
                            single-line hide-details @input="change"></v-text-field>
                            <v-col cols="12" sm="2">
                                <v-select v-model="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="change"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="clientes"  class="elevation-1 mt-5" :search="search" dense  
                    :items-per-page="itemsPerPage" hide-default-footer :page.sync="page" @page-count="pageCount = $event">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn :to="{ name: 'editarCliente', params:{codigo: item.codigo}, query:{cliente: item}}" 
                            class="edit" plain icon>
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                    <div class="text-center pt-2 pb-2">
                        <v-pagination v-model="page" :length="maxPage" @input="loadClientes"></v-pagination>
                    </div>
                </v-card>
            </template>
            <div class="col-12">
                <v-btn class="btn btn-red mt-5" to="/clientes/cadastro/">Cadastrar Cliente</v-btn>
                <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos/">Voltar</v-btn>
            </div>
            <ErroBar></ErroBar>
        </div>
    </v-container>
</template>

<script>
const ErroBar = () => import('../templates/bars/ErroBar.vue')

export default {
    components:{ ErroBar },
    data(){
        return{
            search:'',
            page: 1,
            itemsPerPage: 5,
            headers: [
                {text: '#', align: 'start', sortable: true, value: 'codigo'},
                { text: 'Fantasia', value: 'fantasia' },
                { text: 'Telefone', value: 'telefone' },
                { text: 'CPF/CNPJ', value: 'cnpj' },
                {text: 'Contato', value: 'contato'},
                {text: 'Ações', value: 'actions', sortable: false}
            ]
        }
    },
    methods:{
        loadClientes(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
                search: this.search,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listClientes', pagination)
            .catch(() => this.$store.commit('setErroBar', true))
        },          
        change(){
            this.page = 1,
            this.loadClientes()
        }
    },
    computed:{
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        clientes(){
            return this.$store.getters.clientes
        },
        maxPage(){
            return this.$store.getters.maxPage
        },
        erroBar(){
            return this.$store.getters.erroBar
        }
    },
    created(){
        this.loadClientes()
    }
}
</script>