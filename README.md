## Instant Shout

Simple shout app made w/ InstantDB, Next.js, and Tailwind CSS.

[See it live](https://instant-shout.vercel.app/)

Logic is split across four files:

* `app/page.tsx` - Main logic, mostly UI with some Instant magic :)
* `lib/db.ts` -- InstantDB client setup
* `instant.schema.ts` - InstantDB schema, gives you type safety for your data!
* `instant.perms.ts` - InstantDB permissions, not required for this app, but we
  still included to show how to restrict access to your data.

## Quick start

```bash
# Clone repo and install dependencies
pnpx create-next-app instant-shout -e https://github.com/nezaj/instant-shout
cd instant-shout

# Create a new InstantDB project
pnpx instant-cli@latest login # Login to your InstantDB account
pnpx instant-cli@latest create-app # Paste your app id into env.local

# After copying the app id from the previous step into .env.local, run the
following command to push the schema and permissions to InstantDB
pnpx instant-cli@latest push

# Run the app
pnpm run dev
```

