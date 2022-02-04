<template>
    <v-container fluid class="page pa-0 ma-0">
        <div class="img-container">
            <div><v-img src="../../assets/imgs/logos/logo-hypersoft.svg" ></v-img></div>
        </div>
        <div class="form-container">
            <v-card flat class="form" color="transparent">
                <v-card-title class="mb-5">
                    <v-layout justify-start align-center>
                        <span class="form-title">Bem vindo a Hypersoft Atendimentos!</span>
                        <div class="ml-2">
                            <v-img src="https://img.icons8.com/plasticine/48/000000/customer-support.png" max-width="40px"></v-img>
                        </div>
                    </v-layout>
                    <span class="form-subtitle mt-3"> Mais do que desenvolver sistemas, nós criamos soluções!</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-autocomplete v-model="codLogin" :loading="loading" :items="tecAtivos" item-text="nome" item-value="codigo" :search-input.sync="search" 
                            cache-items hide-no-data hide-details placeholder="Selecione o Técnico" outlined dense></v-autocomplete>
                            <v-btn class="btn btn-red mt-5"  to="/atendimentos" :disabled="noTecnico">Entrar</v-btn>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            search: '',
            loading: false
        }
    },
    methods:{
        loadTecAtivos(){
            const pagination = {
                page: 1,
                ativo: 1,
                nome: this.search
            }
            this.$store.dispatch('loadTecAtivos', pagination)
        },
        tecLogin(tec){
            this.codLogin = tec.codigo
            this.search = tec.nome
            this.loadTecAtivos()
        },
        keyPress(){
            this.codLogin = 0
            this.loadTecAtivos()
        }
    },
    computed:{
        codLogin:{
            get(){
                return this.$store.getters.codLogin
            },
            set(codLogin){
                this.$store.commit('setCodLogin', codLogin)
            }
        },
        codTec:{
            get(){
                return this.$store.getters.codTec
            },
            set(codTec){
                this.$store.commit('setCodTec', codTec)
            }
        },
        noTecnico(){
            return this.codLogin == 0
        },
        tecAtivos(){
            return this.$store.getters.tecAtivos
        }
    },
    created(){
        this.loadTecAtivos()
    }
}
</script>