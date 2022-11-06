<template lang="">
    <div>
        <v-img class="blue-grey darken-3" src="/img/graph.png">
            <v-responsive :aspect-ratio="16/4" content-class="d-flex flex-column justify-center py-12">
                <v-container>
                    <div class="text-h3 white--text font-weight-bold mb-10">Datos CTCI Biobío</div>
                    <v-divider dark></v-divider>
                </v-container>

                
                <v-container class="d-flex flex-md-row align-center flex-column gap-10">
                    <div class="flex-grow-1 text-h6 font-weight-medium white--text">Pronto disponibilizaremos datos públicos utilizados para el diseño de la estrategia CTCI de la región del Biobío.</div>
                    <div class="flex-grow-1 flex flex-md-row flex-column gap-3">
                        <v-card outlined class="pa-4 transparent white--text" style="border-color:white !important;">
                            <font-awesome-icon :icon="['fas', 'database']" class="mb-3" style="height:45px;"/>
                            <div>Datos de economía, innovación y actores relevantes para el diseño de la estrategia CTCI.</div>
                        </v-card>
                        <v-card outlined class="pa-4 transparent white--text" style="border-color:white !important;">
                            <font-awesome-icon :icon="['fas', 'chart-scatter-3d']" class="mb-3" style="height:45px;"/>
                            <div>Gráficos interactivos y con información detallada respecto a la realidad regional.</div>
                        </v-card>
                    </div>
                </v-container>
            </v-responsive>
        </v-img>

        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>