import { createEffect, createSignal } from "solid-js";
import { makePersisted, cookieStorage } from "@solid-primitives/storage";

export default function ThemeToggle() {
  const [theme, setTheme] = makePersisted(createSignal("light"), {
    storage: cookieStorage,
    name: "theme",
    storageOptions: {
      path: "/",
    },
  });

  const handleClick = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  createEffect(() => {
    const t = theme();
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <button
      class="flex flex-row items-center gap-2 justify-center bg-neutral-200 dark:bg-neutral-800 rounded-sm px-2 py-1.5 text-neutral-600 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
      onClick={handleClick}
    >
      {theme() === "light" ? (
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
      )}
      <span class="text-xs">{theme() === "light" ? "dark" : "light"}</span>
    </button>
  );
}
