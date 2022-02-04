import Vue from 'vue'

export default {
    state:{
        atendimentos: [],
        cadCliDialog: false,
        cadTecDialog: false
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
        }
    },
    actions:{
        loadAtendimentos({commit}, pagination){
            Vue.prototype.$http(`atendimentos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`).then(resp => {
                const atendimentos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(atendimentos){
                    commit('setAtendimentos', atendimentos)
                    commit('setTotalItems', totalItems)
                }
                if(itemsPerPage){
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
        }
    }
}