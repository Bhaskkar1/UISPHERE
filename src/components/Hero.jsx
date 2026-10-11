import {useEffect} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {goTo,reduce} from '../lib/scroll'
gsap.registerPlugin(ScrollTrigger)
const CODE=`<b>const</b> team = <u>"you + three friends"</u>;
<b>let</b> hours = <s>24</s>;

<b>while</b> (hours &gt; 0) {
  <em>build</em>(idea);
  <em>break</em>(bug);
  <b>if</b> (it.works) <u>demo</u>();
  hours--;
}

<b>function</b> <s>ship</s>() {
  <b>return</b> <u>"something real"</u>;
}

<b>await</b> campus.<s>hackathon</s>();
<b>await</b> campus.<s>workshop</s>();
<b>await</b> campus.<s>openSourceNight</s>();`
export default function Hero({ready}){
  useEffect(()=>{
    const mm=gsap.matchMedia()
    mm.add('(prefers-reduced-motion:no-preference)',()=>{
      const small=matchMedia('(max-width:860px)').matches
      const st={trigger:'#top',start:'top top',end:'+=130%',scrub:.6}
      gsap.fromTo('#frame',{clipPath:small?'inset(8% 6% 50% 6% round 16px)':'inset(18% 6% 18% 54% round 20px)'},
        {clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{...st,pin:true}})
      gsap.to('.hero-text',{yPercent:-40,opacity:0,ease:'none',scrollTrigger:{trigger:'#top',start:'top top',end:'+=60%',scrub:true}})
      gsap.to('.scene',{yPercent:-8,ease:'none',scrollTrigger:{...st,scrub:true}})
      gsap.to('#stag',{opacity:1,ease:'none',scrollTrigger:{trigger:'#top',start:'+=80%',end:'+=130%',scrub:true}})
    })
    return()=>mm.revert()
  },[])
  useEffect(()=>{
    if(!ready||reduce)return
    const ctx=gsap.context(()=>{
      gsap.from('.hero h1',{yPercent:30,opacity:0,duration:1,ease:'power3.out'})
      gsap.from('.hero-text p,.hero-text .btns',{y:20,opacity:0,duration:.8,delay:.3,stagger:.12})
    })
    return()=>ctx.revert()
  },[ready])
  const link=(e,h)=>{e.preventDefault();goTo(h)}
  return(<header className="hero" id="top">
    <div className="hero-text">
      <h1>Build Beyond the Classroom.</h1>
      <p className="sub">Hackathons, workshops and late-night debugging with students who like making things.</p>
      <div className="btns">
        <a href="#events" className="btn p" onClick={e=>link(e,'#events')}>Explore Events</a>
        <a href="#community" className="btn" onClick={e=>link(e,'#community')}>Join the Community</a>
      </div>
    </div>
    <div className="frame" id="frame">
      {/* Swap .scene for <img src="/hero.jpg" alt="..." style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
      <div className="scene" aria-hidden="true" dangerouslySetInnerHTML={{__html:CODE}}/>
      <div className="scene-tag" id="stag">Ship it.</div>
      <div className="fade-bot"/>
    </div>
  </header>)
}
