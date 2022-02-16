<template>
    <main id="main">
        <div class="container">
            <h4 class="title">Editar Atendimento</h4>
            <form class="row g-3">
                <div class="col-md-6">
                    <SelectTec></SelectTec>
                </div>
                <div class="col-md-6">
                    <SelectCli></SelectCli>
                </div>
                <div class="col-md-6">
                    <label for="solicitante" class="form-label">Solicitante:</label>
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
                <div class="col-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="3" v-model="relato" :rules="[rules.relato, rules.required]"
                    maxlength="399" outlined spellcheck="false" dense></v-textarea>
                    <v-btn class="btn btn-red" :disabled="shortRelato || noRelato || noTecnico || noCliente" 
                    @click="editAtendimento">Atualizar Atendimento</v-btn>
                    <v-btn class="btn btn-black ml-2" to="/atendimentos">Voltar</v-btn>
                </div>
            </form>
            <ErroBar></ErroBar>
        </div>
    </main>
</template>

<script>
const SelectTec = () => import('../templates/inputs/SelectTec.vue')
const SelectCli = () => import('../templates/inputs/SelectCli.vue')
const SelectServico = () => import('../templates/inputs/SelectServico.vue')
const ErroBar = () => import('../templates/bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{
        SelectTec, SelectCli, ErroBar, SelectServico
    },
    data(){
        return{
            codigo: this.$route.query.atendimento.codigo,
            relato: this.$route.query.atendimento.relato,
            solicitante: this.$route.query.atendimento.solicitante,
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
        editAtendimento(){
            const atendimento = {
                codigo: this.codigo,
                tecnico: this.codTec,
                cliente: this.codCli,
                solicitante: this.solicitante,
                relato: this.relato,
                canalComunicacao: this.canal,
                data: this.data
            }
            axios({
                method: 'put',
                url: `${this.baseUrl}atendimentos/${atendimento.codigo}.json`,
                data: atendimento,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then(
                () => { this.$router.push('/atendimentos') }
            ).catch(
                () => { this.erroBar = true }
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
        shortSolicitante(){
            if(this.solicitante.length > 0){
                return this.solicitante.length < 3
            }else{
                return this.solicitante.length > 0
            }
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
            }else{
                return this.relato.length > 0
            }
        },
        rules(){
            return this.$store.getters.rules
        },
        erroBar:{
            get(){
                return this.$store.getters.erroBar
            },
            set(erroBar){
                this.$store.commit('setErroBar', erroBar)
            }
        },
        codTec:{
            get(){
                return this.$store.getters.codTec
            },
            set(codTec){
                this.$store.commit('setCodTec', codTec)
            }
        },
        codCli:{
            get(){
                return this.$store.getters.codCli
            },
            set(codCli){
                this.$store.commit('setCodCli', codCli)
            }
        }
    },
    created(){
        this.codTec = this.$route.query.atendimento.tecnico.codigo
        this.codCli = this.$route.query.atendimento.cliente.codigo
    },
    beforeRouteLeave(to, from, next){
        this.$store.commit('setCodTec', 0)
        this.$store.commit('setCodCli', 0)
        next()
    }
}
</script>