import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { statesData } from './us-states.js';
import { MAPBOX_TOKEN } from './tokens.js';

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
      // attach geojson data to the map
      map.addSource('states-data', {
        type: 'geojson',
        data: statesData 
      })

      // fill states with different colors based on their corresponding data in geojson file
      // fill states with different opacity based on whether the mouse is hovering or not
      map.addLayer({
        id: 'states-fill',
        source: 'states-data',
        type: 'fill',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'density'],
            0,
            '#F2F12D',
            10,
            '#EED322',
            20,
            '#E6B71E',
            50,
            '#DA9C20',
            100,
            '#CA8323',
            200,
            '#B86B25',
            500,
            '#A25626',
            1000,
            '#8B4225',
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.75,
            0.5
          ]
        }

      });

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

      // when hovering, turn on the hover state for current map feature and turn off the hover state for previous map feature (if any)
      map.on('mousemove', 'states-fill', function(e) {
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
      map.on('mouseleave', 'state-fills', function () {
        if (this.hoveredStateId) {
          map.setFeatureState(
            { source: 'states', id: this.hoveredStateId },
            { hover: false }
          );
        }
        this.hoveredStateId = null;
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
