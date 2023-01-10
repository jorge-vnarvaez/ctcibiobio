<template>
    
    <chart-g>
        
        <path v-if="this.$props.showBody" :fill="this.$props.fill" :d="selectedPathGenerator({type:'Sphere'})"></path>
        <path v-if="this.$props.showGraticule" :d="selectedPathGenerator(graticule())" fill="transparent" :stroke-width="this.$props.strokeWidth" :stroke="this.$props.stroke"></path>
        <slot v-bind="{ready: desplegarMapa, map: resGeojson.features, geoGenerator: selectedPathGenerator, geoCircle: geoCircle, updater: updater}"></slot>
        
    </chart-g>
    
</template>
<script>
import * as d3 from "d3"
import * as d3geo from 'd3-geo'
import * as topojson from 'topojson'
import ChartG from './ChartG.vue'

import { Coordinates } from './mixins/Coordinates'
import { ShapeFeatures } from './mixins/ShapeFeatures';
import ChartPath from './ChartPath'

export default {
    data(){
        return {
            cid: null,
            // ? world.object.countries.id: https://en.wikipedia.org/wiki/ISO_3166-1_numeric
            // ? world.object.countries.name: Chile, Netherlands, etc.
            ks: "a",
            geoCircle: d3.geoCircle(),
            graticule: d3.geoGraticule(),
            muestras: {
                chilecomunas: {
                    data: require('./assets/chile-comunas.json'),
                    key: 'Final'
                },
                chileregions: {
                    data: require('./assets/chile-regions.json'),
                    key: 'Regiones_Clean'
                },
                countries10m: {
                    data: require('./assets/countries-10m.json'),
                    key: 'countries'
                },
                countries50m: {
                    data: require('./assets/countries-50m.json'),
                    key: 'countries'
                },
                countries110m: {
                    data: require('./assets/countries-110m.json'),
                    key: 'countries'
                },
                land10m: {
                    data: require('./assets/land-10m.json'),
                    key: 'land'
                },
                land50m: {
                    data: require('./assets/land-50m.json'),
                    key: 'land'
                },
                land110m: {
                    data: require('./assets/land-110m.json'),
                    key: 'land'
                },
            },
            mapsGeojson: false,
            desplegarMapa: false,
            mapTypeRes: this.$props.mapType
        }
    },
    components: {ChartG, ChartPath},
    mixins: [ShapeFeatures,Coordinates],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        showBody:{
            type: Boolean,
            default: false,
        },
        showGraticule:{
            type: Boolean,
            default: false,
        },
        fill: {
            type: String,
            default: 'Transparent',
        },
        stroke: {
            type: String,
            default: 'Transparent',
        },
        strokeWidth: {
            type: String,
            default: '1',
        },
        mapType: {
            type: String,
            default: 'countries50m'
        },
        projectionType: {
            type: String,
            default: 'Mercator'
        },
        rotateLambda: {
            type: [Number,String],
            default: 0
        },
        rotatePhi: {
            type: [Number,String],
            default: 0
        },
        rotateGamma: {
            type: [Number,String],
            default: 0
        },
        scale: {
            type: [Number,String],
            default: 100
        },
        lat: {
            type: [Number,String],
            default: 0
        },
        lon: {
            type: [Number,String],
            default: 0
        }
    },
    computed: {
        chartState:{
            cache: false,
            get(){
                this.updater;
                let state = {
                    type: this.$props.projectionType,
                    scale: parseFloat(this.$props.scale) ?? 0,
                    translateX: 0,
                    translateY: 0,
                    centerLat: parseFloat(this.$props.lat) ?? 0,
                    centerLon: parseFloat(this.$props.lon) ?? 0,
                    rotateLambda: parseFloat(this.$props.rotateLambda) ?? 0,
                    rotatePhi: parseFloat(this.$props.rotatePhi) ?? 0,
                    rotateGamma: parseFloat(this.$props.rotateGamma) ?? 0,
                }
                return state
            }
        },
        selectedFeatureSet(){
            this.updater;
            let resSet = this.muestras[this.mapTypeRes].data
            // console.log(resSet)
            return resSet
        },
        selectedProjection:{
            get(){
                this.updater;
                // let resProjection = d3.geoAzimuthalEqualArea()
                // let resProjection = d3.geoAzimuthalEquidistant()
                // let resProjection = d3.geoGnomonic()
                // let resProjection = d3.geoOrthographic()
                // let resProjection = d3.geoStereographic()
                // let resProjection = d3.geoAlbers()
                // let resProjection = d3.geoEquirectangular()
                // let resProjection = d3.geoEqualEarth()
                // let resProjection = d3.geoTransverseMercator()
                // let resProjection = d3.geoNaturalEarth1()
                // let resProjection = d3.geoMercator()
                let state = this.chartState
    
                let projection = d3['geo' + state.type]()
                
                let resProjection = projection
                .scale(state.scale)
                .translate([state.translateX, state.translateY])
                .center([state.centerLon, state.centerLat])
                .rotate([state.rotateLambda, state.rotatePhi, state.rotateGamma])
                // console.log(resProjection)
                return resProjection
            },
            cache: false,
        },
        selectedPathGenerator(){
            let state = this.chartState
            let pathGenerator = d3.geoPath().projection(this.selectedProjection);
            // console.log(pathGenerator)
            return pathGenerator
        },
        resGeojson:{
            cache: false,
            get(){
                this.updater;
                if(this.mapsGeojson){
                    let inputGeojson    = this.mapsGeojson
                    let geoGenerator    = this.selectedPathGenerator
                    // console.log("hola")
                    for (let index = 0; index < inputGeojson.features.length; index++) {
                        // * Genera el Path del polígono del mapa
                        inputGeojson.features[index]['path'] = geoGenerator(inputGeojson.features[index])
                        inputGeojson.features[index]['centroid'] = geoGenerator.centroid(inputGeojson.features[index])
                    }
                    this.desplegarMapa = true
                    return inputGeojson
                } else {
                    return false
                }
                
            }                
        },
    },
    watch:{
        mapTypeRes:{
            immediate: true, 
            handler(n,o){
                this.dibujarMapa();
                this.methodThatForcesUpdate();
            }
        },
        
    },
    methods: {
        methodThatForcesUpdate() {
            // ...
            this.$forceUpdate();  // Notice we have to use a $ here
            // ...
        },
        dibujarMapa(){
            const features      = this.selectedFeatureSet;
            const geojson       = topojson.feature(features, features.objects[this.muestras[this.mapTypeRes].key]);
            // console.log("test")
            // console.log(geojson)
            this.mapsGeojson    = geojson

            
            let geoGenerator    = this.selectedPathGenerator
            let datares         = this.resGeojson
            // this.$forceUpdate();
            // console.log(datares)

        }
    },
    mounted(){
        this.cid = this._uid
        this.dibujarMapa()
        // console.log(this.muestras.chilecomunas)
        // console.log(this.muestras.chileregions)
        // console.log(this.muestras.countries10m)
        // ? STGO: -70O,-33S : 70,33
        // ? NYC: -74O,40N: 74,-40
        // ? NYC: 4E,52N: -4,-52
        // ? STGO: 70O,33S
        // ? Lon-ver: -180 <> 180
        // ? lat-hor: -90 <> 90 
        console.log((70/180)*360)
        console.log((33/90)*360)
        // console.log(-70* (Math.PI/180))

    },
    updated(){
        // this.$forceUpdate();
        // console.log("actualizado")
    },
    created(){
        // vm.$recompute('resGeojson')
    }
}
</script>