import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// scene and camera

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // 75 fov,  aspect ratio, min/max distance from cam rendered

// renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

// cube

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhysicalMaterial( { color: 0xFF7DE9 } );
const cube = new THREE.Mesh( geometry, material ); // takes shape and material
cube.castShadow = true;
scene.add( cube ); // add to scene

// floor texture

const loader = new THREE.TextureLoader();
const floorTexture = loader.load('/assets/textures/floor/checker_floor.avif');

floorTexture.wrapS = THREE.RepeatWrapping; // horizontal tiling
floorTexture.wrapT = THREE.RepeatWrapping; // vertical tiling
floorTexture.repeat.set( 4, 4 ); // repeat param times for s and t

floorTexture.minFilter = THREE.NearestFilter; // picks nearest pixel colour instead of blending when in between tiles, for far away
floorTexture.magFilter = THREE.NearestFilter; // for close up

floorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // makes shallow angles look less blurry

// floor

const floorGeometry = new THREE.PlaneGeometry( 10, 10 );
const floorMaterial = new THREE.MeshStandardMaterial( { map: floorTexture });
const floor = new THREE.Mesh( floorGeometry, floorMaterial );
floor.rotation.x = -Math.PI / 2; // rotate 90 degrees into screen to make floor instead of wall
floor.position.y = -1;
floor.receiveShadow = true;
scene.add( floor )

// lighting

const light1 = new THREE.PointLight( 0xffffff, 10 ); // colour and intensity
light1.position.set( 3, 2, 1 ); // position
light1.castShadow = true;
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 10 );
light2.position.set( -3, 2, 1 );
light2.castShadow = true;
scene.add( light2 );

// visualized lighting

const helper1 = new THREE.PointLightHelper(light1, 0.3); // helper to visualize light, 2nd param is size of geometry
const helper2 = new THREE.PointLightHelper(light2, 0.3);
scene.add( helper1, helper2, );

// mouse movement to look around

const controls = new PointerLockControls( camera, document.body );
document.addEventListener( 'click', () => controls.lock());
controls.pointerSpeed = 0.7;

// wasd movement

const keys = {};

document.addEventListener( 'keydown', e => { keys[e.code] = true }); // whenever a key is pressed down, using event browser gives, set specific key = true in keys map
document.addEventListener( 'keyup', e => { keys[e.code] = false });

// clock

const clock = new THREE.Clock()

// gravity/jumping

const gravity = 9.8;
const jumpStrength = 4;
const groundHeight = 0;

let velocityY = 0;
let onGround = true;

// stuff to make stuff happen

function animate() {
    cube.rotation.x += 0.006;
    cube.rotation.y += 0.006;

    // Math.min is so you cant jump big distances on frame skips
    const delta = Math.min( clock.getDelta(), 0.1 ) // get seconds since last frame so you move the same amount regardless of fps
    const speed = 3 * delta // more seconds in between frames (like 30fps) = move further, this way 30fps and 120fps moves same amount even though 120fps move more frequently but smaller

    // movement
    
    if (keys['KeyW']) {
        controls.moveForward(speed);
    }
    if (keys['KeyA']) {
        controls.moveRight(-speed);
    }
    if (keys['KeyS']) {
        controls.moveForward(-speed);
    }
    if (keys['KeyD']) {
        controls.moveRight(speed);
    }

    // gravity/jumping

    velocityY -= gravity * delta;
    camera.position.y += velocityY * delta;

    if (camera.position.y <= groundHeight) {
        camera.position.y = groundHeight;
        velocityY = 0;
        onGround = true;
    }

    if (onGround && keys['Space']) {
        velocityY = jumpStrength;
        onGround = false;
    }


    renderer.render( scene, camera ); // purpose: draw everything in scene as seen from camera onto the screen
}
renderer.setAnimationLoop( animate ); // this will refresh aprox 60 times a second, so will display cube and rotate