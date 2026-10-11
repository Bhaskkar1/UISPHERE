export const About=()=>(<section className="about" id="about">
  <div><h2>A club for people who build.</h2></div>
  <div>
    <p className="sub">We are a student community built around Google technologies and everything near them: web, mobile, cloud, AI and open source. No experience needed, only curiosity.</p>
    <ul>
      <li><span>Learn</span><span>Workshops led by students and guests</span></li>
      <li><span>Build</span><span>Hackathons and team projects</span></li>
      <li><span>Share</span><span>Demo nights and peer code reviews</span></li>
    </ul>
  </div>
</section>)
const ACT=[['Study jams','Weekly sessions to work through a topic together, from Git to Kotlin.'],['Peer code reviews','Bring a project, get honest feedback from seniors.'],['Game nights','Low-stakes tournaments and game jams to unwind between exams.'],['Mentorship','Seniors pair with first years on their first real project.'],['Speaker sessions','Talks from developers and alumni about real work.'],['Open source','Pick an issue, send a pull request, learn the workflow.']]
export const Community=()=>(<section className="comm" id="community">
  <h2>What we do all year.</h2>
  <ul>{ACT.map(([t,d])=><li  key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul>
</section>)
export const Cta=()=>(<section className="cta"><h2>Your next project starts here.</h2><a href="#register" className="btn">Register for an event</a></section>)
export const Footer=()=>(<footer><span>GDG on Campus, a student club demo site.</span><span>Not an official Google page. Sample content only.</span></footer>)
