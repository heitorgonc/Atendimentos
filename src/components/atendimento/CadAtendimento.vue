<template>
    <main id="main">
        <div class="container">
            <h2 class="title">Cadastrar Atendimento</h2>
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
                    <v-select outlined dense id="canal" :items="canais" item-text="nome" item-value="nome" v-model="canal"></v-select>
                </div>
                <div class="col-md-12">
                    <SelectServico></SelectServico>
                </div>
                <div class="col-md-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="5" v-model="relato" maxlength="399" :rules="[rules.relato, rules.required]" 
                    outlined spellcheck="false" dense></v-textarea>
                    <v-btn class="btn btn-red mt-5" :disabled="noTecnico || noCliente || noRelato || shortRelato || shortSolicitante"
                    @click="addAtendimento">Gravar Atendimento</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos"> Voltar </v-btn>
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

export default {
    components:{
        SucessoBar, ErroBar, SelectTec, SelectCli, SelectServico
    },
    data(){
        return {
            servico: 'Personalizado',
            solicitante: 'Funcionário',
            data: new Date(),
            canal: 'Presencial',
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
                canal: this.canal
            }
            this.$http.post('atendimentos.json', atendimento).then(
                () => {
                    this.sucessoBar = true
                    this.clean()
                }
            ).catch(
                () => { this.erroBar = true }
            )
        },
        clean(){
            this.solicitante='Funcionário',
            this.relato=''
        },
        loadServicos(){
            const pagination = {
                page: 1
            }
            this.$store.dispatch('loadServicos', pagination).catch(() => this.erroBar = true )
        }
    },
    computed:{
        relato:{
            get(){
              return this.$store.getters.relato
            },
            set(relato){
                this.$store.commit('setRelato', relato)
            }  
        },
        shortSolicitante(){
            if(this.solicitante.length > 0){
                return this.solicitante.length < 3
            }else{
                return this.solicitante.length > 0
            }
        },
        noTecnico(){
            return this.tecnico == 0
        },
        noCliente(){
            return this.cliente == 0
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
        codTec(){
            return this.$store.getters.codTec
        },
        codCli(){
            return this.$store.getters.codCli
        }
    },
    created(){
        this.loadServicos()
    }
}
</script>