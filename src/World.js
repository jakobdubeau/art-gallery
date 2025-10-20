import * as THREE from 'three';

export class World {

    constructor( renderer ) {

        this.scene = new THREE.Scene();
        this.addFloor( renderer );
        this.addLighting();
        this.addSky( renderer );
        this.addCube();
    }

    addFloor( renderer ) {

        const loader = new THREE.TextureLoader();
        const floorTexture = loader.load('/assets/textures/floor/checker_floor.avif');
        
        floorTexture.wrapS = THREE.RepeatWrapping; // horizontal tiling
        floorTexture.wrapT = THREE.RepeatWrapping; // vertical tiling
        floorTexture.repeat.set( 4, 4 ); // repeat param times for s and t
        
        floorTexture.minFilter = THREE.NearestFilter; // picks nearest pixel colour instead of blending when in between tiles, for far away
        floorTexture.magFilter = THREE.NearestFilter; // for close up
        
        floorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // makes shallow angles look less blurry
        
        // floor
        
        const geometry = new THREE.PlaneGeometry( 10, 10 );
        const material = new THREE.MeshStandardMaterial( { map: floorTexture });
        const floor = new THREE.Mesh( geometry, material );
        floor.rotation.x = -Math.PI / 2; // rotate 90 degrees into screen to make floor instead of wall
        floor.position.y = -1;
        floor.receiveShadow = true;
        this.scene.add( floor )

    }

    addSky( renderer ) {

        const loader = new THREE.TextureLoader();
        const skyTexture = loader.load('/assets/textures/sky/mb_sky.jpg');

        skyTexture.wrapS = THREE.RepeatWrapping;
        skyTexture.wrapT = THREE.ClampToEdgeWrapping;
        skyTexture.minFilter = THREE.LinearMipmapLinearFilter;
        skyTexture.magFilter = THREE.LinearFilter;
        skyTexture.generateMipmaps = true;
        skyTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        skyTexture.colorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.SphereGeometry( 1000, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.60 );
        const material = new THREE.MeshBasicMaterial( { map: skyTexture, side: THREE.BackSide });
        const sky = new THREE.Mesh( geometry, material );
        this.scene.add(sky);
        this.sky = sky;

    }

    addLighting() {

        const light1 = new THREE.PointLight( 0xffffff, 10 ); // colour and intensity
        light1.position.set( 3, 2, 1 ); // position
        light1.castShadow = true;
        this.scene.add( light1 );
        
        const light2 = new THREE.PointLight( 0xffffff, 10 );
        light2.position.set( -3, 2, 1 );
        light2.castShadow = true;
        this.scene.add( light2 );
        
        // visualized lighting
        
        const helper1 = new THREE.PointLightHelper(light1, 0.3); // helper to visualize light, 2nd param is size of geometry
        const helper2 = new THREE.PointLightHelper(light2, 0.3);
        this.scene.add( helper1, helper2, );
        
    }

    addCube() {

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshPhysicalMaterial( { color: 0xFF7DE9 } );
        const cube = new THREE.Mesh( geometry, material ); // takes shape and material
        cube.castShadow = true;
        this.scene.add( cube );
        this.cube = cube; // so i can change it after adding (animation)

    }

    update() {

        this.cube.rotation.x += 0.006;
        this.cube.rotation.y += 0.006;

    }
}