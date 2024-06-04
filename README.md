# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

```
sveltekit-tailwind-daisy-dashboard
├─ .git
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ master
│  │     └─ remotes
│  │        └─ origin
│  │           └─ HEAD
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-29bd218574f48cc19377548162d1544f10cdd6cd.idx
│  │     ├─ pack-29bd218574f48cc19377548162d1544f10cdd6cd.pack
│  │     └─ pack-29bd218574f48cc19377548162d1544f10cdd6cd.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ .svelte-kit
│  ├─ ambient.d.ts
│  ├─ generated
│  │  ├─ client
│  │  │  ├─ app.js
│  │  │  ├─ matchers.js
│  │  │  └─ nodes
│  │  │     ├─ 0.js
│  │  │     ├─ 1.js
│  │  │     ├─ 2.js
│  │  │     ├─ 3.js
│  │  │     ├─ 4.js
│  │  │     ├─ 5.js
│  │  │     ├─ 6.js
│  │  │     └─ 7.js
│  │  ├─ root.svelte
│  │  └─ server
│  │     └─ internal.js
│  ├─ non-ambient.d.ts
│  ├─ tsconfig.json
│  └─ types
│     ├─ route_meta_data.json
│     └─ src
│        └─ routes
│           ├─ $types.d.ts
│           ├─ (authentication)
│           │  ├─ login
│           │  │  └─ $types.d.ts
│           │  └─ register
│           │     └─ $types.d.ts
│           └─ (dashboard)
│              ├─ $types.d.ts
│              └─ project
│                 ├─ config
│                 │  └─ $types.d.ts
│                 ├─ create
│                 │  └─ $types.d.ts
│                 └─ style-config
│                    └─ $types.d.ts
├─ README.md
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ src
│  ├─ app.css
│  ├─ app.d.ts
│  ├─ app.html
│  ├─ hooks.server.ts
│  ├─ lib
│  │  ├─ assets
│  │  │  └─ antrein-logo.svg
│  │  ├─ components
│  │  │  ├─ Buttons.svelte
│  │  │  ├─ Navbar.svelte
│  │  │  ├─ NavbarSelectProject.svelte
│  │  │  └─ Sidebar.svelte
│  │  ├─ index.ts
│  │  └─ services
│  │     └─ auth.js
│  └─ routes
│     ├─ (authentication)
│     │  ├─ login
│     │  │  └─ +page.svelte
│     │  └─ register
│     │     └─ +page.svelte
│     └─ (dashboard)
│        ├─ +page.svelte
│        └─ project
│           ├─ config
│           │  └─ +page.svelte
│           ├─ create
│           │  └─ +page.svelte
│           └─ style-config
│              └─ +page.svelte
├─ static
│  └─ favicon.png
├─ svelte.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ vite.config.ts

```