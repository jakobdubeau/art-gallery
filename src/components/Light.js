import * as THREE from 'three';

export class Light {

    constructor( color, intensity, position, helperSize = 0.3 ) {

        this.light = new THREE.PointLight( color, intensity );
        this.light.position.set( ...position );
        this.light.castShadow = true;

        this.helper = new THREE.PointLightHelper( this.light, helperSize );

    }

    addTo( scene ) {
        scene.add( this.light );
        scene.add( this.helper );
    }
}