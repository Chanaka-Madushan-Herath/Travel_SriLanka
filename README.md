# Ceylon Trails

A static Sri Lanka travel site: places, day-by-day trip plans, traveller notes, a contact form, a language menu (French, Spanish, English, German, Russian, Chinese, and Japanese), and a desk for editing the content. It is a Next.js frontend only. GitHub Pages hosts the exported site. There is no server.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Desk

The desk is at `/admin`.

Default password: `ceylon-admin`

Change it under Site details. The password lives in the site file, so it only keeps casual visitors out. It is not server login.

Edits are saved in this browser immediately, so you can preview them. Other people still see the published file until you export and redeploy.

A new place or trip gets its own public URL after that publish. Until then, use the preview link in the editor (`/destinations/?slug=...` or `/trips/?slug=...`).

1. In the desk, choose **Download content.ts**.
2. Replace `src/data/content.ts` with that file.
3. Commit and push to `main` or `master`.

You can also download a JSON backup and restore it with **Import JSON**, or with:

```bash
npm run apply-content -- ceylon-trails-backup.json
```

**Discard local edits** clears this browser’s preview and notes and shows the published file again.

## Contact messages

The contact form does not send email. Messages go to Firebase Firestore (free Spark plan), and you read or delete them under `/admin` → **Messages** from any device.

Without Firebase configured, messages are only saved in the visitor's own browser, so you would never see them. Set up Firebase before going live:

1. Go to <https://console.firebase.google.com>, create a project (Analytics not needed).
2. **Build → Firestore Database → Create database** (production mode, any region).
3. **Build → Authentication → Get started → Email/Password → Enable**, then **Users → Add user** with your own admin email and a strong password.
4. **Project settings → General → Your apps → Web (`</>`)**, register an app, and copy `apiKey`, `authDomain`, `projectId`, `appId`.
5. Open `firestore.rules`, replace `YOUR_ADMIN_EMAIL@example.com` with the admin email from step 3, then paste the file into **Firestore → Rules** and **Publish**.
6. In `/admin` → **Site**, fill the Firebase section with the four values and save. Then **Download content.ts**, replace `src/data/content.ts`, and redeploy (or set the same values in the file by hand).
7. In **Authentication → Settings → Authorized domains**, add your GitHub Pages domain (for example `yourname.github.io`).
8. In `/admin` → **Messages**, sign in with the admin email and password from step 3.

The Firebase config values are public by design. What protects your inbox is the rules file: the public can only create messages that pass the size checks, and only your admin account can read or delete them. Do not reuse your Firebase password anywhere else. Consider also enabling App Check or a quota alert in the Firebase console if the form is ever spammed.

## Notes (reviews)

When Firebase is configured, notes left by visitors are stored in Firestore (collection `reviews`), not in the visitor's browser. Each note starts hidden. Open `/admin` → **Notes**, sign in with the admin email, and **Approve** the ones you want on the site (or **Hide** / **Delete** them later). Approved notes appear for everyone straight away, with no redeploy. You can also add a note yourself there and it is visible immediately.

This needs the updated `firestore.rules` published (it now covers both `messages` and `reviews`). Remember to put your admin email in it.

Without Firebase, notes stay in the visitor's browser as before, and notes in `content.ts` (below the Firestore section in the Notes tab) are still published with the site file.

## GitHub Pages

1. Push this project to a GitHub repository.
2. In the repository, open Settings → Pages → Build and deployment, and set Source to **GitHub Actions**.
3. Push to `main` or `master`. The workflow in `.github/workflows/pages.yml` builds the static export and deploys it.

If the repository is named `username.github.io`, the site is served from the domain root. For any other repository name, the workflow sets the base path to `/repository-name`.

The sample phone number is a placeholder. Replace it in the desk before you publish.
