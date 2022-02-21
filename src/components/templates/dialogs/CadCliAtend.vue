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
                    :rules="[rules.required, rules.nome]" autocomplete="off" autofocus></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <label for="telefone_cliente" class="form-label">Telefone:</label>
                    <v-text-field type="text" id="telefone_cliente" v-model="telefone" maxlength="14" :rules="[rules.telefone]" 
                    dense outlined autocomplete="off" v-mask="telefoneMask"></v-text-field>
                </v-col>
                <v-col class="col-md-6">
                    <label for="cpfcnpj" class="form-label">CPF/CNPJ:</label>
                    <v-text-field type="text" outlined dense v-model="cpfcnpj" maxlength="18" id="cpfcnpj" 
                    :rules="[rules.cpfcnpj]" autocomplete="off" v-mask='cpfCnpjMask'></v-text-field>
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
                <v-btn class="btn btn-red" :disabled="noFantasia || shortCpfCnpj ||shortTelefone || shortFantasia"
                @click="addCliente">Cadastrar Cliente</v-btn>
                <v-btn class="btn btn-black ml-2" @click="cadCliDialog = false">Voltar</v-btn>
            </div>
        </v-card-text>
        <SucessoBar></SucessoBar>
        <ErroBar></ErroBar>
    </v-card>
</template>

<script>
const SucessoBar = () => import('../bars/SucessoBar.vue')
const ErroBar = () => import('../bars/ErroBar.vue')
import axios from 'axios'

export default {
    components:{
        SucessoBar,
        ErroBar
    },
    data(){
        return{
            telefone: '',
            fantasia: '',
            cpfcnpj: '',
            contato: '',
            ativo: 1
        }
    },
    methods:{
        addCliente(){
            const cliente = {
                fantasia: this.fantasia,
                telefone: this.telefone.replace(/[^\d]+/g,''),
                cnpj: this.cpfcnpj.replace(/[^\d]+/g,''),
                contato: this.contato,
                ativo: this.ativo
            }
            axios({
                method: 'post',
                url: `${this.baseUrl}clientes.json`,
                data: cliente,
                headers: {'Authorization': `${this.tokenType} ${this.token}`}
            }).then( 
                () => {
                    this.loadClientes(),
                    this.$store.commit('setSucessoBar', true)
                    this.clear()
                }
            ).catch(() => {this.$store.commit('setErroBar', true)})
        },
        loadClientes(){
            const pagination = {
                page: 1,
                search: '',
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listClientes', pagination)
            .catch(() => this.$store.commit('setErroBar', true))
        },
        clear(){
            this.fantasia = '',
            this.telefone = '',
            this.cpfcnpj = '',
            this.contato = '',
            this.ativo = 1 
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
        cpfCnpjMask(){
            if(this.cpfcnpj.length > 15){
                return '##.###.###/####-##'
            }else{
                return '###.###.###-######'
            }
        },
        telefoneMask(){
            return this.$store.getters.telefoneMask
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
        shortCpfCnpj(){
            if(this.cpfcnpj.length > 0){
                if(this.cpfcnpj.length > 14){
                    return this.cpfcnpj.length < 18
                }else{
                    return this.cpfcnpj.length < 14
                }
            }else{
                return this.cpfcnpj.length > 0
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
        sucessoBar(){
            return this.$store.getters.sucessoBar
        },
        erroBar(){
            return this.$store.getter.erroBar
        }
    }
}
</script>