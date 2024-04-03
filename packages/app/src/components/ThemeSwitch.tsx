import "solid-js";
import { createSignal, onMount, onCleanup } from "solid-js";

export default function ThemeButton(props: { theme: "light" | "dark" }) {
  const [t, setT] = createSignal(props.theme);
  const toggle = () => {
    const oldT = t();
    setT((t) => (t === "light" ? "dark" : "light"));
    const d = new Date();
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = `theme=${oldT === "light" ? "dark" : "light"}; path=/; ${expires}`;
    // get the html element
    const html = document.querySelector("html")!;
    // set the theme
    html.classList.toggle("dark");
  };

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      // keybind to toggle theme
      if (e.key === "x" && e.ctrlKey) {
        // set cookie
        toggle();
      }
    };
    const themeFromCookie = getCookie("theme");
    console.log({ themeFromCookie });
    if (themeFromCookie !== " " && themeFromCookie === "dark") {
      const hasDarkTheme = document.body.parentNode.classList.contains("dark");
      if (!hasDarkTheme) {
        document.body.parentNode.classList.add("dark");
      }
    }
    document.addEventListener("keydown", handler);
    onCleanup(() => {
      document.removeEventListener("keydown", handler);
    });
  });
  return (
    <button
      class="p-1.5 border border-neutral-300 dark:border-neutral-800 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none"
      onClick={() => {
        toggle();
      }}
    >
      {t() === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
          width="16"
          height="16"
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
    </button>
  );
}
