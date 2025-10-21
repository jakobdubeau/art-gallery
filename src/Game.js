import * as THREE from 'three';
import { World } from './World.js';
import { Player } from './Player.js';

export class Game {

    constructor() {

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // 75 fov,  aspect ratio, min/max distance from cam rendered
        this.camera.position.set(0, 0, 5);

        this.world = new World( this.renderer );
        this.player = new Player( this.camera, document.body );

        this.clock = new THREE.Clock();
        
    }

    start() {

        this.renderer.setAnimationLoop(() => this.update()); // this will refresh aprox 60 times a second, so will display cube and rotate

    }

    update() {
        
        const delta = Math.min( this.clock.getDelta(), 0.05 ); // get seconds since last frame so you move the same amount regardless of fps

        this.player.update( delta );
        this.world.update( this.camera );
        this.renderer.render(this.world.scene, this.camera);

    }
}