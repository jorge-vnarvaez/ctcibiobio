export default {
  activeCapitulo(state){
    if(state.capitulos){
      return state.capitulos.data.find(el=> el.attributes.order == state.capituloActivo)
    } else {
      return null
    }
  },
  activeContenido(state, getters){
    if(state.capitulos && state.capituloActivo){
      if(state.contenidoActivoId){
        return getters['activeCapitulo'].attributes.ContenidoCapitulo.find(el=> el.id == state.contenidoActivoId)
      } else { 
        return getters['activeCapitulo'].attributes.ContenidoCapitulo[0]
      }
    } else {
      return null
    }
  },
}