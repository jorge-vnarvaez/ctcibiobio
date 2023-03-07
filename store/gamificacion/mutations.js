export default {
    setDeclarations(state, declarations) {
        state.declarations = declarations;
    },
    loadingDeclarations(state) {
        state.declarationsLoading = true;
    },
    setLengthMatchs(state, length) {
        state.totalMatchs = length;
    },
    declarationsLoaded(state) {
        state.declarationsLoaded = true;
        state.declarationsLoading = false;
    },
    setRanking(state, ranking) {
        state.ranking = ranking 
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    setMatchs(state, matchs) {
        state.matchs = matchs;
    },
    sortRanking(state, filter) {
        state.ranking = state.ranking.sort((a, b) => {
            if (filter === 1) {
                return b.skill[0] - a.skill[0];
            } else if (filter === 2) {
                return a.skill[0] - b.skill[0];
            } else if (filter === 3) {
                return b.n_wins - a.n_wins;
            } else if (filter === 4) {
                return a.n_wins - b.n_wins;
            } 
        });
    },
    setTotalParticipants(state, total) {
        state.totalParticipants = total;
    },
    setTfParticipantes(state, tf_participantes) {
        state.tf_participantes = tf_participantes.sort((a, b) => {
            return Object.values(a)[0] - Object.values(b)[0];
        });
    },
    setTfEdadParticipantes(state, tf_edad_participantes) {
        state.tf_edad_participantes = tf_edad_participantes;
    },
    setTfProvincias(state, tf_provincias) {
        state.tf_provincias = tf_provincias.sort((a, b) => {
            return Object.values(a)[0] - Object.values(b)[0];
        });
    },
    setTfMissionsByProvince(state, tf_missions_by_province) {
        state.tf_missions_by_province = tf_missions_by_province;
    },
    setTfMissionsByGender(state, tf_missions_by_gender) {
        state.tf_missions_by_gender = tf_missions_by_gender;
    },
    setRankingByGender(state, ranking_by_gender) {
        state.ranking_by_gender = ranking_by_gender;
    },
    setActiveProvince(state, province_id) {
        state.activeProvince = state.provinces.find(province => province.id === province_id);
    }
}