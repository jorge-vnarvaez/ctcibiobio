export default {
  async loadNoticias(vueContext){

    let route = '/items/posts'
    let params = this.$objectToQueryString({
      fields:[
        '*.*'
      ],
      filter: {
        status: {
          _eq: "published"
        },
      },
      sort:['-date_created']
    })

    let fetchString = `${this.$config.apiUrlV2 + route}?` + params
    let data        = await fetch(fetchString).then(res => res.json())

    vueContext.commit('updateNoticias',{data: data})

  },
  
  async loadFeaturedNoticias(vueContext){
    let route = '/items/posts'
    let params = this.$objectToQueryString({
      fields:[
        '*.*'
      ],
      filter: {
        status: {
          _eq: "published"
        },
        is_featured: {
          _eq: true
        },
      },
      sort:['-date_created']
    })

    let fetchString = `${this.$config.apiUrlV2 + route}?` + params
    let data        = await fetch(fetchString).then(res => res.json())

    vueContext.commit('updateFeaturedNoticias',{data: data})

  }
}