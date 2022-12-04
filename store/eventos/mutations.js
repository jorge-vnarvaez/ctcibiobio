export default {
  updateEventos(state, {data}){
    state.eventos = data.data.map(evento => {
      return {
        ...evento,
        type: 'eventos'
      }})
  },
}