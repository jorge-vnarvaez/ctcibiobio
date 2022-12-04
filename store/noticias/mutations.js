export default {
  updateNoticias(state, {data}){
    state.noticias = data.data.map(noticia => {
      return {
        ...noticia,
        type: 'noticias'
        }})
  },
  updateFeaturedNoticias(state, {data}){
    state.featuredNoticias = data
  },
}