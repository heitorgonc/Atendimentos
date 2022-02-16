<template>
    <div>
        <v-layout justify-space-between>
            <label for="servico" class="form-label">Tipo de Serviço</label>
            <v-dialog persistent max-width="600px" v-model="cadServicoAtend">
                <template v-slot:activator="{attrs, on}">
                    <span class="btn-dialog" v-bind="attrs" v-on="on">Deseja criar um novo Serviço ?</span>
                </template>
                <CadServicoAtend></CadServicoAtend>
            </v-dialog>
        </v-layout>
         <v-autocomplete v-model="relato" :items="servicos" item-text="servico" item-value="servico" :search-input.sync="search" 
        cache-items hide-no-data hide-details placeholder="Este atendimento é um Serviço ? Selecione ou pesquise" outlined dense></v-autocomplete>
    </div>
</template>

<script>
const CadServicoAtend = () => import('../dialogs/CadServicoAtend.vue')

export default {
    components:{
        CadServicoAtend
    },
    data(){
        return{
            search: ''
        }
    },
    methods:{
        loadServicos(){
            const pagination = {
                page: 1,
                search: this.search,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listServicos', pagination).catch(() => this.erroBar = true )
        }
    },
    computed:{
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        servicos(){
            return this.$store.getters.servicos
        },
        relato:{
            get(){
              return this.$store.getters.relato
            },
            set(relato){
                this.$store.commit('setRelato', relato)
            }  
        },
        cadServicoAtend:{
            get(){
                return this.$store.getters.cadServicoAtend
            },
            set(cadServicoAtend){
                this.$store.commit('setCadServicoAtend', cadServicoAtend)
            }
        }
    },
    created(){
        this.loadServicos()
    }
}
</script>