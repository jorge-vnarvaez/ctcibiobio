<template lang="">
  <div class="max-w-screen-xl mx-auto">
    <v-container class="py-10">
      <div class="text-3xl lg:text-5xl">Hoja de ruta</div>
      <div class="text-subtitle">
        Conoce el estado de avance
      </div>

      <v-divider class="my-3"></v-divider>

      <div>
        <v-timeline dense clipped align-top v-if="milestones">
          <v-timeline-item
            v-for="(milestone, i) in milestones"
            :key="i + 'm'"
            :large="milestone.parent_milestone ? false : true"
            :color="`${milestone.parent_milestone ? '#008dcb' : '#2929c6'}`"
            :fill-dot="false"
            left
            class="white--text mb-12"
            :opposite="false"
          >
            <v-card flat>
              <div class="flex flex-col lg:flex-row justify-between lg:align-center">
                <div class="flex flex-col">
                  <span :class="milestone.parent_milestone ? 'text-overline text-lg-subtitle-2' : 'text-h6 text-lg-h6'">
                      {{ milestone.title }}
                  </span>

                  <span v-if="milestone.id != 5">{{ milestone.activities.length }} actividades</span>
                </div>
                
                <div v-if="milestone.id != 5">
                  <div v-if="milestoneOpen != milestone.id" class="flex justify-start lg:justify-end align-center">
                    <span class="text-xs font-thin">Ver actividades</span>
                    <v-icon @click="milestoneOpen = milestone.id">mdi-chevron-down</v-icon>
                  </div>

                  <div v-if="milestoneOpen == milestone.id" class="flex justify-start lg:justify-end align-center">
                    <span class="text-xs font-thin">Ocultar actividades</span>
                    <v-icon @click="milestoneOpen = null">mdi-chevron-up</v-icon>
                  </div>
                </div>

              </div>

              <v-card-subtitle v-if="milestoneOpen == milestone.id">
                <span>{{ milestone.date_start }}</span>
                <span v-if="milestone.date_end"> - </span>
                <span v-if="milestone.date_end">{{ milestone.date_end }}</span>
              </v-card-subtitle>

              <v-card-text v-if="milestone.excerpt && milestoneOpen == milestone.id" class="text-body-1">{{
                milestone.excerpt 
              }}</v-card-text>                        

              <v-card-text
                v-if="milestone.body && milestoneOpen == milestone.id"
                v-html="milestone.body"
              ></v-card-text>

              <div v-if="milestoneOpen == milestone.id">
                <v-data-table
                  v-if="milestone.activities.length"
                  :items="milestone.activities"
                  item-key="title"
                  show-expand
                  :hide-default-footer="false"
                  disable-sort
                  locale="es-cl"
                  :options="{
                    itemsPerPage: 5,
                  }"
                  @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
                  :expanded.sync="milestone.expanded"
                  :footer-props="{
                    'items-per-page-options': [],
                    'show-current-page': false,
                    'show-first-last-page': false,
                  }"
                  :single-expand="true"
                  :headers="[
                    {
                      text: 'Actividad',
                      align: 'start',
                      sortable: true,
                      value: 'title',
                    },
                    {
                      text: 'Fecha inicio',
                      width: '200px',
                      align: 'start',
                      sortable: true,
                      value: 'date_start',
                    },
                    {
                      text: 'Fecha término',
                      width: '200px',
                      align: 'start',
                      sortable: true,
                      value: 'date_end',
                    },
                    {
                      text: 'Archivos',
                      width: '120px',
                      align: 'center',
                      sortable: false,
                      value: 'gallery',
                    },

                    { text: '', value: 'data-table-expand' },
                  ]"
                >
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="py-10">
                      <div class="text-body-1 text-xl-h6 mb-4">{{ item.title }}</div>
                      <div v-html="item.excerpt" class="text-body-2"></div>

                      <!-- GALERIA -->
                      <div v-if="['Images'].includes(item.format)">
                        <div v-if="item.gallery.length">
                          <div class="d-flex flex-wrap gap-3 py-5">
                            <v-img
                              class="black"
                              v-for="(galleryfile, index) in item.gallery"
                              :key="index + 'g'"
                              :src="`${
                                $config.apiAssetsV2 +
                                galleryfile.directus_files_id.filename_disk
                              }`"
                              width="300px"
                              max-width="300px"
                              height="300px"
                              contain
                            >
                            </v-img>
                          </div>
                        </div>
                      </div>
                      <!-- GALERIA -->

                      <!-- FILES -->
                      <div v-if="['PDF'].includes(item.format)" class="py-5">
                        <span class="text-sm text-slate-400">Haga clic sobre el archivo que desea visualiza.</span>

                        <div v-if="item.files.length">
                          <div class="d-flex flex-wrap gap-8 py-4">
                            <div v-for="file in item.files" :key="file.directus_files_id.id" class="cursor-pointer">
                              <a :href="$config.apiUrlV2 + '/assets/' + file.directus_files_id.id" target="_blank">
                                <font-awesome-icon icon="fa-solid fa-file-pdf" class="w-8 h-12 text-red-600"/>
                                <span class="block w-9/12 text-slate-700">{{ file.directus_files_id.title }}</span>
                              </a>
                            </div>
                          </div>
                        </div>

                      </div>
                      <!-- FILES -->
                    </td>
                  </template>

                  <template v-slot:item.date_start="{ item }">
                    <span>
                      <span v-if="item.date_start">{{
                        $moment(item.date_start).format("DD/MM/YY")
                      }}</span>
                      <span v-else>-</span>
                    </span>
                  </template>

                  <template v-slot:item.date_end="{ item }">
                    <span>
                      <span v-if="item.date_end">{{
                        $moment(item.date_end).format("DD/MM/YY")
                      }}</span>
                      <span v-else>-</span>
                    </span>
                  </template>

                  <template v-slot:item.gallery="{ item }">
                    <span>
                      <span v-if="['Images'].includes(item.format)">{{ item.gallery.length }}</span>
                      <span v-if="['PDF'].includes(item.format)">{{ item.files.length }}</span>
                    </span>
                  </template>
                </v-data-table>
              </div>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      milestones: null,
      milestoneOpen: null,
    };
  },
  async fetch() {
    // Make request to api through axios
    this.milestones = await this.$axios.$get(
      `https://apificr.uinn.cl/items/milestones`,
      {
        params: {
          fields: [
            "*",
            "activities.*",
            "activities.gallery.directus_files_id.*",
            "activities.files.directus_files_id.*",
          ],
          sort: "sort",
          filter: {
            status: {
              _eq: "published",
            },
          },
        },
      }
    ).then((res) => res.data);
  },
};
</script>
<style lang="postcss">
.v-data-footer {
  display: none;
}
</style>
