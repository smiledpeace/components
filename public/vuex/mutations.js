export const ADD_NOTE = (state, value) => {
    console.log(value);
    state.notes.push(value);
}
export const SET_NOTE = (state, res) => {
    state.notes = res.data;
}
