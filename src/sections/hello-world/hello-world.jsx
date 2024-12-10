import { useGSAP } from '@gsap/react';
import styles from './hello-world.module.css';
import { useRef } from 'react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);
function HelloWorld() {
    const helloWorld = useRef();
    const getLength = (el) => {
        const path = document.querySelector(el);
        return path.getTotalLength();
    }
    const h = ['.h1', '.h2', '.h3', '.h4'];
    const e = ['.e1', '.e2', '.e3', '.e4'];
    const l1 = ['.l1', '.l2'];
    const l2 = ['.l4', '.l3'];

    const w = ['.w1', '.w2', '.w3', '.w4'];
    const r = ['.r1', '.r2'];
    const l3 = ['.l5', '.l6'];
    // let tl = gsap.timeline({
    //     scrollTrigger: {
    //         start: "top center",
    //         trigger: '.who-is-container',
    //         // end: "center center",
    //         // end: "bottom center",
    //         markers: true,
    //         scrub: true,
    //         // onEnter: () => {
    //         //     document.querySelector('.text-6xl').classList = " text-6xl";
    //         // },
    //         // onLeave: () => {
    //         //     document.querySelector('.text-6xl').classList += " fixed top-1/2 ";
    //         // }
    //     },
    // })
    useGSAP(() => {
        const timeline = gsap.timeline({
            defaults: {
                ease: "power3.inOut"
            },
            scrollTrigger: {
                start: "top center",
                trigger: ""
            }
        });
        h.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index * 0.5);
            timeline.from(paths, { opacity: 0 }, index * 0.5);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 1, autoRound: false }, index * 0.5);
        });

        e.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index * 0.4);
            timeline.from(paths, { opacity: 0 }, index * 0.4);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 0.8, autoRound: false }, index * 0.4);

        });
        l1.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index);
            timeline.from(paths, { opacity: 0 }, index);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 1, autoRound: false }, index);

        });
        l2.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index);
            timeline.from(paths, { opacity: 0 }, index);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 0.9, autoRound: false }, index);

        });
        timeline.from('.o1', { opacity: 0, translateX: -50 }, 0.7);
        timeline.to('.o1', { opacity: 1, translateX: 0, duration: 2 }, 0.7);

        w.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index * 0.5);
            timeline.from(paths, { opacity: 0 }, index * 0.5);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 0.9, autoRound: false }, index * 0.5);

        });
        timeline.from('.o2', { opacity: 0, translateY: 20 }, 1);
        timeline.to('.o2', { opacity: 1, translateY: 0, duration: 2 }, 1);
        r.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index * 0.5);
            timeline.from(paths, { opacity: 0 }, index * 0.5);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 0.9, autoRound: false }, index * 0.5);

        });
        const length = getLength('.r3');
        timeline.set('.r3', { strokeDasharray: length, strokeDashoffset: length - 1 }, 0.5);
        timeline.from('.r3', { opacity: 0 }, 0.5);
        timeline.to('.r3', { opacity: 1, strokeDasharray: length + 5, strokeDashoffset: 0, duration: 2, autoRound: false }, 0.5);
        l3.forEach((paths, index) => {
            const length = getLength(paths);
            timeline.set(paths, { strokeDasharray: length, strokeDashoffset: length }, index);
            timeline.from(paths, { opacity: 0 }, index);
            timeline.to(paths, { opacity: 1, strokeDashoffset: 0, duration: 0.9, autoRound: false }, index);

        });
        timeline.from('.d1', { opacity: 0 }, 1);
        timeline.to('.d1', { opacity: 1, duration: 1 }, 1);

        const d2length = getLength('.d2');
        timeline.set('.d2', { strokeDasharray: d2length, strokeDashoffset: d2length }, 0);
        timeline.from('.d2', { opacity: 0 }, 0);
        timeline.to('.d2', { opacity: 1, strokeDashoffset: 0, duration: 0.9, autoRound: false }, 0);
        timeline.from('.d3', { opacity: 0 }, 0);
        timeline.to('.d3', { opacity: 1, duration: 0.9 }, 0);

        const ex1length = getLength('.ex1');
        timeline.set('.ex1', { strokeDasharray: ex1length, strokeDashoffset: ex1length }, 0);
        timeline.from('.ex1', { opacity: 0 }, 0);
        timeline.to('.ex1', { opacity: 1, strokeDashoffset: 0, duration: 0.9, autoRound: false }, 0);
        timeline.from('.ex2', { opacity: 0 }, 0.9);
        timeline.to('.ex2', { opacity: 1, duration: 0.9 }, 0.9);

        gsap.to(".hello-svg", {
            xPercent: 320 * 0.5,
            // pin: true,
            scrollTrigger: {
                trigger: '.hello-svg',
                scrub: true,
                start: 'top 33%',
                pin: true,
            }
        })
        gsap.to(".world-svg", {
            xPercent: -340 * 0.5,
            // pin: true,
            scrollTrigger: {
                trigger: '.world-svg',
                scrub: true,
                start: 'top 45%',
                pin: true
            }
        })



    }, {
        scope: helloWorld
    });
    return (
        <section ref={helloWorld} className={styles["hello-world"] + ' hello-word-container flex flex-col justify-center items-center'}>
            <svg className="hello-svg" width="809" height="150" viewBox="0 0 809 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="h1" d="M107 22V116" stroke="#999999" strokeWidth="40" strokeLinecap="round" />
                <path className={styles["h2"] + " h2"} d="M177.5 22V116" stroke="#111111" strokeWidth="40" strokeLinecap="round" />
                <path className="h3" d="M107.5 69L177.5 69" stroke="#555555" strokeWidth="40" strokeLinecap="round" />
                <path className="h4" d="M108 69.5V68.5" stroke="#111111" strokeWidth="40" strokeLinecap="round" />

                <path className="e1" d="M226 116L296 116" stroke="#111111" strokeWidth="40" strokeLinecap="round" />
                <path className="e2" d="M226 22L296 22" stroke="#999999" strokeWidth="40" strokeLinecap="round" />
                <path className="e3" d="M226.5 69H262.5" stroke="#555555" strokeWidth="40" strokeLinecap="round" />
                <path className="e4" d="M225.5 22V116" stroke="#555555" strokeWidth="40" strokeLinecap="round" />

                <path className="l1" d="M344.5 22V116" stroke="#111111" strokeWidth="40" strokeLinecap="round" />
                <path className="l2" d="M345 116L415 116" stroke="#555555" strokeWidth="40" strokeLinecap="round" />
                <path className="l3" d="M471 21V115" stroke="#777777" strokeWidth="40" strokeLinecap="round" />
                <path className="l4" d="M471.5 115L541.5 115" stroke="#333333" strokeWidth="40" strokeLinecap="round" />
                <circle className="o1" cx="631" cy="68" r="48" stroke="#333333" strokeWidth="40" />
            </svg>
            <svg className="world-svg" width="809" height="180" viewBox="0 160 809 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="w1" d="M25 182L52 276" stroke="#999999" strokeWidth="40" strokeLinecap="round" />
                <path className="w2" d="M155 182L128 276" stroke="#999999" strokeWidth="40" strokeLinecap="round" />
                <path className="w3" d="M90 208L51.9999 275.615" stroke="#555555" strokeWidth="40" strokeLinecap="round" />
                <path className="w4" d="M90 208L128 275.615" stroke="#555555" strokeWidth="40" strokeLinecap="round" />
                <circle className="o2" cx="251" cy="228" r="48" stroke="#333333" strokeWidth="40" />
                <path className="r1" d="M361 234L431.5 275" stroke="#333333" strokeWidth="40" strokeLinecap="round" />
                <path className="r2" d="M361 181V275" stroke="#777777" strokeWidth="40" strokeLinecap="round" />
                <circle className={styles["r3"] + " r3"} cx="395" cy="214" r="34" stroke="#999999" strokeWidth="40" strokeLinecap="round" />
                <path className={styles["l6"] + " l6"} d="M500 181V275" stroke="#777777" strokeWidth="40" strokeLinecap="round" />
                <path className="l5" d="M500.5 275L570.5 275" stroke="#333333" strokeWidth="40" strokeLinecap="round" />
                <circle className="d1" cx="669" cy="228" r="48" stroke="#333333" strokeWidth="40" />
                <path className="d2" d="M619 181V275" stroke="#777777" strokeWidth="40" strokeLinecap="round" />
                <path className="d3" d="M619 276V275" stroke="#999999" strokeWidth="40" strokeLinecap="round" />
                <path className="ex1" d="M780 182V232" stroke="#777777" strokeWidth="40" strokeLinecap="round" />
                <path className="ex2" d="M780.5 276L779.793 276.707" stroke="#333333" strokeWidth="40" strokeLinecap="round" />
            </svg>
        </section>
    )
}

export default HelloWorld
