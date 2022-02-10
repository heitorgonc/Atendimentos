<template>
    <v-container fluid class="pa-0 ma-0">
        <div class="container">
            <h1 class="title">Serviços Frequentes</h1>
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
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Relato</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(servico, i) in servicos" :key="i">
                                    <td v-text="servico.servico"></td>
                                    <td>
                                        <v-btn :to="{ name: 'editarServico', params:{codigo: servico.codigo}, query:{servico: servico}}" 
                                        class="edit" plain icon>
                                            <v-icon small>
                                                mdi-pencil
                                            </v-icon>
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
    </v-container>
</template>

<script>

export default {
    data(){
        return {
            search: ''
        }
    },
    methods:{
        loadServicos(){
            const pagination = {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
                search: this.search
            }
            this.$store.dispatch('loadServicos', pagination).catch(() => this.erroBar = true)
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
        servicos(){
            return this.$store.getters.servicos
        },
        maxPage(){
            return this.$store.getters.maxPage
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
                this.$store.commit('setPage', page)
            }
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
    beforeRouteLeave(to, from, next){
        this.itemsPerPage = 5
        this.page = 1
        next()
    }
}
</script>