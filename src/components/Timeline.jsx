import {useEffect,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {STAGES} from '../data/events'
gsap.registerPlugin(ScrollTrigger)
export default function Timeline(){
  const [i,setI]=useState(0),[all,setAll]=useState(false)
  useEffect(()=>{
    const mm=gsap.matchMedia()
    mm.add('(min-width:861px) and (prefers-reduced-motion:no-preference)',()=>{
      setAll(false)
      const st=ScrollTrigger.create({trigger:'#hackathon',start:'top top',end:'+=300%',pin:true,
        onUpdate:s=>setI(Math.min(STAGES.length-1,Math.floor(s.progress*STAGES.length)))})
      return()=>st.kill()
    })
    mm.add('(max-width:860px), (prefers-reduced-motion:reduce)',()=>{setAll(true)})
    return()=>mm.revert()
  },[])
  const pct=all?100:(i+1)/STAGES.length*100
  return(<section className="tl" id="hackathon">
    <div className="tl-l">
      <p className="sub" style={{marginBottom:12}}>Featured: Campus Codefest</p>
      <div className="day">{STAGES[i].day}</div>
      <div className="bar"><i style={{width:pct+'%'}}/></div>
    </div>
    <div className="stages">
      {STAGES.map((s,k)=><div key={k} className={'stage'+(all||k===i?' on':'')}>
        <p className="sub">{s.day}</p><h3>{s.t}</h3><p className="sub">{s.d}</p></div>)}
    </div>
  </section>)
}
