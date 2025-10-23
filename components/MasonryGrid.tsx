import Link from 'next/link'
export type Item={id:string, kind:'image'|'video', src:string, size:'Small'|'Medium'|'Large'|'Full', title?:string}
export default function MasonryGrid({items}:{items:Item[]}){
  return (<div className="grid">
    {items.map(it=>{
      const sizeClass = {Small:'size-small', Medium:'size-medium', Large:'size-large', Full:'size-full'}[it.size]
      const media = it.kind==='video' ? <video src={it.src} muted autoPlay loop playsInline/> : <img src={it.src} alt={it.title||''}/>
      return (<Link key={it.id} href={`/project/${it.id}`} className={`card ${sizeClass}`}>
        {media}
        {it.title ? <div className="caption">{it.title}</div> : null}
      </Link>)
    })}
  </div>)
}
