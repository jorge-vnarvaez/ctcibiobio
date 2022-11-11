export default {
    async loadMatchs({ commit }) {
        // check if userId isnt null using ternary operator
        const query = this.$cookies.get('userID') ? `${this.$config.apiUrlV2}/items/matches?fields=id, winner, pairs.*, user&filter[user][_eq]=${this.$cookies.get('userID')}` : `${this.$config.apiUrlV2}/items/matches?fields=id, winner, pairs.*`;

        await this.$axios.$get(query).then(response => {
            commit('setMatches', response.data)
        });
    },
    async totalMatchs({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/items/matches?fields=id`).then(response => {
            commit('setTotalMatchs', response.data.length)
        });
    },
    async loadDeclarations({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: ['*, mission.label']
        })

        await this.$axios.$get(`${this.$config.apiUrlV2}/items/declarations?${query}`).then(response => {
            if (response.data) {
                commit('setDeclarations', response.data);
                commit('declarationsLoaded');
            }
        });
    },
    async loadRanking({ commit }) {
        const trueskill = require('trueskill');

        await this.$axios.$get(`${this.$config.apiUrlV2}/items/declarations?fields[]=id, title&fields[]=count(wins)&sort[]=-count(wins)`).then(response => {
            if (response.data) {
                this.ranking = response.data.map((declaration, index) => {
                    // create an array of objects using the declaration title as a key
                    return {
                        id: declaration.id,
                        title: declaration.title,
                        skill: [25.0, 25.0 / 3.0],
                        rank: index + 1,
                        n_wins: declaration.wins_count
                    };
                });

                trueskill.AdjustPlayers(this.ranking);
                commit('setRanking', this.ranking);
            }
        })
    }
}