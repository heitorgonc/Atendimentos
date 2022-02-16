import Vue from 'vue'
import axios from 'axios'

export default {
    state:{
        tecnicos: [],
        codLogin: 0,
        codTec: 0
    },
    mutations:{
        setTecnicos(state, tecnicos){
            state.tecnicos = tecnicos
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
            Vue.prototype.$http(`tecnicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}
            &nome=${pagination.search}&ativo=${pagination.ativo}`).then(resp => {
                const tecnicos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(tecnicos){
                    commit('setTecnicos', tecnicos)
                }
                if(itemsPerPage){
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        },
        listTecnicos({commit}, pagination){
            axios({
                method: 'get',
                url: `http://localhost:8000/tecnicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&nome=${pagination.search}&ativo=${pagination.ativo}`,
                headers: {'Authorization': `${pagination.tokenType} ${pagination.token}`}
            }).then(
                resp => {
                    const tecnicos = resp.data['hydra:member']
                    const totalItems = resp.data['hydra:totalItems']
                    const itemsPerPage = pagination.itemsPerPage
                    if(tecnicos){
                        commit('setTecnicos', tecnicos)
                    }
                    if(itemsPerPage){
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