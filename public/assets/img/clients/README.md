# Client logos

Drop logo files here and they appear automatically — in the home marquee and in
the clients grid. No code change needed; just rebuild.

Expected filenames (from `file` in `lib/clients.ts`):

| File | Client |
|---|---|
| `runwal.svg` | Runwal Group |
| `godrej.svg` | Godrej Properties |
| `embassy.svg` | Embassy Group |
| `lt-realty.svg` | L&T Realty |
| `lulu.svg` | Lulu Group |

`.svg` is preferred; `.png` and `.webp` also work — the first match wins.

Anything without a file falls back to a set wordmark, so the section never looks
broken while logos are being collected.

**Colour does not matter.** Marks are forced to a single ink (white on dark
sections, black on light, white on red) so a mixed set still reads as one row.
Supply the plainest single-colour version you have; avoid logos with a baked-in
background box.

**Before adding these, confirm each client has agreed to be named and shown.**
Using a client's trademark as a credential usually needs their sign-off, and this
repository is public.
