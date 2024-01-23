---
title: 'Why I moved away from NextJS'
description: 'For real: There are better options out there...'
pubDate: '01-22-2024 14:30:00 GMT+0100'
updatedDate: '01-23-2024 9:30:00 GMT+0100'
heroImage: '/22-01-2024/moved-away-from-nextjs.png'
status: 'hidden'
---

<p class="italic py-4 text-sm text-justify font-bold">Disclaimer: This is not a hate-post, I am just sharing my experience with NextJS and why I moved away from it. I am not saying that NextJS is bad, it's just not for me anymore. I am sure that there are people who love NextJS, and that is fine. I am not here to convince you to move away from it, I am just sharing my experience with it.</p>

So after years of developing with Next.JS (+React) I had made the decision to not write it anymore, unless it's paid work (even then, you have to pay me *well*, lol).

If you asked me why, I would say: It's getting *boring*, ***annoying to debug*** and mostly, the caching is just a **slap in'ya face**.

## Why is NextJS caching unconvenient?

Why in hell do I have to write these lines to opt-out of caching?

```tsx
export const dynamic = 'force-dynamic';

// or this:
fetch('https://...', { cache: 'no-store' });
```

Yep, you read right. The implementation for `fetch` has been overwritten, in NextJS. That is not only bonkers, it's also a hidden change that will turn into a footgun - sooner or later.

I get that caching can be beneficial in places where needed, but just because the triangle company has to cut costs due to high amount of network calls/request, overriding `fetch` is the worst idea.

And I am not here to start a discussion about what the best practises are with the newest version of NextJS. I am sickened of the constant (and I am not memeing here): "*Noooo*, you have to do it this way, and then do *thiiiis*, also don't forget to do *thaaat*". Seriously, why do I have to follow a specific use-case & mental model, even tho it breaks web-fundamentals? Honestly, if a framework is so opinionated that it forces you to do things in a specific way, that is either missing documentation or is just badly worded, then it's not a good framework.

### What I mean by that?

Look, when I start a fresh project, I would read the Guides/Documentation beforehand. I do that with all my projects. I first skim through their documentations, I understand it mostly and *give it a go*. Just like right now (using Astro, btw). I just read some examples and their documentation, and I am already able to write this blogpost. It took me 1 hour at most to setup the entire project, I just have to write the content and I am done.
In NextJS (Version <= 12) it was as simple as it can get. The documentation was giving the best explainations on how to use it & examples where on point.

<p class="text-center italic py-4">Question: Now what is the problem with the new Versions?</p>

The framework has been updated to a new version, a huge announcement was made, people loved it, and after that the next months turned into confusion and chaos. The documentation **was missing contextual parts** to the most important feature: Caching. So, please for the love of coding, if you update your framework/library be 99% sure that the documentation is up-to-date, **AT LAUNCH TIME**. Or even better, tell the community/developers that documentation will be going through changes. Showcasing the update as if it's complete is just misleading at best. Bringing in ***BREAKING CHANGES*** and calling them **FEATURES** is just fu\*king stupid, sorry. You literally gave developers a hidden timeb\*mb, and on top of that you are pretending that it's the right way. Instead of taking the time to tell the community: "Uhh, hey yea F'd up, we are sorry for confusion, we will add better documentation and make sure that we don't break anything in the future" - you are doubling down on your mistakes and making it worse.

I am happy and glad that representatives gave their all to make sure that the community has a good DX during this phase, but it was waaaay too late for that. The time the community had to spend on debugging and fixing their projects took months, and when the new updated documentation came out, people had clarity on what was going on. And most of them opted-out of caching, because it was just too much of a hassle to deal with it.  

Well, I most certainly had enough of it. I would kindly lay down my ticking timeb\*mb and move on, someone else can deal with it 😂. But before I move on, I want to make sure that I am not just ranting about it, but also giving a conceptional idea on how to make it better.

### So, what would I change to make it better?

Every developer loves options, and I am no different. I love to have options, and I love to have the freedom to choose what I want to use, if I need it. Caching *sounds good*, then at least let's make it possible for the developer to opt into it.

So, what I would love to see would be to go with this:

```typescript
// allowing the page to be cached by setting the `cached` property to true
// If its not present, then caching on pages will be `false` by default
export const cached: boolean | undefined = true;

// importing something like a `cached` function from the a different package that handles caching for me
import { cached } from "@nextjs/fetch";

cached('https://...') // similar to `fetch` but with caching enabled
```

Let's assume that this is implemented, what would be the benefit of this? The triangle company would have waaaaaay more time to update their documentation. They had more time to introduce caching into the framework with reasonable defaults. And most importantly: They would have more time to focus on the DX of the framework people have been benefitting from.

Now, I am sure that a lot of people have suggested this idea (or similar ways). I'll stand corrected, but I am certain that this concept will *never* be put into NextJS. *(If it does, I'll update this blogpost)*.

------

Anyways, there is another thing that I want to talk about, and that is the App-Router, with again: hidden changes.

### When Canaries are the Default (App-Router)

For the App-Router NextJS is using React's [Canary Releases (wiki)](https://en.wikipedia.org/wiki/Feature_toggle#Canary_release) as their Default. I am sure not entirely sure why, but this feels like a BAD idea. I can't figure out where this branch of development is going on the long term. I am not saying that it's a bad idea to use Canary Releases. These make sense, within the main project: React. Is it a good idea to use a `canary` version of React as the default? How can I make sure that my canary version works as intended on local development, staging, testing and production? 

Do you understand what I am trying to prevent? 

#### Debugging-Nightmares

I am not saying that it's impossible to debug, but it's just not a path that will solve issues long term. You are effectivly slowing down or even stopping any stage of development. Testing on the App-Router will be tidious, and I am not even sure if it's possible to test it at all: I heard from other developers that testing components via testing-libraries had weird bugs, and they were confused. I will not go into detail about this, because I have no experience in that field, but I am sure that you can find more information about this on the internet. Since this is more of a React issue, I will not go into detail about this...

### What will I miss from NextJS?

✨ *Nothing.* ✨

Ok ok... I know that exaggerated, maybe I will miss the good old times from **NextJS 12**, where I could add [TRPC](https://trpc.io/) to the Pages-Router, build my backend within the application and I only have to think about debugging React and their `useEffect`-hell. Those times were very nice, not gonna lie. But I am sure that I will find more joy in other frameworks, like [SolidJS](https://www.solidjs.com/).

## What is my preferred Techstack nowadays?

Speaking of, I am tinkering with SolidJS (with [`@solidjs/start`](https://www.solidjs.com/blog/introducing-solidstart), or previously: `solid-start`) for almost a year and **it just works**.

For hosting I use [SST](https://sst.dev), which makes my workflow in development and deployment extremly easy. Thanks to **SST** I don't have to rely on the hosting via the triangle company.

Databases I use [turso](https://turso.tech), via [DrizzleORM](https://orm.drizzle.team/), and all of that written in TypeScript, deployed with GitHub Actions(soon™) and hosted on [AWS](https://aws.amazon.com/).

### What is better with SolidJS?

For example if I want to change the theme on this wegpage I use this code:

```tsx
import { createSignal, onMount, onCleanup } from "solid-js";

export default function ThemeButton(props: { theme: "light" | "dark" }) {
  const [theme, setTheme] = createSignal(props.theme);

  const toggle = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    document.cookie = `theme=${props.theme === "light" ? "dark" : "light"}`;
    const html = document.querySelector("html");
    html.classList.toggle("dark");
  };

  onMount(() => {
    const handler = (e) => {
      if (e.key === "x" && e.ctrlKey) {
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => {
      document.removeEventListener("keydown", handler);
    });
  });

  return (
    <button
      class="..."
      onClick={() => {
        toggle();
      }}
    >
      {theme() === "dark" ? (
        'sun-icon'
      ) : (
        'moon-icon'
      )}
    </button>
  );
}
```

What I love about SolidJS is that I can simply use signals for states.

```tsx
const [theme, setTheme] = createSignal(props.theme);
```

This would be same in React:

```tsx
const [theme, setTheme] = useState(props.theme);
```

#### What is the difference?

React rerenders the entire Component if theme changes, in Solid it only rerenders the Component/Element that uses that Signal. 🤯 You can read more on [Reactivity in SolidJS](https://www.solidjs.com/guides/reactivity).

## How much does hosting applications cost me?

Everytime I asked how much people pay for their hosting/deployment/workflow/org they either can't answer it, or they keeping it *secret*. I am not really afraid of talking costs. I always wanted to discuss with people how much they pay for their techstack. I don't like it when people hide these from others, since any newcomer would only benefit from knowing pre-hand if it is within their budget to run **ABC** on **XYZ**, but I understand why they do it.

I host my projects on [AWS](https://aws.amazon.com/), by using [SST](https://sst.dev).

I myself have a **little budget of monthly 20€**, and after running my first project I realized that I will never reach that budged, unless traffic is purposely targetting my projects. So after a couple months (and adding more and more projects) I can say that I currently pay around **4$/mo for [some projects](/project)**. The biggest cost is actually [Route 53](https://aws.amazon.com/route53/) for the (sub)domains.
