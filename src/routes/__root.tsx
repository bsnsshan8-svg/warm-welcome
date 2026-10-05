import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Scripts, createRootRouteWithContext, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import ZaadV2 from "../ZaadV2";
import appCss from "../zaad-v2.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",fontFamily:"system-ui",padding:24}}><div style={{textAlign:"center",maxWidth:520}}><h1>ZAAD couldn't load this page</h1><p>Something went wrong. Try refreshing the page.</p><button onClick={()=>{router.invalidate();reset();}}>Try again</button></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ZAAD — Patient Acquisition System for Healthcare Practices" },
      { name: "description", content: "ZAAD connects acquisition, follow-up, booking, missed-call recovery, reputation and reactivation into one patient growth system." },
      { name: "author", content: "ZAAD" },
      { property: "og:title", content: "ZAAD — Patient Acquisition System for Healthcare Practices" },
      { property: "og:description", content: "More patients. Less chaos. Build a patient flow that doesn't drop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><ZaadV2 /></QueryClientProvider>;
}
