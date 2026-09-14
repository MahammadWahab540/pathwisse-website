import { Header, Footer } from '@/app/site';
import { CareerAudit } from '@/components/career-audit/CareerAudit';
export const metadata = { title: 'Start Career Audit', description: 'Begin a practical Pathwisse career audit.' };
export default function Page(){ return <><Header/><main id="main"><CareerAudit mode="start"/></main><Footer/></>; }
