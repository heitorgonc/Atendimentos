<template>
    <main class="main" id="main">
        <div class="container">
            <h4 class="title">Edição de Técnico</h4>
            <v-form class="row g-3">
                <div class="col-md-6">
                    <label for="nome_tecnico" class="form-label">Nome:</label>
                    <v-text-field type="text" id="nome_tecnico" outlined dense v-model="nome" maxlength="255" autofocus
                    :rules="[rules.required, rules.nome]" spellcheck="false" autocomplete="off"></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="telefone_tecnico" class="form-label">Telefone:</label>
                    <v-text-field type="text" id="telefone_tecnico" v-model="telefone" maxlength="14" v-mask="telefoneMask" 
                    outlined dense :rules="[rules.telefone]" autocomplete="off"></v-text-field>
                </div>
                <div class="col-md-6">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
                        value="1" @click="ativo = 1" checked v-if="ativo == 1"/>
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
                        value="1" @click="ativo = 1" v-else/>
                        <label class="form-check-label" for="inlineRadio1" @click="ativo = 1">Ativo</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" 
                        value="0" @click="ativo = 0" v-if="ativo == 0" checked/>
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" 
                        value="0" @click="ativo = 0" v-else/>
                        <label class="form-check-label" for="inlineRadio2" @click="ativo = 0">Inativo</label>
                    </div>
                </div>
                <div class="col-12">
                    <v-btn :disabled="noNome || shortNome || shortTelefone" class="btn btn-red mt-5"
                    @click="editTecnico">Editar Técnico</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/tecnicos">Voltar</v-btn>
                </div>
            </v-form>
            <ErroBar></ErroBar>
        </div>
    </main>
</template>

<script>
const ErroBar = () => import('../templates/bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{ErroBar},
    data(){
        return{
            codigo: this.$route.query.tecnico.codigo,
            nome: this.$route.query.tecnico.nome,
            telefone: this.$route.query.tecnico.telefone,
            ativo: this.$route.query.tecnico.ativo
        }
    },
    methods:{
        editTecnico(){
            const tecnico = {
                codigo: this.codigo,
                nome: this.nome,
                telefone: this.telefone.replace(/[^\d]+/g,''),
                ativo: this.ativo
            }
            axios({
                method: 'put',
                url: `${this.baseUrl}tecnicos/${tecnico.codigo}.json`,
                data: tecnico,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then(() => {this.$router.push('/tecnicos')})
            .catch(() => {this.$store.commit('setErroBar', true)})
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
        erroBar(){
            return this.$store.getter.erroBar
        }
    }
}
</script>