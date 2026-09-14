import { Header, Footer } from '@/app/site';
import { CareerAudit } from '@/components/career-audit/CareerAudit';
export const metadata = { title: 'Career Audit Result', description: 'Review your Pathwisse career audit result.' };
export default function Page(){ return <><Header/><main id="main"><CareerAudit mode="result"/></main><Footer/></>; }
