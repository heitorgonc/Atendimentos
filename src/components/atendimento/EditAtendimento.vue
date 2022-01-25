<template>
    <main id="main">
        <div class="container">
            <h1 class="title">Editar Atendimento</h1>
            <form class="row g-3">
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
                    <v-menu offset-y>
                        <template v-slot:activator="{on, attrs}">
                            <v-card  outlined class="pa-2" v-bind="attrs" v-on="on">
                                <v-layout justify-space-between>
                                    <span v-text="cliente.fantasia"></span>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-layout>
                            </v-card>
                        </template>
                        <v-list>
                            <v-list-item v-for="(cli, i) in clientes" :key="i" class="list-item" @click="cliente=cli">
                                <v-list-item-title v-text="cli.fantasia"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
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
                    <v-menu offset-y>
                        <template v-slot:activator="{on, attrs}">
                            <v-card v-bind="attrs" v-on="on" outlined class="pa-2">
                                <v-layout justify-space-between>
                                    <span v-text="tecnico.nome"></span>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-layout>
                            </v-card>
                        </template>
                        <v-list>
                            <v-list-item v-for="(tec, i) in tecnicos" :key="i" class="list-item" @click="tecnico=tec">
                                <v-list-item-title v-text="tec.nome"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div class="col-md-12">
                    <label for="solicitante" class="form-label">Solicitante:</label>
                    <v-text-field type="text" maxlength="255" name='solicitante' outlined dense autocomplete="off"
                    id="solicitente" :rules="[rules.nome]" v-model="solicitante"></v-text-field>
                </div>
                <div class="col-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="5" v-model="relato" :rules="[rules.relato, rules.required]" 
                    maxlength="399" outlined spellcheck="false" dense></v-textarea>
                </div>
                <div class="col-12">
                    <v-btn class="btn btn-red mt-5" :disabled="shortRelato || noRelato || noTecnico || tecnicoNotSelected ||
                    noCliente || clienteNotSelected" @click="editAtendimento"
                    >Atualizar Atendimento</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/atendimentos"> Voltar </v-btn>
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
            tecnico: this.$route.query.atendimento.tecnico,
            cliente: this.$route.query.atendimento.cliente,
            relato: this.$route.query.atendimento.relato,
            solicitante: this.$route.query.atendimento.solicitante,
            data: new Date(),
        }
    },
    methods:{
        editAtendimento(){
            const atendimento = {
                codigo: this.codigo,
                tecnico: this.tecnico.codigo,
                cliente: this.cliente.codigo,
                solicitante: this.solicitante,
                relato: this.relato,
                data: this.data
            }
            this.$http.put(`atendimentos/${atendimento.codigo}.json`, atendimento).then(
                ()=>{
                    alert('Sucesso')
                    this.$router.push('/atendimentos')
                }
            ).catch(
                () => {
                    alert('Erro')
                }
            )
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
        clientes(){
            return this.$store.getters.clientes
        },
        tecnicos(){
            return this.$store.getters.tecnicos
        },
        shortSolicitante(){
            if(this.solicitante.length > 0){
                return this.solicitante.length < 3
            }else{
                return this.solicitante.length > 0
            }
            
        },
        noTecnico(){
            return this.tecnico.nome == ""
        },
        tecnicoNotSelected(){
            return this.tecnico.nome == "Selecione o Técnico"
        },
        noCliente(){
            return this.cliente.fantasia == ""
        },
        clienteNotSelected(){
            return this.cliente.fantasia == "Selecione o Cliente"
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