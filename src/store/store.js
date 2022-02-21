import Vue from 'vue'
import Vuex from 'vuex'

import tecnico from './modules/tecnico'
import cliente from './modules/cliente'
import atendimento from './modules/atendimento'
import servico from './modules/servico'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        rules: {
            required: value => !!value || 'Esse campo é obrigatório',
            nome: value => (value.length >= 2 || value.length == 0)   || 'Mínimo 2 caracteres',
            relato: value => (value.length >= 10 || value.length == 0) || 'Mínimo 10 caracteres',
            cpfcnpj: value => (value.length == 18 || value.length == 14 ||value.length == 0) || 'CPF/CPNJ inexistente',
            telefone: value => (value.length > 13 || value.length == 0) || 'Telefone inexistente',
        },
        telefoneMask: '(##) ####-####',
        mobileMenu: false,
        maxPage: 0,
        sucessoBar: false,
        erroBar: false,
        baseUrl: 'http://localhost:8000/'
    },
    mutations:{
        setMobileMenu(state, mobileMenu){
            state.mobileMenu = mobileMenu
        },
        setMaxPage(state, {itemsPerPage, totalItems}){
            state.maxPage = Math.ceil(totalItems / itemsPerPage)
        },
        setSucessoBar(state, sucessoBar){
            state.sucessoBar = sucessoBar
        },
        setErroBar(state, erroBar){
            state.erroBar = erroBar
        }
    },
    getters:{
        rules(state){
            return state.rules
        },
        telefoneMask(state){
            return state.telefoneMask
        },
        mobileMenu(state){
            return state.mobileMenu
        },
        maxPage(state){
            return state.maxPage
        },
        sucessoBar(state){
            return state.sucessoBar
        },
        erroBar(state){
            return state.erroBar
        },
        baseUrl(state){
            return state.baseUrl
        }
    },
    modules:{
        tecnico,
        cliente,
        atendimento,
        servico,
        user
    }
})