export default {
    async loadFeatured({ commit }) {
        const route = '/items/infographics'
        const params = this.$objectToQueryString({
            limit: 5,
            sort: [
                '-date_created'
            ]
        })

        const fetchString = `${this.$config.apiUrlV2}${route}?${params}`

        const { data } = await fetch(fetchString).then(res => res.json())

        commit('setFeatured', data)
    },
    async loadInfografias({ commit }) {
        const route = '/items/infographics'
        const params = this.$objectToQueryString({
            sort: [
                '-date_created'
            ]
        })

        const fetchString = `${this.$config.apiUrlV2}${route}?${params}`

        const { data } = await fetch(fetchString).then(res => res.json())

        commit('setInfografias', data)
    }

}