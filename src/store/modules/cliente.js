import Vue from "vue"

export default {
    state:{
        clientes: [],
        cnpjMask: '##.###.###/####-##'
    },
    mutations:{
        setClientes(state, clientes){
            state.clientes = clientes
        }
    },
    actions:{
        loadClientes({commit}){
            Vue.prototype.$http('clientes.json').then(resp => {
                const clientes = resp.data
                if(clientes){
                    commit('setClientes', clientes)
                    
                }
            })
            .catch(error => console.log(error))
        }
    },
    getters:{
        clientes(state){
            return state.clientes
        },
        cnpjMask(state){
            return state.cnpjMask
        }
    }
}