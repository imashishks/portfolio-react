import styles from './who-is.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getImageURL, throttle } from './../../utils';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function WhoIs() {
    const path = './../assets/images/img0.png';
    let progress = 0;

    useGSAP(() => {
        const images = ['img0', 'img1', 'img2', 'img3'];
        let index = 0;
        let rotate = 0;
        let scale = 0;

        const handleComplete = () => {
            document.getElementById('avatar').style.transform = 'rotate(0deg) scale(1)';
        };

        const handleScroll = throttle((self) => {
            let n = Math.abs(self.progress * 10);

            if (index >= 3) {
                index = 0;
            } else {
                index++;
            }

            const image = `./../assets/images/img${index}.png`;

            if (progress > self.progress) {
                // Backward scroll
                rotate -= 30;
                scale -= 0.2;
                scale = Math.max(0.2, scale);
            } else {
                // Forward scroll
                rotate += (30 + self.progress * 3.6);
                if (scale < 1.2) {
                    scale += 0.2;
                }
            }

            if (self.progress > 0.8 || rotate > 359) {
                rotate = 360;
            }

            if (self.progress > 0.98 || rotate > 300) {
                self.pin = false;
            } else {
                self.pin = '.who-is-container';
            }

            if (self.progress === 0 || rotate < 0) {
                rotate = 0;
            }

            const avatar = document.getElementById('avatar');
            avatar.src = getImageURL(image);
            avatar.style.transform = `rotate(${rotate}deg) scale(${scale})`;
            avatar.style.opacity = self.progress;

            progress = self.progress;
        }, 100);

        gsap.to('#avatar', {
            scrollTrigger: {
                // markers: true,
                start: 'top',
                end: 'bottom',
                scrub: true,
                pin: '.who-is-container',
                onUpdate: handleScroll,
                onComplete: handleComplete
            }
        });
    });

    return (
        <section className={`${styles['who-is']} who-is-container flex flex-col justify-start items-center pt-32`}>
            <img className={styles.avatar} id="avatar" src={getImageURL(path)} alt="Profile" />
        </section>
    );
}

export default WhoIs;
