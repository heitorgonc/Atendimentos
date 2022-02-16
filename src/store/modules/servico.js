import Vue from 'vue'
import axios from 'axios'

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
            Vue.prototype.$http(`servicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}
            &servico=${pagination.search}`).then(resp => {
                const servicos = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(servicos){
                    commit('setServicos', servicos)
                }
                if(itemsPerPage){
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        },
        listServicos({commit}, pagination){
            axios({
                method: 'get',
                url: `http://localhost:8000/servicos?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&servico=${pagination.search}`,
                headers: {'Authorization': `${pagination.tokenType} ${pagination.token}`}
            }).then(
                resp => {
                    const servicos = resp.data['hydra:member']
                    const totalItems = resp.data['hydra:totalItems']
                    const itemsPerPage = pagination.itemsPerPage
                    if(servicos){
                        commit('setServicos', servicos)
                    }
                    if(itemsPerPage){
                        commit('setMaxPage', {totalItems, itemsPerPage})
                    }
                }
            )
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