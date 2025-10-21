import * as THREE from 'three';

export class Floor {

    constructor( renderer, texturePath ) {
        
        const loader = new THREE.TextureLoader();
        const texture = loader.load( texturePath );

        texture.wrapS = THREE.RepeatWrapping; // horizontal tiling
        texture.wrapT = THREE.RepeatWrapping; // vertical tiling
        texture.repeat.set( 4, 4 ); // repeat param times for s and t
                
        texture.minFilter = THREE.NearestFilter; // picks nearest pixel colour instead of blending when in between tiles, for far away
        texture.magFilter = THREE.NearestFilter; // for close up

        texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // makes shallow angles look less blurry
        
        const geometry = new THREE.PlaneGeometry( 10, 10 );
        const material = new THREE.MeshStandardMaterial( { map: texture });
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.rotation.x = -Math.PI / 2; // rotate 90 degrees into screen to make floor instead of wall
        this.mesh.position.y = -1;
        this.mesh.receiveShadow = true;

    }

    addTo( scene ) {

        scene.add( this.mesh );

    }
}