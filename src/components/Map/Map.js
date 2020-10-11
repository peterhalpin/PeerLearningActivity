import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { statesData } from './us-states.js';
import { MAPBOX_TOKEN } from './tokens.js';
import { layerColors } from './layerColors.js';

mapboxgl.accessToken = MAPBOX_TOKEN;

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 35.9,
      lng: -79.1,
      zoom: 3
    };
    // the state that mouse is on right now
    this.hoveredStateId = null;
    // restrict user inside this region of the map
    this.bounds = [
      [-177.791110603, 15.91619], // Southwest coordinates
      [-60.96466, 75.3577635769] // Northeast coordinates
    ];
    this.initDataLayer = this.initDataLayer.bind(this);
  }

  initDataLayer(map, dataId, dataSource, layerId, layerColor) {
      // attach geojson data to the map
      map.addSource(dataId, {
        type: 'geojson',
        data: dataSource 
      })

      // fill states with different colors based on their corresponding data in geojson file
      // fill states with different opacity based on whether the mouse is hovering or not
      map.addLayer({
        id: layerId,
        source: dataId,
        type: 'fill',
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
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.75,
            0.5
          ]
        }

      });


      // when hovering, turn on the hover state for current map feature and turn off the hover state for previous map feature (if any)
      map.on('mousemove', layerId, function(e) {
        if (e.features.length > 0) {
          if (this.hoveredStateId) {
            map.setFeatureState(
              { source: 'states-data', id: this.hoveredStateId },
              { hover: false }
            );
          }
          this.hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'states-data', id: this.hoveredStateId },
            { hover: true }
          );
        }
      });

      // when mouse leaveing the states map, turn off the hover state for current map feature
      map.on('mouseleave', layerId, function () {
        if (this.hoveredStateId) {
          map.setFeatureState(
            { source: 'states', id: this.hoveredStateId },
            { hover: false }
          );
        }
        this.hoveredStateId = null;
      });

  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxBounds: this.bounds
    });

    map.on('load', () => {
      this.initDataLayer(map, 'states-data', statesData, 'states-fill', layerColors.ACTIVES); 
      // add dashed-line borders to states
      map.addLayer({
        id: 'states-borders',
        type: 'line',
        source: 'states-data',
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
