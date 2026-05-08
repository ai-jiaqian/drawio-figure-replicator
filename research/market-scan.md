# Market Scan: AI + draw.io Diagram Generation

Last checked: 2026-05-08.

## Summary

There are already strong public projects around AI-generated draw.io diagrams. The most active categories are:

- official draw.io MCP and Skill + CLI tooling
- community text-to-diagram skills
- MCP servers that let agents manipulate diagrams in an editor
- programmatic libraries for generating draw.io XML

The open space is not generic diagram generation. The sharper opportunity is **reference-first figure recreation**: taking an existing image, screenshot, paper figure, or generated comp and rebuilding it as an editable `.drawio` file with native cells and reusable SVG assets.

## Comparable Projects

| Project | Positioning | Strength | Gap this project targets |
| --- | --- | --- | --- |
| [Agents365-ai/drawio-skill](https://github.com/Agents365-ai/drawio-skill) | Text-to-professional-diagrams skill | Rich presets, export flow, iterative review, broad platform messaging | Starts from natural language; reference-image faithful replication is not the primary contract |
| [jgraph/drawio-mcp](https://github.com/jgraph/drawio-mcp) | Official draw.io MCP server and Skill + CLI | Official ecosystem, MCP app server, tool server, shape search, multiple integration paths | Provides creation/rendering infrastructure; does not package a focused reference-reconstruction method |
| [lgazo/drawio-mcp-server](https://github.com/lgazo/drawio-mcp-server) | MCP server for live draw.io editing | Editor integration, import/export, layers, page management, programmatic operations | Strong control surface; requires MCP/server setup and focuses on manipulation rather than visual reconstruction from references |
| [Sujimoshi/drawio-mcp](https://github.com/Sujimoshi/drawio-mcp) | MCP tools for creating and managing diagrams | Programmatic API for shapes and connections | Generation/control focused; not a reference-image replication skill |
| draw.io built-in AI generation | Prompt-to-diagram inside the product | Low-friction generation for common diagram types | Useful for ideation; not designed as an agentic reconstruction workflow with file/folder/SVG asset contract |

## Evidence From Public Sources

- `Agents365-ai/drawio-skill` describes itself as generating `.drawio` XML from natural language, exporting to PNG/SVG/PDF, and supporting presets such as ERD, UML, sequence, architecture, ML/deep learning, and flowchart.
- The official `jgraph/drawio-mcp` repo presents four AI integration modes: MCP app server, MCP tool server, Skill + CLI, and project instructions. Its Skill + CLI path generates native `.drawio` files and can export PNG/SVG/PDF.
- `lgazo/drawio-mcp-server` emphasizes MCP-based draw.io control, including import/export, edge geometry, nested shapes, a built-in editor, and layer management.
- draw.io's AI generation documentation confirms that `.drawio` is XML and that AI systems should use uncompressed XML with the mandatory root cells, unique IDs, correct `vertex` / `edge` flags, and escaped HTML values.

## Our Differentiation

### 1. Reference-first rather than prompt-first

Existing tools mostly answer "draw a diagram from this description." This skill answers "recreate this existing figure so I can edit it."

That is a different job. It requires visual inspection, layout fingerprinting, asset triage, and preview comparison.

### 2. Faithful reconstruction contract

The skill requires the agent to preserve:

- major regions
- reading order
- node groups
- connector directions
- information density
- typography hierarchy
- repeated component grammar

This keeps the agent from replacing a reference with a generic clean diagram.

### 3. Editable-cell discipline

The quality bar explicitly rejects a pasted full-image background. Text, arrows, boxes, tables, and labels should remain editable draw.io cells.

### 4. SVG asset extraction

Reusable icons are created as standalone SVG files and documented in `SVG_ASSETS.md`. This makes diagrams easier to maintain and gives teams a reusable visual asset layer.

### 5. Export-and-compare workflow

The skill requires XML validation, PNG export, and visual comparison against the reference. This catches the practical failures that make AI-generated diagrams feel unfinished: clipped labels, floating connectors, bad spacing, missing arrowheads, and wrong panel proportions.

## Recommended Launch Angle

Lead with the pain:

> AI can make pretty diagram images. Teams need editable diagrams.

Then show before/after examples:

1. reference screenshot
2. exported PNG from generated `.drawio`
3. opened draw.io file with selectable labels, arrows, and boxes

Avoid competing head-on with broad text-to-diagram tools. The message should be narrower and stronger:

> Reference image in, editable draw.io out.

## Suggested GitHub Topics

- `drawio`
- `diagrams-net`
- `codex-skill`
- `ai-agents`
- `diagram-generation`
- `diagram-replication`
- `editable-diagrams`
- `mxgraph`
- `visual-documentation`
