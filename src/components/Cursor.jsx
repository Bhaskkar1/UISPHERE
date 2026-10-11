import {useEffect,useRef} from 'react'
import gsap from 'gsap'
export default function Cursor(){
  const el=useRef()
  useEffect(()=>{
    if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return
    const x=gsap.quickTo(el.current,'x',{duration:.2}),y=gsap.quickTo(el.current,'y',{duration:.2})
    const mv=e=>{x(e.clientX);y(e.clientY)}
    const ov=e=>gsap.to(el.current,{scale:e.target.closest('a,button,.item,input,select,textarea')?3:1,duration:.25})
    addEventListener('mousemove',mv);document.addEventListener('mouseover',ov)
    return()=>{removeEventListener('mousemove',mv);document.removeEventListener('mouseover',ov)}
  },[])
  return <div id="cur" ref={el}/>
}
