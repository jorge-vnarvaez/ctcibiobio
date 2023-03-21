export default {
  featuredNoticia(state){
    if(state.featuredNoticias){
      return state.featuredNoticias.data.find(el=> el.is_featured)
    } else {
      return null
    }
  },
  latestNoticias(state){
    if(state.latestNoticias){
      return state.latestNoticias.data
    } else {
      return null
    }
  }
}