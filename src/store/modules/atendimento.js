import Vue from 'vue'
import axios from 'axios'

export default {
    state:{
        atendimentos: [],
        cadCliDialog: false,
        cadTecDialog: false,
        relato: ''
    },
    mutations:{
        setAtendimentos(state, atendimentos){
            state.atendimentos = atendimentos
        },
        setCadCliDialog(state, cadCliDialog){
            state.cadCliDialog = cadCliDialog
        },
        setCadTecDialog(state, cadTecDialog){
            state.cadTecDialog = cadTecDialog
        },
        setRelato(state, relato){
            state.relato = relato
        }
    },
    actions:{
        loadAtendimentos({commit}, pagination){
            Vue.prototype.$http.headers = {'Authorization': `${pagination.tokenType} ${pagination.token}`}
            Vue.prototype.$http(`atendimentos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&cliente.fantasia=${pagination.search}&tecnico.nome=${pagination.search}`).then(
                resp => {
                const atendimentos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(atendimentos){
                    commit('setAtendimentos', atendimentos)
                }
                if(itemsPerPage){
                    commit('setTotalItems', totalItems)
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        },
        listAtendimentos({commit}, pagination){
            axios({
                method: "get",
                url: `http://localhost:8000/atendimentos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&cliente.fantasia=${pagination.searchCli}&tecnico.nome=${pagination.searchTec}`,
                headers: {"Authorization": `${pagination.tokenType} ${pagination.token}`}
            }).then(
                resp => {
                    const atendimentos = resp.data['hydra:member']
                    const totalItems = resp.data['hydra:totalItems']
                    const itemsPerPage = pagination.itemsPerPage
                    if(atendimentos){
                        commit('setAtendimentos', atendimentos)
                    }
                    if(itemsPerPage){
                        commit('setMaxPage', {totalItems, itemsPerPage})
                    }
                }
            ).catch(error => console.log(error))
        }
        
    },
    getters:{
        atendimentos(state){
            return state.atendimentos
        },
        cadCliDialog(state){
            return state.cadCliDialog
        },
        cadTecDialog(state){
            return state.cadTecDialog
        },
        relato(state){
            return state.relato
        }
    }
}