<template>
  <div>
    <!-- <v-btn @click="getskills">Get skills</v-btn> -->
    <!-- <v-btn @click="fix">Fix</v-btn>
    {{ i }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruts_used: [],
      i: 0,
      means: []
    };
  },
  methods: {
    async getskills() {
      const qs = require("qs");

        const q = qs.stringify({
            fields: ["id", 'declarations_id', "skill"],
            limit: -1,
        });

        const data = await this.$axios.get(this.$config.apiUrlV2 + "/items/declarations_directus_users?" + q).then((res) => {
            return res.data.data
        })

        // map data to parse skill to array, and using first value of array get max skill
        let skills = data.map((item) => {
            return {
                id: item.id,
                declarations_id: item.declarations_id,
                skill: JSON.parse(item.skill)
            }
        })

        // crear all null skills
        skills = skills.filter((item) => item.skill != null)

        // group by declarations_id
        let grouped = skills.reduce((r, a) => {
            r[a.declarations_id] = [...r[a.declarations_id] || [], a];
            return r;
        }, {});

        // for each group, get mean of skills
        let mean = Object.keys(grouped).map((key) => {
            let sum = grouped[key].reduce((a, b) => {
                return a + b.skill[0]
            }, 0)
            return {
                id: grouped[key][0].declarations_id,
                skill: sum / grouped[key].length
            }
        }).sort((a, b) => a.skill - b.skill)

        this.means = mean
    },
    async fix() {
      const qs = require("qs");

      const moment = require("moment");

      const trueskill = require("trueskill");

      const query_users = qs.stringify({
        fields: ["id", "rut"],
        limit: -1,
        filter: {
          role: {
            _eq: "2f5d20a2-c287-49a4-be3e-5c2160e8476e",
          },
        },
      });

      const users = await this.$axios
        .$get(this.$config.apiUrlV2 + "/users?" + query_users)
        .then((res) => res.data);

      // let ruts = users.map((user) => user.rut);

      let ruts = ['10556559-3']

      const query = qs.stringify({
        fields: ["id", "user", "winner", "pairs.*.*", "date_created"],
        limit: -1,
        filter: {
          user: {
            rut: {
              _in: ruts,
            },
          },
        },
      });

      let data = await this.$axios
        .$get(this.$config.apiUrlV2 + "/items/matches?" + query)
        .then((res) => res.data);

      data = data
        .map((match, index) => {
          const pairs = match.pairs.map((pair) => {
            let skill = [25.0, 25.0 / 3.0];
            return {
              id: pair.item.id,
              skill,
              rank: match.winner == pair.item.id ? 1 : 2,
            };
          });

          return {
            id: match.id,
            user: match.user,
            winner: match.winner,
            pairs,
            date_created:
              new Date(match.date_created).getTime() + 1000 * 60 * 60 * 3,
          };
        })
        .sort((a, b) => a.date_created - b.date_created);

      data = data.map((match) => {
        match.date_created = moment(match.date_created).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        );
        return match;
      });

      data = data.map((match, index) => {
        if (index == 0) {
          return match;
        }

        if (index == data.length) {
          return match;
        }

        let previus_match = data[index - 1];
        let current_match = data[index];

        let previus_winner = previus_match.pairs.find((pair) => pair.rank == 1);
        let previus_loser = previus_match.pairs.find((pair) => pair.rank == 2);

        if(previus_winner && previus_loser) {
          trueskill.AdjustPlayers([previus_winner, previus_loser]);

           let current_winner = current_match.pairs.find(
            (pair) => pair.id == previus_winner.id
          );
          let current_loser = current_match.pairs.find(
            (pair) => pair.rank == 2
          );

          if(current_winner && current_loser) {
            trueskill.AdjustPlayers([current_winner, current_loser]);
          }
        }
        return current_match;
      });

          const pairs = data.map((match) => {
            return {
              user: match.user,
              date_created: match.date_created,
              ...match.pairs.filter((pair) => pair.rank == 1)[0],
            };
          });

          for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            await this.$axios.post(
              this.$config.apiUrlV2 + "/items/declarations_directus_users",
              {
                declarations_id: pair.id,
                directus_users_id: pair.user,
                skill: JSON.stringify(pair.skill),
                date_created: pair.date_created,
                individualized: i == 0 || i == 1 ? true : false,
              }
            );
          }


          // pairs.forEach(async (pair) => {
          //   await this.$axios.post(
          //     this.$config.apiUrlV2 + "/items/declarations_directus_users",
          //     {
          //       declarations_id: pair.id,
          //       directus_users_id: pair.user,
          //       skill: JSON.stringify(pair.skill),
          //       date_created: pair.date_created,
          //     }
          //   );
          // });

      this.i += 10;
    },
    // async fixofix() {
      
    //   const query 

    // }
  },
};
</script>

<style></style>
