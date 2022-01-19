<template>
    <main id="main">
        <div class="container">
            <h2 class="title">Cadastrar Atendimento</h2>
            <form class="row g-3">
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
                    <label for="solicitante" class="form-label">Solicitante</label>
                    <v-text-field type="text" maxlength="255" name='solicitante' outlined dense autocomplete="off"
                    id="solicitante" :rules="[rules.nome]" v-model="solicitante"></v-text-field>
                </div>
                <div class="col-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="5" v-model="relato" maxlength="399" :rules="[rules.relato, rules.required]" 
                    outlined spellcheck="false" dense></v-textarea>
                </div>
                <div class="col-12">
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
            tecnico: {
                codigo:0, 
                nome:'Selecione o Tecnico', 
                telefone: '', 
                ativo: 1
            },
            cliente:{
                codigo: 0,
                fantasia:'Selecione o Cliente',
                telefone:'',
                cnpj: '',
                contato: '',
                ativo: 1
            }, 
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
        addAtendimento(){
            const atendimento = {
                tecnicoCodigo: this.tecnico.codigo,
                clienteCodigo: this.cliente.codigo,
                solicitante: this.solicitante,
                relato: this.relato,
                data: this.data
            }
            this.$http.post('atendimentos.json', atendimento).then(
                () => {
                    this.clean()
                }
            )
        },
        clean(){
            this.solicitante='',
            this.relato=''
        }
    },
    computed:{
        tecnicos(){
            return this.$store.getters.tecnicos
        },
        clientes(){
            return this.$store.getters.clientes
        },
        shortFuncionario(){
            if(this.solicitante.length > 0){
                return this.solicitante.length < 3
            }else{
                return this.solicitante.length > 0
            }
            
        },
        noTecnico(){
            return this.tecnico.nome == "Selecione o Tecnico"
        },
        noCliente(){
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
    },
    created(){
        this.loadTecnicos(),
        this.loadClientes()
    },
    beforeRouteLeave(to, from, next){
        if(this.relato == '' && this.tecnico.nome == 'Selecione o Tecnico' && this.cliente.fantasia == 'Selecione o Cliente'){
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