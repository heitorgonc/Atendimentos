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
                            <v-text-field outlined dense placeholder="Usuário" v-model="usuario" :rules="[rules.required, rules.nome]" 
                            spellcheck="false"></v-text-field>
                            <v-text-field outlined dense placeholder="Senha" @click:append="show = !show" v-model="senha" 
                            :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" :type="show ? 'text' : 'password'" 
                            :rules="[rules.required, rules.nome]"></v-text-field>
                            <v-btn :disabled="noUsuario || shortUsuario|| noSenha || shortSenha"
                            class="btn btn-red mt-5"  @click="loginUser">Entrar</v-btn>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
            <ErroBar></ErroBar>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios';
const ErroBar = () => import('../templates/bars/ErroBar.vue')

export default {
    components:{
        ErroBar
    },
    data(){
        return{
            usuario: 'severo',
            senha: '123',
            show: false
        }
    },
    methods:{
        loginUser(){
            const formData = new FormData()
            formData.append('usuario', this.usuario)
            formData.append('senha', this.senha)
            axios({
                method: "post",
                url: `${this.baseUrl}login`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(
                resp => {
                    const token = resp.data.access_token
                    const tokenType = resp.data.token_type
                    const codTec = resp.data.tecnico.codigo
                    if(token){
                        this.$store.commit('setToken', token)
                        this.$store.commit('setTokenType', tokenType)
                        this.$store.commit('setCodTec', codTec)
                        this.$router.push('/atendimentos')
                    }
                }
            ).catch(() => this.$store.commit('setErroBar', true))
        }
    },
    computed:{
        rules(){
            return this.$store.getters.rules
        },
        baseUrl(){
            return this.$store.getters.baseUrl
        },
        erroBar(){
            return this.$store.getter.erroBar
        },
        noUsuario(){
            return this.usuario == ''
        },
        shortUsuario(){
            return this.usuario.length < 2
        },
        noSenha(){
            return this.senha == ''
        },
        shortSenha(){
            return this.senha.length < 2
        }
    }
}
</script>