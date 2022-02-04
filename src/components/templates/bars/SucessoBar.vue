<template>
    <v-snackbar v-model="sucessoBar" :timeout="1000" color="green" top>
        Sucesso
        <template v-slot:action="{ attrs }">
            <v-icon color="white" v-bind="attrs" @click="sucessoBar=false">
                mdi-close
            </v-icon>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    computed:{
        sucessoBar:{
            get(){
                return this.$store.getters.sucessoBar
            },
            set(sucessoBar){
                return this.$store.commit('setSucessoBar', sucessoBar)
            }
        }
    }
}
</script>