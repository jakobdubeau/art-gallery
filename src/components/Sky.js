import * as THREE from 'three';

export class Sky {
    constructor( renderer, texturePath ) {

        const loader = new THREE.TextureLoader();
        const texture = loader.load( texturePath );

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.colorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.SphereGeometry( 1000, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.60 );
        const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide });
        this.mesh = new THREE.Mesh( geometry, material );

    }

    addTo( scene ) {

        scene.add( this.mesh );

    }

    update( camera ) {

        if ( camera ) {

            this.mesh.position.copy( camera.position );
        }
    }
}