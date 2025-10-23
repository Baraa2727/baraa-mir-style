import MasonryGrid from '../components/MasonryGrid'
import items from '../content/items.json'
export default function Page(){
  return (<main>
    <header className="header container">
      <h1>Mir means peace.</h1>
      <h2>Wir rendern Architektur und Landschaften.</h2>
    </header>
    <section className="container">
      <MasonryGrid items={items as any}/>
    </section>
  </main>)
}
