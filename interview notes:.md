interview notes:
- how many pages do you have?
- how does it scale 
    - build time VS runtime page generation
        - callout SSG vs SSR
    - serving pages
        - SSR vs ISR (SSR w/ caching)

    - works w/ sanity
    - skims
    - work with comapnies
        - havent tested the build times
        - response time
        - pre-rendering / pre caching
        - suspense, shows 
            - waitUntil
                - instead preloading images, add to cart
                - when you add to cart, respond to the on click
                - instead of awaiting what to response with, 
            - suspense
                - 
        - build on vercel
            - connect to github, push to main
            - building static pages
                - no databaes building
                - fetches form 
            - SSR, SSG, ISR, PPR,

Next.js VS Astro VS Remix
- dynamic routes,
- tailwind
- client side routing
- static generation
    - next/link

Vercel Specific:
- waitUntil
- preview deployments
    focus on these three:
    - sanity integration
    - shopify integration
    - PPR



- Inspired by PPR talk


CSR
- renders on the client
- distribute content via a CDN
- hard to personalize
- things like layoutshift
- things like feature flags get leaked on the client and have to run there
- slower to get API requests out since they have to wait for the client to render

SSG
- static generation
- build time
- hard to personalize
- slow to generate if you have millions of pages
- allows you to show content before hydration
- distrbuted on a CDN, loads quickly globally

SSR
- server side rendering
- runtime
- easy to personalize
- slow since user has to hit serverless function 
    - database may not be distrubted
- can be expensive to server millions of requests

ISR
- incremental static regeneration
- runtime / then cached
- hard to do personalized caches
- allows you to reduce the cost of millions of requests
    - unless you need each one to be personalized
- slow initial SSR load, but can be cached very quickly

PPR
- partial pre prendering
- allows you to cache static portions of a page, and insert dynamic content
    - i.e cache the product content, and show in the navbar the auth state
- best of SSR & ISR
- extremely personalizable
- relevant static content can be served very quickly
    - user doent care about auth state as much as they do core product content
    - ie they first look at the cached product details, then navbar
- all happens in inital request
    - approaching the speed of light for request speed as there's no waterfalls on client
- allows you to show content before hydration

How developing and deploying projects with your chosen tech stack differs from other platforms or approaches
- sanity allows anyone to edit content
    - anyone can edit, edits without PRs, not just engineers 
    - thats why you picked a CMS instead of a database
- shopify
    - instead of stripe
        - after selling both, shopify has more integrations and features
        - investory management is much better on shopify
        - most people already have shopify
- chose tech that is:
    - easy to hire for
    - people are famiilar with
    - brings in non engineers