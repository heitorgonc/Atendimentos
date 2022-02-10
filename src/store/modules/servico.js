import Vue from 'vue'

export default {
    state:{
        servicos: [],
        cadServicoAtend: false
    },
    mutations:{
        setServicos(state, servicos){
            state.servicos = servicos
        },
        setCadServicoAtend(state, cadServicoAtend){
            state.cadServicoAtend = cadServicoAtend
        }
    },
    actions:{
        loadServicos({commit}, pagination){
            Vue.prototype.$http(`servicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&servico=${pagination.search}`).then(resp => {
                const servicos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(servicos){
                    commit('setServicos', servicos)
                }
                if(itemsPerPage){
                    commit('setTotalItems', totalItems)
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        }
    },
    getters:{
        servicos(state){
            return state.servicos
        },
        cadServicoAtend(state){
            return state.cadServicoAtend
        }
    }
}