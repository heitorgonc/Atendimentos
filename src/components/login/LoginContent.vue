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
                            <!-- <v-row>
                                <v-select dense :items="tecnicos" v-model="tecnicoSelected" placeholder="Técnico" outlined hide-selected></v-select>
                            </v-row>
                            <v-row>
                                <v-btn block color="red darken-1" class="btn" :disabled="noSelect" to="/atendimentos">Entrar</v-btn>
                            </v-row> -->
                            <v-row>
                                <v-menu offset-y>
                                    <template v-slot:activator="{on, attrs}">
                                        <v-card  outlined class="pa-2" v-bind="attrs" v-on="on">
                                            <v-layout justify-space-between>
                                                <span v-text="tecnico.nome"></span>
                                                <v-icon>mdi-chevron-down</v-icon>
                                            </v-layout>
                                        </v-card>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(tec, i) in tecnicos" :key="i" class="list-item" @click="tecnico=tec">
                                            <v-list-item-title v-text="tec.nome"></v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn class="btn btn-red mt-5" v-bind="attrs" v-on="on" :disabled="noTecnico" to="/atendimentos">
                                    Entrar
                                </v-btn>
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
    data(){
        return{
            tecnico: {
                codigo:0, 
                nome:'Selecione o Técnico', 
                telefone: '', 
                ativo: 1
            }
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
        },
        noTecnico(){
            return this.tecnico.nome == "Selecione o Técnico"
        }
    },
    created(){
        this.loadTecnicos()
    }
}
</script>