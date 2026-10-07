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
- Keep chapter content server-rendered and the R3F scene lazy-loaded after WebGL and motion checks, so fallback content and SEO never depend on graphics availability.
- One shared scroll progress ref drives camera travel and chapter fades without per-frame React updates; CSS sticky sections pin chapters in document flow.
- Build the patient-world objects procedurally as explicitly requested; cap mobile pixel ratio and cull distant stations instead of loading models or external scene assets.
- Prebundle lazy 3D dependencies with React and reject outdated optimizer requests so open previews cannot mix React module generations during dependency discovery.
- Render module panels in a shared CSS grid cell with inactive panels hidden and inert so the tallest content determines stable tab height without hard-coded sizing or browser measurements.
