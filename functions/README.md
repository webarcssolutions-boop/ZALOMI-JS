# Firebase Hosting

The Firebase project is configured for static Hosting only. From the repository root, build and deploy with:

```powershell
npm run build:web
firebase deploy --only hosting --project zalomi-dev
```

Contact submissions and payments require a separately hosted API server. Set `EXPO_PUBLIC_API_URL` to that server's base URL before building if those features should work on the deployed site. Firebase Hosting does not deploy or route API requests.
