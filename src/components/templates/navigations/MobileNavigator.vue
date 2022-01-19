<template>
    <v-navigation-drawer v-model="mobileMenu" temporary absolute>
        <v-list>
            <v-list-item v-for="([icon, text, way],i) in listItems" :key="i" :to="way" active-class="link-active" @click="mobileMenu = false">
                <v-list-item-icon @click="mobileMenu = false">
                    <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title @click="mobileMenu = false">
                    <span v-text="text"></span>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data(){
        return{
            listItems:[
                ['mdi-home-outline', 'Atendimentos', '/atendimentos'],
                ['mdi-face-agent','Técnico', '/tecnicos'],
                ['mdi-account-group-outline', 'Cliente', '/clientes'],
                ['mdi-logout', 'Sair', '/']
            ]
        }
    },
    computed:{
        mobileMenu:{
            get(){
                return this.$store.getters.mobileMenu
            },
            set(mobileMenu){
                this.$store.commit('setMobileMenu', mobileMenu)
            }
        }
    }
}
</script>

<style>

</style>