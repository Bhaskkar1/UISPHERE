import {useEffect,useRef,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {EVENTS} from '../data/events'
import {goTo,reduce} from '../lib/scroll'
import EventDialog from './EventDialog'
gsap.registerPlugin(ScrollTrigger)
const CATS=['All','Compete','Learn','Build']
export default function Events({onRegister}){
  const [cat,setCat]=useState('All'),[open,setOpen]=useState(null),list=useRef()
  const shown=EVENTS.filter(e=>cat==='All'||e.cat===cat)
  useEffect(()=>{
    const ctx=gsap.context(()=>{if(!reduce)gsap.from('.item',{opacity:0,y:20,stagger:.06,duration:.5,clearProps:'all'})},list)
    ScrollTrigger.refresh()
    return()=>ctx.revert()
  },[cat])
  const reg=id=>{setOpen(null);onRegister(id);goTo('#register')}
  return(<section className="ev" id="events">
    <div className="head"><h2>Upcoming events</h2>
      <div className="filters" role="group" aria-label="Filter events">
        {CATS.map(c=><button key={c} aria-pressed={c===cat} onClick={()=>setCat(c)}>{c}</button>)}
      </div></div>
    <div id="list" ref={list}>
      {shown.map((e,i)=>i===0?(
        <article key={e.id} className="item big" tabIndex={0} onKeyDown={k=>k.key==='Enter'&&setOpen(e)}>
          <div><span className="tag">{e.type}</span><h3 style={{marginTop:14}}>{e.title}</h3></div>
          <div><p className="sub">{e.desc}</p>
            <p className="d" style={{marginTop:14}}>{e.date} at {e.venue}. {e.level}. Team: {e.team}.</p>
            <div className="acts" style={{flexDirection:'row',justifyContent:'flex-start',marginTop:20}}>
              <span className={'st '+e.statusKey}>{e.status}</span>
              <button className="btn" onClick={()=>setOpen(e)}>View details</button>
              <button className="btn p" onClick={()=>reg(e.id)}>Register</button></div></div>
        </article>):(
        <article key={e.id} className="item" tabIndex={0} onKeyDown={k=>k.key==='Enter'&&setOpen(e)}>
          <div className="d">{e.date}<br/>{e.venue}</div>
          <div><h3>{e.title}</h3><p className="m">{e.type}. {e.level}. Team: {e.team}. {e.desc}</p></div>
          <div className="acts"><span className={'st '+e.statusKey}>{e.status}</span>
            <div style={{display:'flex',gap:8}}>
              <button className="btn" onClick={()=>setOpen(e)}>Details</button>
              <button className="btn p" onClick={()=>reg(e.id)}>Register</button></div></div>
        </article>))}
      <div style={{gridColumn:'1/-1',borderTop:'1px solid var(--line)'}}/>
    </div>
    <EventDialog event={open} onClose={()=>setOpen(null)} onRegister={reg}/>
  </section>)
}
