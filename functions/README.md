# Firebase contact email

The `contact` HTTPS Function handles `/api/contact` requests from Firebase Hosting and sends them to `webarcssolutions@gmail.com`.

Before deploying, upgrade the `zalomi-dev` Firebase project to the Blaze plan and create a Google App Password for `webarcssolutions@gmail.com`. Do not use the account's normal password or put the App Password in the website source.

From the repository root, store the App Password as a Firebase secret:

```powershell
firebase functions:secrets:set SMTP_APP_PASSWORD --project zalomi-dev
```

Enter the App Password when prompted. Then build and deploy:

```powershell
npm run build:web
firebase deploy --only functions,hosting --project zalomi-dev
```

The Hosting rewrite sends `/api/contact` to the Function, so the production web build uses its own origin. Local development can continue using `EXPO_PUBLIC_API_URL=http://localhost:4000` from the root `.env.example`.
