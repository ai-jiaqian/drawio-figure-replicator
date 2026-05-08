# SkillCircuit

High-density 2D academic-style example for modular draw.io recreation.

The reference is an original generated framework figure about closed-loop skill distillation for agent teams. It is intentionally split into seven panels so the recreation can be handled module by module instead of as one monolithic diagram.

## Files

- `reference.png`: generated reference image used as the visual target.
- `skillcircuit.drawio`: editable diagrams.net file built from native draw.io cells.
- `skillcircuit.png`: exported PNG preview from the `.drawio` file.
- `comparison.png`: side-by-side reference and draw.io export.
- `module-qa-contact-sheet.png`: stacked module-level reference/export QA crops.
- `team-execution-comparison.png`: module-level QA crop for the Team Execution panel.
- `generate_skillcircuit.mjs`: deterministic regeneration script, organized by panel functions.
- `svg/`: standalone reusable SVG icon assets.
- `SVG_ASSETS.md`: icon inventory.

## Module Strategy

The generator builds the figure in modules:

- `taskStream`
- `teamExecution`
- `traceMiner`
- `registry`
- `distillationLab`
- `deployMonitor`
- `timeline`

After the modules are placed, the script adds only the cross-panel connectors and feedback loop. This keeps large figures maintainable: a table, local workflow, or subpanel can be corrected without disturbing the rest of the canvas.

## What This Demonstrates

- Large reference figures can be decomposed into independently generated draw.io panels.
- Major shapes, tables, text, arrows, labels, rollout stages, and timeline elements remain editable.
- Reusable icons are standalone SVG assets embedded as portable data URIs.
- The output is validated through XML checks and local draw.io PNG export.

## Regenerate

```bash
node generate_skillcircuit.mjs
/Applications/draw.io.app/Contents/MacOS/draw.io -x -f png -o skillcircuit.png skillcircuit.drawio
```
