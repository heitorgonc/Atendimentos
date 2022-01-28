import Vue from 'vue'

export default {
    state:{
        atendimentos: [],
        cadCliDialog: false,
        cadTecDialog: false,
        itemsPerPage: 5,
        page: 1,
        totalItems: 0
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
        setTotalItems(state, totalItems){
            state.totalItems = totalItems
        },
        setItemsPerPage(state, itemsPerPage){
            state.itemsPerPage = itemsPerPage
        },
        setPage(state, page){
            state.page = page
        }
    },
    actions:{
        loadAtendimentos({commit}, pagination){
            Vue.prototype.$http(`atendimentos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`).then(resp => {
                const atendimentos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                if(atendimentos){
                    commit('setAtendimentos', atendimentos)
                }
                if(totalItems){
                    commit('setTotalItems', totalItems)
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
        totalItems(state){
            return state.totalItems
        },
        itemsPerPage(state){
            return state.itemsPerPage
        },
        page(state){
            return state.page
        }
    }
}