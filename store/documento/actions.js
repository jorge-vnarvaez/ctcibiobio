export default {
    async loadDocuments({ commit }) {
        const route = this.$config.apiUrlV2 + '/items/documents'
        const query = this.$objectToQueryString({
            fields: [
                'id',
                'parent_document',
                'title',
                'excerpt',
                'featured_image',
                'file',
                'diagnostico',
                'estrategia'
            ],
        })

        let { data } = await fetch(`${route}?${query}`).then(res => res.json())

        const parent_document = data.filter(item => item.parent_document === true)

        data = data.filter(item => item.parent_document === false)

        commit('setDocuments', data)
        commit('setParentDocument', parent_document[0])
    },
    async loadMaterials({ commit }) {
        const route = this.$config.apiUrlV2 + '/items/materials'
        const query = this.$objectToQueryString({
            fields: [
                'id',
                'type',
                'tag',
                'title',
                'excerpt',
                'featured_image',
                'file'
            ],
        })

        let { data } = await fetch(`${route}?${query}`).then(res => res.json())

        commit('setMaterials', data)
    }
}