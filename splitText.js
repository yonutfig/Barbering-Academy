import gsap from "gsap-trial";
import { SplitText } from "gsap-trial/SplitText"
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const titles = gsap.utils.toArray("p");

const tl = gsap.timeline({ defaults: { duration: 3, ease: 'power4.out'} });

titles.forEach(title => {
  const splitTitle = new SplitText(title, { type: "chars" });

  tl.from(splitTitle.chars, {
    opacity: 0,
    rotateX: -90,
    stagger: 0.1, 
    z: -100,
    filter: "blur(10px)"
  }, "<");
});



tl.play();

