import { Btn } from '@/components/ui';

export default function NotFound() {
  return (
    <main id="main">
      <section
        className="page-hero page-hero--media"
        style={{ minHeight: '80svh', display: 'flex', alignItems: 'center' }}
      >
        <div className="page-hero__bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/work/sm-03.webp" alt="" />
        </div>
        <div className="page-hero__inner shell">
          <div className="center-stack">
            <p className="t-label t-label--red">Error 404</p>
            <h1 className="t-display">
              This one isn&rsquo;t
              <br />
              <span className="t-serif t-red">built</span> either.
            </h1>
            <p className="t-lead u-maxw-46" style={{ color: 'rgba(255,255,255,.72)' }}>
              The page you were looking for has moved or never existed. Everything else is still standing.
            </p>
            <div className="u-mt-m" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Btn href="/">Back to home</Btn>
              <Btn href="/work/" variant="ghost">
                See the work
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
