<template>
    <main id="main">
        <div class="container">
            <h4 class="title">Cadastrar Atendimento</h4>
            <form class="row g-3">
                <div class="col-md-6">
                    <SelectTec></SelectTec>
                </div>
                <div class="col-md-6">
                    <SelectCli></SelectCli>
                </div>
                <div class="col-md-6">
                    <label for="solicitante" class="form-label">Solicitante</label>
                    <v-text-field type="text" maxlength="255" outlined dense autocomplete="off"
                    id="solicitante" :rules="[rules.nome]" v-model="solicitante"></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="canal" class="form-label">Canal de Comunicação</label>
                    <v-select outlined dense id="canal" :items="canais" item-text="nome" item-value="nome" v-model="canal"
                    hide-selected></v-select>
                </div>
                <div class="col-md-12">
                    <SelectServico></SelectServico>
                </div>
                <div class="col-md-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="3" v-model="relato" maxlength="399" :rules="[rules.relato, rules.required]" 
                    outlined spellcheck="false" dense></v-textarea>
                    <v-btn class="btn btn-red" :disabled="noTecnico || noCliente || noRelato || shortRelato || shortSolicitante"
                    @click="addAtendimento">Gravar Atendimento</v-btn>
                    <v-btn class="btn btn-black ml-2" to="/atendimentos"> Voltar </v-btn>
                </div>
                <SucessoBar></SucessoBar>
                <ErroBar></ErroBar>
            </form>
        </div>
    </main>
</template>

<script>
const SelectTec = () => import('../templates/inputs/SelectTec.vue')
const SelectCli = () => import('../templates/inputs/SelectCli.vue')
const SelectServico = () => import('../templates/inputs/SelectServico.vue')
const SucessoBar = () => import('../templates/bars/SucessoBar.vue')
const ErroBar = () => import('../templates/bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{
        SucessoBar, ErroBar, SelectTec, SelectCli, SelectServico
    },
    data(){
        return {
            servico: '',
            solicitante: 'Funcionário',
            data: new Date(),
            canal: 'Whatsapp',
            canais: [
                {codigo: 1, nome: 'Presencial'},
                {codigo: 2, nome: 'Whatsapp'},
                {codigo: 3, nome: 'Skype'}
            ]
        }
    },
    methods:{
        addAtendimento(){
            const atendimento = {
                tecnico: this.codTec,
                cliente: this.codCli, 
                solicitante: this.solicitante,
                relato: this.relato,
                data: this.data,
                canalComunicacao: this.canal
            }
            axios({
                method: 'post',
                url: `${this.baseUrl}atendimentos.json`,
                data: atendimento,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then(() => {
                    this.$store.commit('setSucessoBar', true)
                    this.$store.commit('setRelato', "")
                }
            ).catch(() => { this.$store.commit('setErroBar', true) })
        }
    },
    computed:{
        baseUrl(){
            return this.$store.getters.baseUrl
        },
        relato:{
            get(){
                return this.$store.getters.relato
            },
            set(relato){
                this.$store.commit('setRelato', relato)
            }
        },
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        sucessoBar(){
            return this.$store.getters.sucessoBar
        },
        erroBar(){
            return this.$store.getters.erroBar
        },
        codTec(){
            return this.$store.getters.codTec
        },
        codCli(){
            return this.$store.getters.codCli
        },
        shortSolicitante(){
            if(this.solicitante.length > 0){
                return this.solicitante.length < 2
            }
            else{return this.solicitante.length > 0}
        },
        noTecnico(){
            return this.codTec == 0
        },
        noCliente(){
            return this.codCli == 0
        },
        noRelato(){
            return this.relato == ""
        },
        shortRelato(){
            if(this.relato.length > 0){
                return this.relato.length < 10
            }
            else{return this.relato.length > 0}
        },
        rules(){return this.$store.getters.rules}
    }
}
</script>