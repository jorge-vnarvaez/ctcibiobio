export default {
    async loadPodCasts({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/items/podcasts`).then(response => {
            commit('setPodcasts', response.data);
        });
    },
}