'use client';

import { useEffect } from 'react';
import ImageCompare from '../../components/ImageCompare';
import aiItems from '../../content/ai-items.json';

export default function AIPage() {
  // Nur auf dieser Seite: SideDock blau & Logo weiß (siehe globals.css body.ai-page …)
  useEffect(() => {
    document.body.classList.add('ai-page');
    return () => document.body.classList.remove('ai-page');
  }, []);

  return (
    <main>
      <header className="header">
        <h1>Working hand in hand with AI.</h1>
      </header>

      <section className="ai-section">
        {aiItems.map((item) => (
          <div key={item.id} className="ai-row">
            <div className="ai-title">{item.title}</div>
            <div className="ai-slider">
              <ImageCompare before={item.before} after={item.after} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
