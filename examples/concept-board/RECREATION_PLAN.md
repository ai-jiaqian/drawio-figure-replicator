# Recreation Plan

Reference: `reference.png`
Canvas: 1536 x 1024

## Feasibility

This reference is suitable for faithful draw.io recreation. It is mostly composed of editable diagram primitives:

- rectangular containers and cards
- grouped layer bands
- connector arrows and dashed feedback lines
- short text labels
- small generic icons
- table and matrix cells
- gauge and circular flywheel segments

No full-image embedding is required for the main diagram. The only elements that should become SVG assets are small generic icons and the segmented flywheel arrows if native draw.io arcs are too slow to reproduce cleanly.

## Suggested Split

Create four independent `.drawio` demo files rather than one giant board:

1. `research-framework.drawio`
2. `agent-platform-architecture.drawio`
3. `model-pipeline.drawio`
4. `experience-flywheel.drawio`

This keeps each example easy to inspect in GitHub and easy to edit in diagrams.net.

## Draw.io Strategy

- Use a 16:9 page for each quadrant, scaled from the original board.
- Rebuild all boxes, lanes, arrows, labels, tables, and callouts as editable `mxCell` objects.
- Use consistent font family, stroke widths, rounded corners, and accent colors across examples.
- Create `svg/` icons for database, document, graph, bot, code, chart, folder, rocket, target, and refresh symbols.
- Export PNG previews for README before publishing.

## Expected Difficulty

- Research framework: medium
- Agent platform architecture: low-medium
- Model pipeline: medium
- Experience flywheel: medium-high because of curved segmented arrows

The flywheel is the only part likely to need either SVG segments or careful draw.io arc geometry. Everything else maps cleanly to draw.io primitives.
