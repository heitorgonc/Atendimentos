<template>
    <main id="main">
        <div class="container">
            <h1 class="title">Editar Atendimento</h1>
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
                    <v-select outlined dense id="canal" :items="canais" item-text="nome" item-value="nome" v-model="canal"></v-select>
                </div>
                <div class="col-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="5" v-model="relato" :rules="[rules.relato, rules.required]"
                    maxlength="399" outlined spellcheck="false" dense></v-textarea>
                    <v-btn class="btn btn-red mt-5" :disabled="shortRelato || noRelato || noTecnico || noCliente" 
                    @click="editAtendimento">Atualizar Atendimento</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos">Voltar</v-btn>
                </div>
            </form>
            <ErroBar></ErroBar>
        </div>
    </main>
</template>

<script>
const SelectTec = () => import('../templates/inputs/SelectTec.vue')
const SelectCli = () => import('../templates/inputs/SelectCli.vue')
const ErroBar = () => import('../templates/bars/ErroBar.vue')

export default {
    components:{
        SelectTec,
        SelectCli,
        ErroBar
    },
    data(){
        return{
            codigo: this.$route.query.atendimento.codigo,
            relato: this.$route.query.atendimento.relato,
            solicitante: this.$route.query.atendimento.solicitante,
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
        editAtendimento(){
            const atendimento = {
                codigo: this.codigo,
                tecnico: this.codTec,
                cliente: this.codCli,
                solicitante: this.solicitante,
                relato: this.relato,
                canal: this.canal,
                data: this.data
            }
            this.$http.put(`atendimentos/${atendimento.codigo}.json`, atendimento).then(
                () => { this.$router.push('/atendimentos') }
            ).catch(
                () => { this.erroBar = true }
            )
        }
    },
    computed:{
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
        this.$store.commit('setCodCli', 0)
        next()
    }
}
</script>