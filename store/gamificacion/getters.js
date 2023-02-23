export default {
    declarations(state) {
        return state.declarations;
    },
    ranking(state) {
        return state.ranking;
    },
    getUserId(state) {
        return state.userId;
    },
    matchs(state) {
        return state.matchs;
    },
    totalMatchs(state) {
        return state.totalMatchs;
    },
    matchesLoaded(state) {
        return state.matchesLoaded;
    },
    declarationsLoading(state) {
        return state.declarationsLoading;
    },
    totalParticipants(state) {
        return state.totalParticipants;
    },
    tf_participantes(state) {
        return state.tf_participantes;
    },
    tf_edad_participantes(state) {
        return state.tf_edad_participantes;
    },
    tf_provincias(state) {
        return state.tf_provincias;
    },
    tf_missions_by_province(state) {
        return state.tf_missions_by_province;
    },
    tf_missions_by_gender(state) {
        return state.tf_missions_by_gender;
    },
    ranking_by_gender(state) {
        return state.ranking_by_gender;
    }
}