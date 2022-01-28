<template>
    <main id="main">
        <div class="container">
            <h1 class="title">Editar Atendimento</h1>
            <form class="row g-3">
                <div class="col-md-6">
                    <v-layout justify-space-between>
                        <label for="selectTecnico" class="form-label">Técnico</label>
                        <v-dialog v-model="cadTecDialog" persistent max-width="600px">
                            <template v-slot:activator="{on, attrs}">
                                <span class="btn-dialog" v-bind="attrs" v-on="on">Deseja criar um novo Técnico ?</span>
                            </template>
                            <CadTecAtend></CadTecAtend>
                        </v-dialog>
                    </v-layout>
                    <v-select :items="tecAtivos" item-text="nome" hide-selected item-value="codigo" placeholder="Selecione o Técnico"
                    v-model="codTec" outlined dense id="tecnico"></v-select>
                </div>
                <div class="col-md-6">
                    <v-layout justify-space-between>
                        <label for="client" class="form-label">Razão Social</label>
                        <v-dialog v-model="cadCliDialog" persistent max-width="600px">
                            <template v-slot:activator="{on, attrs}">
                                <span class="btn-dialog" v-bind="attrs" v-on="on">Deseja criar um novo Cliente ?</span>
                            </template>
                            <CadCliAtend></CadCliAtend>
                        </v-dialog>
                    </v-layout>
                    <v-select :items="cliAtivos" item-text="fantasia" hide-selected item-value="codigo" placeholder="Selecione o Cliente"
                    v-model="codCli" outlined id="cliente" dense></v-select>
                </div>
                <div class="col-md-12">
                    <label for="solicitante" class="form-label">Solicitante:</label>
                    <v-text-field type="text" maxlength="255" outlined dense autocomplete="off"
                    id="solicitante" :rules="[rules.nome]" v-model="solicitante"></v-text-field>
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
        </div>
    </main>
</template>

<script>
const CadTecAtend = () => import('../templates/dialogs/CadTecAtend')
const CadCliAtend = () => import('../templates/dialogs/CadClienteAtend.vue')

export default {
    components:{
        CadTecAtend,
        CadCliAtend
    },
    data(){
        return{
            codigo: this.$route.query.atendimento.codigo,
            codTec: this.$route.query.atendimento.tecnico.codigo,
            codCli: this.$route.query.atendimento.cliente.codigo,
            relato: this.$route.query.atendimento.relato,
            solicitante: this.$route.query.atendimento.solicitante,
            data: new Date(),
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
                data: this.data
            }
            this.$http.put(`atendimentos/${atendimento.codigo}.json`, atendimento).then(
                ()=>{
                    alert('Sucesso')
                    this.$router.push('/atendimentos')
                }
            ).catch(error => console.log(error))
        },
        loadTecnicos(){
            this.$store.dispatch('loadTecnicos')
        },
        loadClientes(){
            this.$store.dispatch('loadClientes')
        }
    },
    created(){
        this.loadClientes(),
        this.loadTecnicos()
    },
    computed:{
        tecAtivos(){
            return this.$store.getters.tecAtivos
        },
        cliAtivos(){
            return this.$store.getters.cliAtivos
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
        cadCliDialog:{
            get(){
                return this.$store.getters.cadCliDialog
            },
            set(cadCliDialog){
                this.$store.commit('setCadCliDialog', cadCliDialog)
            }
        },
        cadTecDialog:{
            get(){
                return this.$store.getters.cadTecDialog
            },
            set(cadTecDialog){
                this.$store.commit('setCadTecDialog', cadTecDialog)
            }
        }
    }
}
</script>