# Connecting the contact form (free — no paid service needed)

The enquiry form posts to a Google Apps Script web app. It runs on a normal free
Google account, writes every enquiry to a Google Sheet, emails you, and sends the
enquirer a confirmation.

Budget for about ten minutes. You can do this with your personal Gmail today and
switch the `NOTIFY_TO` address to `admin@vortexconsol.com.au` once Google
Workspace for the domain is live — just change `NOTIFY_TO` in `Code.gs` and
redeploy.

---

## 1. Create the Google Sheet

1. Go to <https://sheets.new> and give it a name, e.g. **Vortex — Website Enquiries**.
2. Copy the **Sheet ID** out of the URL. It's the long string between `/d/` and `/edit`:

   ```
   https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890/edit
                                          └──────────── this bit ─────────────┘
   ```

You don't need to add headers — the script creates them on the first submission.

## 2. Create the Apps Script project

1. Go to <https://script.google.com> → **New project**.
2. Delete the sample `function myFunction() {}`.
3. Paste in the whole contents of `Code.gs` from this folder.
4. At the top of the file, replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the Sheet ID
   from step 1.
5. Rename the project (top left) to **Vortex Enquiry Form** and save.

## 3. Deploy it as a web app

1. **Deploy** → **New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Set:
   - **Description:** `Vortex enquiry form v1`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← this must be *Anyone*, not "Anyone with Google account"
4. **Deploy**. Google will ask you to authorise it — click through
   **Advanced → Go to Vortex Enquiry Form (unsafe)** and **Allow**. That warning appears
   because the script is unpublished and yours; it's expected.
5. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb.................../exec
   ```

## 4. Point the website at it

Open `js/main.js` and replace the placeholder on line 10:

```js
const FORM_ENDPOINT = "https://script.google.com/macros/s/YOUR_REAL_ID_HERE/exec";
```

Commit, push, and Vercel redeploys automatically.

## 5. Test it

- Open the web app URL directly in a browser. You should see
  `{"status":"ok","message":"Vortex Construction Solutions enquiry endpoint is live."}`
- Submit the form on `/contact`. Check that a row lands in the Sheet and that the
  notification and confirmation emails both arrive.

---

## When you change `Code.gs` later

Apps Script keeps serving the old version until you redeploy:
**Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**
The URL stays the same.

## Free-tier limits

A free Gmail account allows around **100 emails per day** from Apps Script. Each
enquiry sends two (one to you, one confirmation), so roughly 50 enquiries a day.
Rows written to the Sheet are unlimited. Once `admin@vortexconsol.com.au` is a
Google Workspace mailbox, that raises the limit to about 1,500 a day.

## Troubleshooting

| What you see | Cause | Fix |
|---|---|---|
| Form says "didn't send" | Access isn't set to **Anyone** | Redeploy with the correct access setting |
| Nothing in the Sheet | Wrong Sheet ID | Recheck the ID in `Code.gs` |
| No emails arriving | Daily quota hit, or in spam | Check the Apps Script **Executions** log |
| Works locally, not live | Old deployment still serving | Deploy a **new version**, not a new deployment |
| "Form isn't connected yet" | Placeholder still in `js/main.js` | Complete step 4 |

## Spam

The form carries a hidden honeypot field (`company_website`). Bots fill it, people
don't, and anything with it filled is silently discarded. That handles most of it.
If spam still gets through, add Cloudflare Turnstile — it's free.
