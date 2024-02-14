import * as THREE from '../node_modules/three/build/three.module.js'; // three.js를 가져온다.

 class App{
    constructor(){
        // _를 붙이면 private으로 만들어준다.자바스크립트는 private, public, protected가 없기 때문에 이렇게 사용한다.
        // 외부에서는 _를 붙인 변수에 접근해서는 안된다.

        const divContainer = document.querySelector("#webgl-container")
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true }); // 픽셀의 계단현상 없애기 anti-aliasing
        renderer.setPixelRatio(window.devicePixelRatio); // 렌더링할 때 디바이스 픽셀 비율에 맞춰서 렌더링
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        window.onresize = this.resize.bind(this); // 화면 크기가 변할 때마다 resize 함수를 호출한, bind(this)를 해줘야 this가 App을 가리킨다.

        this.resize(); // 처음에 한번 호출해준다.

        requestAnimationFrame(this.render.bind(this)); // 렌더링을 반복한다, bind(this)를 해줘야 this가 App을 가리킨다.   
    }
      //  ES6 이후의 자바스크립트에서는 클래스 내의 메소드를 정의할 때 function 키워드를 사용하지 않아도 됩니다. 즉, 메소드는 메소드 이름 뒤에 괄호와 중괄호로 정의됩니다.
    _setupCamera(){ // 카메라를 만든다.
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight; 
        const camera = new THREE.PerspectiveCamera( // 카메라를 만든다.
            75, 
            width / height, 
            0.1, 
            100
            );
            camera.position.z = 2;
            this._camera = camera;
    }
    _setupLight(){ // 빛을 만든다.
        const color = 0xffffff; 
        const intensity = 1; 
        const light = new THREE.DirectionalLight(color, intensity); // 빛을 만든다.
        light.position.set(-1,2,4); // 위치를 정한다.
        this._scene.add(light); // 씬에 추가한다.
    }
    _setupModel(){ // 큐브를 만든다.
        const geometry = new THREE.BoxGeometry(1,1,1); // 큐브의 크기를 정한다.
        const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 }); // 큐브의 색을 정한다.
        const cube = new THREE.Mesh(geometry, material); // 큐브를 만든다.
        this._scene.add(cube); // 큐브를 씬에 추가한다.
        this._cube = cube; // 큐브를 나중에 회전시키기 위해서 _cube에 저장해둔다.
    }
    resize(){ // 화면 크기가 변할 때마다 호출된다.
        const width = this._divContainer.clientWidth; // divContainer의 너비를 가져온다.
        const height = this._divContainer.clientHeight; // divContainer의 높이를 가져온다.

        this._camera.aspect = width / height;  // 카메라의 비율을 조정한다.
        this._camera.updateProjectionMatrix(); // 카메라의 속성을 업데이트한다.

        this._renderer.setSize(width, height) // 렌더러의 사이즈를 조정한다.
    }
    render(time){ // 렌더링을 한다.
        this._renderer.render(this._scene, this._camera); // 렌더러에게 렌더링을 하라고 시킨다.
        this.update(time); // 시간에 따라서 큐브를 회전시킨다.
        requestAnimationFrame(this.render.bind(this)); // 렌더링을 반복한다, bind(this)를 해줘야 this가 App을 가리킨다.
    }
    update(time){ // 시간에 따라서 큐브를 회전시킨다.
        time *= 0.001; // 초 단위로 변환
        this._cube.rotation.x = time; // 시간에 따라서 큐브를 회전시킨다.
        this._cube.rotation.y = time; // 시간에 따라서 큐브를 회전시킨다.
    }
 }

 window.onload = function(){
        new App();
 }