export default {
  updateNoticias(state, {data}){
    state.noticias = data
  },
  updateFeaturedNoticias(state, {data}){
    state.featuredNoticias = data
  },
}