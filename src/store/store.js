import Vue from 'vue'
import Vuex from 'vuex'

import tecnico from './modules/tecnico'
import cliente from './modules/cliente'
import atendimento from './modules/atendimento'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        rules: {
            required: value => !!value || 'Esse campo é obrigatório',
            nome: value => (value.length >= 2 || value.length == 0)   || 'Mínimo 2 caracteres',
            relato: value => (value.length >= 10 || value.length == 0) || 'Mínimo 10 caracteres',
            cnpj: value => (value.length == 18 || value.length == 0) || 'CPNJ inexistente',
            telefone: value => (value.length > 13 || value.length == 0) || 'Telefone inexistente',
        },
        telefoneMask: '(##) ####-####',
        mobileMenu: false,
        itemsPerPage: 5,
        page: 1,
        totalItems: 5,
        maxPage: 1,
        sucessoBar: false,
        erroBar: false
    },
    mutations:{
        setMobileMenu(state, mobileMenu){
            state.mobileMenu = mobileMenu
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
        },
        sucessoBar(state){
            return state.sucessoBar
        },
        erroBar(state){
            return state.erroBar
        }
    },
    modules:{
        tecnico,
        cliente,
        atendimento
    }
})