export const addNote = ({commit}, e) => {
    commit('ADD_NOTE', e.target.value);
}

export const setList = ({commit}, res) => {
    commit('SET_NOTE', res);
}
