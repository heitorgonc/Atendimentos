import Vue from 'vue'

export default {
    state:{
        atendimentos: [],
        cadCliDialog: false,
        cadTecDialog: false,
        itemsPerPage: 5,
        page: 1,
        totalItems: 5,
        maxPage: 1
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
        },
        setMaxPage(state, {itemsPerPage, totalItems}){
            state.maxPage = Math.ceil(totalItems / itemsPerPage)
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
        totalItems(state){
            return state.totalItems
        },
        itemsPerPage(state){
            return state.itemsPerPage
        },
        page(state){
            return state.page
        },
        maxPage(state){
            return state.maxPage
        }
    }
}