let camera, scene, renderer, dragControls;
let parent, controls, arcball, box;
let newParentPosition = new THREE.Vector3();
let objects = [];
let rotation = false;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), INTERSECTED;

init();
animate();

class Arcball{
	constructor(object){
		this.arcball;
		this.object = object;
		this.global = false;
		this.active = false;
		this.mouse3;

		this.checkGlobal();
		this.makeArcball();
	}
	
	checkGlobal(){
		if (this.object.name === "group"){
			this.global = true;
		}
	}
	
	activate(){
		this.active = true;
		this.mouse3 = this.calculateProjection();
	}
	
	deactivate(){
		this.active = false;
		this.mouse3 = null;
	}
	
	makeArcball(){
		let radius = this.getRadius();	
		let sphere = this.createSphere(radius);
	
		this.object.getWorldPosition(sphere.position);
		sphere.name = "arcball";
		this.arcball = sphere;
	}
	
	createSphere(radius){
		let material = createSeeThroughMaterial(0.2);
	
		let sphereGeometry = new THREE.SphereGeometry(radius, 50, 50);
		let sphere = new THREE.Mesh(sphereGeometry, material);

		return sphere;
	}

	getRadius(){
		if (this.global) return box.geometry.boundingSphere.radius;
		else{
			let boxHelper = new THREE.BoxHelper(this.object);
			return boxHelper.geometry.boundingSphere.radius;
		}
	}

	calculateProjection(){
		let radius = this.arcball.geometry.boundingSphere.radius;
		let pos = this.arcball.position.clone();

		let mouse3 = new THREE.Vector3(mouse.x, mouse.y, 0);
		mouse3.unproject(camera);
		mouse3.sub(pos);
		mouse3.z = 0;

		mouse3.divideScalar(radius);
		let r = mouse3.lengthSq();
		
		if (r > 1) mouse3.normalize();
		else mouse3.z = Math.sqrt(1 - r);

		return mouse3;
	}

	rotate(){
		let mouse3f = this.calculateProjection();

		let cross = this.mouse3.clone();
		let dot = this.mouse3.clone();
		
		cross.cross(mouse3f);
		let angle = dot.dot(mouse3f);
		
		let objQuat = this.object.quaternion.clone().normalize();
		let fatherQuat = this.object.parent.quaternion.clone().normalize();
		let invFatherQuat = fatherQuat.clone();
		invFatherQuat.inverse().normalize();

		let quat = new THREE.Quaternion(cross.x, cross.y, cross.z, angle).normalize();
		this.object.applyQuaternion(fatherQuat);
		this.object.applyQuaternion(quat);
		this.object.applyQuaternion(invFatherQuat);

		this.mouse3.copy(mouse3f);
	}

	show(){
		scene.add(this.arcball);
	}

	remove(){
		scene.remove(this.arcball);
	}
}

function onDocumentMouseDown(event){
	event.preventDefault();

	if (rotation){
		arcball.activate();
	}
}

function onDocumentMouseUp(event){
	event.preventDefault();

	if (!rotation){
		box.update();
		
		let newParentPosition = box.geometry.boundingSphere.center.clone();
		
		let translation = newParentPosition.clone();
		translation.sub(parent.position);
		
		invQuat = parent.quaternion.clone();
		invQuat.inverse();
		
		translation.applyQuaternion(invQuat);
		for(object of parent.children){
			object.position.sub(translation);
		}
		
		parent.position.copy(newParentPosition);		
	}

	else arcball.deactivate();
}
	
function onDocumentMouseMove(event){
	event.preventDefault();
	 
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	let intersects = raycaster.intersectObjects(objects);
	highlightObject(intersects);
}

function onDocumentDoubleClick(event){
	event.preventDefault();

	if (!rotation){
		if (INTERSECTED) arcball = new Arcball(INTERSECTED);
		else arcball = new Arcball(parent);
		dragControls.deactivate();
		arcball.show();
	}
	
	else{
		arcball.remove();
		if (INTERSECTED === null || INTERSECTED === arcball.object) dragControls.activate();
		else{
			rotation = !rotation;
			arcball = new Arcball(INTERSECTED);
			arcball.show();
		}
	}

	rotation = !rotation;
	controls.enabled = false;
}

function setControlsOptions(controls){
	controls.zoomSpeed = -1.2;
	controls.noZoom = false;
	controls.noPan = true;
	controls.noRotate = true;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
}

function highlightObject(intersects){
	if (intersects.length > 0) {
		if (INTERSECTED != intersects[0].object) INTERSECTED = intersects[0].object;
	}
	
	else INTERSECTED = null;
}

function init(){
	initSceneAndCamera()
	
	parent = new THREE.Group();
	parent.name = "group";
	scene.add(parent);
	
	let axesHelper = new THREE.AxesHelper(200);
	scene.add(axesHelper);
	
	initObjects(4, parent);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	initEvents()
}

function initSceneAndCamera(){
	let frustumSize = 1000;
	let aspect = window.innerWidth / window.innerHeight;
	
	scene = new THREE.Scene();

	let left = frustumSize * aspect / - 2;
	let right = frustumSize * aspect / 2;
	let top = frustumSize / 2;
	let bottom = frustumSize / -2;
	
	camera = new THREE.OrthographicCamera(left, right, top, bottom, 1, 10000);
	camera.position.z = 1000;
	scene.add(camera);

	scene.background =  new THREE.Color(0xf0f0fa);	

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	let light = new THREE.PointLight(0xffffff, 1);
	camera.add(light);
}

function createSeeThroughMaterial(opacity){
	let mat = new THREE.MeshNormalMaterial();
	mat.transparent = true;
	mat.opacity = opacity;
	return mat;
}

function initObjects(n, parent){
	let boxGeometry = new THREE.BoxGeometry(50, 50, 50);
	
	for (let i = 0; i < n; i++){
		let material = new THREE.MeshLambertMaterial({color: Math.random()*0xffffff});
		
		let mesh = new THREE.Mesh(boxGeometry, material);
		randomPosition(mesh.position);
		randomRotationObject(mesh.quaternion);
		randomScale(mesh.scale);
		
		mesh.geometry.computeBoundingSphere();
		objects.push(mesh);
		parent.add(mesh);
		// scene.add(sphere);
	}
	
	box = new THREE.BoxHelper(parent);

	let v = box.geometry.boundingSphere.center.clone();
	parent.position.copy(v);

	v.multiplyScalar(-1);

	for (object of parent.children){
		object.position.add(v);
	}
}

function initEvents(){
	dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

	controls = new THREE.OrthographicTrackballControls(camera, renderer.domElement);
	setControlsOptions(controls);

	document.addEventListener('mousedown', onDocumentMouseDown, false);

	document.addEventListener('mouseup', onDocumentMouseUp, false);

	document.addEventListener('dblclick', onDocumentDoubleClick, false);

	dragControls.addEventListener('dragstart', function (){
		if (!rotation) controls.enabled = false;
	});
	
	dragControls.addEventListener('dragend', function (){
		if (!rotation) controls.enabled = true;
	});

	document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function render(){
	controls.update();
	parent.updateMatrix();

	if (rotation){
		if (arcball.active){
			arcball.rotate();
		}
	}
}

function animate(){
	requestAnimationFrame(animate);
	
	render();
	renderer.render(scene, camera);
}	