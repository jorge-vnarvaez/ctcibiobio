import * as d3 from "d3"
import * as d3scale from 'd3-scale'

export const Scaler = {
    props: {
        scales: {
            type: [Object, Boolean],
            default: false,
        }
    },
    computed: {
        scalesRes(){
            // scale
            // domain
            // range
            // clamp
            // round
            // paddingOuter
            // paddingInner
            // bands
            // align
            let input = this.$props.scales
            let inputKeys = Object.keys(input)
            let outputScales = {}

            inputKeys.forEach(el => {
                
                outputScales[el] = false;

                /**
                 * Linear Scale
                 * 
                 * 
                 * Time scale
                 * 
                 * 
                 */
                if(
                    (input[el].scale == 'scaleLinear' || input[el].scale == 'scaleTime') 
                    && input[el].domain 
                    && input[el].range
                ){
                    outputScales[el] = this.scaler({
                        ...(input[el].scale ? {scale: input[el].scale} : {}),
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {}),
                        ...(input[el].round ? {round: (input[el].round) ?? false} : {}),
                        ...(input[el].clamp ? {clamp: (input[el].clamp) ?? false} : {}),
                    });
                }

                /**
                 * Quantize Scale
                 * Escala lineal pero con valores discretos (cuantizados enteros)
                 */
                 if(
                    (input[el].scale == 'scaleQuantize')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {}),
                    });                    
                }
                /**
                 * Quantile Scale
                 * Escala de quantiles, definidos por su dominio [rangoBajoCorteX,rangoAltoCorteX]
                 * Los threshold del dominio son valores continuos
                 */
                 if(
                    (input[el].scale == 'scaleQuantile')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {}),
                    });                    
                }
                /**
                 * Threshold Scale
                 * Escala lineal continua, pero con umbrales definidos por sus dominio [rangoBajoCorteX,rangoAltoCorteX]
                 * Si supera el rango bajo o alto se asigna el valor del rango bajo o alto
                 */
                 if(
                    (input[el].scale == 'scaleThreshold')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {}),
                    });                    
                }
                /**
                 * Ordinal Scale
                 * Escala ordinal, con índices secuenciales
                 */
                 if(
                    (input[el].scale == 'scaleOrdinal')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {}),
                    });                    
                }
                /**
                 * Power Scale
                 * k = exponent. Any real number
                 * 0 range.min 1 range.max, y crecimiento exponencial para +∞ y -∞
                 * x: y = mx^k + b
                 */
                if(
                    (input[el].scale == 'scalePow')
                    && input[el].exponent 
                    && input[el].range
                ){
                    outputScales[el] = this.scaler({
                        scale: 'scalePow',
                        exponent: input[el].exponent, 
                        range: input[el].range, 
                        ...(input[el].clamp ? {clamp: (input[el].clamp) ?? false} : {}),
                    });   
                }

                /**
                 * Logaritmic Scale
                 * default domain: [1,10],
                 * default range: [0,1]
                 */
                if(
                    (input[el].scale == 'scaleLog')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {domain:[1,10]}),
                        ...(input[el].range ? {range: input[el].range} : {range:[0,1]}),
                    });                    
                }
                /**
                 * Radial Scale
                 * default range: [0,1]
                 */
                if(
                    (input[el].scale == 'scaleRadial')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {range:[0,1]}),
                    });                    
                }
                /**
                 * Band Scale
                 * 
                 */
                if(
                    input[el].scale == 'scaleBand' 
                    && input[el].bands 
                    && input[el].range 
                    && input[el].align
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        bands: input[el].bands, 
                        range: input[el].range, 
                        align: input[el].align, 
                        paddingInner: (input[el].paddingInner) ?? 0, 
                        paddingOuter: (input[el].paddingOuter) ?? 0, 
                        round: (input[el].round) ?? false,
                    });
                }
                /**
                 * Point Scale
                 * Escala de bandas con bandwidth = 0
                 */
                 if(
                    (input[el].scale == 'scalePoint')
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        ...(input[el].domain ? {domain: input[el].domain} : {}),
                        ...(input[el].range ? {range: input[el].range} : {}),
                    });                    
                }

            })

            return this.$props.scales ? outputScales : false;
        }
    },
    methods: {
        /**
         * 
         * scaler({d3:d3, scale: 'scaleLinear', domain: [1,20], range: [0,1000], clamp: false, round: false})
         * scaler({d3:d3, scale: 'scaleTime', domain: ['2020-10-23','2020-11-20'], range: [0,1000], clamp: false, round: false})
         * scaler({d3:d3, scale: 'scaleBand', range: [0,1000], bands: 10, paddingInner: 10, paddingOuter:10, clamp: false, round: false})
         * 
         */
         scaler({ 
            scale, 
            domain, 
            range, 
            clamp = false, 
            round = false,
            paddingOuter,
            paddingInner,
            bands,
            exponent,
            align = 0
        }){    
            switch (scale) {
                case "scaleLinear":
                    return (!round) ?  
                            d3.scaleLinear(domain, range).clamp(clamp) : 
                            d3.scaleLinear(domain).rangeRound(range).clamp(clamp);
                    break;
                case "scaleQuantize":
                    return d3scale.scaleQuantize(domain, range)
                    break;
                case "scaleQuantile":
                    return d3scale.scaleQuantize(domain, range)
                    break;
                case "scaleThreshold":
                    return d3scale.scaleQuantize(domain, range)
                    break;
                case "scaleOrdinal":
                    return d3scale.scaleQuantize(domain, range)
                    break;
                case "scalePow":
                    return d3scale.scalePow().exponent(exponent).range(range).clamp(clamp);
                    break;
                case "scaleLog":
                    return d3scale.scaleLog(domain, range)
                    break;
                case "scaleRadial":
                    return d3scale.scaleRadial(domain, range)
                    break;
                case "scaleTime":
                    return (!round) ?  
                            d3.scaleTime(domain, range).clamp(clamp) : 
                            d3.scaleTime(domain).rangeRound(range).clamp(clamp);
                    break;
                case "scaleBand":
                    return d3.scaleBand()
                            .range(range)
                            .paddingInner(paddingInner)
                            .paddingOuter(paddingOuter)
                            .domain(d3.range(bands))
                            .align(align)
                            .round(round)
                    break;
                case "scalePoint":
                    return d3scale.scaleQuantize(domain, range)
                    break;
                default:
                    return false;
                    break;
            }
        },
    },
}