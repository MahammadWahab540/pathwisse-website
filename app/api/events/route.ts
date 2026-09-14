import {rawDb,allowedOrigin,smallJson} from '../../../db/raw';
import {pages,hubs} from '../../content';
const names=['page_view','platform_click','career_voice_click','cta_click','audience_select','form_start','form_error','lead_submit','waitlist_submit'];
const targets=['','platform','career-voice','general','college','upskilling','hiring','events','story','students','colleges','enterprises'];
export async function POST(request:Request){if(!allowedOrigin(request))return new Response(null,{status:403});try{const p=await smallJson(request);if(!p||!names.includes(p.event)||!targets.includes(p.target)||typeof p.page!=='string'||!['/','/contact',...Object.keys(pages).map(k=>'/'+k),...Object.keys(hubs).map(k=>'/'+k)].includes(p.page))return new Response(null,{status:400});await rawDb().prepare('INSERT INTO events (event,page,target) VALUES (?,?,?)').bind(p.event,p.page,p.target).run();return new Response(null,{status:204})}catch{return new Response(null,{status:503})}}
