<template>
    <main id="main">
        <div class="container">
            <v-card-title>
                <v-layout justify-center><h4 class="title">Cadastrar Serviço</h4></v-layout>
            </v-card-title>
            <v-card-text>
                <form class="row g-3">
                    <div class="col-md-12">
                        <label for="servico" class="form-label">Serviço</label>
                        <v-textarea id="servico" rows="5" v-model="servico" maxlength="399" :rules="[rules.relato, rules.required]" 
                        outlined spellcheck="false" dense autofocus></v-textarea>
                        <v-btn class="btn btn-red mt-5" :disabled=" noServico || shortServico" @click="addServico">Gravar Serviço</v-btn>
                        <v-btn class="btn btn-black mt-5 ml-2" to="/servicos"> Voltar </v-btn>
                    </div>
                    <SucessoBar></SucessoBar>
                    <ErroBar></ErroBar>
                </form>
            </v-card-text>
        </div>
    </main>
</template>

<script>
const SucessoBar = () => import('../templates/bars/SucessoBar.vue')
const ErroBar = () => import('../templates/bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{
        SucessoBar, ErroBar
    },
    data(){
        return{
            servico: ''
        }
    },
    methods:{
        addServico(){
            const servico = {
                servico: this.servico
            }
            axios({
                method: 'post',
                url: `${this.baseUrl}servicos.json`,
                data: servico,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then(
                () => {
                    this.$store.commit('setSucessoBar', true)
                    this.servico = ''
                }
            ).catch(() => {this.$store.commit('setErroBar', true)})
        }
    },
    computed:{
        baseUrl(){
            return this.$store.getters.baseUrl
        },
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        noServico(){
            return this.servico == ""
        },
        shortServico(){
            if(this.servico.length > 0){
                return this.servico.length < 10
            }else{
                return this.servico.length > 0
            }
        },
        sucessoBar(){
            return this.$store.getters.sucessoBar
        },
        erroBar(){
            return this.$store.getters.erroBar
        },
        rules(){
            return this.$store.getters.rules
        }
    }
}
</script>