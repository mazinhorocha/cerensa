export const state = () => ({
    list: []
})

export const getters = {
    showClients(state){
        return state.list
    }
}

export const mutations = {
    addClient (state, payload){
        state.list.push(...payload)
    }
}

export const actions = {
    insertClient({commit}, payload){
        commit('addClient', payload)
    }
}