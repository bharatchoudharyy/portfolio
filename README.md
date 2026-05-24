# portfolio

bharat choudhary's personal site. next.js 16, tailwind v4, motion, geist.

```bash
npm install
npm run dev      # localhost:3000
npm run build
```

## live github widget

The hero NOW widget reads from GitHub via GraphQL. Requires a token in `.env.local`:

```
GITHUB_TOKEN=ghp_...
```

Classic PAT with scopes `repo` + `read:user`. Enable "Include private contributions on my profile" at github.com/settings/profile for private commits to count.

## resume

Drop the PDF at `public/bharat-choudhary-resume.pdf`. The nav + Contact section link to `/bharat-choudhary-resume.pdf`.
