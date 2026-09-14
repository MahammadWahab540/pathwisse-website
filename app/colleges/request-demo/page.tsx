import { Header, Footer } from '@/app/site';
import { IntentLeadForm } from '@/components/forms/IntentLeadForm';
export const metadata = { title: 'Request College Demo | Pathwisse', description: 'Request a Pathwisse demo for student readiness, placement analytics, and college partnerships.' };
export default function Page(){return <><Header/><main id="main"><section className="inner-hero"><div><span className="eyebrow">COLLEGE DEMO</span><h1>Request a student readiness audit.</h1><p>Share your cohort context, placement challenges, and readiness goals. Pathwisse will use this to prepare a more useful partnership conversation.</p></div><IntentLeadForm variant="college"/></section></main><Footer/></>}
