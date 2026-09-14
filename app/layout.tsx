import type { Metadata } from 'next';
import './globals.css';
import {Tracking} from './tracking';
const origin='https://pathwisse-capability.mahd-wahab.chatgpt.site';
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:'Pathwisse — Turn capability into proof',template:'%s | Pathwisse'},description:'Pathwisse turns capability into visible, actionable proof. Career roadmaps for students, readiness for colleges, and hiring and upskilling for enterprises.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}<Tracking/></body></html>}
