import Vue from 'vue'

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
            Vue.prototype.$http(`atendimentos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&
            cliente.fantasia=${pagination.search}&tecnico.nome=${pagination.search}`).then(resp => {
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