---
name: drawio-figure-replication
description: Use when a user provides a reference image, screenshot, generated comp, academic figure, architecture diagram, workflow figure, or whiteboard photo and asks for faithful editable draw.io/diagrams.net recreation, SVG icon extraction, XML generation, or PNG export verification.
---

# Draw.io Figure Replication

## Purpose

Recreate reference figures as editable `.drawio` files, not flattened screenshots. Use draw.io primitives for frames, arrows, tables, labels, lanes, chips, progress bars, callouts, and simple shapes. Use standalone SVG assets only for reusable icons or visual symbols that are not native draw.io geometry.

This skill is reference-first. If the user asks for generic text-to-diagram creation without a reference image, use a normal diagramming workflow instead.

## Workflow

1. **Create an isolated output folder**
   - Use a new folder near the reference image, e.g. `~/Downloads/<figure-name>_recreated/`.
   - Include `svg/`, the `.drawio`, a PNG export, and `SVG_ASSETS.md`.
   - Do not overwrite user-provided source files.

2. **Inspect the reference**
   - Read exact dimensions with PIL, ImageMagick, or the available image-inspection tool.
   - Identify major regions, reading order, repeated components, colors, typography, arrows, spacing, and icon assets.
   - Write a compact layout fingerprint before generating XML: canvas size, major regions, approximate coordinates, node count, connector directions, repeated styles, and known uncertainty.
   - For dense figures, include a module map: panel names, approximate bounding boxes, internal components, incoming/outgoing connectors, and uncertainty per panel.
   - Decide which elements need standalone SVGs. Keep boxes, connectors, text, lanes, tables, pills, progress bars, and dashed callouts as editable draw.io cells.

3. **Use module-first replication for large or dense figures**
   - If the reference has multiple panels, tables, swimlanes, repeated cards, or many crossing connectors, do not build the entire figure in one pass.
   - Implement one module/panel at a time, preferably as a dedicated function per module in the XML generator.
   - For each module, first match local frame size, internal grid, labels, icons, arrows, table spacing, small legends, and state chips before moving on.
   - Export module-level QA crops or contact sheets comparing reference vs draw.io output. Treat these crops as the primary review surface; the full-diagram preview is the final integration check.
   - Add cross-module connectors only after local modules are acceptable. Keep these connectors in a final integration section so route fixes do not disturb module internals.

4. **Build required SVG assets first**
   - Save each reusable icon as a separate simple SVG under `svg/`.
   - Prefer `viewBox="0 0 256 256"`, consistent stroke widths, round caps/joins, and no unnecessary filters.
   - Do not trace protected logos or signature brand marks unless the user explicitly confirms permission.
   - Create `SVG_ASSETS.md` listing each asset, what it represents, and whether it is original, generic, or derived from the reference.

5. **Generate the `.drawio` via XML**
   - Prefer coordinate-based `mxfile` / `mxGraphModel` / `mxCell` generation over manual dragging.
   - Use uncompressed XML so the file can be inspected and debugged.
   - Embed SVG files as `shape=image` data URIs so the draw.io file is portable.
   - Keep major text, arrows, boxes, tables, and labels as editable draw.io cells.
   - Use a canvas close to the reference dimensions unless the user requests a new size.

6. **Typography and formulas**
   - Match the reference or adjacent figures. If a prior figure establishes a style, reuse that style.
   - Avoid mixed font families unless the reference clearly requires it.
   - For formulas, first try same-family text with HTML subscripts/superscripts, Greek letters, dots, and color.
   - Use true LaTeX/MathJax only when explicitly requested and the export path supports it.

7. **Validate and export**
   - Validate XML:
     ```bash
     xmllint --noout output.drawio
     ```
   - Export with local draw.io when available:
     ```bash
     /Applications/draw.io.app/Contents/MacOS/draw.io -x -f png -o output.png input.drawio
     ```
   - Treat GPU warnings as non-blocking if the command exits successfully and the output file exists.

8. **Visual-check and iterate**
   - Open or inspect the exported PNG.
   - Compare against the reference for major layout, spacing, region size, arrow routing, text hierarchy, icon placement, and clipping.
   - For dense figures, inspect both the full-diagram comparison and module-level crops/contact sheets.
   - Fix visible issues before delivering: overlapped text, clipped labels, wrong font weight, connector drift, missing arrowheads, inconsistent padding, or panel-size mismatch.

## Quality Bar

- The output is editable in draw.io; do not satisfy the task by placing the reference PNG as the whole diagram.
- SVG icons exist as standalone files only when they are semantically reusable or not native draw.io shapes.
- The exported PNG opens and has dimensions close to the reference unless a different output size was requested.
- Text does not overflow, wrap unexpectedly, or mix clashing fonts.
- Connectors visually attach to intended sources and targets.
- Dense or multi-panel figures include module-level QA crops/contact sheets, not only a full-diagram preview.
- Final response includes paths to the output folder, `.drawio`, PNG preview, SVG directory, and caveats.

## Common Mistakes

- Using the screenshot as the diagram instead of editable cells.
- Building a large multi-panel figure in one pass and only checking the final full-size preview.
- Making every tiny line an SVG; use draw.io primitives where possible.
- Skipping the layout fingerprint and producing a generic approximation.
- Overusing bold, italic, or hand-written fonts in dense technical figures.
- Mixing Times-style formulas with body text unless the reference requires it.
- Forgetting to export before claiming the file works.

See [drawio-xml-patterns.md](references/drawio-xml-patterns.md) for compact XML patterns.
