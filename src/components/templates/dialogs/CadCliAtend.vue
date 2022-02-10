<template>
    <v-card>
        <v-card-title>
            <span>Cadastro de Cliente</span>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <label for="fantasia_cliente" class="form-label">Fantasia:</label>
                    <v-text-field type="text" id="fantasia_cliente" outlined dense v-model="fantasia" maxlength="255" 
                    :rules="[rules.required, rules.nome]" autocomplete="off"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <label for="telefone_cliente" class="form-label">Telefone:</label>
                    <v-text-field type="text" id="telefone_cliente" v-model="telefone" maxlength="14" :rules="[rules.telefone]" 
                    dense outlined autocomplete="off" v-mask="telefoneMask"></v-text-field>
                </v-col>
                <v-col class="col-md-6">
                    <label for="cnpj" class="form-label">CNPJ:</label>
                    <v-text-field type="text" outlined dense v-model="cnpj" maxlength="18" id="cnpj_cliente" 
                    :rules="[rules.cnpj]" autocomplete="off" v-mask='cnpjMask'></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <label for="contato" class="form-label">Contato:</label>
                    <v-text-field type="text" outlined dense maxlength="255" name='contato' id="contato" v-model="contato"/>
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
                <button class="btn btn-red mt-5" :disabled="noFantasia || shortCnpj ||shortTelefone || shortFantasia"
                @click="addCliente">Cadastrar Cliente</button>
                <a class="btn btn-dark mt-5 ml-2" @click="cadCliDialog = false"> Voltar </a>
            </div>
        </v-card-text>
        <SucessoBar></SucessoBar>
        <ErroBar></ErroBar>
    </v-card>
</template>

<script>
const SucessoBar = () => import('../bars/SucessoBar.vue')
const ErroBar = () => import('../bars/ErroBar.vue')
export default {
    components:{
        SucessoBar,
        ErroBar
    },
    data(){
        return{
            telefone: '',
            fantasia: '',
            cnpj: '',
            contato: '',
            ativo: 1
        }
    },
    methods:{
        addCliente(){
            const cliente = {
                fantasia: this.fantasia,
                telefone: this.telefone.replace(/[^\d]+/g,''),
                cnpj: this.cnpj.replace(/[^\d]+/g,''),
                contato: this.contato,
                ativo: this.ativo
            }
            this.$http.post('clientes.json', cliente).then(
                this.sucessoBar = true,
                this.loadClientes(),
                this.cadCliDialog = false
            ).catch(
                () => {
                    this.erroBar = true
                }
            )
        },
        loadClientes(){
            const pagination = {
                page: 1
            }
            this.$store.dispatch('loadClientes', pagination).catch(() => this.erroBar = true)
        }
    },
    computed:{
        telefoneMask(){
            return this.$store.getters.telefoneMask
        },
        cnpjMask(){
            return this.$store.getters.cnpjMask
        },
        cadCliDialog:{
            get(){
                return this.$store.getters.cadCliDialog
            },
            set(cadCliDialog){
                this.$store.commit('setCadCliDialog', cadCliDialog)
            }
        },
        rules(){
            return this.$store.getters.rules
        },
        shortCnpj(){
            if(this.cnpj.length > 0){
                return this.cnpj.length < 18
            }else{
                return this.cnpj.length > 0
            }
        },
        shortTelefone(){
            if(this.telefone.length > 0){
                return this.telefone.length < 14
            }else{
                return this.telefone.length > 0
            }
            
        },
        noFantasia(){
            return this.fantasia == ''
        },
        shortFantasia(){
            if(this.fantasia.length > 0){
                return this.fantasia.length < 2
            }else{
                return this.fantasia.length > 0
            }
        },
        sucessoBar:{
            get(){
                return this.$store.getters.sucessoBar
            },
            set(sucessoBar){
                return this.$store.commit('setSucessoBar', sucessoBar)
            }
        },
        erroBar:{
            get(){
                return this.$store.getter.erroBar
            },
            set(erroBar){
                return this.$store.commit('setErroBar', erroBar)
            }
        }
    }
}
</script>