export default {
  async loadEventos(vueContext){
    

    let params = this.$objectToQueryString({
      fields:[
        '*.*'
      ],
      filter: {
        status: {
          _eq: "published"
        }
      },
      sort:['-date_created']
    })

    let dataEventos = await fetch(
      `${this.$config.apiUrlV2}/items/events?`+ params
    ).then(res => res.json())

    vueContext.commit('updateEventos',{data: dataEventos})
  },
}