import {useEffect,useRef} from 'react'
import gsap from 'gsap'
import {lenis,reduce} from '../lib/scroll'
export default function EventDialog({event:e,onClose,onRegister}){
  const d=useRef()
  useEffect(()=>{
    if(e&&!d.current.open){d.current.showModal();lenis&&lenis.stop();if(!reduce)gsap.from(d.current,{y:30,opacity:0,duration:.4})}
    if(!e&&d.current.open)d.current.close()
  },[e])
  return(<dialog ref={d} onClose={()=>{lenis&&lenis.start();onClose()}} onClick={x=>x.target===d.current&&onClose()}>
    {e&&<><span className="tag">{e.type}</span><h3>{e.title}</h3><p>{e.long}</p>
      <dl><dt>When</dt><dd>{e.date}</dd><dt>Where</dt><dd>{e.venue}</dd><dt>Level</dt><dd>{e.level}</dd><dt>Team size</dt><dd>{e.team}</dd><dt>Status</dt><dd>{e.status}</dd></dl>
      <div style={{display:'flex',gap:10}}>
        <button className="btn p" onClick={()=>onRegister(e.id)}>Register (demo)</button>
        <button className="btn" onClick={onClose}>Close</button></div></>}
  </dialog>)
}
