import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // 75 fov,  aspect ratio, min/max distance from cam rendered
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhysicalMaterial( { color: 0xFF7DE9 } );
const cube = new THREE.Mesh( geometry, material ); // takes shape and material
scene.add( cube ); // add to scene

const floorGeometry = new THREE.PlaneGeometry( 10, 10 );
const floorMaterial = new THREE.MeshPhysicalMaterial( { color: 0x00ff00 })
const floor = new THREE.Mesh( floorGeometry, floorMaterial );
floor.rotation.x = -Math.PI / 2; // rotate 90 degrees into screen to make floor instead of wall
floor.position.y = -1;
scene.add( floor )

const light1 = new THREE.PointLight( 0xffffff, 10 ); // colour and intensity
light1.position.set( 3, 2, 1 ); // position
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 10 );
light2.position.set( -3, 2, 1 );
scene.add( light2 );

const helper1 = new THREE.PointLightHelper(light1, 0.3); // helper to visualize light, 2nd param is size of geometry
const helper2 = new THREE.PointLightHelper(light2, 0.3);
scene.add( helper1, helper2, );

function animate() {
    cube.rotation.x += 0.006;
    cube.rotation.y += 0.006;
    renderer.render( scene, camera ); // purpose: draw everything in scene as seen from camera onto the screen
}
renderer.setAnimationLoop( animate ); // this will refresh aprox 60 times a second, so will display cube and rotate