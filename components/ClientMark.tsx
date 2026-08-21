import type { Client } from '@/lib/clients';

/**
 * A client's logo when one has been supplied, otherwise a set wordmark.
 *
 * Logos are rendered monochrome (see `--logo-invert` in globals.css) so a mixed
 * bag of brand colours still reads as one row inside the black/white/red palette.
 */
export default function ClientMark({ client }: { client: Client }) {
  if (client.logo) {
    return (
      <span className="client__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={client.logo} alt={client.name} loading="lazy" />
      </span>
    );
  }
  return <span className="client__word">{client.name}</span>;
}
