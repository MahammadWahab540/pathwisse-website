import { Header, Footer } from '@/app/site';
import { CareerAudit } from '@/components/career-audit/CareerAudit';
export const metadata = { title: 'Career Audit Assessment', description: 'Answer practical questions to get a Pathwisse career direction.' };
export default function Page(){ return <><Header/><main id="main"><CareerAudit mode="assessment"/></main><Footer/></>; }
