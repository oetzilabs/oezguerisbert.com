---
title: 'Building a TUI: Why I Rewrote Everything from Scratch'
description: 'In this post, I share the journey of creating a terminal user interface (TUI) framework from scratch (by looking at the existing code at sst/opentui). I decided to improve uppon the opentui project with Effect-TS for the API. Here are the technical challenges I faced and the decisions I made'
pubDate: 'Aug 27 2025'
status: 'published'
---

PS: This project is still evolving, and I might update this post as I
discover new use cases or run into edge cases I hadn't considered.

## OpenTUI and the Need for a Rewrite

I was looking at the [OpenTUI](https://github.com/sst/opentui) project, a terminal user interface (TUI) framework written in Typescript and Zig. It was a great project that I used to learn about the inner workings of TUIs and how they could be built. However, I realized that it had too many `throw new Error()` statements, so I figured I'd try to add some safety measures, by rewriting the entire project from scratch. Crazy, I know.

## The Rewrite That Changed Everything

I decided to start from scratch. The core idea was simple: Look at the existing MIT licenced code (thanks to sst/opentui for that) and build a new framework that addressed the shortcomings I saw in the original. The rewrite involved:

1. Dependency injection for the Zig backend (one Library for ALL components, no more `new` calls)
2. TypeScript frontend with Effect for functional programming - makes the API composable and testable
3. Automatically downloading the latest version of the Zig binary and compiling the zig-files.
4. A simple Interface for creating components, handling state, and managing side effects.

## Technical Challenges That Almost Broke Me

The first major hurdle was the loops. The original code was using recursive functions to render the UI, with the addition of setTimeout and setInterval to handle animations. I wanted quick rendering, without "recursion", so I chose to use `yield* Effect.fork(renderLoop.pipe(Effect.repeat(Schedule.fixed(Duration.millis(1000 / targetFps)))))`. More on this later. In addition, I used the same technique to handle mouse and keyboard events. I had to parse the ANSI escapes codes somewhat manually, but with the help of `Schema` from `effect` is was possible, and easier to maintain.

The second challenge was the state management. I wanted to avoid using global state, so I used `Effect` to manage the state of the application. This made it easy to create components that could be reused and composed together. The state was managed using `Ref` from `effect`, which allowed me to create mutable state that could be updated in a functional way.

The third challenge was the Zig backend. I wanted to avoid using `new` calls to create instances of components, so I used dependency injection to create a single instance of the Zig backend that could be shared across all components. This made it easy to manage the lifecycle of the backend and ensured that there was only one instance of it.

## Why This Approach is Better

This approach has several advantages over the original OpenTUI project:

1. Performance: The Zig backend means we can render complex scenes at 60fps consistently. No more "stuttering" animations or "laggy" interactions.
2. If an error occurs, it will be caught and handled gracefully, rather than crashing the entire application - This is work in progress.
3. Extensibility: The modular design lets me add new features without breaking existing code.
4. Composability: The functional programming approach makes it easy to create reusable components that can be composed together to create complex UIs.

## Things I was not able to implement

I wanted to implement the `OptimizedBuffer` in such a way that it would be effect-compatible. After 3 rewrites, I gave up and decided to just use the original code, but convert the functions to use `Effect.fn` or `Effect.gen`.
Which at the end was the right call, since I still was able to dependency inject all the necessary components/libraries.

## The loops...

I am fairly new to Effect, so I had to learn a lot about it. I was not able to find a suitable way to "stream" data from the `stdin` into a way to consume it in the `Effect` loop. I ended up using this weird structure of `mailbox` and `Effect.forever` to create a loop that would read from `stdin` and send the data to the main loop.

Here is an example of how I did it:

```ts
const readData = Effect.gen(function* () {
  const mailbox = yield* Mailbox.make<Buffer>();
  const handleData = (data: Buffer) => {
    mailbox.unsafeOffer(data);
    if (isExitOnCtrlC(data.toString())) {
      mailbox.unsafeDone(Exit.void);
    }
  };
  const handleEnd = () => {
    mailbox.unsafeDone(Exit.void);
  };
  yield* Effect.addFinalizer(() =>
    Effect.sync(() => {
      stdin.off("data", handleData);
      stdin.off("end", handleEnd);
    }),
  );
  stdin.on("data", handleData);
  stdin.on("end", handleEnd);
  return mailbox as Mailbox.ReadonlyMailbox<Buffer>;
});

const mb = yield* readData;
const f = yield* mb.take.pipe(
  Effect.tap(
    Effect.fn(function* (data) {
      // process data
    }),
),
  Effect.forever,
  Effect.tapError((cause) => Ref.update(errors, (errors) => [...errors, cause])),
  Effect.retry(Schedule.recurs(10)),
  Effect.fork,
);
yield* Ref.set(terminalInputFork, f);
```

This approach is used in places, where `stdin` needs to be handled in a more functional way. 

So far, this has worked really well, but it would be great to have a way to handle the `stdin` data in a more functional way. Like a `Stream` that takes in a readable and allows me to transform it a loop via `Effect.forever` but also needs a way to "close" the stream.

Like I said I am fairly new to Effect, so I am not sure if this is possible. Perhaps someone else knows a way to do this.

## So, what did I learn?

Rewriting the OpenTUI project from scratch is a challenging but rewarding experience. By using Effect for functional programming and Zig for the backend, I am able to create a TUI framework that is performant, safe, and extensible. This approach has some advantages over the original project, and I believe it will be a great foundation for building modern terminal applications.

The project needs a little bit more work, since I am aiming to publish the repo soon. I am also still deciding of the name, since "better-opentui" sounds unserious.
