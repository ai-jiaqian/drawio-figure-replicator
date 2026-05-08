# ContextForge

High-density academic-style example for reference-first draw.io recreation.

The reference is an original generated 2D framework figure, designed to stress the skill in the areas that matter for public demos: multi-panel layout, dense tables, routed arrows, reusable icons, status legends, and small labels.

## Files

- `reference.png`: generated reference image used as the visual contract.
- `contextforge.drawio`: editable diagrams.net file built from native draw.io cells.
- `contextforge.png`: exported PNG preview from the `.drawio` file.
- `comparison.png`: side-by-side reference and draw.io export.
- `generate_contextforge.mjs`: deterministic regeneration script.
- `svg/`: standalone reusable SVG icon assets.
- `SVG_ASSETS.md`: icon inventory.

## What This Demonstrates

- The output is not a flattened screenshot; major boxes, tables, text, arrows, labels, and legends are editable draw.io cells.
- Reusable icons are simple standalone SVG assets and are embedded into the draw.io XML as portable data URIs.
- The example uses a 1536 x 1024 canvas to preserve the reference aspect ratio and density.
- The exported PNG is validated through local draw.io export and XML validation.

## Regenerate

```bash
node generate_contextforge.mjs
/Applications/draw.io.app/Contents/MacOS/draw.io -x -f png -o contextforge.png contextforge.drawio
```
