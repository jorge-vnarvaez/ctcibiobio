export default {
    async fetchComunidad({ commit }) {
        const route = this.$config.apiUrlV2 + '/items/participants'
        const query = this.$objectToQueryString({
            fields: [
                'id',
                'name',
                'avatar',
            ],
        })

        let { data } = await fetch(`${route}?${query}`).then(res => res.json())

        commit('setParticipants', data)
    },
    async fetchMilestones({ commit }) {
        const route = this.$config.apiUrlV2 + '/items/milestones'
        const query = this.$objectToQueryString({
            fields: [
                'id',
                'title',
                'excerpt',
                'body',
                'parent_milestone',
                'color',
                'activities.*.*',
                'activities.files.*.*',
                'activities.gallery.*.*',
                'hidden_activities_fields',
            ],
        })

        let { data } = await fetch(`${route}?${query}`).then(res => res.json())

        commit('setMilestones', data)
    }
}