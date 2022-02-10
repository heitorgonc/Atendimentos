import Vue from 'vue'

export default {
    state:{
        tecnicos: [],
        tecAtivos: [],
        codLogin: 0,
        codTec: 0
    },
    mutations:{
        setTecnicos(state, tecnicos){
            state.tecnicos = tecnicos
        },
        setTecAtivos(state, tecAtivos){
            state.tecAtivos = tecAtivos
        },
        setCodLogin(state, codLogin){
            state.codLogin = codLogin
        },
        setCodTec(state, codTec){
            state.codTec = codTec
        }
    },
    actions:{
        loadTecnicos({commit}, pagination){
            Vue.prototype.$http(`tecnicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&nome=${pagination.search}`).then(resp => {
                const tecnicos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(tecnicos){
                    commit('setTecnicos', tecnicos)
                }
                if(itemsPerPage){
                    commit('setTotalItems', totalItems)
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        },
        loadTecAtivos({commit}, pagination){
            Vue.prototype.$http(`tecnicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}
            &nome=${pagination.nome}&ativo=${pagination.ativo}`).then(
                resp => {
                    const tecAtivos = resp.data['hydra:member']
                    const totalItems = resp.data['hydra:totalItems']
                    const itemsPerPage = pagination.itemsPerPage
                    if(tecAtivos){
                        commit('setTecAtivos', tecAtivos)
                    }
                    if(itemsPerPage){
                        commit('setTotalItems', totalItems)
                        commit('setMaxPage', {totalItems, itemsPerPage})
                    }
                }
            ).catch(error => console.log(error))
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
        },
        codTec(state){
            return state.codTec
        }
    }
}