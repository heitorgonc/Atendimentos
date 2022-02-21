<template>
    <main class="main" id="main">
        <div class="container">
            <h4 class="title">Cadastrar Cliente</h4>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="fantasia_cliente" class="form-label">Fantasia:</label>
                    <v-text-field type="text" id="fantasia_cliente" outlined dense v-model="fantasia" maxlength="255" spellcheck="false"
                    :rules="[rules.required, rules.nome]" autocomplete="off" autofocus></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="telefone_cliente" class="form-label">Telefone:</label>
                    <v-text-field type="text" v-model="telefone" maxlength="14" v-mask='telefoneMask' id="telefone_cliente"  
                    autocomplete="off" :rules="[rules.telefone]" dense outlined></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="cpfcnpj" class="form-label">CPF/CNPJ:</label>
                    <v-text-field type="text" outlined dense v-model="cpfcnpj" maxlength="18" id="cpfcnpj" :rules="[rules.cpfcnpj]" autocomplete="off" 
                    name='cpfcnpj' v-mask="cpfCnpjMask"></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="contato" class="form-label">Contato:</label>
                    <v-text-field required type="text" maxlength="255" id="contato" 
                    dense outlined autocomplete="off" v-model="contato"></v-text-field>
                </div>
                <div class="col-md-6">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" @click="ativo = 1" checked/>
                        <label class="form-check-label" for="inlineRadio1" @click="ativo = 1">Ativo</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="0" @click="ativo = 0"/>
                        <label class="form-check-label" for="inlineRadio2" @click="ativo = 0">Inativo</label>
                    </div>
                </div>
                <div class="col-12">
                    <v-btn class="btn btn-red mt-5" :disabled="noFantasia || shortCpfCnpj ||shortTelefone || shortFantasia"
                    @click="addCliente">Cadastrar Cliente</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/clientes">Voltar</v-btn>
                </div>
            </form>
            <SucessoBar></SucessoBar>
            <ErroBar></ErroBar>
        </div>
    </main>
</template>

<script>
const SucessoBar = () => import('../templates/bars/SucessoBar.vue')
const ErroBar = () => import('../templates/bars/ErroBar.vue')
import axios from 'axios'

export default {
    data(){
        return{
            fantasia: '',
            telefone: '',
            cpfcnpj: '',
            contato: '',
            ativo: 1,
            phone: ''
        }
    },
    components:{
        SucessoBar, ErroBar
    },
    methods:{
        clear(){
            this.fantasia = ''
            this.telefone = ''
            this.cpfcnpj = ''
            this.contato = ''
            this.ativo = 1
        },
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
                    this.$store.commit('setSucessoBar', true) 
                    this.clear()
                }
            ).catch(
                () => {this.$store.commit('setErroBar', true)}
            )
        }
    },
    computed:{
        cpfCnpjMask(){
            if(this.cpfcnpj.length > 15){return '##.###.###/####-##'}
            else{return '###.###.###-######'}
        },
        baseUrl(){
            return this.$store.getters.baseUrl
        },
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        telefoneMask(){
            return this.$store.getters.telefoneMask
        },
        cnpjMask(){
            return this.$store.getters.cnpjMask
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
            if(this.telefone.length > 0){return this.telefone.length < 14}
            else{return this.telefone.length > 0}
        },
        noFantasia(){
            return this.fantasia == ''
        },
        shortFantasia(){
            if(this.fantasia.length > 0){return this.fantasia.length < 2}
            else{return this.fantasia.length > 0}
        },
        rules(){
            return this.$store.getters.rules
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