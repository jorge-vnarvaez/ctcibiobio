export default {
  capitulos(state){
    return state.capitulos
  },
  activeCapitulo(state){
    if(state.capitulos){
      return state.capitulos.find(el=> el.sort == state.capituloActivo)
    } else {
      return null
    }
  },
  activeContenido(state, getters){
    if(state.capitulos){
      if(state.contenidoActivoId){
        return getters['activeCapitulo'].contents.find(el=> el.id == state.contenidoActivoId)
      } else { 
        return getters['activeCapitulo'].contents[0]
      }
    } else {
      return null
    }
  },
}