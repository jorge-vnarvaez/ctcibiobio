export default {
    setDeclarations(state, declarations) {
        state.declarations = declarations;

        // usando matches verifica que 
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
        state.matchesLoaded = true;
    },
    setMatchesStatus(state, status) {
        state.matchesLoaded = status;
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
    }
}