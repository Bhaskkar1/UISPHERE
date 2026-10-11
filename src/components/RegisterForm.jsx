import {useState} from 'react'
import {EVENTS} from '../data/events'
const EMPTY={name:'',email:'',sid:'',event:'',dept:'',year:'',tname:'',tmem:''}
const DEPTS=['Computer Science','Information Technology','Electronics','Mechanical','Civil','Other']
export default function RegisterForm({eventId,setEventId}){
  const [v,setV]=useState(EMPTY),[err,setErr]=useState({}),[done,setDone]=useState(null)
  const ev=EVENTS.find(e=>e.id===eventId),team=ev&&ev.teamMax>1
  const val={...v,event:eventId}
  const rules={
    name:x=>x.trim().length>=3||'Enter your full name.',
    email:x=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x)||'Enter a valid college email.',
    sid:x=>/^[A-Za-z0-9-]{4,15}$/.test(x.trim())||'Student ID should be 4 to 15 letters or numbers.',
    event:x=>!!x||'Choose an event.',dept:x=>!!x||'Choose your department.',year:x=>!!x||'Choose your year.',
    tname:x=>!team||x.trim().length>=2||'Enter a team name.',
    tmem:x=>!team||x.trim().length>=2||'List at least one teammate.'}
  const check=k=>{const r=rules[k](val[k]);setErr(p=>({...p,[k]:r===true?'':r}));return r===true}
  const set=k=>e=>{k==='event'?setEventId(e.target.value):setV({...v,[k]:e.target.value})}
  const submit=e=>{
    e.preventDefault()
    if(!Object.keys(rules).map(check).every(Boolean))return
    const rec={name:v.name.trim(),email:v.email.trim(),sid:v.sid.trim(),dept:v.dept,year:v.year,event:ev.title,demo:true,at:new Date().toISOString()}
    try{const a=JSON.parse(localStorage.getItem('gdg-demo-regs')||'[]');a.push(rec);localStorage.setItem('gdg-demo-regs',JSON.stringify(a))}catch{}
    setDone(rec)
  }
  const F=({k,label,children,w})=>(<div className={'f'+(w?' w':'')+(err[k]?' bad':'')}>
    <label htmlFor={k}>{label}</label>{children}<span className="err">{err[k]}</span></div>)
  const bind=k=>({id:k,value:val[k],onChange:set(k),onBlur:()=>check(k)})
  return(<section className="reg" id="register">
    <div><h2>Save your spot.</h2>
      <p className="sub" style={{marginTop:20}}>This is a front-end demo. Submitting stores your entry in this browser only. Nothing is sent to organisers.</p></div>
    <div>
      {done?(<div id="ok" style={{display:'block'}} role="status">
        <h3>Demo registration saved.</h3>
        <p className="sub">{done.name}, your demo entry for {done.event} is saved in this browser.</p>
        <p className="note" style={{marginTop:12}}>Stored only in this browser. It was not submitted to anyone.</p>
        <button className="btn" style={{marginTop:24}} onClick={()=>{setDone(null);setV(EMPTY);setEventId('');setErr({})}}>Register another</button>
      </div>):(
      <form onSubmit={submit} noValidate>
        <F k="name" label="Full name"><input {...bind('name')} autoComplete="name"/></F>
        <F k="email" label="College email"><input {...bind('email')} type="email" autoComplete="email" placeholder="you@college.edu"/></F>
        <F k="sid" label="Student ID"><input {...bind('sid')}/></F>
        <F k="event" label="Event"><select {...bind('event')}><option value="">Select</option>{EVENTS.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select></F>
        <F k="dept" label="Department"><select {...bind('dept')}><option value="">Select</option>{DEPTS.map(d=><option key={d}>{d}</option>)}</select></F>
        <F k="year" label="Year"><select {...bind('year')}><option value="">Select</option>{['1st','2nd','3rd','4th'].map(y=><option key={y}>{y}</option>)}</select></F>
        {team&&<><F k="tname" label="Team name" w><input {...bind('tname')}/></F>
          <F k="tmem" label="Teammates (names, one per line)" w><textarea {...bind('tmem')} rows={3}/></F></>}
        <div className="f w"><button className="btn p" type="submit">Register (demo)</button>
          <p className="note" style={{marginTop:10}}>Demo only: no real registration is made.</p></div>
      </form>)}
    </div>
  </section>)
}
