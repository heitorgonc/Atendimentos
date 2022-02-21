<template>
    <v-container fluid class="pa-0 ma-0">
        <div class="container">
            <h4 class="title">Serviços Frequentes</h4>
            <template>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa por Serviço"
                            single-line hide-details @input="change"></v-text-field>
                            <v-col cols="12" sm="2">
                                <v-select v-model="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="change"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Serviço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(servico, i) in servicos" :key="i">
                                    <td v-text="servico.servico"></td>
                                    <td>
                                        <v-btn :to="{ name: 'editarServico', params:{codigo: servico.codigo}, query:{servico: servico}}" 
                                        class="edit" plain icon>
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <div class="pt-2 pb-2">
                        <v-pagination v-model="page" :length="maxPage" @input="loadServicos"></v-pagination>
                    </div>
                </v-card>
            </template>
            <div class="col-12">
                <v-btn class="btn btn-red mt-5" to="/servicos/cadastro">Cadastrar Serviço</v-btn>
                <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos"> Voltar </v-btn>
            </div>
        </div>
        <ErroBar></ErroBar>
    </v-container>
</template>

<script>
const ErroBar = () => import('../templates/bars/ErroBar.vue')

export default {
    components:{ErroBar},
    data(){
        return {
            search: '',
            itemsPerPage: 5,
            page: 1
        }
    },
    methods:{
        loadServicos(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
                search: this.search,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listServicos', pagination)
            .catch(() => this.$store.commit('setErroBar', true))
        },
        change(){
            this.page = 1
            this.loadServicos()
        }
    },
    created(){
        this.loadServicos()
    },
    computed:{
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        servicos(){
            return this.$store.getters.servicos
        },
        maxPage(){
            return this.$store.getters.maxPage
        },
        erroBar(){
            return this.$store.getters.erroBar
        }
    }
}
</script>