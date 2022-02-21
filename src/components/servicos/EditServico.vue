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
                        outlined spellcheck="false" dense autofocus></v-textarea>
                        <v-btn class="btn btn-red mt-5" :disabled=" noServico || shortServico" @click="editServico">Editar Serviço</v-btn>
                        <v-btn class="btn btn-black mt-5 ml-2" to="/servicos"> Voltar </v-btn>
                    </div>
                    <ErroBar></ErroBar>
                </form>
            </v-card-text>
        </div>
    </main>
</template>

<script>
const ErroBar = () => import('../templates/bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{
        ErroBar
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
                    this.$router.push('/servicos')
                }
            ).catch(
                () => {this.$store.commit('setErroBar', true)}
            )
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
        erroBar(){
            return this.$store.getters.erroBar
        },
        rules(){
            return this.$store.getters.rules
        }
    }
}
</script>