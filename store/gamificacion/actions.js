export default {
    setMatches({ commit }, matches) {
        commit('setMatches', matches);
    },
    async loadMatchsLength({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/n_matches`).then(response => {
            commit('setLengthMatchs', response);
        });
    },
    async loadMissions({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/items/missions`).then(response => {
            commit('setMissions', response.data);
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
                commit('declarationsLoaded');
            }
        });
    },
    async loadRanking({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/ranking`).then(response => {
            if (response) {
                let ranking = response;
                commit('setRanking', ranking);
            }
        })
    },
    sortRanking({ commit }, filter) {
        commit('sortRanking', filter);
    },
    async loadTotalParticipants({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/n_participantes`).then(response => {
            commit('setTotalParticipants', response);
        });
    },
    async loadTfParticipantes({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/tf_participantes`).then(response => {
            commit('setTfParticipantes', response);
        });
    },
    async loadTfEdadParticipantes({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/tf_edad_participantes`).then(response => {
            response = Object.keys(response).map(key => {
                return {
                    name: key, 
                    value: response[key]
                }
            });

            commit('setTfEdadParticipantes', response);
        });
    },
    async loadTfProvincias({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/tf_provincias`).then(response => {
            // convierte response en array de objetos
            response = Object.keys(response).map(key => {
                return {
                    name: key,
                    value: response[key]
                }
            })

            commit('setTfProvincias', response);
        });
    },
    async loadTfMissionsByProvince({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/tf_priorizaciones_mission_by_province`).then(response => {
            commit('setTfMissionsByProvince', response);
        });
    },
    async loadTfMissionsByGender({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/tf_priorizaciones_mission_by_gender`).then(response => {
            commit('setTfMissionsByGender', response);
        });
    },
    async loadRankingByProvince({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/ranking_by_province`).then(response => {
            commit('setRankingByProvince', response);
        });
    },
    async loadRankingByGender({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/gamificacion/ranking_by_gender`).then(response => {
            commit('setRankingByGender', response);
        });
    },
    async loadGenderDispersion({ commit }) {
        await this.$axios.$get(`${this.$config.apiUrlV2}/ranking/gender_dispersion`).then(response => {
            commit('setGenderDispersion', response);
        });
    },
}