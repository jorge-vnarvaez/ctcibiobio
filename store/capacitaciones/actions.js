export default {
    async loadCapacitaciones(vueContext){
      const query = new URLSearchParams({
        fields: [
          '*',
          'recursos.directus_files_id.*',
        ]
      })
  
      let { data } = await fetch(
        `${this.$config.apiUrlV2}/items/capacitaciones?${query}`
      ).then(res => res.json())
  
      vueContext.commit('updateCapacitaciones', { data })
      
    },
  }