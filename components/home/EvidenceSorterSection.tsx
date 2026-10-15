'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check, MousePointer2, Pause, Play, X } from 'lucide-react';

type Proof = {
  title: string;
  short: string;
  phase: string;
  state: string;
  description: string;
  artifact: string;
  inspect: string;
  takeaway: string;
};

// Demonstration records only. Never interpret these as actual verification results.
const proofs: Proof[] = [
  { title:'The problem, clearly framed', short:'Project brief', phase:'CONTEXT', state:'DOCUMENTED',
    description:'A learner defines a real problem, its constraints, and a success criterion before building.',
    artifact:'Project brief and acceptance criteria', inspect:'Problem statement and scope', takeaway:'Testable problem definition' },
  { title:'Show the work behind the claim', short:'Codebase', phase:'BUILD', state:'TRACEABLE',
    description:'A repository and change history expose how a solution was implemented, not merely asserted.',
    artifact:'Repository and commit history', inspect:'Changes, decisions, authorship', takeaway:'Inspectable implementation' },
  { title:'A solution that can be checked', short:'Test results', phase:'QUALITY', state:'TESTED',
    description:'Reproducible tests help a reviewer evaluate the work against its requirements.',
    artifact:'Test report and reproduction steps', inspect:'Cases and observed outcomes', takeaway:'Visible quality evidence' },
  { title:'Judgment made visible', short:'Peer review', phase:'FEEDBACK', state:'REVIEWED',
    description:'Structured feedback connects rubric decisions, revisions, and acceptance criteria.',
    artifact:'Review notes and revision history', inspect:'Rubric, comments, changes', takeaway:'Reasoned review trail' },
  { title:'From built to demonstrable', short:'Capstone proof', phase:'OUTCOME', state:'PROOF READY',
    description:'The delivered result and its supporting records show what was made and who contributed.',
    artifact:'Demonstration and evidence bundle', inspect:'Output, provenance, contribution', takeaway:'Evidence-backed capability story' },
];

const mono = { fontFamily:'ui-monospace, SFMono-Regular, Consolas, monospace' };

function ArtifactGlyph({ i }: { i:number }) {
  const p = { stroke:'currentColor', fill:'none', strokeWidth:1.4, strokeLinecap:'round' as const, strokeLinejoin:'round' as const };
  if(i===0)return <g {...p}><path d="M13 64l12-4 5 4 17-6v31L13 95Z"/><path d="M17 76l25-8M17 83l20-7"/></g>;
  if(i===1)return <g {...p}><path d="M25 65 14 78l11 6M36 61l11 8-11 14M34 60l-9 27"/></g>;
  if(i===2)return <g {...p}><path d="m13 62 7 5 8-12M13 78l7 5 8-12M32 59l15-5M32 75l15-5"/></g>;
  if(i===3)return <g {...p}><path d="m13 69 14-5 12 6-14 5ZM13 69v13l12 7V75m0 14 14-6V70"/><path d="m18 75 5 3 10-14"/></g>;
  return <g {...p}><path d="m30 52 17 15-17 23-17-14Z"/><path d="m21 73 6 5 13-15"/></g>;
}

function Archive({ selected, onSelect }: {selected:number; onSelect:(i:number)=>void}) {
  return (
    <svg viewBox="0 0 760 505" className="w-full max-h-[460px] relative z-10 overflow-visible select-none" role="img"
         aria-label={'Isometric evidence archive. Raised card: '+proofs[selected].short}>
      <defs>
        <linearGradient id="ea-floor" x2=".7" y2="1"><stop stopColor="#1e3146"/><stop offset="1" stopColor="#0c1521"/></linearGradient>
        <radialGradient id="ea-light"><stop stopColor="#326295" stopOpacity=".22"/><stop offset="1" stopColor="#0c1420" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="395" cy="261" rx="320" ry="207" fill="url(#ea-light)"/>
      <g stroke="#2f465c" strokeWidth=".65" opacity=".22" fill="none">
        <path d="M90 420 470 282 687 395M135 439 520 299M181 458 571 315"/>
      </g>
      <ellipse cx="390" cy="441" rx="219" ry="24" fill="#03090f" opacity=".46"/>
      {/* Desk object back rim and five slots. */}
      <path d="M124 369 519 230 663 306 268 445Z" fill="url(#ea-floor)" stroke="#7890a7" strokeWidth="1.2"/>
      <path d="M159 365 515 239 620 294 266 418Z" fill="#0d1926" stroke="#4d657b" strokeWidth=".8"/>
      {proofs.map((p,i)=><path key={p.short} d={'M'+(195+i*77)+' '+(365-i*20)+' l47 -17'}
                                  fill="none" stroke="#99adc1" strokeWidth="2.7" opacity=".34"/>)}
      {proofs.map((p,i)=>{
        const raised = selected===i;
        return <g key={p.short} transform={'translate('+(176+i*83)+' '+(224-i*16)+')'}
                  onMouseEnter={()=>onSelect(i)} onClick={()=>onSelect(i)} style={{cursor:'pointer'}}>
          <g style={{transform:'translateY('+(raised?-52:0)+'px)',
                     transition:'transform .52s cubic-bezier(.18,.85,.18,1)'}}>
            <path d="M0 0 11-8 69-28 58-20Z" fill={raised?'#365a7d':'#25384b'} stroke="#839bb2" strokeWidth=".9"/>
            <path d="M58-20 69-28 69 135 58 143Z" fill="#09111c" stroke="#678099" strokeWidth="1"/>
            <path d="M0 0 58-20 58 143 0 163Z" fill={raised?'#20374f':'#142331'}
                  stroke={raised?'#c4dfff':'#9aacc0'} strokeWidth={raised?1.6:1.05}/>
            <path d="M0 0 58-20" fill="none" stroke="#e5f2ff" strokeWidth="1.2" opacity={raised?1:.4}/>
            <g stroke={raised?'#b8d7ff':'#8199b0'} opacity={raised?.86:.5} fill="none" strokeWidth=".9">
              <path d="M12 21 46 9M12 28 39 18M11 110 47 97M11 116 42 105M11 122 34 114M12 142 19 139M24 137 31 134"/>
            </g>
            <g style={{color:raised?'#eef7ff':'#9db6ce'}}><ArtifactGlyph i={i}/></g>
            <path d="M10 150 48 137" stroke={raised?'#88bcff':'#638199'} strokeWidth="1.3"/>
          </g>
          <path d="M-6-15 72-42 73 150-6 180Z" fill="transparent"/>
        </g>;
      })}
      {/* The front lip hides the bottom of each card to establish physical depth. */}
      <path d="M268 415 620 291 663 306 268 445Z" fill="#172739" stroke="#97acc0" strokeWidth="1.1"/>
      <path d="M124 369 268 445 268 465 124 388Z" fill="#111e2c" stroke="#5c748c" strokeWidth="1.1"/>
      <path d="M268 445 663 306 663 326 268 465Z" fill="#0b1623" stroke="#71879b" strokeWidth="1.1"/>
      <path d="M288 460 640 336" fill="none" stroke="#7f94a9" opacity=".4" strokeWidth=".7"/>
      <path d="M283 466v8l-29-12v-7M624 338v7l24-9v-7" stroke="#435b71" fill="none" strokeWidth="1"/>
    </svg>
  );
}

export function EvidenceSorterSection() {
  const [selected, setSelected] = useState(3);
  const [expanded, setExpanded] = useState(false);
  const [tour, setTour] = useState(false);
  const buttons = useRef<Array<HTMLButtonElement|null>>([]);
  const active=proofs[selected];

  useEffect(()=>{
    if(!tour)return;
    const stops=[0,1,3,4];
    let pos=0;
    setSelected(stops[0]);
    setExpanded(false);
    const id=window.setInterval(()=>{
      pos++;
      if(pos>=stops.length){window.clearInterval(id);setTour(false);}
      else setSelected(stops[pos]);
    },1600);
    return ()=>window.clearInterval(id);
  },[tour]);

  function choose(i:number){setTour(false);setSelected(i);setExpanded(false);}
  function keys(e:KeyboardEvent<HTMLButtonElement>,i:number){
    let next=i;
    if(e.key==='ArrowRight')next=(i+1)%proofs.length;
    else if(e.key==='ArrowLeft')next=(i+proofs.length-1)%proofs.length;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=proofs.length-1;
    else return;
    e.preventDefault();choose(next);buttons.current[next]?.focus();
  }

  return <section id="visible-evidence" aria-labelledby="evidence-title"
                  className="max-w-[1250px] mx-auto px-5 sm:px-8 py-20 lg:py-28 scroll-mt-24">
    <div className="grid lg:grid-cols-[1.35fr_.8fr] gap-5 lg:gap-20 items-end mb-8">
      <div>
        <p className="font-mono text-[10px] tracking-[.2em] text-[#2458ae] mb-5">◎ VISIBLE EVIDENCE / 001</p>
        <h2 id="evidence-title" className="font-['Outfit'] text-slate-900 font-medium text-[clamp(38px,4.5vw,66px)] leading-[1.07] tracking-[-.045em]">
          Capability should <span className="text-[#2458ae]">leave a trail.</span>
        </h2>
      </div>
      <p className="text-[15px] text-slate-600 leading-[1.8] max-w-md mb-1">
        Every claim is stronger when the work behind it can be inspected. Explore a project through its reviewable artifacts.
      </p>
    </div>
    <div className="bg-[#0c141f] text-[#e9f2fc] rounded-xl border border-[#26384d] overflow-hidden shadow-[0_20px_65px_rgba(17,40,73,.15)]">
      <header className="flex justify-between items-center gap-4 px-5 sm:px-7 min-h-16 border-b border-[#29384b]">
        <div className="flex items-center gap-3 text-[10px] tracking-[.15em] font-semibold">
          <span className="text-[#a7cdff] text-xl">✳</span> PATHWISSE <span className="text-[#8096ad] hidden sm:inline">/ EVIDENCE ARCHIVE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-mono text-[9px] tracking-wider text-[#7e92a7]">ILLUSTRATIVE DEMO</span>
          <button type="button" className="flex items-center gap-2 px-3 py-2 rounded border border-[#48617c] text-xs hover:bg-[#1d324a] focus-visible:outline-2 focus-visible:outline-blue-300"
                  onClick={()=>setTour(v=>!v)} aria-label={tour?'Pause the tour':'Play the tour'}>
            {tour?<Pause size={13}/>:<Play size={13}/>} {tour?'Pause':'Play tour'}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(330px,.85fr)]">
        <div className="relative min-w-0 min-h-[340px] sm:min-h-[450px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#26384a]"
             style={{background:'radial-gradient(ellipse at 50% 45%,#1b314a 0%,#0c1521 62%,#0b131c 100%)'}}>
          <div className="absolute top-6 left-6 right-6 flex justify-between text-[#7890a8] font-mono text-[9px] tracking-[.12em]">
            <span>FIG. 01</span><span>ANATOMY OF A PROOF RECORD</span>
          </div>
          <Archive selected={selected} onSelect={choose}/>
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[#849db7] font-mono text-[9px] tracking-wider">
            <span className="flex items-center gap-2"><MousePointer2 size={12}/> HOVER OR SELECT</span>
            <span className="text-[#e9f3ff] text-sm">{String(selected+1).padStart(2,'0')} <span className="text-[#7492b2] text-[10px]">/ 05</span></span>
          </div>
        </div>
        <div className="p-6 sm:p-8 bg-[#111e2c] flex flex-col min-w-0">
          <div className="flex justify-between items-center font-mono text-[9px] tracking-wider text-[#8da3bc]">
            <span>INSPECTION / {String(selected+1).padStart(2,'0')}</span>
            <span className="text-[#b2d3ff]">● LIVE READOUT</span>
          </div>
          <div className="pt-9 pb-7" aria-live="polite" aria-atomic="true">
            <p className="font-mono text-5xl font-light text-[#d6e9ff] tracking-[-.08em]">{String(selected+1).padStart(2,'0')}
              <span className="text-xs tracking-normal text-[#708ba6]"> / 05</span></p>
            <p className="font-mono text-[10px] tracking-[.14em] text-[#99c0fc] mt-7 mb-3">{active.phase} / {active.state}</p>
            <h3 className="font-['Outfit'] font-medium text-[clamp(23px,2.2vw,32px)] tracking-tight leading-tight">{active.title}</h3>
            <p className="mt-4 text-[#9cafc2] text-[13px] leading-[1.75]">{active.description}</p>
          </div>
          <dl className="mt-auto border-t border-[#2c3f53]">
            {[
              ['ARTIFACT',active.artifact],
              ['INSPECT',active.inspect],
              ['RESULT',active.takeaway],
            ].map(([term,value])=><div key={term} className="grid grid-cols-[75px_1fr] gap-3 py-3 border-b border-[#2c3f53]">
              <dt className="font-mono text-[9px] tracking-wider text-[#8196ac] pt-1">{term}</dt>
              <dd className="text-[12px] leading-5 text-[#e0ebf8]">{value}</dd>
            </div>)}
          </dl>
          <button type="button" aria-expanded={expanded} aria-controls="sample-proof-record"
                  className="mt-6 w-full bg-[#294c75] border border-[#45678e] rounded px-4 py-3 flex items-center justify-between text-[12px] font-semibold hover:bg-[#35628d] focus-visible:outline-2 focus-visible:outline-blue-300"
                  onClick={()=>{setTour(false);setExpanded(v=>!v);}}>
            {expanded?'Close sample record':'Inspect sample record'} {expanded?<X size={15}/>:<ArrowUpRight size={15}/>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 border-t border-[#2b3a4c] px-2 sm:px-4">
        {proofs.map((p,i)=><button type="button" key={p.short} ref={el=>{buttons.current[i]=el;}}
          className={'relative min-w-0 min-h-[68px] px-1.5 sm:px-3 pt-3 pb-3 flex flex-col justify-between text-left gap-1.5 border-b-2 focus-visible:outline-2 focus-visible:outline-blue-300 '+(selected===i?'bg-[#192d43] border-[#9ec7ff] text-white':'border-transparent text-[#9aadc0] hover:bg-[#14263b]')}
          aria-pressed={selected===i} onMouseEnter={()=>{if(!tour)setSelected(i);}} onFocus={()=>{if(!tour)setSelected(i);}}
          onClick={()=>choose(i)} onKeyDown={e=>keys(e,i)}>
          <span className="font-mono text-[9px] tracking-wider text-[#91b4da]">{String(i+1).padStart(2,'0')}</span>
          <span className="text-[9px] sm:text-[12px] font-medium leading-snug">{p.short}</span>
          {selected===i&&<Check size={12} className="absolute right-2 top-3 text-[#b8d8ff] hidden sm:block"/>}
        </button>)}
      </div>

      {expanded&&<div id="sample-proof-record" className="bg-[#16283d] border-t border-[#3d5773] p-5 sm:p-7">
        <div className="flex flex-wrap justify-between gap-2 font-mono text-[9px] tracking-wider text-[#bdd6f2]">
          <span>EXAMPLE EVIDENCE RECORD</span><span className="text-[#8eabc7]">NOT A REAL CREDENTIAL</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {[[active.artifact,'01 / SUBMISSION'],[active.inspect,'02 / REVIEW SIGNAL'],[active.takeaway,'03 / INTERPRETATION']].map(([value,label])=>
            <div key={label} className="rounded border border-[#415872] p-4">
              <span className="font-mono text-[9px] tracking-wider text-[#9ec7ff]">{label}</span>
              <p className="mt-2 text-[12px] leading-5 text-[#f0f5fc]">{value}</p>
            </div>)}
        </div>
      </div>}
      <footer className="flex justify-between gap-4 px-5 sm:px-7 py-4 border-t border-[#28394c] font-mono text-[9px] tracking-wider text-[#8097ae]">
        <span>INTERACTIVE SAMPLE · NO ACTUAL LEARNER RECORDS DISPLAYED</span>
        <span className="hidden sm:inline">HUMAN CAPABILITY, MADE VISIBLE. ✳</span>
      </footer>
    </div>
    <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <p className="text-[13px] text-slate-500">Not a certificate. A trail of work that stands up to inspection.</p>
      <a href="/product" className="flex items-center gap-2 text-[#2458ae] text-[12px] font-semibold hover:underline underline-offset-4">See how Pathwisse works <ArrowUpRight size={15}/></a>
    </div>
  </section>;
}
