import Vue from "vue"
import axios from "axios"

export default {
    state:{
        clientes: [],
        cnpjMask: '##.###.###/####-##',
        codCli: 0
    },
    mutations:{
        setClientes(state, clientes){
            state.clientes = clientes
        },
        setCodCli(state, codCli){
            state.codCli = codCli
        }
    },
    actions:{
        loadClientes({commit}, pagination){
            Vue.prototype.$http(`clientes?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}
            &fantasia=${pagination.search}&ativo=${pagination.ativo}`).then(resp => {
                const clientes = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(clientes){
                    commit('setClientes', clientes)
                }
                if(itemsPerPage){
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        },
        listClientes({commit}, pagination){
            axios({
                method: 'get',
                url: `http://localhost:8000/clientes?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&fantasia=${pagination.search}&ativo=${pagination.ativo}`,
                headers: {'Authorization': `${pagination.tokenType} ${pagination.token}`}
            }).then(
                resp => {
                    const clientes = resp.data['hydra:member']
                    const totalItems = resp.data['hydra:totalItems']
                    const itemsPerPage = pagination.itemsPerPage
                    if(clientes){
                        commit('setClientes', clientes)
                    }
                    if(itemsPerPage){
                        commit('setMaxPage', {totalItems, itemsPerPage})
                    }
                }
            ).catch(error => console.log(error))
        }
    },
    getters:{
        clientes(state){
            return state.clientes
        },
        cnpjMask(state){
            return state.cnpjMask
        },
        codCli(state){
            return state.codCli
        }
    }
}