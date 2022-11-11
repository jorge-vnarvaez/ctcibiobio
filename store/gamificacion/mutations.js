export default {
    setDeclarations(state, declarations) {
        state.declarations = declarations;
    },
    declarationsLoaded(state) {
        state.declarationsLoaded = true;
        state.declarationsLoading = false;
    },
    setRanking(state, ranking) {
        state.ranking = ranking;
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    setMatches(state, matches) {
        state.matches = matches;
        state.matchesLoaded = true;
    },
    setMatchesStatus(state, status) {
        state.matchesLoaded = status;
    },
    setTotalMatchs(state, total) {
        state.totalMatchs = total;
    }
}