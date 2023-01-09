export default {
    async loadMatchs({ commit }) {
        // check if userId isnt null using ternary operator
        const query = this.$cookies.get('userID') ? `${this.$config.apiUrlV2}/items/matches?fields=id, winner, pairs.*, user&filter[user][_eq]=${this.$cookies.get('userID')}` : `${this.$config.apiUrlV2}/items/matches?fields=id, winner, pairs.*`;

        await this.$axios.$get(query).then(response => {
            commit('setMatches', response.data)
        });
    },
    async loadMatchsLength({ commit }) {

        const qs = require('qs');

        const query = qs.stringify({
            fields: ['id'],
            limit: -1
        })

        await this.$axios.get(`${this.$config.apiUrlV2}/items/matches?${query}`).then(response => {
            commit('setLengthMatchs', response.data.data.length);
        });
    },
    async loadDeclarations({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            fields: ['*, mission.label, wins'],
            deep: {
                wins: {
                    _limit: -1,
                }
            }
        })

        await this.$axios.$get(`${this.$config.apiUrlV2}/items/declarations?${query}`).then(response => {
            if (response.data) {
                commit('setDeclarations', response.data);
                setTimeout(() => {
                    commit('declarationsLoaded');
                }, 5000)
            }
        });
    },
    async loadRanking({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/items/declarations?fields[]=id, title, skill, mission.label&fields[]=count(wins)&sort[]=-count(wins)&deep[wins][_limit]=-1`).then(response => {
            if (response.data) {
                let ranking = response.data.map((declaration, index) => {
                    // create an array of objects using the declaration title as a key
                    return {
                        id: declaration.id,
                        title: declaration.title,
                        skill: JSON.parse(declaration.skill),
                        rank: index + 1,
                        n_wins: declaration.wins_count,
                        mission: declaration.mission.label
                    };
                }).sort((a, b) => (b.skill[0] - a.skill[0]));

                commit('setRanking', ranking);
            }
        })
    },

    sortRanking({ commit }, filter) {
        commit('sortRanking', filter);
    }
}