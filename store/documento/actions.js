export default {
    async loadDocuments({ commit }) {
        const route = this.$config.apiUrlV2 + '/items/documents'

        const { data } = await fetch(route).then(res => res.json())

        commit('setDocuments', data)
    }
}