import Vue from 'vue'

export default {
    state:{
        tecnicos: [],
        tecAtivos: [],
        codLogin: 0
    },
    mutations:{
        setTecnicos(state, tecnicos){
            state.tecnicos = tecnicos
        },
        setTecAtivos(state, tecAtivos){
            state.tecAtivos = tecAtivos
        },
        addTecAtivo(state, tecAtivo){
            state.tecAtivos.push(tecAtivo)
        },
        setCodLogin(state, codTec){
            state.codLogin = codTec
        }
    },
    actions:{
        loadTecnicos({commit}){
            Vue.prototype.$http('tecnicos.json').then(resp => {
                const tecnicos = resp.data
                if(tecnicos){
                    commit('setTecnicos', tecnicos)
                    const tecAtivos = []
                    tecnicos.forEach(
                        (tecnico) => {
                            if(tecnico.ativo == 1){
                                tecAtivos.push(tecnico)
                            }
                        }
                    )
                    commit('setTecAtivos', tecAtivos)
                }
            })
            .catch(error => console.log(error))
        }
    },
    getters:{
        tecnicos(state){
            return state.tecnicos
        },
        tecAtivos(state){
            return state.tecAtivos
        },
        codLogin(state){
            return state.codLogin
        }
    }
}