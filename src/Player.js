import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class Player {

    constructor( camera, domElement ) {

        this.camera = camera;
        this.controls = new PointerLockControls( camera, domElement );

        this.keys = {}
        
        this.baseSpeed = 3;
        this.sprintMultiplier = 1.5;

        this.gravity = 9.8;
        this.jumpStrength = 4;
        this.velocityY = 0;
        this.onGround = true;

        this.addListeners();

    }

    // key presses / mouse click

    addListeners() {

        this.domElement.addEventListener( 'click', () => this.controls.lock());
        this.domElement.addEventListener( 'keydown', e => { this.keys[e.code] = true });
        this.domElement.addEventListener( 'keyup', e => { this.keys[e.code] = false });

    }

    update( delta ) {

        const isSprinting = this.keys['ShiftLeft'];
        const moveSpeed = this.baseSpeed * (isSprinting ? this.sprintMultiplier : 1);
        const speed = moveSpeed * delta;

        if (this.keys['KeyW']) {
            this.controls.moveForward(speed);
        }
        if (this.keys['KeyA']) {
            this.controls.moveRight(-speed);
        }
        if (this.keys['KeyS']) {
            this.controls.moveForward(-speed);
        }
        if (this.keys['KeyD']) {
            this.controls.moveRight(speed);
        }

        this.velocityY -= this.gravity * delta;
        this.camera.position.y += this.velocityY * delta;

        if (this.camera.position.y <= 0) {
            this.camera.position.y = 0;
            this.velocityY = 0;
            this.onGround = true;
        }

        if (this.onGround && this.keys['Space']) {
            this.velocityY = this.jumpStrength;
            this.onGround = false;
        }


        const targetFov = isSprinting ? 90 : 75;
        this.camera.fov += ( targetFov - this.camera.fov ) * 0.1;
        this.camera.updateProjectionMatrix();


    }
}