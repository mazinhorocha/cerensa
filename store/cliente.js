export const state = () => ({
    list: []
})

export const getters = {
  showClients(state){
      return state.list
  }
}

export const mutations = {
  createClient (state, payload){
    state.list = [...payload]
  },

  updateCliente (state, payload){
    state.list.find((item, index) => {
      if(item.id === payload.id)
        state.list[index] = payload;
    })
  }
}

export const actions = {
  insertClient({commit}, payload){
      commit('addClient', payload)
  }
}
