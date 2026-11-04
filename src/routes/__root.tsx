import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SocialLinks } from "@/components/social-links";
import florenceLogo from "@/assets/florence-logo.png.asset.json";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/flowers", label: "Flowers" },
  { to: "/occasions", label: "Occasions" },
  { to: "/order", label: "Order" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navList = (extraClassName: string) => (
    <ul className={`flex ${extraClassName}`}>
      {NAV_LINKS.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            onClick={() => setMenuOpen(false)}
            className={
              item.to === "/order"
                ? "inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                : "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            }
            activeProps={
              item.to === "/order"
                ? {
                    className:
                      "inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground",
                  }
                : {
                    className:
                      "inline-flex items-center rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground",
                  }
            }
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center">
          <Link to="/" aria-label="Florence Flowers — home" className="flex items-center">
            <img
              src={florenceLogo.url}
              alt="Florence Flowers"
              width={929}
              height={350}
              className="h-9 w-auto shrink-0 sm:h-11 lg:h-12"
            />
          </Link>
        </div>
        <nav aria-label="Main navigation" className="hidden shrink-0 lg:block">
          {navList("items-center gap-1")}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          {menuOpen ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <div className="px-4 py-2 sm:px-6">{navList("flex-col")}</div>
        </nav>
      ) : null}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">
            Florence Flowers · UO Group
          </p>
          <p className="mt-2 text-sm opacity-90">
            Brightening moments across Nigeria with fresh, beautiful flowers.
          </p>
          <SocialLinks className="mt-4" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Our cities
          </p>
          <p className="mt-2 text-sm opacity-90">
            Lagos · Abuja · Port Harcourt · Ibadan · Kano
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Store hours
          </p>
          <p className="mt-2 text-sm opacity-90">
            Sunday to Friday. Closed on Saturdays and Nigerian federal public
            holidays.
          </p>
          <nav aria-label="Footer navigation" className="mt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20 py-4 text-center text-xs opacity-80">
        © {new Date().getFullYear()} Florence Flowers. All rights reserved.
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Florence Flowers — Fresh Flowers for Every Occasion" },
      {
        name: "description",
        content:
          "Brightening moments across Nigeria with fresh, beautiful flowers. Order for pickup or delivery in Lagos, Abuja, Port Harcourt, Ibadan, and Kano.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Karla:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const WATSONX_CHAT_SCRIPT = `window.watsonAssistantChatOptions = {
  integrationID: "b5c9f826-e53c-4145-9cd9-ed67fef39703", // The ID of this integration.
  region: "https://integrations.eu-gb.assistant-builder.watson.appdomain.cloud", // The region your integration is hosted in.
  serviceInstanceID: "69cdb4d9-4c94-430d-bfa3-c219faaa9027", // The ID of your service instance.
  orchestrateUIAgentExtensions: false, // If you wish to enable optional UI Agent extensions.
  onLoad: async (instance) => { await instance.render(); }
};
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        {/* IBM watsonx Assistant web chat — loads once per page load and renders
            the floating chat button on every page of the site. */}
        <script
          dangerouslySetInnerHTML={{ __html: WATSONX_CHAT_SCRIPT }}
        />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col">
        <SiteNav />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
