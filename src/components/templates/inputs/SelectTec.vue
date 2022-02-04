<template>
    <div>
        <v-layout justify-space-between>
            <label for="tecnico" class="form-label">Técnico</label>
            <v-dialog v-model="cadTecDialog" persistent max-width="600px">
                <template v-slot:activator="{on, attrs}">
                    <span class="btn-dialog" v-bind="attrs" v-on="on">Deseja criar um novo técnico ?</span>
                </template>
                <CadTecAtend></CadTecAtend>
            </v-dialog>
        </v-layout>
        <v-autocomplete v-model="codTec" :loading="loading" :items="tecAtivos" item-text="nome" item-value="codigo" :search-input.sync="search" 
        cache-items hide-no-data hide-details placeholder="Selecione o Técnico" outlined dense></v-autocomplete>
    </div>
</template>

<script>
const CadTecAtend = () => import('../dialogs/CadTecAtend.vue')

export default {
    components:{
        CadTecAtend
    },
    data(){
        return{
            loading: false,
            search: ''
        }
    },
    methods:{
        loadTecAtivos(){
            const pagination = {
                page: 1,
                ativo: 1,
                nome: ''
            }
            this.$store.dispatch('loadTecAtivos', pagination)
        },
        loadLogin(){
            this.codTec = this.$store.getters.codLogin
        }
    },
    computed:{
        cadTecDialog:{
            get(){
                return this.$store.getters.cadTecDialog
            },
            set(cadTecDialog){
                this.$store.commit('setCadTecDialog', cadTecDialog)
            }
        },
        tecAtivos(){
            return this.$store.getters.tecAtivos
        },
        codTec:{
            get(){
                return this.$store.getters.codTec
            },
            set(codTec){
                this.$store.commit('setCodTec', codTec)
            }
        }
    },
    created(){
        this.loadTecAtivos()
        this.loadLogin()
    }
}
</script>