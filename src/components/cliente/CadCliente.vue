<template>
    <main class="main" id="main">
        <div class="container">
            <h1 class="title">Cadastrar Cliente</h1>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="fantasia_cliente" class="form-label">Fantasia:</label>
                    <v-text-field type="text" id="fantasia_cliente" outlined dense v-model="fantasia" maxlength="255" spellcheck="false"
                    :rules="[rules.required, rules.nome]" autocomplete="off"></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="telefone_cliente" class="form-label">Telefone:</label>
                    <v-text-field type="text" v-model="telefone" maxlength="14" v-mask='telefoneMask' id="telefone_cliente"  
                    autocomplete="off" :rules="[rules.telefone]" dense outlined></v-text-field>
                </div>
                <div class="col-md-6">
                    <label for="cnpj" class="form-label">CNPJ:</label>
                    <v-text-field type="text" outlined dense v-model="cnpj" maxlength="18" id="cnpj" 
                    :rules="[rules.cnpj]" autocomplete="off" v-mask='cnpjMask'></v-text-field>
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
                    <v-btn class="btn btn-red mt-5" :disabled=" noFantasia || shortCnpj ||shortTelefone || 
                    shortFantasia" @click="addCliente">Cadastrar Cliente</v-btn>
                    <v-btn class="btn btn-black mt-5 ml-2" to="/clientes">Voltar</v-btn>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    data(){
        return{
            fantasia: '',
            telefone: '',
            cnpj: '',
            contato: '',
            ativo: 1
        }
    },
    methods:{
        clear(){
            this.fantasia = ''
            this.telefone = ''
            this.cnpj = ''
            this.contato = ''
            this.ativo = 1
        },
        addCliente(){
            const cliente = {
                fantasia: this.fantasia,
                telefone: this.telefone.replace(/[^\d]+/g,''),
                cnpj: this.cnpj.replace(/[^\d]+/g,''),
                contato: this.contato,
                ativo: this.ativo
            }
            this.$http.post('clientes.json', cliente).then(
                () => {
                    alert('Sucesso')
                    this.clear()
                }
            ).catch(error => console.log(error))
        }
    },
    computed:{
        telefoneMask(){
            return this.$store.getters.telefoneMask
        },
        cnpjMask(){
            return this.$store.getters.cnpjMask
        },
        shortCnpj(){
            if(this.cnpj.length > 0){
                return this.cnpj.length < 14
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
        rules(){
            return this.$store.getters.rules
        }
    },
    beforeRouteLeave(to, from, next){
        if(this.fantasia == ''){
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