import {useEffect,useRef} from 'react'
import gsap from 'gsap'
export default function Loader({onDone}){
  const box=useRef(),num=useRef()
  useEffect(()=>{
    const o={v:0}
    const tl=gsap.timeline()
      .to(o,{v:100,duration:1.4,ease:'power2.inOut',onUpdate:()=>{if(num.current)num.current.textContent=Math.round(o.v)}})
      .to(box.current,{yPercent:-100,duration:.8,ease:'power3.inOut',onComplete:onDone})
    return()=>tl.kill()
  },[])
  return(<div id="loader" ref={box}><div><b ref={num}>0</b>
    <i>{['#4285F4','#EA4335','#FBBC04','#34A853'].map(c=><span key={c} style={{background:c}}/>)}</i></div></div>)
}
