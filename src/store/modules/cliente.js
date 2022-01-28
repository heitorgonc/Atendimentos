import Vue from "vue"

export default {
    state:{
        clientes: [],
        cnpjMask: '##.###.###/####-##',
        cliAtivos: []
    },
    mutations:{
        setClientes(state, clientes){
            state.clientes = clientes
        },
        setCliAtivos(state, cliAtivos){
            state.cliAtivos = cliAtivos
        }
    },
    actions:{
        loadClientes({commit}){
            Vue.prototype.$http('clientes.json').then(resp => {
                const clientes = resp.data
                if(clientes){
                    commit('setClientes', clientes)
                    const cliAtivos = []
                    clientes.forEach(
                        (cliente) => {
                            if(cliente.ativo == 1){
                                cliAtivos.push(cliente)
                            }
                        }
                    )
                    commit('setCliAtivos', cliAtivos)
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
        },
        cliAtivos(state){
            return state.cliAtivos
        }
    }
}