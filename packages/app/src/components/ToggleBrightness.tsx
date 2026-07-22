import { createEffect, createSignal } from "solid-js";
import { makePersisted, cookieStorage } from "@solid-primitives/storage";

export default function ThemeToggle() {
  const [theme, setTheme] = makePersisted(createSignal("dark"), {
    storage: cookieStorage,
    name: "theme",
    storageOptions: {
      path: "/",
    },
  });

  const handleClick = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  createEffect(() => {
    const t = theme();
    if (typeof document !== "undefined") {
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

  return (
    <button
      class="flex flex-row items-center gap-1.5 justify-center px-2 py-1 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-100"
      onClick={handleClick}
    >
      {theme() === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
      <span class="text-[10px] font-sans font-semibold uppercase tracking-[0.1em]">{theme() === "dark" ? "light" : "dark"}</span>
    </button>
  );
}
