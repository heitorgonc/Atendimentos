<template>
    <v-snackbar v-model="erroBar" :timeout="1000" color="red" top>
        Erro
        <template v-slot:action="{ attrs }">
            <v-icon color="white" v-bind="attrs" @click="erroBar=false">
                mdi-close
            </v-icon>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    computed:{
        erroBar:{
            get(){
                return this.$store.getters.erroBar
            },
            set(erroBar){
                return this.$store.commit('setErroBar', erroBar)
            }
        }
    }
}
</script>