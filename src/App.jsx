import {useEffect,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {initScroll,reduce} from './lib/scroll'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Events from './components/Events'
import Timeline from './components/Timeline'
import RegisterForm from './components/RegisterForm'
import {About,Community,Cta,Footer} from './components/Static'
gsap.registerPlugin(ScrollTrigger)

export default function App(){
  const [ready,setReady]=useState(reduce)
  const [eventId,setEventId]=useState('')
  useEffect(()=>{
    const root=document.documentElement
    try{const t=localStorage.getItem('gdg-theme');if(t)root.dataset.theme=t}catch{}
    return initScroll()
  },[])
  useEffect(()=>{
    if(!ready||reduce)return
    const ctx=gsap.context(()=>gsap.utils.toArray('section h2').forEach(h=>
      gsap.from(h,{y:40,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:h,start:'top 85%'}})))
    return()=>ctx.revert()
  },[ready])
  return(<>
    {!ready&&<Loader onDone={()=>setReady(true)}/>}
    <Cursor/>
    <Navbar/>
    <Hero ready={ready}/>
    <About/>
    <Events onRegister={setEventId}/>
    <Timeline/>
    <RegisterForm eventId={eventId} setEventId={setEventId}/>
    <Community/>
    <Cta/>
    <Footer/>
  </>)
}
