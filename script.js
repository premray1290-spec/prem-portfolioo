/* =========================================================
   PREM SAGAR — 3D PORTFOLIO
   JavaScript + Three.js
========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
========================================================= */

const profileCard = document.querySelector(".profile-card");
const hero = document.querySelector(".hero");
const resumeButton = document.querySelector("#resumeButton");

const heroContent =
    document.querySelector(".hero-content");

const heroProfile =
    document.querySelector(".hero-profile");

const particles =
    document.querySelector(".particles");

const skillCards =
    document.querySelectorAll(".skill-card");

const projectCards =
    document.querySelectorAll(".project-card");

const experienceCards =
    document.querySelectorAll(".experience-card");


/* =========================================================
   2. THREE.JS 3D BACKGROUND
========================================================= */

let scene;
let camera;
let renderer;
let animationFrame;

let threeGroup;
let particleSystem;

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


/* =========================================================
   3. CREATE THREE.JS SCENE
========================================================= */

async function createThreeScene() {

    if (!hero) {
        return;
    }

    try {

        const THREE =
            await import("three");


        /* -------------------------------------------------
           Scene
        ------------------------------------------------- */

        scene = new THREE.Scene();


        /* -------------------------------------------------
           Camera
        ------------------------------------------------- */

        camera =
            new THREE.PerspectiveCamera(
                60,
                window.innerWidth /
                    window.innerHeight,
                0.1,
                1000
            );

        camera.position.z = 8;


        /* -------------------------------------------------
           Renderer
        ------------------------------------------------- */

        renderer =
            new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.domElement.className =
            "three-background";


        renderer.domElement.setAttribute(
            "aria-hidden",
            "true"
        );


        /* -------------------------------------------------
           Add Canvas
        ------------------------------------------------- */

        hero.insertBefore(
            renderer.domElement,
            hero.firstChild
        );


        /* -------------------------------------------------
           3D Group
        ------------------------------------------------- */

        threeGroup =
            new THREE.Group();

        scene.add(threeGroup);


        /* =================================================
           3D PARTICLES
        ================================================= */

        const particleCount =
            window.innerWidth <= 850
                ? 500
                : 1000;


        const particleGeometry =
            new THREE.BufferGeometry();


        const particlePositions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const index = i * 3;

            particlePositions[index] =
                (Math.random() - 0.5) * 22;

            particlePositions[index + 1] =
                (Math.random() - 0.5) * 14;

            particlePositions[index + 2] =
                (Math.random() - 0.5) * 15;

        }


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                particlePositions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({

                color: 0x6ea8ff,

                size:
                    window.innerWidth <= 850
                        ? 0.025
                        : 0.035,

                transparent: true,

                opacity: 0.65,

                depthWrite: false

            });


        particleSystem =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );


        scene.add(
            particleSystem
        );


        /* =================================================
           FLOATING 3D OBJECTS
        ================================================= */

        const objectsGroup =
            new THREE.Group();


        threeGroup.add(
            objectsGroup
        );


        /* -------------------------------------------------
           Object 1 — Icosahedron
        ------------------------------------------------- */

        const icoGeometry =
            new THREE.IcosahedronGeometry(
                1.15,
                1
            );


        const wireMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x4f8cff,

                wireframe: true,

                transparent: true,

                opacity: 0.32

            });


        const ico =
            new THREE.Mesh(
                icoGeometry,
                wireMaterial
            );


        ico.position.set(
            4.2,
            1.4,
            -2
        );


        objectsGroup.add(
            ico
        );


        /* -------------------------------------------------
           Object 2 — Torus
        ------------------------------------------------- */

        const torusGeometry =
            new THREE.TorusGeometry(
                1.05,
                0.035,
                16,
                80
            );


        const torusMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x9b6cff,

                transparent: true,

                opacity: 0.6

            });


        const torus =
            new THREE.Mesh(
                torusGeometry,
                torusMaterial
            );


        torus.position.set(
            -4.3,
            -1.5,
            -2
        );


        torus.rotation.x =
            Math.PI / 2.5;


        objectsGroup.add(
            torus
        );


        /* -------------------------------------------------
           Object 3 — Small Octahedron
        ------------------------------------------------- */

        const octaGeometry =
            new THREE.OctahedronGeometry(
                0.65,
                0
            );


        const octaMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x35d6ff,

                wireframe: true,

                transparent: true,

                opacity: 0.45

            });


        const octa =
            new THREE.Mesh(
                octaGeometry,
                octaMaterial
            );


        octa.position.set(
            3.2,
            -2.5,
            -1
        );


        objectsGroup.add(
            octa
        );


        /* -------------------------------------------------
           Object 4 — Ring
        ------------------------------------------------- */

        const ringGeometry =
            new THREE.RingGeometry(
                0.8,
                0.84,
                64
            );


        const ringMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x6ea8ff,

                side:
                    THREE.DoubleSide,

                transparent: true,

                opacity: 0.35

            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.position.set(
            -3.2,
            2.5,
            -2
        );


        ring.rotation.x =
            Math.PI / 3;


        objectsGroup.add(
            ring
        );


        /* =================================================
           CENTRAL 3D WIREFRAME SPHERE
        ================================================= */

        const sphereGeometry =
            new THREE.SphereGeometry(
                2.2,
                32,
                32
            );


        const sphereMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x4f8cff,

                wireframe: true,

                transparent: true,

                opacity: 0.055

            });


        const sphere =
            new THREE.Mesh(
                sphereGeometry,
                sphereMaterial
            );


        sphere.position.set(
            0,
            0,
            -4
        );


        threeGroup.add(
            sphere
        );


        /* =================================================
           ANIMATION
        ================================================= */

        function animate() {

            animationFrame =
                requestAnimationFrame(
                    animate
                );


            /* ---------------------------------------------
               Smooth mouse movement
            --------------------------------------------- */

            mouseX +=
                (
                    targetMouseX -
                    mouseX
                ) * 0.025;


            mouseY +=
                (
                    targetMouseY -
                    mouseY
                ) * 0.025;


            /* ---------------------------------------------
               Particle rotation
            --------------------------------------------- */

            if (particleSystem) {

                particleSystem.rotation.y +=
                    0.00035;

                particleSystem.rotation.x +=
                    0.00008;

                particleSystem.position.x =
                    mouseX * 0.25;

                particleSystem.position.y =
                    -mouseY * 0.15;

            }


            /* ---------------------------------------------
               Main group mouse movement
            --------------------------------------------- */

            threeGroup.rotation.y =
                mouseX * 0.18;

            threeGroup.rotation.x =
                mouseY * 0.10;


            /* ---------------------------------------------
               Individual objects
            --------------------------------------------- */

            ico.rotation.x +=
                0.003;

            ico.rotation.y +=
                0.004;


            torus.rotation.z +=
                0.003;


            torus.rotation.y +=
                0.002;


            octa.rotation.x +=
                0.004;

            octa.rotation.y +=
                0.005;


            ring.rotation.z +=
                0.002;


            sphere.rotation.y +=
                0.0008;


            sphere.rotation.x +=
                0.0003;


            /* ---------------------------------------------
               Camera parallax
            --------------------------------------------- */

            camera.position.x +=
                (
                    mouseX * 0.35 -
                    camera.position.x
                ) * 0.02;


            camera.position.y +=
                (
                    -mouseY * 0.2 -
                    camera.position.y
                ) * 0.02;


            camera.lookAt(
                scene.position
            );


            renderer.render(
                scene,
                camera
            );

        }


        animate();


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                if (!camera || !renderer) {
                    return;
                }


                camera.aspect =
                    window.innerWidth /
                    window.innerHeight;


                camera.updateProjectionMatrix();


                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );


                renderer.setPixelRatio(
                    Math.min(
                        window.devicePixelRatio,
                        2
                    )
                );

            }
        );


    } catch (error) {

        console.error(
            "Three.js could not load:",
            error
        );

    }

}


/* =========================================================
   4. MOUSE TRACKING FOR THREE.JS
========================================================= */

if (hero) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            targetMouseX =
                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;


            targetMouseY =
                (
                    event.clientY /
                    window.innerHeight
                ) * 2 - 1;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            targetMouseX = 0;

            targetMouseY = 0;

        }
    );

}


/* =========================================================
   5. PROFILE CARD 3D EFFECT
========================================================= */

if (profileCard && hero) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                profileCard.getBoundingClientRect();


            const cardX =
                rect.left +
                rect.width / 2;


            const cardY =
                rect.top +
                rect.height / 2;


            const rotateY =
                (
                    event.clientX -
                    cardX
                ) / 35;


            const rotateX =
                (
                    cardY -
                    event.clientY
                ) / 35;


            profileCard.style.transform =
                `rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform =
                "rotateY(-8deg) rotateX(4deg)";

        }
    );

}


/* =========================================================
   6. SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a, .hero-buttons a"
    );


navigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId &&
                    targetId.startsWith("#") &&
                    targetId.length > 1
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    }

                }

            }
        );

    }
);


/* =========================================================
   7. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .about-content, .stat-card, .experience-card, .skill-card, .project-card, .education-item, .contact-item, .contact-box"
    );


revealElements.forEach(
    (element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    }
);


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   8. STAGGER PROJECT CARDS
========================================================= */

projectCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    }
);


/* =========================================================
   9. STAGGER SKILL CARDS
========================================================= */

skillCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 0.07}s`;

    }
);


/* =========================================================
   10. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop +
                    sectionHeight
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   11. HERO CONTENT PARALLAX
========================================================= */

if (
    hero &&
    heroContent &&
    heroProfile
) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;


            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            heroContent.style.transform =
                `translate(
                    ${x * -8}px,
                    ${y * -5}px
                )`;


            heroProfile.style.transform =
                `translate(
                    ${x * 8}px,
                    ${y * 5}px
                )`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroContent.style.transform =
                "translate(0, 0)";


            heroProfile.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   12. OLD PARTICLES PARALLAX
========================================================= */

if (particles) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;


            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            particles.style.transform =
                `translate(
                    ${x * 12}px,
                    ${y * 12}px
                )`;

        }
    );

}


/* =========================================================
   13. SKILL CARD 3D TILT
========================================================= */

skillCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        y -
                        rect.height / 2
                    ) / 18;


                const rotateY =
                    (
                        rect.width / 2 -
                        x
                    ) / 18;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    }
);


/* =========================================================
   14. PROJECT CARD 3D TILT
========================================================= */

projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        y -
                        rect.height / 2
                    ) / 25;


                const rotateY =
                    (
                        rect.width / 2 -
                        x
                    ) / 25;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-10px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    }
);


/* =========================================================
   15. EXPERIENCE CARD 3D TILT
========================================================= */

experienceCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        y -
                        rect.height / 2
                    ) / 60;


                const rotateY =
                    (
                        rect.width / 2 -
                        x
                    ) / 60;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    }
);


/* =========================================================
   16. RESUME BUTTON
========================================================= */

if (resumeButton) {

    resumeButton.addEventListener(
        "click",
        (event) => {

            const resumeLink =
                resumeButton.getAttribute(
                    "href"
                );


            if (
                !resumeLink ||
                resumeLink === "#"
            ) {

                event.preventDefault();


                alert(
                    "Resume will be added here soon."
                );

            }

        }
    );

}


/* =========================================================
   17. PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   18. MOBILE DETECTION
========================================================= */

function isMobile() {

    return window.innerWidth <= 850;

}


if (isMobile()) {

    if (profileCard) {

        profileCard.style.transform =
            "none";

    }

}


/* =========================================================
   19. START THREE.JS
========================================================= */

createThreeScene();


/* =========================================================
   20. CONSOLE
========================================================= */

console.log(
    "%cPREM SAGAR",
    "font-size: 24px; font-weight: bold;"
);

console.log(
    "%cAI/ML Engineer & Full Stack Developer",
    "font-size: 14px;"
);

console.log(
    "%cThree.js 3D Portfolio Loaded 🚀",
    "font-size: 12px;"
);