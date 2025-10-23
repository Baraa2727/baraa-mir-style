import { notFound } from 'next/navigation'
import items from '../../../content/items.json'
export default function Project({params}:{params:{id:string}}){
  const item = (items as any).find((i:any)=>i.id===params.id)
  if(!item) return notFound()
  const media = item.kind==='video'
    ? <video src={item.src} muted autoPlay loop playsInline style={{width:'100%',borderRadius:10}}/>
    : <img src={item.src} alt={item.title||''} style={{width:'100%',borderRadius:10}}/>
  return (<main className="container" style={{paddingTop:96,paddingBottom:64}}>
    <h1 style={{marginBottom:16}}>{item.title||'Projekt'}</h1>
    {media}
    <p style={{color:'#6b6b6b'}}>Detailseite (Platzhalter) – wir erweitern sie später.</p>
  </main>)
}
