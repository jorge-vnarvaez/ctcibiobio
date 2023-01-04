export default {
    setDeclarations(state, declarations) {
        state.declarations = declarations;
    },
    loadingDeclarations(state) {
        state.declarationsLoading = true;
    },
    declarationsLoaded(state) {
        state.declarationsLoaded = true;
        state.declarationsLoading = false;
    },
    setRanking(state, ranking) {
        let rankingSorted = ranking.sort((a, b) => {
            return b.skill[0] - a.skill[0];
        }).map((declaration, index) => {
            return {
                ...declaration,
                rank: index + 1
            }});
        state.ranking = rankingSorted 
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    setMatches(state, matches) {
        state.matches = matches;
        state.totalMatchs = matches.length;
        state.matchesLoaded = true;
    },
    setMatchesStatus(state, status) {
        state.matchesLoaded = status;
    },
}