import { Header, Footer } from '@/app/site';
import { IntentLeadForm } from '@/components/forms/IntentLeadForm';
export const metadata = { title: 'Request Enterprise Demo | Pathwisse', description: 'Request a Pathwisse enterprise demo for workforce assessment, upskilling, AI readiness, and talent intelligence.' };
export default function Page(){return <><Header/><main id="main"><section className="inner-hero"><div><span className="eyebrow">ENTERPRISE DEMO</span><h1>Hire with evidence. Upskill with direction.</h1><p>Tell us about your workforce, skills needed, L&D stack, and timeline so Pathwisse can shape the right capability conversation.</p></div><IntentLeadForm variant="enterprise"/></section></main><Footer/></>}
