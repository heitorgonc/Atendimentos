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
        <v-autocomplete v-model="codTec" :loading="loading" :items="tecnicos" item-text="nome" item-value="codigo" :search-input.sync="search" 
        cache-items hide-no-data hide-details placeholder="Selecione ou pesquise o Técnico" outlined dense></v-autocomplete>
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
        loadTecnicos(){
            const pagination = {
                page: 1,
                ativo: 1,
                search: this.search,
                token: this.token,
                tokenType: this.tokenType
            }
            this.$store.dispatch('listTecnicos', pagination).catch(() => this.erroBar = true)
        }
    },
    computed:{
        token(){
            return this.$store.getters.token
        },
        tokenType(){
            return this.$store.getters.tokenType
        },
        cadTecDialog:{
            get(){
                return this.$store.getters.cadTecDialog
            },
            set(cadTecDialog){
                this.$store.commit('setCadTecDialog', cadTecDialog)
            }
        },
        tecnicos(){
            return this.$store.getters.tecnicos
        },
        erroBar:{
            get(){
                return this.$store.getters.erroBar
            },
            set(erroBar){
                this.$store.commit('setErroBar', erroBar)
            }
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
        this.loadTecnicos()
    }
}
</script>