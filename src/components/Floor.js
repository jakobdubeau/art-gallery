import * as THREE from 'three';

export class Floor {

    constructor( renderer, texturePath ) {
        
        const loader = new THREE.TextureLoader();
        const texture = loader.load( texturePath );

        floorTexture.wrapS = THREE.RepeatWrapping; // horizontal tiling
        floorTexture.wrapT = THREE.RepeatWrapping; // vertical tiling
        floorTexture.repeat.set( 4, 4 ); // repeat param times for s and t
                
        floorTexture.minFilter = THREE.NearestFilter; // picks nearest pixel colour instead of blending when in between tiles, for far away
        floorTexture.magFilter = THREE.NearestFilter; // for close up

        floorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // makes shallow angles look less blurry
        
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