import * as THREE from 'three';

export class Cube {

    constructor( color, position ) {

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshPhysicalMaterial( { color } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.castShadow = true;
        this.mesh.position.set( ...position ); // needed to seperate parameter instead of one array, need x,y,z

    }
    addTo(scene) {

        scene.add( this.mesh );

    }

    update() {

        this.mesh.rotation.x += 0.006;
        this.mesh.rotation.y += 0.006;

    }
}