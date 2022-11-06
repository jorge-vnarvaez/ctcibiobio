export default {
  async loadCapitulos(vueContext){
    
    let params = new URLSearchParams({
      populate:[
        'icon',
        'featuredImage',
        'ContenidoCapitulo',
        'ContenidoCapitulo.file',
      ],
      sort:['order:asc']
    })

    let dataCapitulos = await fetch(
      `${this.$config.apiUrl}/api/capitulos?`+ params
    ).then(res => res.json())

    vueContext.commit('updateCapitulos',{data: dataCapitulos})
    
  },
}