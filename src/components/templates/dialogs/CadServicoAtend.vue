<template>
    <v-card>
        <v-card-title>
            <v-layout justify-center>
                <h2 class="title">Cadastrar Serviço</h2>
            </v-layout>
        </v-card-title>
        <v-card-text>
            <form class="row g-3">
                <div class="col-md-12">
                    <label for="servico" class="form-label">Serviço</label>
                    <v-textarea id="servico" rows="5" v-model="servico" maxlength="399" :rules="[rules.relato, rules.required]" 
                    outlined spellcheck="false" dense autofocus></v-textarea>
                    <v-btn class="btn btn-red" :disabled=" noServico || shortServico" @click="addServico">Gravar Serviço</v-btn>
                    <v-btn class="btn btn-black ml-2" @click="cadServicoAtend = false"> Voltar </v-btn>
                </div>
                <SucessoBar></SucessoBar>
                <ErroBar></ErroBar>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
const SucessoBar = () => import('../bars/SucessoBar.vue')
const ErroBar = () => import('../bars/ErroBar.vue')
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
                    this.loadServicos()
                    this.$store.commit('setSucessoBar', true)
                    this.clear()
                }
            ).catch(() => {this.$store.commit('setErroBar', true)})
        },
        loadServicos(){
            const pagination = {
                page: 1,
                search: '',
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listServicos', pagination).catch(() => this.erroBar = true)
        },
        clear(){
            this.servico = ""
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
        cadServicoAtend:{
            get(){
                return this.cadServicoAtend
            },
            set(cadServicoAtend){
                this.$store.commit('setCadServicoAtend', cadServicoAtend)
            }
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