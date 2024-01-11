import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../util';

function Map({center,caseType, zoom, countries}){

    return(
        <div className='map'>
            <LeafletMap  key={`${center[0]}-${center[1]}-${zoom}`} center={center} zoom={zoom}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, caseType)}
            </LeafletMap>
            {/* Loop through countries and draw circles on the screen */}
            

        </div>
    )
}

export default Map;