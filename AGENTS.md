<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Landing-page controls use the shared Button's unstyled variant and size with existing page classes, preserving the brand design while sharing control semantics.
- Landing-page responsive and readability rules live in the global stylesheet; semantic journey color tokens also supply procedural scene materials.
- HomeMotion owns one client-loaded Lenis instance driven by GSAP's ticker; shared home-motion navigation resolves header-offset anchors and exact moment positions, so all home-page controls share the same scrolling behavior.
- Patient moments use a matchMedia-scoped ScrollTrigger horizontal tween with containerAnimation reveals and pin spacing on desktop; mobile snap and reduced-motion stacking share the same panels without overflow-hidden sticky ancestors.
- ClinicWeek owns its one-time intersection preview and user-controlled state locally; its fixed-track CSS timeline stays in normal flow so it cannot disturb pinned or sticky sections.
- The site mobile menu portals outside the inert main and restores focus and body position on close, so keyboard containment and background scroll locking remain accessible.
- Render module panels in a shared CSS grid cell with inactive panels hidden and inert so the tallest content determines stable tab height without hard-coded sizing or browser measurements.
- Each pinned scene renders inline SVG art with --p for reveal and --scene-drift for layered scroll travel; idle float pauses offscreen, and reduced motion shows final static states without WebGL.
- Hero camera and layer transforms read a dedicated normalized --hero-travel value from the shared scroll handler, independent of reveal timing, so zoom reverses naturally without changing other scenes.
