<template>
    <v-container fluid class="page pa-0 ma-0">
        <div class="img-container">
            <div>
                <v-img src="../../assets/imgs/logos/logo-hypersoft.svg" ></v-img>
            </div>
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
                    <v-form>
                        <v-container fluid>
                            <v-row>
                                <v-select v-model="codLogin" :items="tecAtivos" item-text="nome" item-value="codigo" hide-selected
                                placeholder="Selecione o Técnico" outlined dense></v-select>
                                <v-btn class="btn btn-red mt-5"  to="/atendimentos" :disabled="noTecnico">Entrar</v-btn>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    methods:{
        loadTecnicos(){
            this.$store.dispatch('loadTecnicos')
        }
    },
    computed:{
        tecAtivos(){
            return this.$store.getters.tecAtivos
        },
        codLogin:{
            get(){
                return this.$store.getters.codLogin
            },
            set(codTec){
                this.$store.commit('setCodLogin', codTec)
            }
            
        },
        noTecnico(){
            return this.codTec == 0
        }
        
    },
    created(){
        this.loadTecnicos()
    }
}
</script>