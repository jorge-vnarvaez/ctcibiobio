<template>
    <component :is="tag" ref="coordinatorg"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking"
    v-bind="{...shapeFeatures,...coordFeatures}">
        <slot v-bind="{scales: scalesRes, hovered: hoveredRes, clicked: clickedRes, selected: selectedRes}"></slot>
    </component>
</template>
<script>
import * as d3 from "d3"
import { ShapeFeatures } from './mixins/ShapeFeatures'
import { Coordinates } from './mixins/Coordinates'
import { Scaler } from './mixins/Scaler'
export default {
    mixins: [ ShapeFeatures, Scaler, Coordinates ],
    data(){
        return {
            type:'g'
        }
    },
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        ...Scaler.props,
        tag: {
            type: String,
            default: 'g'
        }
    }
}
</script>