<template>
  <div>
    <div v-for="milestone in milestones" :key="milestone.id" class="my-6">
        <!-- PARENT MILESTONE -->
        <v-card  class="bg-white px-2 py-2 px-lg-6 py-lg-4 drop-shadow-xl" elevation="0" rounded="lg" v-if="milestone.parent_milestone == null">
            <div class="flex justify-between align-center">
                <div>
                    <span class="block text-[12px] lg:text-base">
                        {{ milestone.title }}
                    </span>

                    <span class="block text-[10px] lg:text-[14px] text-slate-500">{{ milestone.activities.length != 0 ? milestone.activities.length + ' actividades' : 'Más información' }}</span>
                </div>

                <v-icon v-if="milestoneOpened != milestone.id" @click="milestoneOpened = milestone.id" class="rounded-full cursor-pointer" :style="{ backgroundColor: milestone.color }" color="white">
                    mdi-chevron-down
                </v-icon>

                <v-icon v-if="milestoneOpened == milestone.id" @click="milestoneOpened = false" class="rounded-full cursor-pointer" :style="{ backgroundColor: milestone.color }" color="white">
                    mdi-chevron-up
                </v-icon>
            </div>
        </v-card>
        <!-- PARENT MILESTONE -->

        <!-- ACTIVE MILESTONE -->
        <div v-if="activeMilestone && milestoneOpened == milestone.id" class="mt-4">

            <!-- MILESTONE CHILDREN -->
            <div v-if="childs_milestones.length > 0">
                <div v-for="child_milestone in childs_milestones" :key="child_milestone.id" class="px-6 my-6">
                    <v-card  class="bg-white px-2 py-2 px-lg-6 py-lg-4 drop-shadow-xl" elevation="0" rounded="lg">
                        <div class="flex justify-between align-center">
                            <span class="block text-[12px] lg:text-base">
                                {{ child_milestone.title }}
                            </span>

                            <v-icon v-if="childMilestoneOpened != child_milestone.id" @click="childMilestoneOpened = child_milestone.id; currentChildPage = 0" class="rounded-full cursor-pointer" :style="{ backgroundColor: milestone.color }" color="white">
                                mdi-chevron-down
                            </v-icon>

                            <v-icon v-if="childMilestoneOpened == child_milestone.id" @click="childMilestoneOpened = false" class="rounded-full cursor-pointer" :style="{ backgroundColor: milestone.color }" color="white">
                                mdi-chevron-up
                            </v-icon>

                        
                        </div>
                    </v-card>

                    <div v-if="childMilestoneOpened == child_milestone.id" class="mt-4">

                            <div class="mb-6">
                                <span class="text-slate-500 text-[15px] lg:text-[21px] block mb-4">{{ activeChildMilestone.excerpt }}</span>

                                <span v-html="activeChildMilestone.body" class="text-[13px] lg:text-[18px] text-slate-400"></span>
                            </div>

                            <div v-if="!$vuetify.breakpoint.mobile && activeChildMilestone.activities.length > 0">
                                <v-row> 
                                    <v-col v-for="label in labels" :key="label.id" :cols="label.cols" :lg="label.lg">
                                        <span class="font-bold text-[16px]">{{ label.title }}</span>
                                    </v-col>
                                </v-row>

                                <v-divider class="my-4"></v-divider>
                            </div>

                             <div v-for="activity in activeChildMilestone.activities.slice(childStart, childEnd)" :key="activity.id">
                                <v-row>
                                    <v-col class="flex flex-col text-[12px]" cols="12" lg="4">
                                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Actividad</span>
                                        <span>{{ activity.title }}</span>
                                    </v-col>

                                    <v-col class="flex flex-col text-[12px]" cols="6" lg="3">
                                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Fecha de inicio</span>
                                        <span>{{ activity.date_start ? $moment(activity.date_start).format("DD/MM/YY") : '-' }}</span>
                                    </v-col>

                                    <v-col class="flex flex-col text-[12px]" cols="6" lg="3">
                                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Fecha de término</span>
                                        <span>{{ activity.date_end ? $moment(activity.date_end).format("DD/MM/YY") : '-' }}</span>
                                    </v-col>

                                    <v-col class="flex flex-col lg:align-end text-[12px]" cols="12" lg="1">
                                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Archivos</span>
                                        <span>{{ activity.files ? activity.files.length : '' }}</span>
                                    </v-col>

                                    <v-col lg="1">
                                        <div v-if="$vuetify.breakpoint.mobile" @click="activityChildOpened = activity.id">
                                            <span class="block mb-4 text-[10px] text-blue-700 font-bold">Más información</span>
                                        </div>

                                        <div v-if="!$vuetify.breakpoint.mobile">
                                            <div v-if="activityChildOpened != activity.id" @click="activityChildOpened = activity.id" class="cursor-pointer flex align-center">
                                                <v-icon small>mdi-chevron-down</v-icon>
                                            </div>

                                            <div v-if="activityChildOpened == activity.id" @click="activityChildOpened = false" class="cursor-pointer flex align-center">
                                                <v-icon small>mdi-chevron-up</v-icon>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>

                               <!-- ACTIVITY OF CHILD MILESTONE -->    
                                <div v-if="activeChildActivity && activityChildOpened == activity.id" class="shadow-inner mt-4 py-4 px-6 grey lighten-3">
                                    <span class="block mb-2 text-[16px] text-gray-500 font-semibold">
                                        {{ activeChildActivity.title }}
                                    </span>

                                    <span class="block text-[13px] text-gray-500 mb-2">
                                        {{ activeChildActivity.excerpt }}
                                    </span>

                                    <!-- GALERIA -->
                                    <div v-if="['Images'].includes(activeChildActivity.format)">
                                        <div v-if="activeChildActivity.gallery.length">
                                        <div class="d-flex flex-wrap gap-3 py-5">
                                            <v-img
                                            class="black"
                                            v-for="(galleryfile, index) in activeChildActivity.gallery"
                                            :key="index + 'g'"
                                            :src="`${
                                                $config.apiAssetsV2 +
                                                galleryfile.directus_files_id.filename_disk + '?quality=50'
                                            }`"
                                            :width="$vuetify.breakpoint.mobile ? '180' : '300px'"
                                            :max-width="$vuetify.breakpoint.mobile ? '180' : '300px'"
                                            height="300px"
                                            contain
                                            >
                                            </v-img>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- GALERIA -->

                                    <!-- FILES -->
                                    <div v-if="['PDF'].includes(activeChildActivity.format)" class="py-2">
                                        <span class="block text-[12px] text-slate-400">
                                            Revisa el o los archivos adjuntos para más información.
                                        </span>

                                        <div v-if="activeChildActivity.files.length">
                                        <div class="d-flex flex-wrap gap-8 py-4">
                                            <div v-for="file in activeChildActivity.files" :key="file.directus_files_id.id" class="cursor-pointer">
                                            <a :href="$config.apiUrlV2 + '/assets/' + file.directus_files_id.id" target="_blank">
                                                <font-awesome-icon icon="fa-solid fa-file-pdf" class="w-8 h-12 text-red-600"/>
                                                <span class="block text-[13px] w-9/12 text-slate-700">{{ file.directus_files_id.title }}</span>
                                            </a>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                    <!-- FILES -->
                                </div>
                                <!-- ACTIVITY OF CHILD MILESTONE -->    

                                <v-divider class="my-4"></v-divider>
                            </div>

                            <!-- PAGINATION -->
                            <div class="flex justify-end align-center text-[12px] text-slate-600" v-if="activeChildMilestone.activities.length > 0">
                                <span>
                                    {{ childStart + 1 }}
                                    -
                                     {{ activeChildMilestone.activities.length < itemsPerPage ? activeChildMilestone.activities.length : childEnd }}
                                    de
                                    {{ activeChildMilestone.activities.length }}
                                </span>

                                <v-icon small @click="moveOnePageBack()" :disabled="childStart == 0">mdi-chevron-left</v-icon>
                                <v-icon small @click="moveOnePageForward()" :disabled="childEnd >= activeChildMilestone.activities.length">mdi-chevron-right</v-icon>
                            </div>
                             <!-- PAGINATION -->
                    </div>
                </div> 
            </div>
            <!-- MILESTONE CHILDREN -->

            <!-- ACTIVE MILESTONE INFO -->
            <span v-html="activeMilestone.body" class=" text-[15px] lg:text-[18px] text-slate-400 block my-2"></span>

            <div v-if="!$vuetify.breakpoint.mobile && activeMilestone.activities.length > 0">
                <v-row> 
                    <v-col v-for="label in labels" :key="label.id" :cols="label.cols" :lg="label.lg">
                        <span class="font-bold text-[16px]">{{ label.title }}</span>
                    </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>
            </div>

            <div v-for="activity in activeMilestone.activities" :key="activity.id">
                <v-row>
                    <v-col class="flex flex-col text-[12px]" cols="12" lg="4">
                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Actividad</span>
                        <span>{{ activity.title }}</span>
                    </v-col>

                    <v-col class="flex flex-col text-[12px]" cols="6" lg="3">
                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Fecha de inicio</span>
                        <span>{{ activity.date_start ? $moment(activity.date_start).format("DD/MM/YY") : '-' }}</span>
                    </v-col>

                    <v-col class="flex flex-col text-[12px]" cols="6" lg="3">
                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Fecha de término</span>
                        <span>{{ activity.date_end ? $moment(activity.date_end).format("DD/MM/YY") : '-' }}</span>
                    </v-col>

                    <v-col class="flex flex-col lg:align-end text-[12px]" cols="12" lg="1">
                        <span v-if="$vuetify.breakpoint.mobile" class="font-bold">Archivos</span>
                        <span>{{ activity.files ? activity.files.length : '' }}</span>
                    </v-col>

                    <v-col lg="1">
                        <div v-if="$vuetify.breakpoint.mobile" @click="activityOpened = activity.id">
                            <span class="block mb-4 text-[10px] text-blue-700 font-bold">Más información</span>
                        </div>

                        <div v-if="!$vuetify.breakpoint.mobile">
                            <div v-if="activityOpened != activity.id" @click="activityOpened = activity.id" class="cursor-pointer flex align-center">
                                <v-icon small>mdi-chevron-down</v-icon>
                            </div>

                            <div v-if="activityOpened == activity.id" @click="activityOpened = false" class="cursor-pointer flex align-center">
                                <v-icon small>mdi-chevron-up</v-icon>
                            </div>
                        </div>
                    </v-col>
                </v-row>

                
                <!-- ACTIVITY OF PARENT MILESTONE -->
                <div v-if="activeParentActivity && activityOpened == activity.id" class="shadow-inner mt-4 py-4 px-6 grey lighten-3">
                    <span class="block mb-2 text-[16px] text-gray-500 font-semibold">
                        {{ activeParentActivity.title }}
                    </span>

                    <span class="block text-[13px] text-gray-500 mb-2">
                        {{ activeParentActivity.excerpt }}
                    </span>

                      <!-- GALERIA -->
                      <div v-if="['Images'].includes(activeParentActivity.format)">
                        <div v-if="activeParentActivity.gallery.length">
                          <div class="d-flex flex-wrap gap-3 py-5">
                            <v-img
                              class="black"
                              v-for="(galleryfile, index) in activeParentActivity.gallery"
                              :key="index + 'g'"
                              :src="`${
                                $config.apiAssetsV2 +
                                galleryfile.directus_files_id.filename_disk + '?quality=50'
                              }`"
                              :width="$vuetify.breakpoint.mobile ? '180' : '300px'"
                              :max-width="$vuetify.breakpoint.mobile ? '180' : '300px'"
                              height="300px"
                              contain
                            >
                            </v-img>
                          </div>
                        </div>
                      </div>
                      <!-- GALERIA -->

                      <!-- FILES -->
                      <div v-if="['PDF'].includes(activeParentActivity.format)" class="py-2">
                          <span class="block text-[12px] text-slate-400">
                            Revisa el o los archivos adjuntos para más información.
                        </span>

                        <div v-if="activeParentActivity.files.length">
                          <div class="d-flex flex-wrap gap-8 py-4">
                            <div v-for="file in activeParentActivity.files" :key="file.directus_files_id.id" class="cursor-pointer">
                              <a :href="$config.apiUrlV2 + '/assets/' + file.directus_files_id.id" target="_blank">
                                <font-awesome-icon icon="fa-solid fa-file-pdf" class="w-8 h-12 text-red-600"/>
                                <span class="block text-[13px] w-9/12 text-slate-700">{{ file.directus_files_id.title }}</span>
                              </a>
                            </div>
                          </div>
                        </div>

                      </div>
                      <!-- FILES -->
                </div>
                <!-- ACTIVITY OF PARENT MILESTONE -->

                <v-divider class="my-4"></v-divider>
            </div>

            <!-- PAGINATION -->
            <div class="flex justify-end align-center text-[12px] text-slate-600" v-if="activeMilestone.activities.length > 0">
                <span>
                    {{ currentParentPage + 1 }}
                    -
                    {{ activeMilestone.activities.length < itemsPerPage ? activeMilestone.activities.length : itemsPerPage + currentParentPage }}
                    de
                    {{ activeMilestone.activities.length }}
                    
                </span>

                <v-icon small>mdi-chevron-left</v-icon>
                <v-icon small>mdi-chevron-right</v-icon>
            </div>
            <!-- PAGINATION -->
            <!-- ACTIVE MILESTONE INFO -->
        </div>
        <!-- ACTIVE MILESTONE -->
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            milestoneOpened: false,
            childMilestoneOpened: false,
            itemsPerPage: 5,
            currentParentPage: 0,
            currentChildPage: 0,
            activityOpened: false,
            activityChildOpened: false,
            labels: [
                { id: 'label_1', title: 'Actividad', cols: 12, lg: 4 },
                { id: 'label_2', title: 'Fecha de inicio', cols: 6, lg: 3},
                { id: 'label_3', title: 'Fecha de término', cols: 6, lg: 3},
                { id: 'label_4', title: 'Archivos', cols: 12, lg: 1},
            ]
        }
    },
    async fetch() {
        await this.$store.dispatch('comunidad/fetchMilestones')
    },
    methods: {
        moveOnePageBack() {
            if(this.currentChildPage > 0) {
                this.currentChildPage--
            }
        },
        moveOnePageForward() {
            if(this.currentChildPage < this.childPages - 1) {
                this.currentChildPage++
            }
        }
    },
    computed: {
        milestones() {
            return this.$store.getters['comunidad/getMilestones']
        },
        childs_milestones() {
            return this.activeMilestone != null ? this.milestones.filter(milestone => milestone.parent_milestone == this.activeMilestone.id) : []
        },
        activeMilestone() {
            return this.milestones.find(milestone => milestone.id == this.milestoneOpened)
        },
        activeParentActivity() {
            return this.activeMilestone.activities.find(activity => activity.id == this.activityOpened)
        },
        activeChildMilestone() {
            return this.milestones.find(milestone => milestone.id == this.childMilestoneOpened)
        },
        activeChildActivity() {
            return this.activeChildMilestone.activities.find(activity => activity.id == this.activityChildOpened)
        },
        parentPages() {
            return Math.ceil(this.activeMilestone.activities.length / this.itemsPerPage)
        },
        childPages() {
            return Math.ceil(this.activeChildMilestone.activities.length / this.itemsPerPage)
        },
        childStart() {
            return this.currentChildPage == 0 ? 0 : this.itemsPerPage * this.currentChildPage
        },
        childEnd() {
            return this.currentChildPage == 0 ? this.itemsPerPage : this.itemsPerPage * this.currentChildPage + this.itemsPerPage
        }
    }
}
</script>

<style>

</style>