<template>
    <main id="main">
        <div class="container">
            <h2 class="title">Cadastrar Atendimento</h2>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="funcionario" class="form-label">Funcionário:</label>
                    <v-text-field type="text" maxlength="255" name='funcionario' outlined dense
                    id="funcionario" :rules="[rules.nome]" v-model="funcionario"></v-text-field>
                </div>
                <div class="col-md-6">
                    <v-layout justify-space-between>
                        <label for="client" class="form-label">Razão Social</label>
                        <v-dialog v-model="cadCliDialog" persistent max-width="600px">
                            <template v-slot:activator="{on, attrs}">
                                <span class="btn-dialog" v-bind="attrs" v-on="on">
                                    Deseja criar um novo cliente ?
                                </span>
                            </template>
                            <CadClienteAtend></CadClienteAtend>
                        </v-dialog>
                    </v-layout>
                    <v-select :items="clientes" outlined dense placeholder="Selecione o Cliente" v-model="cliente"
                    hide-selected></v-select>
                </div>
                <div class="col-md-12">
                    <v-layout justify-space-between>
                        <label for="selectTecnico" class="form-label">Técnico</label>
                        <v-dialog v-model="cadTecDialog" persistent max-width="600px">
                            <template v-slot:activator="{on, attrs}">
                                <span class="btn-dialog" v-bind="attrs" v-on="on">
                                    Deseja criar um novo técnico ?
                                </span>
                            </template>
                            <CadTecAtend></CadTecAtend>
                        </v-dialog>
                    </v-layout>
                    <v-select :items="tecnicos" outlined dense placeholder="Selecione o Técnico" v-model="tecnico"
                    hide-selected></v-select>
                </div>
                <div class="col-12">
                    <label for="relato" class="form-label">Relato</label>
                    <v-textarea id="relato" rows="5" v-model="relato" maxlength="399" :rules="[rules.relato, rules.required]" 
                    outlined spellcheck="false" dense></v-textarea>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-red"
                    :disabled="noTecnico || tecnicoNotSelected || noCliente || noRelato ||
                    clienteNotSelected || shortRelato || shortFuncionario">Gravar Atendimento</button>
                    <router-link to="/atendimentos">
                        <a class="btn btn-black ml-2"> Voltar </a>
                    </router-link>
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
            funcionario: '',
            tecnico: '',
            cliente: '',
            relato: '',
            tecnicos:['Daniel', 'Diego', 'Heitor', 'Jaílson', 'Luiz Felipe', 'Rudielle', 'Richard', 'Rickson'],
            clientes:['Polo Norte', 'Mega Leite', 'Leal', 'Udipres', 'Cozini'],
            ativo: true
        }
    },
    computed:{
        shortFuncionario(){
            if(this.funcionario.length > 0){
                return this.funcionario.length < 3
            }else{
                return this.funcionario.length > 0
            }
            
        },
        noTecnico(){
            return this.tecnico == ""
        },
        noCliente(){
            return this.cliente == ""
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
    beforeRouteLeave(to, from, next){
        if(this.relato == '' && this.tecnico == '' && this.cliente == ''){
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