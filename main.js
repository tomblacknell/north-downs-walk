import 'ol/ol.css';
import { Map, View } from 'ol';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { defaults } from 'ol/control';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import GPX from 'ol/format/GPX';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const style = {
  'Point': new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(255,255,0,0.4)',
      }),
      radius: 5,
      stroke: new Stroke({
        color: '#ff0',
        width: 1,
      }),
    }),
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: '#f00',
      width: 3,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: '#0f0',
      width: 3,
    }),
  }),
};

const gpxSources = [
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day1.gpx?token=AAKHDGATWBQWSKAOG4FPKKTBAA6QE',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day2.gpx?token=AAKHDGFJ6GC7I4TNIBYFIWTBAA6ZE',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day3.gpx?token=AAKHDGFBHL73QMENCKEFHMTBAA6ZY',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day4.gpx?token=AAKHDGCFMJY3YVT4CV4FUSDBAA62K',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day5.gpx?token=AAKHDGGC2PND5MTPXC64L63BAA626',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day6.gpx?token=AAKHDGD5R3OFKTIQARVP2Y3BAA63M',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day7.gpx?token=AAKHDGBFCSHEV3KVM4EWQODBAA636',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day8.gpx?token=AAKHDGHHQE3XOGRNMJYSASDBAA64O',
  'https://raw.githubusercontent.com/happyzombie707/NorfDownsWalk/main/gpx/day9.gpx?token=AAKHDGHE57YBIA2FCM5RM43BAA644',
];

const vectors = gpxSources.map(vector => new VectorLayer({
  source: new VectorSource({
    url: vector,
    format: new GPX(),
  }),
  style: function (feature) {
    return style[feature.getGeometry().getType()];
  },
})); 

const map = new Map({
  target: 'map',
  controls: defaults({ attribution: false }),
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    ...vectors,
  ],
  view: new View({
    center: fromLonLat([-0.087148, 51.270642]),
    zoom: 10
  })
});
