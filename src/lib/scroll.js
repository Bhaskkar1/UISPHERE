import Lenis from 'lenis'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches
export let lenis=null
export function initScroll(){
  if(reduce)return()=>{}
  lenis=new Lenis({lerp:.1})
  lenis.on('scroll',ScrollTrigger.update)
  const tick=t=>lenis.raf(t*1000)
  gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0)
  return()=>{gsap.ticker.remove(tick);lenis.destroy();lenis=null}
}
export const goTo=t=>lenis?lenis.scrollTo(t):(t===0?scrollTo({top:0}):document.querySelector(t)?.scrollIntoView({behavior:'auto'}))
