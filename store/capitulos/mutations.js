export default {
  updateCapitulos(state, {data}){
    state.capitulos = data
  },
  updateCapituloActivo(state, data){
    state.capituloActivo = data
    // * Desactiva el contenido activo
    state.contenidoActivoId = null
  },
  updateContenidoActivo(state,data){
    state.contenidoActivoId = data
  }
}