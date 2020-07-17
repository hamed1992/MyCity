// import axios from 'axios'

export const animationVariant = {
  // initial: {
  //   scale: 0.96, y: 0, opacity: 0
  // },
  // enter: {
  //   scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  // },
  // exit: {
  //   scale: 0.9,
  //   // y: 50,
  //   opacity: 0,
  //   transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] }
  // }
};
const easing =[0.6,-.05,0.01,  0.99]
export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};
export const stagger = {
  animate :{
    transition:{
      staggerChildren:0.1
    }
  }
}