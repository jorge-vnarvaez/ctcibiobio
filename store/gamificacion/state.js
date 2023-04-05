export default () => ({
    // list of missions
    missions: [],
    // list of declarations to match
    declarations: [],
    // list of declarations loading
    declarationsLoading: true,
    // list of declarations loaded
    declarationsLoaded: false,
    // loading declarations got error
    declarationsError: null,
    // list of ranking declarations
    ranking: [],
    // id of the current user
    userId: null,
    // list of matches played
    matchs: [],
    // queue of matches played before post to the api
    matchsQueue: [],
    // state of the matches
    matchesLoaded: false,
    totalMatchs: 0,
    totalParticipants: 0,
    tf_participantes: [],
    tf_edad_participantes: [],
    tf_provincias: [],
    tf_missions_by_province: [],
    tf_missions_by_gender: [],
    ranking_by_gender: [],
    ranking_by_province: [],
    gender_dispersion: [],
    provinces: [
        {
            id: 1,
            name: 'Arauco',
            slug: 'arauco',
            color: '#FF0000',
            img: 'arauco.png',
        },
        {
            id: 2,
            name: 'Bio-Bio',
            slug: 'biobío',
            color: '#FF0000',
            img: 'biobio.png',
        },
        {
            id: 3,
            name: 'Concepción',
            slug: 'concepción',
            color: '#FF0000',
            img: 'concepcion.png',
        },
    ],
    activeProvince: {}
})