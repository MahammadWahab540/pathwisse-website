import {pages,hubs} from './content';
export default function sitemap(){const origin='https://pathwisse-capability.mahd-wahab.chatgpt.site';return [{url:origin},...Object.entries(pages).filter(([key,p])=>!p.draft&&!key.startsWith('campaigns/')).map(([key])=>({url:origin+'/'+key})),...Object.keys(hubs).map(key=>({url:origin+'/'+key})),{url:origin+'/contact'}]}
