<template>
  <div>
        <v-layout justify-space-between>
            <label for="cliente" class="form-label">Razão Social</label>
            <v-dialog v-model="cadCliDialog" persistent max-width="600px">
                <template v-slot:activator="{on, attrs}">
                    <span class="btn-dialog" v-bind="attrs" v-on="on">Deseja criar um novo cliente ?</span>
                </template>
                <CadCliAtend></CadCliAtend>
            </v-dialog>
        </v-layout>
        <v-autocomplete v-model="codCli" :loading="loading" :items="clientes" item-text="fantasia" 
        item-value="codigo" :search-input.sync="search" cache-items hide-no-data hide-details 
        placeholder="Selecione ou pesquise o Cliente" outlined dense autofocus></v-autocomplete>
  </div>
</template>

<script>
const CadCliAtend = () => import('../dialogs/CadCliAtend.vue')

export default {
    components:{
        CadCliAtend
    },
    data(){
        return{
            search: '',
            loading: false
        }
    },
    methods:{
        loadClientes(){
            const pagination = {
                page: 1,
                ativo: 1,
                search: this.search,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listClientes', pagination).catch(() => this.erroBar = true)
        }
    },
    computed:{
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        cadCliDialog:{
            get(){
                return this.$store.getters.cadCliDialog
            },
            set(cadCliDialog){
                this.$store.commit('setCadCliDialog', cadCliDialog)
            }
        },
        clientes(){
            return this.$store.getters.clientes
        },
        codCli:{
            get(){
                return this.$store.getters.codCli
            },
            set(codCli){
                this.$store.commit('setCodCli', codCli)
            }
        },
        erroBar:{
            get(){
                return this.$store.getters.erroBar
            },
            set(erroBar){
                this.$store.commit('setErroBar', erroBar)
            }
        }
    },
    created(){
        this.loadClientes()
    }
}
</script>