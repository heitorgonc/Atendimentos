<template>
    <v-card>
        <v-card-title class="form-title">
            <span>Cadastro de Técnico</span>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <label for="nome_tecnico" class="form-label">Nome:</label>
                    <v-text-field type="text" id="nome_tecnico" outlined dense v-model="nome" maxlength="255" 
                    :rules="[rules.required, rules.nome]" autocomplete="off" autofocus></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <label for="telefone_tecnico" class="form-label">Telefone:</label>
                    <v-text-field type="text" id="telefone_tecnico" v-model="telefone" maxlength="14" outlined dense 
                    :rules="[rules.telefone]" autocomplete="off" v-mask="telefoneMask"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
                        value="1" @click="ativo = 1" checked/>
                        <label class="form-check-label" for="inlineRadio1" @click="ativo = 1">Ativo</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" 
                        value="0" @click="ativo = 0"/>
                        <label class="form-check-label" for="inlineRadio2" @click="ativo = 0">Inativo</label>
                    </div>
                </v-col>
            </v-row>
            <div class="col-12">
                <v-btn class="btn btn-red" @click="addTecnico" :disabled="noNome || shortNome || shortTelefone">Cadastrar Técnico</v-btn>
                <v-btn class="btn btn-black ml-2" @click="cadTecDialog = false"> Voltar </v-btn>
            </div>
        </v-card-text>
        <SucessoBar></SucessoBar>
        <ErroBar></ErroBar>
    </v-card>
</template>

<script>
const SucessoBar = () => import('../bars/SucessoBar.vue')
const ErroBar = () => import('../bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{
        SucessoBar,
        ErroBar
    },
    data(){
        return{
            nome: '',
            telefone: '',
            ativo: 1
        }
    },
    methods:{
        addTecnico(){
            const tecnico = {
                nome: this.nome,
                telefone: this.telefone.replace(/[^\d]+/g,''),
                ativo: this.ativo
            }
            axios({
                method: 'post',
                url: `${this.baseUrl}tecnicos.json`,
                data: tecnico,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then(
                () => {
                    this.loadTecnicos(),
                    this.$store.commit('setSucessoBar', true),
                    this.clear()
                }
            ).catch(() => {this.$store.commit('setErroBar', true)})
        },
        loadTecnicos(){
            const pagination = {
                page: 1,
                search: '',
                ativo: 1,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listTecnicos', pagination)
            .catch(() => this.$store.commit('setErroBar', true))
        },
        clear(){
            this.nome = "",
            this.telefone = "",
            this.ativo = 1
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
        telefoneMask(){
            return this.$store.getters.telefoneMask
        },
        noNome(){
            return this.nome == ''
        },
        shortNome(){
            return this.nome.length < 2
        },
        shortTelefone(){
            if(this.telefone.length > 0){
                return this.telefone.length < 14
            }else{
                return this.telefone.length > 0
            }
        },
        rules(){
            return this.$store.getters.rules
        },
        cadTecDialog:{
            get(){
                return this.$store.getters.cadTecDialog
            },
            set(cadTecDialog){
                this.$store.commit('setCadTecDialog', cadTecDialog)
            }
        },
        sucessoBar(){
            return this.$store.getters.sucessoBar
        },
        erroBar(){
            return this.$store.getter.erroBar
        }
    }
}
</script>