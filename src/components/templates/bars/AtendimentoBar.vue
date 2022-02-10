<template>
    <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light">
                <v-btn to="/atendimentos" text color="transparent" class="mr-5">
                    <v-img src="../../../assets/imgs/logos/logo-hypersoft.svg" width="140" alt="Logo Hypersoft" 
                    class="img-fluid"></v-img>
                </v-btn>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="mobileMenu = true">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <v-flex class="navItems">
                    <div id="navbarNav" row>
                        <v-list-item class="nav-item link" to="/atendimentos/" active-class="link-active">
                            <v-list-item-icon>
                                <v-icon color="red darken-1">mdi-home-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Atendimentos</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="nav-item link" to="/tecnicos"  active-class="link-active">
                            <v-list-item-icon>
                                <v-icon color="red darken-1">mdi-face-agent</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Técnico</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="nav-item link" to="/clientes" active-class="link-active">
                            <v-list-item-icon>
                                <v-icon color="red darken-1">mdi-account-group-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Cliente</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="nav-item link" to="/servicos" active-class="link-active">
                            <v-list-item-icon>
                                <v-icon color="red darken-1">mdi-repeat</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Serviço</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logOut" class="btn-logout">
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item>
                    </div>
                </v-flex>
            </nav>
        </div>
</template>

<script>
export default{
    methods:{
        logOut(){
            this.$router.push('/').then(
                () => {
                    const codCli = 0
                    this.$store.commit('setCodCli', codCli)
                }
            ).catch(() => this.erroBar = true)
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
        },
        erroBar:{
            get(){
                return this.$store.getter.erroBar
            },
            set(erroBar){
                this.$store.commit('setErroBar', erroBar)
            }
        }
    }
}
</script>