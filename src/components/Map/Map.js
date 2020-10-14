import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { statesData } from './us-states.js';
import { MAPBOX_TOKEN } from './tokens.js';
import { layerColors } from './layerColors.js';

mapboxgl.accessToken = MAPBOX_TOKEN;

export const enumDataLayerType = {
  ACTIVES: {
    name:'actives',
    layerId: 'states-active-layer'
  },
  TESTS: {
    name:'tests',
    layerId: 'states-test-layer'
  },
  DEATHS: {
    name:'deaths',
    layerId: 'states-death-layer'
  },
};

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 35.9,
      lng: -79.1,
      zoom: 3
    };
    this.map = null;
    // the state that mouse is on right now
    this.hoveredStateId = null;
    // the state that mouse has selected right now
    this.selectedStateId = null;
    // restrict user inside this region of the map
    this.bounds = [
      [-179, -5.91619], // Southwest coordinates
      [-20.96466, 75.3577635769] // Northeast coordinates
    ];
    this.initDataLayer = this.initDataLayer.bind(this);
    this.switchToLayer = this.switchToLayer.bind(this);
    this.currentDataLayer = null;
  }

  initDataLayer(dataId, layerType, visible) { 
    const layerId = layerType.layerId;
    const layerColor = layerColors[layerType.name];

    // fill states with different colors based on their corresponding data in geojson file
    // fill states with different opacity based on whether the mouse is hovering or not
    this.map.addLayer({
      id: layerId,
      source: dataId,
      type: 'fill',
      layout: {
        'visibility': (visible ? 'visible' : 'none')
      },
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'density'],
          0,
          layerColor['0'],
          10,
          layerColor['10'],
          20,
          layerColor['20'],
          50,
          layerColor['50'],
          100,
          layerColor['100'],
          200,
          layerColor['200'],
          500,
          layerColor['500'],
          1000,
          layerColor['1000'],
        ],
        'fill-opacity': [
          // if the state is either hovered or selected, highlight the state; otherwise cancel the highlight
          'case',
          [
            'any',
            ['boolean', ['feature-state', 'hover'], false],
            ['boolean', ['feature-state', 'select'], false],
            false
          ],
          0.85,
          0.5
        ]
      }

    });


    // when hovering, turn on the hover state for current map feature and turn off the hover state for previous map feature (if any)
    this.map.on('mousemove', layerId, (e) => {
      if (e.features.length > 0) {
        if (this.hoveredStateId) {
          this.map.setFeatureState(
            { source: dataId, id: this.hoveredStateId },
            { hover: false }
          );
        }
        this.hoveredStateId = e.features[0].id;
        this.map.setFeatureState(
          { source: dataId, id: this.hoveredStateId },
          { hover: true }
        );
      }
    });

    // when selecting, turn on the hover state for current map feature and turn off the select state for previous map feature (if any)
    this.map.on('click', layerId, (e) => {
      if (e.features.length > 0) {
        if (this.selectedStateId) {
          this.map.setFeatureState(
            { source: dataId, id: this.selectedStateId },
            { select: false }
          );
        }
        this.selectedStateId = e.features[0].id;
        this.map.setFeatureState(
          { source: dataId, id: this.selectedStateId },
          { select: true }
        );

        if (this.props.onClickCallback) {
          this.props.onClickCallback(this.selectedStateId);
        }
      }
    });

    // when mouse leaveing the states map, turn off the hover state for current map feature
    this.map.on('mouseleave', layerId, () => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          { source: dataId, id: this.hoveredStateId },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });

  }

  switchToLayer(layerType) {
    for (const type in enumDataLayerType) {
      if (enumDataLayerType[type] === layerType) {
        this.currentDataLayer = enumDataLayerType[type];
        this.map.setLayoutProperty(enumDataLayerType[type].layerId, 'visibility', 'visible');
      } else {
        this.map.setLayoutProperty(enumDataLayerType[type].layerId, 'visibility', 'none');
      }
    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxBounds: this.bounds
    });

    this.map.on('load', () => {
      const dataId = 'states-data';
      // attach geojson data to the map
      this.map.addSource(dataId, {
        type: 'geojson',
        data: statesData 
      })

      this.initDataLayer(dataId, enumDataLayerType.ACTIVES, false); 
      this.initDataLayer(dataId, enumDataLayerType.DEATHS, false); 
      this.initDataLayer(dataId, enumDataLayerType.TESTS, false); 
      this.switchToLayer(enumDataLayerType.DEATHS);
      // add dashed-line borders to states
      this.map.addLayer({
        id: 'states-borders',
        type: 'line',
        source: dataId,
        layout: {},
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 2,
          'line-dasharray': [3, 3]
        }
      });
    });

  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }

}

export default Map;
