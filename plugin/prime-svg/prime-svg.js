import Vue from 'vue'
import ChartArc from './components/ChartArc.vue'
import ChartCircle from './components/ChartCircle.vue'
import ChartCurve from './components/ChartCurve.vue'
import ChartEllipse from './components/ChartEllipse.vue'
import ChartG from './components/ChartG.vue'
import ChartLine from './components/ChartLine.vue'
import ChartMap from './components/ChartMap.vue'
import ChartPath from './components/ChartPath.vue'
import ChartPolygon from './components/ChartPolygon.vue'
import ChartPolyline from './components/ChartPolyline.vue'
import ChartRect from './components/ChartRect.vue'
import ChartSvg from './components/ChartSvg.vue'
import ChartText from './components/ChartText.vue'
import ChartTextPath from './components/ChartTextPath.vue'

Vue.component('ChartArc', ChartArc)
Vue.component('ChartCircle', ChartCircle)
Vue.component('ChartCurve', ChartCurve)
Vue.component('ChartEllipse', ChartEllipse)
Vue.component('ChartG', ChartG)
Vue.component('ChartLine', ChartLine)
Vue.component('ChartMap', ChartMap)
Vue.component('ChartPath', ChartPath)
Vue.component('ChartPolygon', ChartPolygon)
Vue.component('ChartPolyline', ChartPolyline)
Vue.component('ChartRect', ChartRect)
Vue.component('ChartSvg', ChartSvg)
Vue.component('ChartText', ChartText)
Vue.component('ChartTextPath', ChartTextPath)


import { scalerFunction } from './components/mixins/Scaler'
export default ({ app }, inject) => {
    inject('scaler', input => {
        return scalerFunction(input)
    })
}
