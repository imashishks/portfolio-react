import styles from './welcome.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getImageURL } from '../../utils';
import { useEffect } from 'react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

function Welcome() {
    const video = getImageURL(`./../assets/videos/animoji.mp4`);

    useGSAP(() => {
        gsap.from('.bandChar', {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: 'power4.out'
        });
    });

    useEffect(() => {
        splitText('.band', 'bandChar');
    }, []);

    const splitText = (identifier, childIdentifier) => {
        const elements = document.querySelectorAll(identifier);
        elements.forEach((element) => {
            const content = element.textContent;
            element.textContent = '';

            const chars = content.split('').map(char => {
                const span = document.createElement('span');
                span.className = childIdentifier;
                span.textContent = char;
                return span;
            });

            chars.forEach(char => element.appendChild(char));
        });
    }

    return (
        <section className={`${styles.welcome} welcome-container flex flex-col justify-center items-center`}>
            <p className='text-6xl italic band text-center'>Welcome to the life of</p>
            <p className='mt-4 text-9xl uppercase font-bold band text-center'>Ashish Kumar</p>
        </section>
    )
}

export default Welcome;
