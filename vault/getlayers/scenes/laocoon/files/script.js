import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Глобальные переменные сцены ---
const canvas = document.querySelector('#webgl');
let scene, camera, renderer;
let gltfModel; // Ссылка на модель статуи
let modelPivot; // Ссылка на группу-пивот для идеального вращения от курсора
let mixer;
const clock = new THREE.Clock();
let currentScroll = 0; // Накопленный сглаженный скролл для лерпинга

// --- Интерактивное вращение модели от курсора ---
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

// --- Кастомный двойной курсор ---
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let outerCursorX = window.innerWidth / 2;
let outerCursorY = window.innerHeight / 2;

// --- Фоновый шейдер с бронзовыми жидкими блобами ---
let bgMaterial;
const shaderUniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
};

// --- Система летающих золотых искр (Forge Sparks) ---
let sparkParticles; // Группа частиц-искр
const sparkCount = 450; // Оптимальное количество искр для плотности и производительности
const sparkData = []; // Физические свойства частиц (скорость, фаза покачивания)

// Размеры экрана
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// --- Подготовка текстовых заголовков для побуквенной анимации ---
function splitTitlesIntoChars() {
    const titles = document.querySelectorAll('.slide-title');
    titles.forEach(title => {
        const text = title.innerHTML;
        let newHTML = '';
        let delayCounter = 0;
        
        // Разделяем строку по тегу <br> (игнорируя регистр)
        const parts = text.split(/(<br\s*\/?>)/i);
        
        parts.forEach(part => {
            if (part.toLowerCase().startsWith('<br')) {
                newHTML += part;
            } else {
                for (let i = 0; i < part.length; i++) {
                    if (part[i] === ' ') {
                        newHTML += ' '; // Пробел оставляем без span
                    } else {
                        // Каждая буква получает задержку для эффекта 'волны'
                        newHTML += `<span class="char" style="transition-delay: ${delayCounter * 0.035}s">${part[i]}</span>`;
                        delayCounter++;
                    }
                }
            }
        });
        
        title.innerHTML = newHTML;
    });
}

// --- Инициализация WebGL Сцены ---
function init() {
    // 0. Подготовка DOM (сплит текста на буквы)
    splitTitlesIntoChars();

    // 1. Создание сцены с глубоким черным фоном
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.FogExp2('#000000', 0.01); // Снижаем плотность тумана, чтобы он не темнил модель

    // 2. Камера
    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0.2, 3.0); // Красивое среднее стартовое расстояние для лошади
    scene.add(camera);

    // Добавляем премиальный интерактивный фоновый шейдер с бронзовыми блобами
    createBackgroundShader();

    // 3. Рендерер с поддержкой высококачественных теней и цветокоррекции
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Включаем мягкие тени и кинематографичную цветопередачу с повышенной яркостью экспозиции
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.2; // Увеличиваем экспозицию для раскрытия деталей и яркости

    // 4. Создание контрастного драматичного освещения (Chiaroscuro)
    createDramaticLighting();

    // 5. Создание летающих золотых искр (Forge Sparks)
    createSparks();

    // 6. Загрузка 3D модели бронзовой лошади
    loadModel();

    // --- Обработчики событий ---
    window.addEventListener('resize', onWindowResize);

    window.addEventListener('mousemove', (event) => {
        // Мгновенное обновление координат для внутреннего курсора
        cursorX = event.clientX;
        cursorY = event.clientY;
        const cursorInner = document.querySelector('.cursor-inner');
        if (cursorInner) {
            cursorInner.style.left = `${cursorX}px`;
            cursorInner.style.top = `${cursorY}px`;
        }

        // Нормализуем координаты курсора от -1 до 1 для вращения модели и шейдера
        targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    // Запуск цикла анимации
    animate();
}

// --- Настройка высококонтрастного сценического освещения ---
function createDramaticLighting() {
    // Делаем заполняющий свет минимальным (тени уходят в глубокую, чистую темноту)
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.1);
    scene.add(ambientLight);

    // 1. Основной рисующий свет (Key Light) — Сверхмощный белый сверху-справа для ослепительных, резких граней
    const keyLight = new THREE.SpotLight('#ffffff', 18.0);
    keyLight.position.set(4, 6, 3);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.9;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // 2. Сильный контурный свет (Rim Light) — Выразительный холодный сзади-слева для подчеркивания силуэта
    const rimLight = new THREE.DirectionalLight('#e3f2ff', 10.0);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // 3. Очень слабый заполняющий свет (Fill Light) — Минимальный кремовый снизу-спереди, чтобы сохранить глубину теней
    const fillLight = new THREE.DirectionalLight('#fff3e6', 0.8);
    fillLight.position.set(-2, -4, 2);
    scene.add(fillLight);
}

// --- Создание системы кинематографических золотых искр (Forge Sparks) ---
function createSparkTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Ослепительное ядро
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)'); // Яркий внутренний ореол
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)'); // Мягкое рассеивание
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Прозрачный край
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
}

function createSparks() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const colors = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
        // Случайное распределение в облаке вокруг модели лошади
        const x = (Math.random() - 0.5) * 6.5;
        const y = (Math.random() - 0.5) * 5.0 - 0.5; // Распределяем по высоте
        const z = (Math.random() - 0.5) * 6.5;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Распределяем цвета: 60% благородное золото/бронза, 40% ледяной светло-голубой под rim-light
        if (Math.random() < 0.6) {
            // Роскошный насыщенный огненно-оранжевый
            colors[i * 3] = 1.0;                  // R
            colors[i * 3 + 1] = 0.4 + Math.random() * 0.15; // G (смещение к насыщенному оранжевому)
            colors[i * 3 + 2] = 0.05 + Math.random() * 0.1;  // B (убираем лишний синий для глубины цвета)
        } else {
            // Элегантный космический светло-голубой (в цвет контурного освещения)
            colors[i * 3] = 0.55 + Math.random() * 0.15; // R
            colors[i * 3 + 1] = 0.82 + Math.random() * 0.12; // G
            colors[i * 3 + 2] = 1.0;                    // B
        }

        // Сохраняем индивидуальные физические параметры частицы
        sparkData.push({
            speedX: (Math.random() - 0.5) * 0.4, // Дрейф влево-вправо (в стороны)
            speedY: 0.15 + Math.random() * 0.3,  // Скорость подъема вверх
            speedZ: (Math.random() - 0.5) * 0.4, // Дрейф вперед-назад (в стороны)
            swaySpeed: 0.5 + Math.random() * 1.5, // Скорость покачивания из стороны в сторону
            swayRadius: 0.05 + Math.random() * 0.15, // /Радиус покачивания
            phase: Math.random() * Math.PI * 2 // Начальная фаза для плавности
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true, // Включаем цвета вершин (vertex colors)
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending, // Эффект свечения при пересечении
        depthWrite: false, // Отключаем запись глубины, чтобы искры не имели черных ореолов
        map: createSparkTexture()
    });

    sparkParticles = new THREE.Points(geometry, material);
    scene.add(sparkParticles);
}

// --- Загрузка 3D модели бронзовой лошади ---
function loadModel() {
    const loader = new GLTFLoader();

    loader.load(
        'Content/bronze_horse.glb',
        (gltf) => {
            gltfModel = gltf.scene;

            // Создаем пивот-группу для идеального вращения вокруг геометрического центра модели без смещений
            modelPivot = new THREE.Group();
            scene.add(modelPivot);
            modelPivot.add(gltfModel);

            console.log('--- Bronze Horse Model Loaded ---');

            gltfModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Настраиваем материал для роскошной полуполированной бронзы (золотая середина)
                    if (child.material) {
                        child.material.roughness = 0.42; // Полуматовая шероховатость для мягких благородных бликов
                        child.material.metalness = 0.92; // Высокий металлический блеск сатиновой бронзы
                        child.material.flatShading = false;
                        
                        // Если у модели есть текстуры, они сохраняются
                        if (child.material.map) {
                            child.material.map.anisotropy = 16;
                        }
                    }
                }
            });

            // Настройка анимаций (если они встроены в модель)
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(gltfModel);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
                console.log('Анимации модели запущены!');
            }

            // Идеальное центрирование и масштабирование на сцене
            // 1. Сначала рассчитываем исходные размеры и масштабируем модель
            const boxInitial = new THREE.Box3().setFromObject(gltfModel);
            const sizeInitial = boxInitial.getSize(new THREE.Vector3());
            const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
            const targetScale = 3.5 / (maxDim > 0.0001 ? maxDim : 1);
            gltfModel.scale.setScalar(targetScale);

            // 2. Принудительно обновляем мировую матрицу, чтобы расчеты bounding box учитывали масштаб
            gltfModel.updateMatrixWorld(true);

            // 3. Вычисляем точный геометрический центр уже масштабированной модели
            const boxScaled = new THREE.Box3().setFromObject(gltfModel);
            const centerScaled = boxScaled.getCenter(new THREE.Vector3());

            console.log('Calculated Bounding Box Center (Scaled):', centerScaled);

            // 4. Смещаем масштабированную модель внутри пивота так, чтобы ее центр совпал с локальным началом пивота (0, 0, 0)
            gltfModel.position.sub(centerScaled);
            
            // 5. Немного опускаем сам пивот по Y для устойчивого положения на сцене
            modelPivot.position.y = -0.4;

            console.log('Applied Scale:', targetScale);
        },
        undefined,
        (error) => {
            console.error('Ошибка при загрузке 3D модели бронзовой лошади:', error);
        }
    );
}

// --- Обработка ресайза окна ---
function onWindowResize() {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (shaderUniforms) {
        shaderUniforms.uResolution.value.set(sizes.width, sizes.height);
    }
}

// --- Главный цикл анимации (Tick) ---
function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    // Обновление анимаций модели (если они есть)
    if (mixer) {
        mixer.update(deltaTime);
    }

    // 1. Вычисляем целевой скролл с кроссбраузерной поддержкой (window.scrollY, pageYOffset, scrollTop)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY !== undefined ? window.scrollY : (window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop);
    const targetScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
    // Плавный физический лерпинг для сглаживания движения камеры (эффект инерции) - уменьшен коэффициент для большей плавности
    currentScroll += (targetScroll - currentScroll) * 0.025;

    // Плавное сглаживание движения вращения 3D модели (эффект инерции)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Плавное сглаживание внешнего кольца курсора (плавно догоняет внутренний курсор)
    outerCursorX += (cursorX - outerCursorX) * 0.2;
    outerCursorY += (cursorY - outerCursorY) * 0.2;
    const cursorOuter = document.querySelector('.cursor-outer');
    if (cursorOuter) {
        cursorOuter.style.left = `${outerCursorX}px`;
        cursorOuter.style.top = `${outerCursorY}px`;
    }

    // Применяем легкий интерактивный наклон/вращение модели от движения мыши
    if (modelPivot) {
        modelPivot.rotation.y = mouseX * 0.25; // Легкий поворот влево-вправо (около 14 градусов)
        modelPivot.rotation.x = mouseY * 0.15; // Легкий наклон вверх-вниз (около 8 градусов)
    }

    // 2. Обновление и физика золотых искр с динамическим ускорением при скролле
    if (sparkParticles) {
        const positions = sparkParticles.geometry.attributes.position.array;
        const time = clock.getElapsedTime();
        
        // Вычисляем интенсивность скролла (скорость прокрутки)
        const scrollVelocity = Math.abs(targetScroll - currentScroll);
        // При быстром скролле искры завихряются и летят намного динамичнее (эффект пробуждения монумента!)
        const speedMultiplier = 1.0 + scrollVelocity * 9.0;
        const turbulence = scrollVelocity * 0.8;

        for (let i = 0; i < sparkCount; i++) {
            const idx = i * 3;
            const data = sparkData[i];

            // 1. Движение вверх (по Y) + разлет в стороны (по X и Z)
            positions[idx] += data.speedX * deltaTime * speedMultiplier;
            positions[idx + 1] += data.speedY * deltaTime * speedMultiplier;
            positions[idx + 2] += data.speedZ * deltaTime * speedMultiplier;

            // 2. Мягкое покачивание (по X и Z) + турбулентность от скролла
            const currentSway = data.swayRadius * (1.0 + turbulence * 4.0);
            positions[idx] += Math.sin(time * data.swaySpeed + data.phase) * currentSway * deltaTime;
            positions[idx + 2] += Math.cos(time * data.swaySpeed + data.phase) * currentSway * deltaTime;

            // 3. Возврат вниз, если искра улетела слишком высоко или вышла за горизонтальные границы (круговорот искр)
            if (positions[idx + 1] > 3.0 || Math.abs(positions[idx]) > 3.5 || Math.abs(positions[idx + 2]) > 3.5) {
                positions[idx + 1] = -2.5; // Сбрасываем под модель
                positions[idx] = (Math.random() - 0.5) * 3.0; // Спавним ближе к центру, чтобы они расширялись при подъеме
                positions[idx + 2] = (Math.random() - 0.5) * 3.0;
            }
        }
        sparkParticles.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Плавная и стабильная круговая траектория облета (100% видимость модели!)
    // 1. Облет вокруг модели на 360 градусов (от 0 до 2*PI)
    const phi = currentScroll * Math.PI * 2.0;
    
    // 2. Умеренный наклон по высоте (высота колеблется в безопасном диапазоне от 0.35 до 1.15)
    const y = 0.35 + Math.sin(currentScroll * Math.PI) * 0.8;
    
    // 3. Увеличенный безопасный радиус облета для предотвращения вхождения камеры внутрь модели
    const radius = 4.2 - Math.sin(currentScroll * Math.PI) * 0.6;
    
    const x = radius * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    // 4. Динамическое смещение кадра для первого экрана (освобождаем место слева под колонки текста)
    // Используем косинусоидальную интерполяцию (ease-in-out) для идеальной плавности без резких остановок
    let transitionProgress = Math.min(1.0, currentScroll / 0.28); // 0.28 - начало второго слайда
    let easeFactor = (Math.cos(transitionProgress * Math.PI) + 1.0) * 0.5; // от 1.0 плавно до 0.0
    const lookAtXOffset = -0.9 * easeFactor;
    const targetLookAt = new THREE.Vector3(lookAtXOffset, -0.15, 0); // Направляем взгляд на центр, с учетом сдвига
    // Ведем камеру по красивой сглаженной скролл-траектории с повышенной плавностью
    const targetPos = new THREE.Vector3(x, y, z);
    camera.position.lerp(targetPos, 0.025); // Плавный лерп к вычисленной точке полета (усилена инерция)
    
    camera.lookAt(targetLookAt); // Жестко наводим камеру на модель для 100% центрирования и блокируем взгляд на ней

    // Обновление фонового шейдера
    if (shaderUniforms) {
        shaderUniforms.uTime.value = clock.getElapsedTime();
        shaderUniforms.uMouse.value.set(mouseX, -mouseY);
        shaderUniforms.uScroll.value = currentScroll;
    }

    // Обновление анимации текста и индикатора скролла
    updateSlides(currentScroll);

    // Обновление движения кружков на декоративной сетке
    updateGridDots(currentScroll);

    // Рендеринг сцены
    renderer.render(scene, camera);
}

// --- Управление анимацией декоративных кружков на сетке ---
function updateGridDots(scroll) {
    const dots = document.querySelectorAll('.grid-dot');
    dots.forEach((dot, i) => {
        // Уникальная стартовая координата для каждого кружка (от 10% до 90% высоты экрана)
        const startY = (i * 17) % 80 + 10;
        
        // Уникальный коэффициент скорости и направления скролла
        let speed = 90 + (i * 55) % 180; // Расстояние пролета в %
        if (i % 2 === 0) speed = -speed; // Половина кружков движется вверх, половина - вниз!
        
        // Расчет текущей Y координаты с плавным бесконечным зацикливанием
        let y = startY + scroll * speed;
        y = ((y % 100) + 100) % 100;
        
        dot.style.top = `${y}%`;
    });
}

// --- Управление анимацией текстовых слайдов и прогресс-бара ---
function updateSlides(scroll) {
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const slide3 = document.getElementById('slide-3');
    const slide4 = document.getElementById('slide-4');
    // Обновление "сторис" прогресса
    for (let i = 1; i <= 4; i++) {
        const fill = document.getElementById(`dash-fill-${i}`);
        if (fill) {
            const start = (i - 1) * 0.25;
            const end = i * 0.25;
            let progress = (scroll - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress)); // Ограничиваем от 0 до 1
            fill.style.height = `${progress * 100}%`;
        }
    }

    // Вспомогательная функция для определения, должен ли слайд быть активен
    function isActive(val, start, end) {
        return val >= start && val <= end;
    }

    // Равномерно распределяем всплытие текстовых блоков по скроллу
    if (slide1) slide1.classList.toggle('active', isActive(scroll, -0.10, 0.12));
    
    if (slide2) {
        const active2 = isActive(scroll, 0.28, 0.40);
        slide2.classList.toggle('active', active2);
        const slide2Img = document.getElementById('slide-2-img');
        if (slide2Img) slide2Img.classList.toggle('active', active2);
    }
    
    if (slide3) slide3.classList.toggle('active', isActive(scroll, 0.56, 0.68));
    if (slide4) slide4.classList.toggle('active', isActive(scroll, 0.84, 1.05));
}

// --- Создание интерактивного фонового шейдера с бронзовыми жидкими блобами ---
function createBackgroundShader() {
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uScroll;

        // 3D Noise function for organic warping (high performance hash-based noise)
        float hash(float n) { return fract(sin(n) * 43758.5453123); }
        float noise(in vec3 x) {
            vec3 p = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            float n = p.x + p.y*57.0 + 113.0*p.z;
            return mix(mix(mix(hash(n+  0.0), hash(n+  1.0), f.x),
                           mix(hash(n+ 57.0), hash(n+ 58.0), f.x), f.y),
                       mix(mix(hash(n+113.0), hash(n+114.0), f.x),
                           mix(hash(n+170.0), hash(n+171.0), f.x), f.y), f.z);
        }

        void main() {
            // Normalize UV coordinates
            vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
            float aspect = uResolution.x / uResolution.y;
            
            float time = uTime * 0.08; // Extremely slow, calm breathing speed
            float scroll = uScroll;
            
            // --- 1. Constant Wave Parameters (Perfect Scroll Stability) ---
            // Keep frequencies and angles constant to prevent compressing/speeding waves on scroll
            float angle1 = 0.6;
            float angle2 = -0.7;
            float angle3 = 1.2;
            
            float freq1 = 2.4;  // Higher frequency = significantly more lines on screen
            float freq2 = 3.2;
            float freq3 = 4.0;
            
            // --- 2. Coordinates Distortion (Smooth Rounded Arcs & Scroll Deformation) ---
            vec2 warpedUv = uv;
            
            // Scroll directly drives the deformation of the wave shapes!
            // As you scroll, the phase of the distortion shifts, smoothly bending the rounded lines.
            float scrollDeform = scroll * 5.0; // 5 radians of smooth sweeping deformation
            
            // Large scale, perfectly smooth sine-wave distortions for clean, even, rounded arcs
            warpedUv.x += sin(uv.y * 2.5 + time * 0.2 + scrollDeform) * 0.35;
            warpedUv.y += cos(uv.x * 2.5 - time * 0.15 - scrollDeform * 0.8) * 0.35;
            
            // Secondary clean curve to create elegant, topographical intersections
            warpedUv.x += sin(uv.y * 1.2 - time * 0.1 - scrollDeform * 1.5) * 0.25;
            warpedUv.y += cos(uv.x * 1.2 + time * 0.18 + scrollDeform * 1.2) * 0.25;
            
            // Soft global sliding shift based on scroll parallax and mouse movement
            // Keep drift multipliers tiny so scroll motion remains extremely gentle
            vec2 scrollDrift = vec2(scroll * 0.04, -scroll * 0.02);
            vec2 mouseShift = vec2(uMouse.x * aspect * 0.05, uMouse.y * 0.05);
            warpedUv += scrollDrift + mouseShift;
            
            // --- 3. Layered Wave Computations ---
            // Wave directions
            vec2 dir1 = vec2(cos(angle1), sin(angle1));
            vec2 dir2 = vec2(cos(angle2), sin(angle2));
            vec2 dir3 = vec2(cos(angle3), sin(angle3));
            
            // Layered sine wave calculations with self-warping
            float w1 = sin(dot(warpedUv, dir1) * freq1 + time * 1.0);
            float w2 = cos(dot(warpedUv, dir2) * freq2 - time * 1.4 + w1 * 0.4);
            float w3 = sin(dot(warpedUv, dir3) * freq3 + time * 1.8 + w2 * 0.5);
            
            // Combine layers into a seamless wave scalar field in [-1.0, 1.0]
            float waveField = w1 * 0.50 + w2 * 0.35 + w3 * 0.15;
            
            // --- 4. Crisp Metallic Lustre ---
            // Wide satin sheen (gives defined body to the folds without haze)
            float wideSheen = pow(max(0.0, 1.0 - abs(waveField - 0.1)), 2.5);
            
            // Crisp, thicker specular reflection (defined metallic shine, ensuring thickness with more lines)
            float crispSpecular = pow(max(0.0, 1.0 - abs(waveField - 0.15)), 8.0);
            
            // Highlight blend: crisp, defined glowing folds
            float crest = wideSheen * 0.5 + crispSpecular * 0.9;
            
            // --- 5. Scroll-Driven Color Palettes: Pure Bronze to Pure Blue ---
            // Top Palette (Scroll = 0.0): Rich Molten Bronze
            vec3 c0_shadow = vec3(0.0010, 0.0006, 0.0004); // Deepest bronze shadow
            vec3 c0_wave1  = vec3(0.085, 0.040, 0.015);    // Rich copper-bronze
            vec3 c0_wave2  = vec3(0.050, 0.022, 0.008);    // Deep bronze body
            vec3 c0_crest  = vec3(0.45, 0.30, 0.18);       // Polished bronze/gold sheen
            
            // Bottom Palette (Scroll = 1.0): Deep Sapphire Blue
            vec3 c1_shadow = vec3(0.0004, 0.0006, 0.0012); // Deepest sapphire shadow
            vec3 c1_wave1  = vec3(0.015, 0.035, 0.065);    // Rich cobalt/teal blue
            vec3 c1_wave2  = vec3(0.008, 0.020, 0.045);    // Deep sapphire body
            vec3 c1_crest  = vec3(0.18, 0.35, 0.55);       // Polished blue-steel sheen
            
            // Interpolate colors smoothly based on scroll progress
            float t = smoothstep(0.0, 1.0, scroll);
            vec3 colShadow = mix(c0_shadow, c1_shadow, t);
            vec3 colWave1  = mix(c0_wave1, c1_wave1, t);
            vec3 colWave2  = mix(c0_wave2, c1_wave2, t);
            vec3 colCrest  = mix(c0_crest, c1_crest, t);
            
            // --- 6. Final Composition ---
            // Blend wave details and wave bodies with deep shadow background
            vec3 color = colShadow;
            color = mix(color, colWave2, smoothstep(-0.6, 0.2, waveField));
            color = mix(color, colWave1, smoothstep(0.0, 0.8, waveField));
            
            // Add the soft satinated crest highlights with rich metallic multiplier
            color += colCrest * crest * 1.4;
            
            // Apply a gentle vignette to match cinematic design
            float vignette = 1.0 - dot(uv, uv) * 0.12;
            color *= vignette;
            
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    bgMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: shaderUniforms,
        depthWrite: false,
        depthTest: false
    });

    const bgGeometry = new THREE.PlaneGeometry(30, 30);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    
    // Позиционируем в локальном пространстве камеры (z = -8.0 для достаточного удаления)
    bgMesh.position.set(0.0, 0.0, -8.0);
    
    // Принудительно выводим на самый задний план рендеринга
    bgMesh.renderOrder = -10;
    
    camera.add(bgMesh);
}

// --- Настройка кликабельной навигации ---
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    // Идеальные проценты скролла для центрирования каждого из 4-х слайдов
    const targetScrolls = [0.0, 0.34, 0.62, 0.94];
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const targetY = maxScroll * targetScrolls[index];
            
            // Запускаем плавный скролл к нужной "сцене"
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        });
    });
}

// Запуск инициализации при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    init();
    setupNavigation();
});

// Обеспечиваем принудительную перезагрузку страницы при любых изменениях в коде для сброса кэша и OrbitControls
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        window.location.reload();
    });
}
