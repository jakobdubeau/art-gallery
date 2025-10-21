import * as THREE from 'three';
import { Cube } from './components/Cube.js';
import { Floor } from './components/Floor.js';
import { Light } from './components/Light.js';
import { Sky } from './components/Sky.js';

export class World {

    constructor( renderer ) {

        this.scene = new THREE.Scene();

        this.floor = new Floor( renderer, '/assets/textures/floor/checker_floor.avif' );
        this.cube = new Cube( 0xFF7DE9 );
        this.light1 = new Light( 0xffffff, 10, [3, 2, 1] );
        this.light2 = new Light( 0xffffff, 10, [-3, 2, 1] );
        this.sky = new Sky( renderer, '/assets/textures/sky/mb_sky.jpg' );

        this.floor.addTo( this.scene );
        this.cube.addTo( this.scene );
        this.light1.addTo( this.scene );
        this.light2.addTo( this.scene );
        this.sky.addTo( this.scene );
    }

    update() {

        this.cube.update();

    }
}