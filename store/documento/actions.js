export default {
    async loadDocuments({ commit }) {

        const qs = require('qs')
        const route = this.$config.apiUrlV2 + '/items/documents'
        const query = qs.stringify({
            fields: [
                'id',
                'title',
                'description',
                'featured_image',
                'file'
            ]
        })

        const { data } = await fetch(route).then(res => res.json())

        commit('setDocuments', data)
    }
}