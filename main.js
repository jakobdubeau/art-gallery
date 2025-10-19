import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // 75 fov,  aspect ratio, min/max distance from cam rendered

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0xFF7DE9 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

const light1 = new THREE.PointLight( 0xffffff, 10 );
light1.position.set( 3, 2, 1 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 10 );
light2.position.set( -3, 2, 1 );
scene.add( light2 );

const light3 = new THREE.PointLight( 0xffffff, 10 );
light3.position.set( 0, -3, 1 );
scene.add( light3 );

const helper1 = new THREE.PointLightHelper(light1, 0.3);
const helper2 = new THREE.PointLightHelper(light2, 0.3);
const helper3 = new THREE.PointLightHelper(light3, 0.3);
scene.add( helper1, helper2, helper3 );

function animate() { // this will refresh aprox 60 times a second, so will display cube and rotate
    cube.rotation.x += 0.006;
    cube.rotation.y += 0.006;
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );