export default {
  async loadCapitulos(vueContext){
    
    // Usage of strapi
    // let params = new URLSearchParams({
    //   populate:[
    //     'icon',
    //     'featuredImage',
    //     'ContenidoCapitulo',
    //     'ContenidoCapitulo.file',
    //   ],
    //   sort:['order:asc']
    // })

    const query = new URLSearchParams({
      fields: [
        '*',
        'contents.*',
        "contents.file.*"
      ]
    })



    let { data } = await fetch(
      `${this.$config.apiUrlV2}/items/chapters?${query}`
    ).then(res => res.json())

    vueContext.commit('updateCapitulos', { data })
    
  },
}