import React, { useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Mail, Menu, X,
  Code2, Database, BrainCircuit, ShieldCheck, BriefcaseBusiness, GraduationCap,
  MapPin, ExternalLink, Send, CheckCircle2, Terminal, Sparkles, Trophy, Globe
} from 'lucide-react';

function Github({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const projects = [
  {
    number: '01',
    title: 'Smart AI Surveillance',
    type: 'Computer Vision · AI/ML',
    description: 'A smart surveillance system using Python and OpenCV for image and video processing, with AI/ML concepts supporting automated analysis of surveillance events.',
    stack: ['Python', 'OpenCV', 'AI/ML', 'Flask'],
    icon: ShieldCheck,
    tone: 'violet',
    status: 'Computer vision'
  },
  {
    number: '02',
    title: 'Job Finder for Resume',
    type: 'Web Application',
    description: 'A web application that matches candidate resumes to suitable job opportunities based on skills and job requirements, backed by Flask and SQL.',
    stack: ['Python', 'Flask', 'SQL', 'JavaScript'],
    icon: BriefcaseBusiness,
    tone: 'pink',
    status: 'Career tools'
  },
  {
    number: '03',
    title: 'Scanalyse',
    subtitle: 'Website Safety Analyzer',
    type: 'Web Security · APIs',
    description: 'A URL analysis application that helps users check whether a website appears safe or risky using backend URL processing and API-based checks.',
    stack: ['Python', 'Flask', 'APIs', 'JavaScript'],
    icon: ShieldCheck,
    tone: 'blue',
    status: 'Security'
  },
  {
    number: '04',
    title: 'Tailor E-Commerce',
    type: 'Real-world Business Website',
    description: 'An e-commerce website built around an actual tailoring business requirement, with customer-facing product and service pages and a Flask/MongoDB backend.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Flask', 'MongoDB'],
    icon: Globe,
    tone: 'orange',
    status: 'Live business use case'
  }
];

const skills = [
  { title: 'Programming', icon: Code2, items: ['Java', 'Python', 'C++', 'C'] },
  { title: 'Web Development', icon: Terminal, items: ['HTML', 'CSS', 'JavaScript', 'Flask', 'REST APIs'] },
  { title: 'Databases', icon: Database, items: ['SQL', 'MongoDB'] },
  { title: 'Tools & Concepts', icon: BrainCircuit, items: ['Git', 'GitHub', 'Postman', 'OpenCV', 'DSA', 'OOP', 'DBMS'] }
];

function SectionHeading({ eyebrow, title, description }) {
  return <div className="section-heading">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState({ type: '', text: '' });

  const closeMenu = () => setMenuOpen(false);
  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submitContact(event) {
    event.preventDefault();
    setSending(true);
    setNotice({ type: '', text: '' });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to send your message.');
      setNotice({ type: 'success', text: data.message || 'Thanks! Your message was received.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setNotice({ type: 'error', text: error.message === 'Failed to fetch'
        ? 'Could not connect to the Flask server. Start the backend and try again.'
        : error.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Paramesh home">
          <span className="brand-mark">P<span>.</span></span>
          <span>paramesh<span className="brand-muted">.dev</span></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          {[['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Journey', '#journey'], ['Contact', '#contact']].map(([label, href]) =>
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          )}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" /> COMPUTER SCIENCE & ENGINEERING STUDENT</div>
            <h1>Building ideas<br />into <span className="gradient-text">real products.</span></h1>
            <p className="hero-lead">Hey, I'm <strong>Paramesh P.</strong> I build practical web applications and explore the intersection of backend engineering, AI, and technology that solves real problems.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowRight size={17} /></a>
              <a className="button button-ghost" href="#contact"><Mail size={17} /> Get in touch</a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/paramesh25427" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={13} /></a>
              <a href="https://linkedin.com/in/paramesh-p-95590b338" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} /></a>
              <a href="https://leetcode.com/u/Paramesh26" target="_blank" rel="noreferrer"><Code2 size={17} /> LeetCode <ArrowUpRight size={13} /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative developer illustration">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="hero-glow"></div>
            <div className="code-window">
              <div className="window-top"><span></span><span></span><span></span><small>developer.py</small></div>
              <div className="code-body">
                <div><span className="line-no">01</span><span className="code-purple">class</span> <span className="code-yellow">Developer</span>:</div>
                <div><span className="line-no">02</span>&nbsp;&nbsp;<span className="code-purple">def</span> <span className="code-blue">__init__</span>(self):</div>
                <div><span className="line-no">03</span>&nbsp;&nbsp;&nbsp;&nbsp;self.name = <span className="code-green">"Paramesh"</span></div>
                <div><span className="line-no">04</span>&nbsp;&nbsp;&nbsp;&nbsp;self.focus = [</div>
                <div><span className="line-no">05</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">"Backend"</span>,</div>
                <div><span className="line-no">06</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">"AI &amp; Cloud"</span></div>
                <div><span className="line-no">07</span>&nbsp;&nbsp;&nbsp;&nbsp;]</div>
                <div><span className="line-no">08</span>&nbsp;&nbsp;&nbsp;&nbsp;self.mindset = <span className="code-green">"Build. Learn. Repeat."</span></div>
                <div className="code-cursor-line"><span className="line-no">09</span><span className="code-comment"># always learning something new</span><span className="cursor"></span></div>
              </div>
              <div className="code-status"><span><span className="status-dot"></span> Ready to build</span><span>Python 3</span></div>
            </div>
            <div className="floating-chip chip-top"><Sparkles size={15} /> Curious by nature</div>
            <div className="floating-chip chip-bottom"><Code2 size={16} /><span><strong>4 projects</strong><small>Built & documented</small></span></div>
            <div className="hero-orb"><span>P</span></div>
          </div>
          <a className="scroll-cue" href="#about"><span className="scroll-line"></span> SCROLL TO EXPLORE <ArrowDown size={13} /></a>
        </section>

        <section className="about section-wrap section-block" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curiosity turns into <span className="gradient-text">creation.</span></>} />
          <div className="about-grid">
            <div className="about-main glass-card">
              <div className="about-icon"><Sparkles size={22} /></div>
              <h3>Developer in progress.<br /><span className="muted-heading">Problem solver by choice.</span></h3>
              <p>I'm a Computer Science and Engineering student at Sri Shakthi Institute of Engineering and Technology, Coimbatore. I enjoy turning ideas into useful applications—from a website for a real tailoring business to tools for resume matching and website safety analysis.</p>
              <p>I'm currently building my foundations across backend development, databases, AI, and cloud technologies while strengthening my problem-solving skills through DSA practice.</p>
              <div className="location-line"><MapPin size={16} /> Coimbatore, Tamil Nadu, India</div>
            </div>
            <div className="about-side">
              <div className="mini-card glass-card"><span className="mini-icon"><GraduationCap size={19} /></span><div><small>EDUCATION</small><strong>B.E. Computer Science</strong><p>2024 — 2028</p></div></div>
              <div className="mini-card glass-card"><span className="mini-icon"><Trophy size={19} /></span><div><small>HIGHLIGHT</small><strong>Sri Shakthi Hackathon</strong><p>Reached the final round</p></div></div>
              <div className="mini-card glass-card"><span className="mini-icon"><BrainCircuit size={19} /></span><div><small>AREAS OF INTEREST</small><strong>Backend · AI · Cloud</strong><p>Learning by building</p></div></div>
            </div>
          </div>
        </section>

        <section className="skills section-wrap section-block" id="skills">
          <SectionHeading eyebrow="MY TOOLKIT" title={<>Tools I use to <span className="gradient-text">bring ideas to life.</span></>} description="A growing toolkit across programming, web development, databases, and engineering fundamentals." />
          <div className="skills-grid">
            {skills.map((group, index) => {
              const Icon = group.icon;
              return <article className="skill-card glass-card" key={group.title}>
                <div className={`skill-icon skill-icon-${index}`}><Icon size={21} /></div>
                <h3>{group.title}</h3>
                <div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div>
              </article>;
            })}
          </div>
        </section>

        <section className="projects section-wrap section-block" id="projects">
          <div className="projects-heading">
            <SectionHeading eyebrow="SELECTED WORK" title={<>Projects with a <span className="gradient-text">purpose.</span></>} description="A few things I've built while learning to solve practical problems with software." />
            <span className="project-count">04 <span>PROJECTS</span></span>
          </div>
          <div className="project-grid">
            {projects.map(project => {
              const Icon = project.icon;
              return <article className={`project-card glass-card tone-${project.tone}`} key={project.number}>
                <div className="project-card-top"><span className="project-number">{project.number} / 04</span><span className="project-symbol"><Icon size={22} /></span></div>
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                {project.subtitle && <h4>{project.subtitle}</h4>}
                <p>{project.description}</p>
                <div className="project-stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
                <div className="project-footer"><span><span className="tiny-dot"></span>{project.status}</span><span className="project-arrow" aria-label="Project details"><ArrowUpRight size={18} /></span></div>
              </article>;
            })}
          </div>
          <p className="project-note"><span className="note-star">✳</span> Project cards describe work from my resume. Source-code and live-demo links can be added when the repositories or deployed URLs are available.</p>
        </section>

        <section className="journey section-wrap section-block" id="journey">
          <SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Learning, building, <span className="gradient-text">showing up.</span></>} description="Every project and challenge is another step forward." />
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-marker"><GraduationCap size={17} /></div><div className="timeline-content"><span className="timeline-date">2024 — 2028</span><h3>B.E. Computer Science and Engineering</h3><p>Sri Shakthi Institute of Engineering and Technology, Coimbatore</p><span className="timeline-badge">CGPA · 7.7</span></div></div>
            <div className="timeline-item"><div className="timeline-marker"><Trophy size={17} /></div><div className="timeline-content"><span className="timeline-date">HACKATHON</span><h3>Sri Shakthi Hackathon — Final Round</h3><p>Built and presented a technical solution under competition constraints.</p></div></div>
            <div className="timeline-item"><div className="timeline-marker"><Code2 size={17} /></div><div className="timeline-content"><span className="timeline-date">CONTINUOUS LEARNING</span><h3>HackSprint, Kaggle & DSA</h3><p>Participated in HackSprint, earned two Kaggle badges, and regularly practise problem-solving on LeetCode.</p></div></div>
          </div>
          <div className="education-strip glass-card"><div><span>CLASS XII</span><strong>87%</strong><small>Sathya Sai Matric Higher Secondary School</small></div><div><span>CLASS X</span><strong>81%</strong><small>Holy Angel Matriculation School</small></div><div><span>LANGUAGES</span><strong>Tamil & English</strong><small>Tamil: Native · English: Professional proficiency</small></div></div>
        </section>

        <section className="contact section-wrap section-block" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <span className="eyebrow">HAVE AN IDEA?</span>
              <h2>Let's make<br /><span className="gradient-text">something useful.</span></h2>
              <p>Have an internship opportunity, project idea, or just want to talk tech? Send me a message. I'd love to hear from you.</p>
              <a className="contact-email" href="mailto:paramesh25427@gmail.com"><Mail size={17} /> paramesh25427@gmail.com <ArrowUpRight size={15} /></a>
              <div className="contact-socials">
                <a href="https://github.com/paramesh25427" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
                <a href="https://linkedin.com/in/paramesh-p-95590b338" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
                <a href="https://leetcode.com/u/Paramesh26" target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 size={19} /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-heading"><span>CONTACT FORM</span><span className="form-secure"><ShieldCheck size={13} /> Flask API</span></div>
              <label>Your name<input name="name" value={form.name} onChange={updateForm} placeholder="Jane Smith" required minLength="2" maxLength="100" /></label>
              <label>Email address<input type="email" name="email" value={form.email} onChange={updateForm} placeholder="jane@example.com" required maxLength="254" /></label>
              <label>Subject <span className="optional">(optional)</span><input name="subject" value={form.subject} onChange={updateForm} placeholder="Internship, collaboration..." maxLength="150" /></label>
              <label>Your message<textarea name="message" value={form.message} onChange={updateForm} placeholder="Tell me a little about it..." required minLength="10" maxLength="5000" rows="4" /></label>
              {notice.text && <div className={`form-notice ${notice.type}`} role="status">{notice.type === 'success' && <CheckCircle2 size={16} />}{notice.text}</div>}
              <button className="button button-primary send-button" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <Send size={16} /></button>
              <p className="form-footnote">Your message is sent to the portfolio backend. Email delivery requires configuring an email provider.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">P<span>.</span></span><span>paramesh<span className="brand-muted">.dev</span></span></a>
        <span>Designed & built with curiosity <span className="footer-heart">✦</span></span>
        <a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={14} /></a>
      </footer>
    </>
  );
}

export default App;