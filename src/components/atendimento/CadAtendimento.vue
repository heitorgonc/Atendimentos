<template>
    <main id="main">
        <div class="container">
            <h2 class="title">Cadastrar Atendimento</h2>
            <form class="row g-3">
                <div class="col-md-6">
                    <v-layout justify-space-between>
                        <label for="tecnico" class="form-label">Técnico</label>
                        <v-dialog v-model="cadTecDialog" persistent max-width="600px">
                            <template v-slot:activator="{on, attrs}">
                                <span class="btn-dialog" v-bind="attrs" v-on="on">
                                    Deseja criar um novo técnico ?
                                </span>
                            </template>
                            <CadTecAtend></CadTecAtend>
                        </v-dialog>
                    </v-layout>
                    <v-select :items="tecAtivos" item-text="nome" hide-selected item-value="codigo" placeholder="Selecione o Técnico"
                    v-model="codTec" outlined dense id="tecnico"></v-select>
                </div>
                <div class="col-md-6">
                    <v-layout justify-space-between>
                        <label for="cliente" class="form-label">Razão Social</label>
                        <v-dialog v-model="cadCliDialog" persistent max-width="600px">
                            <template v-slot:activator="{on, attrs}">
                                <span class="btn-dialog" v-bind="attrs" v-on="on">
                                    Deseja criar um novo cliente ?
                                </span>
                            </template>
                            <CadClienteAtend></CadClienteAtend>
                        </v-dialog>
                    </v-layout>
                    <v-select :items="cliAtivos" item-text="fantasia" hide-selected item-value="codigo" placeholder="Selecione o Cliente"
                    v-model="codCli" outlined id="cliente" dense></v-select>
                </div>
                <div class="col-md-12">
                    <label for="solicitante" class="form-label">Solicitante</label>
                    <v-text-field type="text" maxlength="255" outlined dense autocomplete="off"
                    id="solicitante" :rules="[rules.nome]" v-model="solicitante"></v-text-field>
                </div>
                <div class="col-md-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="5" v-model="relato" maxlength="399" :rules="[rules.relato, rules.required]" 
                    outlined spellcheck="false" dense></v-textarea>
                    <v-btn class="btn btn-red mt-5" :disabled="noTecnico || noCliente || noRelato || shortRelato || shortFuncionario"
                    @click="addAtendimento">Gravar Atendimento</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos"> Voltar </v-btn>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
const CadClienteAtend = () => import('../templates/dialogs/CadClienteAtend.vue')
const CadTecAtend = () => import('../templates/dialogs/CadTecAtend.vue')

export default {
    components:{
        CadClienteAtend,
        CadTecAtend
    },
    data(){
        return {
            solicitante: '',
            codCli: 0,
            codTec: 0,
            relato: '',
            data: new Date()
        }
    },
    methods:{
        loadTecnicos(){
            this.$store.dispatch('loadTecnicos')
        },
        loadClientes(){
            this.$store.dispatch('loadClientes')
        },
        loadCodLogin(){
            this.codTec = this.$store.getters.codLogin
        },
        addAtendimento(){
            const atendimento = {
                tecnico: this.codTec,
                cliente: this.codCli, 
                solicitante: this.solicitante,
                relato: this.relato,
                data: this.data
            }
            this.$http.post('atendimentos.json', atendimento).then(
                () => {
                    alert("Sucesso")
                    this.clean()
                }
            ).catch(error => console.log(error))
        },
        clean(){
            this.solicitante='',
            this.relato=''
        }
    },
    computed:{
        tecAtivos(){
            return this.$store.getters.tecAtivos
        },
        cliAtivos(){
            return this.$store.getters.cliAtivos
        },
        shortFuncionario(){
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
    },
    created(){
        this.loadTecnicos(),
        this.loadClientes(),
        this.loadCodLogin()
    },
    beforeRouteLeave(to, from, next){
        if(this.relato == ''){
            next()
        }else{
            if(confirm('Seus dados serão perdidos, tem certeza disso ?')){
                next()
            }else{
                next(false)
            }
        }
    }
}
</script>