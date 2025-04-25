import styles from './welcome.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getImageURL } from '../../utils';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

function Welcome() {


    useGSAP(() => {

        splitText('.band', 'bandChar');
        console.log('Text split complete');
        const bandChars = document.querySelectorAll('.bandChar');
        console.log('Found bandChars:', bandChars.length);
        let progress = 0;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.welcome-container',
                start: 'top 30%',
                end: 'bottom',
                pin: true,
                markers: true,
                scrub: true,
                toggleActions: 'restart none none reverse',
            },
            defaults: {
                opacity: 0,
            }
        });
        tl.from('.bandChar', {
            yPercent: 120,
            stagger: 0.04,
            duration: 0.7,
            ease: 'back.out'
        });


        tl.from('.welcome-container', {
            // xPercent: 10,
            // yPercent: 50,
            opacity: 1,
            transformOrigin: "100% center",
            perspectiveOrigin: "100% center",
            transform: "translateY(0) translateZ(100px)"

            // perspectiveOrigin: "300px 0px",
            // transform: "rotateZ(0deg) translateX(120px)"


            // scale: (s) => {
            //     return (s + 2) * 1;
            //     console.log('scale', s);
            //     return 1
            // }
        })
        tl.to('.welcome-container', {

            // transform: "rotate3d(-1, 1, 0, 360deg)",
            // perspectiveOrigin: "150%",
            // transformOrigin: "500px 0px",
            // perspectiveOrigin: "300px 0px",
            // transform: "rotateZ(360deg) translateX(120px)"
            transformOrigin: "100% center",
            perspectiveOrigin: "100% center",
            transform: "translateY(100px) translateZ(100px)",
            // scale: 10,

            opacity: 0,
            //transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${scrollY}, 0, 1);`
        })

        // tl.to('.bandChar', {
        //     y: -20,
        //     opacity: 1,
        //     stagger: {
        //         each: 0.05,
        //     },
        //     duration: 0.5,
        //     ease: 'power2.inOut'
        // },);
    });

    const splitText = (identifier, childIdentifier) => {
        const elements = document.querySelectorAll(identifier);
        elements.forEach((element) => {
            const content = element.textContent;
            element.textContent = '';
            console.log(content.split(""));
            const chars = content.split("").map(char => {
                const span = document.createElement('span');
                span.className = childIdentifier;
                span.style.display = 'inline-block';
                span.style.transform = 'translate(0px,0px)';
                span.style.position = 'relative';
                span.innerHTML = char === " " ? '&nbsp;' : char;
                return span;
            });
            console.log(chars);
            chars.forEach(char => element.appendChild(char));
        });
    }

    return (
        <section className={`${styles.welcome} welcome-container flex flex-col justify-center items-center`}>
            <p className='text-3xl w-[700px] italic band text-center'>I am Ashish, a Bengaluru based software engineer, designer and artist. Apart from engineering and art, i enjoy cycling, coffee and long walks. I like to believe i have a green thumb as i have been keeping more than 50+ plants alive</p>
            {/* <p className='mt-4 text-9xl uppercase font-bold band text-center'>Ashish Kumar</p> */}
        </section>
    )
}

export default Welcome;
