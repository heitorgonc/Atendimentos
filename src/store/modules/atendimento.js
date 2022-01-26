import Vue from 'vue'

export default {
    state:{
        tecnicoLogin: {
            codigo: 0,
            nome: 'Selecione o Técnico',
            telefone: '',
            ativo: 1
        },
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
        },
        setTecLogin(state, tecnico){
            state.tecnicoLogin = tecnico
        }
    },
    actions:{
        loadAtendimentos({commit}, page, itemsPerPage){
            Vue.prototype.$http(`atendimentos?page=${page}&itemsPerPage=${itemsPerPage}`).then(resp => {
                const atendimentos = resp.data['hydra:member']
                if(atendimentos){
                    commit('setAtendimentos', atendimentos)
                }
            })
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
        tecnicoLogin(state){
            return state.tecnicoLogin
        }
    }
}