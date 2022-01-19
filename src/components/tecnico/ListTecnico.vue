<template>
    <v-container fluid class="content pa-0 ma-0">
        <div class="container">
            <h1 class="title">Técnicos Hypersoft</h1>
            <template>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa rápida"
                            single-line hide-details></v-text-field>
                            <v-col cols="12" sm="2">
                                <v-select :value="itemsPerPage" label="Itens por página" type="number" hide-selected
                                :items="[5, 10, 25]" @input="itemsPerPage = parseInt($event, 10)"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="tecnicos" :search="search" class="elevation-1 mt-5" dense
                    :items-per-page="itemsPerPage" hide-default-footer :page.sync="page" @page-count="pageCount = $event"></v-data-table>
                    <div class="text-center pt-2 pb-2">
                        <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'codigo',
                },
                { text: 'Nome', value: 'nome' },
                { text: 'Telefone', value: 'telefone' },
            ],
                
        }
    },
    methods:{
        loadTecnicos(){
            this.$store.dispatch('loadTecnicos')
        }
    },
    computed:{
        tecnicos(){
            return this.$store.getters.tecnicos
        }
    },
    created(){
        this.loadTecnicos()
    }
}
</script>