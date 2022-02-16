export default {
    state:{
        token: '',
        tokenType: ''
    },
    mutations:{
        setToken(state, token){
            state.token = token
        },
        setTokenType(state, tokenType){
            state.tokenType = tokenType
        }
    },
    getters:{
        token(state){
            return state.token
        },
        tokenType(state){
            return state.tokenType
        }
    }
}