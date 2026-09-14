import { Header, Footer } from '@/app/site';
import { CareerAudit } from '@/components/career-audit/CareerAudit';
export const metadata = { title: 'Career Audit Roadmap', description: 'Generate a first Pathwisse roadmap from your career audit.' };
export default function Page(){ return <><Header/><main id="main"><CareerAudit mode="roadmap"/></main><Footer/></>; }
