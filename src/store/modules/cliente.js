import Vue from "vue"

export default {
    state:{
        clientes: [],
        cnpjMask: '##.###.###/####-##',
        cliAtivos: [],
        codCli: 0
    },
    mutations:{
        setClientes(state, clientes){
            state.clientes = clientes
        },
        setCliAtivos(state, cliAtivos){
            state.cliAtivos = cliAtivos
        },
        setCodCli(state, codCli){
            state.codCli = codCli
        }
    },
    actions:{
        loadClientes({commit}, pagination){
            Vue.prototype.$http(`clientes?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&fantasia=${pagination.search}`).then(resp => {
                const clientes = resp.data['hydra:member']
                const totalItems = resp.data['hydra:totalItems']
                const itemsPerPage = pagination.itemsPerPage
                if(clientes){
                    commit('setClientes', clientes)
                }
                if(itemsPerPage){
                    commit('setTotalItems', totalItems)
                    commit('setMaxPage', {totalItems, itemsPerPage})
                }
            }).catch(error => console.log(error))
        },
        loadCliAtivos({commit}, pagination){
            Vue.prototype.$http(`clientes?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}
            &fantasia=${pagination.fantasia}&ativo=${pagination.ativo}`).then(
                resp => {
                    const cliAtivos = resp.data['hydra:member']
                    const totalItems = resp.data['hydra:totalItems']
                    const itemsPerPage = pagination.itemsPerPage
                    if(cliAtivos){
                        commit('setCliAtivos', cliAtivos)
                    }
                    if(itemsPerPage){
                        commit('setTotalItems', totalItems)
                        commit('setMaxPage', { totalItems, itemsPerPage })
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
        cliAtivos(state){
            return state.cliAtivos
        },
        codCli(state){
            return state.codCli
        }
    }
}