# vortexconsol.com.au

Static website for **Vortex Construction Solutions Pty Ltd** (ABN 27 670 202 301),
Wentworthville NSW. Plain HTML, CSS and JavaScript — no build step, no framework,
no dependencies to keep updated.

---

## What's in here

```
├── index.html            Home
├── services.html         Residential, commercial, civil, structural & outdoor
├── projects.html         Project types + approvals & compliance
├── workforce.html        Hire a crew (builders) / Join our crew (tradespeople)
├── about.html            Company, director, values, safety & quality
├── contact.html          Enquiry form (quote, crew hire, job seeker, general)
├── privacy.html          Privacy policy
├── terms.html            Terms of use
├── 404.html              Not found
├── css/style.css         All styling. Brand colours are CSS variables at the top.
├── js/main.js            Nav, scroll reveal, form submit  ← paste your form URL here
├── assets/                Favicons, social share image (logo is inline SVG in every page)
├── apps-script/           Contact-form backend + setup guide
├── sitemap.xml            Submit this to Google Search Console
├── robots.txt
└── vercel.json            Clean URLs, redirects, cache and security headers
```

The logo is not a raster file — it's inline SVG inside the header and footer of every
page: a graphite chamfered tile with a hand-plotted teal spiral (a true Archimedean
spiral, computed point-by-point, not a stock icon), paired with real HTML text
("Vortex / Construction Solutions") so it's crisp at any size and the company name
stays selectable and indexable. If you ever want to change it, search every `.html`
file for `brand-mark` and edit the one `<svg>` block — then copy that same block into
the other pages (there's no templating engine, so each page is a real, self-contained
file).

---

## Deploying to Vercel

1. Create a new GitHub repository, e.g. `vortex-construction-solutions-website`.
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Vortex Construction Solutions website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/vortex-construction-solutions-website.git
   git push -u origin main
   ```
3. In Vercel: **Add New → Project → Import** the repo.
4. Framework preset: **Other**. Leave build command and output directory empty —
   it's a static site.
5. **Deploy.**

Every push to `main` redeploys automatically.

## Pointing the Hostinger domain at Vercel

In Vercel: **Project → Settings → Domains → Add** `vortexconsol.com.au`, then add
`www.vortexconsol.com.au` as well. Vercel will show you the records to create.

In Hostinger: **Domains → vortexconsol.com.au → DNS / Nameservers → DNS records**:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Use whatever values Vercel displays — they occasionally change. Delete any
conflicting existing A or CNAME records for `@` and `www`. DNS usually takes
15–60 minutes; the SSL certificate is issued automatically and free.

Set `www.vortexconsol.com.au` as the primary domain in Vercel so it matches the
canonical URLs already in the HTML.

## Connecting the contact form

See **`apps-script/SETUP.md`**. Short version: create a Google Sheet, paste
`apps-script/Code.gs` into script.google.com, deploy as a web app with access set
to *Anyone*, then paste the resulting URL into line 10 of `js/main.js`.

Until you do that, the form shows a message saying it isn't connected yet. You can
set this up today with your personal Gmail and switch the notification address to
`admin@vortexconsol.com.au` once Google Workspace is active on the domain — just
change `NOTIFY_TO` in `apps-script/Code.gs` and redeploy the Apps Script version.

---

## SEO — everything here is free

Already built in:

- Unique title and meta description on every page
- Canonical URLs, Open Graph and Twitter card tags
- JSON-LD structured data (`GeneralContractor` + `HomeAndConstructionBusiness`, with
  your ABN, address, opening hours and service areas), plus breadcrumbs on inner pages
- Semantic headings, one `<h1>` per page, descriptive link text
- `sitemap.xml` and `robots.txt`
- Fast: no framework, no tracking scripts, cached assets

### What to do after launch

1. **Google Search Console** (free) — <https://search.google.com/search-console>.
   Verify the domain, then submit `https://www.vortexconsol.com.au/sitemap.xml`.
2. **Bing Webmaster Tools** (free) — <https://www.bing.com/webmasters>. You can
   import straight from Search Console.
3. **Google Business Profile** (free) — <https://business.google.com>. For a local
   building business this moves the needle more than anything on the website. Use
   the exact same business name, address and phone number as the footer here.
4. **Free local directories** — True Local, Yellow Pages free listing, Hotfrog,
   Oneflare, hipages (worth a paid profile too, once you're busy).
5. **PageSpeed Insights** (free) — <https://pagespeed.web.dev>. This site should
   score well out of the box; check again once you add real project photos.

### Keywords the pages already target

`builders Wentworthville`, `construction company Parramatta`, `commercial fit-outs
Western Sydney`, `civil works Sydney`, `construction labour hire Sydney`,
`home renovations Greater Western Sydney`.

---

## Adding photos

The design works without photography, which is why it currently ships without any.
When you have real project photos:

1. Drop them in `assets/` as `.webp` or `.jpg`, around 1600px wide, under 300KB.
2. Add them to a section, e.g. inside `index.html`:
   ```html
   <img src="/assets/fitout-parramatta.jpg" alt="Completed office fit-out, Parramatta"
        width="1600" height="900" loading="lazy" class="chamfer">
   ```

Use your own photos of real completed work. Stock images of staged interiors read
as fake to anyone shopping around, and licensed stock has its own costs and
restrictions.

---

## Changing brand colours

Everything derives from CSS variables at the top of `css/style.css`:

```css
--teal:     #0E7C86;   /* accent */
--graphite: #1E2328;   /* ink */
--paper:    #F7F9F9;   /* background */
```

Change those three and the whole site follows — buttons, links, the logo mark, the
hero pattern and the footer all read from them.

---

## Before you go live — checklist

- [ ] Apps Script URL pasted into `js/main.js`
- [ ] Test enquiry submitted, row appears in the Sheet, emails arrive
- [ ] Google Workspace set up for `vortexconsol.com.au`, then switch `admin@` over
      in `apps-script/Code.gs`
- [ ] Domain connected in Vercel, `www` set as primary, HTTPS working
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile created and verified
- [ ] Privacy policy and terms reviewed by a lawyer (they're templates, not advice)
- [ ] Footer disclaimer reviewed by a lawyer
- [ ] Business details double-checked: ABN 27 670 202 301, 0426 833 505,
      Unit 8, 34 Lansdowne Street, Wentworthville NSW 2145
