'use client';
import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { track } from '@/app/tracking';

type Field = { name:string; label:string; required?:boolean; type?:string; placeholder?:string; textarea?:boolean };
const configs = {
  college: {
    interest: 'college', title: 'Request a student readiness audit', success: 'Your college demo request has been saved.', button: 'Request college demo',
    fields: [
      { name:'organization', label:'College name', required:true, placeholder:'Institution name' },
      { name:'name', label:'Placement head / contact name', required:true, placeholder:'Full name' },
      { name:'email', label:'Email address', required:true, type:'email', placeholder:'name@college.edu' },
      { name:'phone', label:'Phone', required:true, placeholder:'+91 90000 00000' },
      { name:'student_count', label:'Approx. student count', placeholder:'e.g. 1200' },
      { name:'graduation_year', label:'Target graduation year', placeholder:'e.g. 2027' },
      { name:'placement_rate', label:'Current placement rate, if available', placeholder:'Optional' },
      { name:'requested_program', label:'Requested program', placeholder:'Readiness audit, career accelerator, placement analytics…' },
      { name:'placement_challenges', label:'Placement challenges', textarea:true, placeholder:'Tell us where students need support.' },
    ] as Field[],
  },
  enterprise: {
    interest: 'upskilling', title: 'Talk to Pathwisse for enterprise capability', success: 'Your enterprise request has been saved.', button: 'Request enterprise demo',
    fields: [
      { name:'organization', label:'Company', required:true, placeholder:'Company name' },
      { name:'name', label:'Contact name', required:true, placeholder:'Full name' },
      { name:'email', label:'Work email', required:true, type:'email', placeholder:'name@company.com' },
      { name:'phone', label:'Phone', placeholder:'+91 90000 00000' },
      { name:'designation', label:'Role / designation', placeholder:'HR, L&D, Talent, Business leader…' },
      { name:'employee_count', label:'Employee count', placeholder:'e.g. 500' },
      { name:'skills_needed', label:'Skills needed', placeholder:'AI readiness, data, product, engineering…' },
      { name:'ld_stack', label:'Current L&D stack', placeholder:'LMS, internal academy, spreadsheets…' },
      { name:'timeline', label:'Timeline', placeholder:'This quarter, 6 months, exploratory…' },
      { name:'training_requirements', label:'Training requirements', textarea:true, placeholder:'Describe teams, roles, and capability gaps.' },
    ] as Field[],
  },
};

export function IntentLeadForm({ variant }: { variant: keyof typeof configs }) {
  const config = configs[variant];
  const [consent,setConsent]=useState(false),[state,setState]=useState<'idle'|'saving'|'success'|'error'>('idle'),[message,setMessage]=useState('');
  const requestId=useRef('');
  async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(!requestId.current)requestId.current=crypto.randomUUID();if(!consent){setState('error');setMessage('Please confirm consent so the Pathwisse team can respond.');return;}const form=new FormData(e.currentTarget);const q=new URLSearchParams(location.search);const extras:Record<string,string>={};for(const [k,v] of form.entries()) if(!['name','email','phone','organization','designation','website'].includes(k)) extras[k]=String(v).slice(0,500);const params=Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].map(k=>[k,(q.get(k)||'').slice(0,160)]));setState('saving');setMessage('');try{const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:requestId.current,name:form.get('name'),email:form.get('email'),phone:form.get('phone')||'',organization:form.get('organization'),designation:form.get('designation')||'',organization_type:variant,interest:config.interest,audience:variant==='college'?'colleges':'enterprise',source:location.pathname,landing_page:location.href,referrer:document.referrer,campaign_id:q.get('campaign_id')||location.pathname.replace(/^\//,''),campaign_name:document.title,message:JSON.stringify(extras),website:form.get('website')||'',consent,...params})});const result=await r.json() as {error?:string};if(!r.ok)throw new Error(result.error||'Unable to save your request.');setState('success');setMessage(config.success);track(variant==='college'?'demo_request':'lead_submit',variant);}catch(err){setState('error');setMessage(err instanceof Error?err.message:'Unable to save your request.');track('form_error',variant)}}
  if(state==='success') return <div className="form-success"><Check size={30}/><h2>Request received.</h2><p role="status">{message}</p><a className="text-link" href="/">Back to Pathwisse <ArrowRight size={15}/></a></div>;
  return <form className="contact-form" onSubmit={submit} onFocus={()=>track('form_start',variant)}><h2>{config.title}</h2>{config.fields.map(f=><div className="field" key={f.name}><label htmlFor={f.name}>{f.label}{f.required?' *':''}</label>{f.textarea?<textarea id={f.name} name={f.name} required={f.required} maxLength={2000} placeholder={f.placeholder}/>:<input id={f.name} name={f.name} type={f.type||'text'} required={f.required} maxLength={254} placeholder={f.placeholder}/>}</div>)}<div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div><div className="consent-row"><Checkbox id={`${variant}-consent`} checked={consent} onCheckedChange={v=>setConsent(v===true)}/><label htmlFor={`${variant}-consent`}>I agree that Pathwisse may use these details to respond to this request. <a href="/trust/privacy">Read the data notice.</a></label></div>{state==='error'&&<p className="form-message" role="alert">{message}</p>}<button className="button" disabled={state==='saving'}>{state==='saving'?'Saving request…':config.button}<ArrowRight size={16}/></button></form>;
}

