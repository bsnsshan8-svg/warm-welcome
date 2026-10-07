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
- One shared scroll progress ref drives camera travel and chapter fades without per-frame React updates; CSS sticky sections pin chapters in document flow.
- Render module panels in a shared CSS grid cell with inactive panels hidden and inert so the tallest content determines stable tab height without hard-coded sizing or browser measurements.
- Each pinned scene renders its own inline SVG illustration driven by a per-section --p scroll variable (opacity/transform only), so scenes need no WebGL and reduced motion just shows final states.
