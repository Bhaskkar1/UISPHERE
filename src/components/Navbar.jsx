import {useEffect,useState} from 'react'
import {goTo} from '../lib/scroll'
const LINKS=[['About','#about'],['Events','#events'],['Codefest','#hackathon'],['Community','#community']]
export default function Navbar(){
  const [open,setOpen]=useState(false),[solid,setSolid]=useState(false)
  useEffect(()=>{const f=()=>setSolid(scrollY>40);addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[])
  const nav=(e,h)=>{e.preventDefault();setOpen(false);goTo(h==='#top'?0:h)}
  const toggle=()=>{
    const r=document.documentElement,n=r.dataset.theme==='dark'?'light':'dark'
    r.dataset.theme=n;try{localStorage.setItem('gdg-theme',n)}catch{}
  }
  return(<nav className={solid?'solid':''}>
    <a href="#top" className="logo" onClick={e=>nav(e,'#top')}>
      <span className="dots">{['#4285F4','#EA4335','#FBBC04','#34A853'].map(c=><span key={c} style={{background:c}}/>)}</span>GDG on Campus</a>
    <div className={'links'+(open?' open':'')}>
      {LINKS.map(([t,h])=><a key={h} href={h} onClick={e=>nav(e,h)}>{t}</a>)}
      <a href="#register" className="btn p" style={{padding:'9px 20px',color:'#fff'}} onClick={e=>nav(e,'#register')}>Register</a>
    </div>
    <div style={{display:'flex',gap:10}}>
      <button className="ico" onClick={toggle} aria-label="Toggle light and dark theme">◐</button>
      <button id="burger" className="ico" onClick={()=>setOpen(!open)} aria-label="Open menu" aria-expanded={open}>☰</button>
    </div>
  </nav>)
}
