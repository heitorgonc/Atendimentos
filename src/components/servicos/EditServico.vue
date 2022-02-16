<template>
    <main id="main">
        <div class="container">
            <v-card-title>
                <v-layout justify-center>
                    <h4 class="title">Editar Serviço</h4>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <form class="row g-3">
                    <div class="col-md-12">
                        <label for="servico" class="form-label">Serviço</label>
                        <v-textarea id="servico" rows="5" v-model="servico.servico" maxlength="399" :rules="[rules.relato, rules.required]" 
                        outlined spellcheck="false" dense></v-textarea>
                        <v-btn class="btn btn-red mt-5" :disabled=" noServico || shortServico" @click="editServico">Editar Serviço</v-btn>
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
            servico: this.$route.query.servico
        }
    },
    methods:{
        editServico(){
            const servico = this.servico
            axios({
                method: 'put',
                url: `${this.baseUrl}servicos/${servico.codigo}.json`,
                data: servico,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then(
                () => {
                    this.loadServicos()
                    this.$router.push('/servicos')
                }
            ).catch(
                () => {
                    this.erroBar = true
                }
            )
        },
        loadServicos(){
            const pagination = {
                page: 1,
                search: ''
            }
            this.$store.dispatch('loadServicos', pagination).catch(() => this.erroBar = true)
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
            return this.servico.servico == ""
        },
        shortServico(){
            if(this.servico.servico.length > 0){
                return this.servico.servico.length < 10
            }else{
                return this.servico.servico.length > 0
            }
        },
        sucessoBar:{
            get(){
                return this.$store.getters.sucessoBar
            },
            set(sucessoBar){
                this.$store.commit('setSucessoBar', sucessoBar)
            }
        },
        erroBar:{
            get(){
                return this.$store.getters.erroBar
            },
            set(erroBar){
                this.$store.commit('setErroBar', erroBar)
            }
        },
        rules(){
            return this.$store.getters.rules
        }
    }
}
</script>