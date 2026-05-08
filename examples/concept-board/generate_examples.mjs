import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const PAGE_W = 1280;
const PAGE_H = 720;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function svgData(svg) {
  return encodeURIComponent(svg)
    .replaceAll("'", "%27")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29");
}

function makeIcon(name, color = "#163A5F") {
  const stroke = color;
  const fill = "none";
  const common = `fill="${fill}" stroke="${stroke}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"`;
  const filled = `fill="${color}" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`;
  const icons = {
    database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><ellipse cx="128" cy="56" rx="76" ry="30" ${common}/><path d="M52 56v104c0 17 34 30 76 30s76-13 76-30V56" ${common}/><path d="M52 108c0 17 34 30 76 30s76-13 76-30" ${common}/></svg>`,
    document: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M72 28h78l42 42v158H72z" ${common}/><path d="M150 30v42h42M96 116h72M96 150h72M96 184h48" ${common}/></svg>`,
    graph: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="60" cy="182" r="19" ${common}/><circle cx="122" cy="74" r="19" ${common}/><circle cx="198" cy="154" r="19" ${common}/><path d="M70 166l42-74M137 88l47 50M78 184l101-26" ${common}/></svg>`,
    bot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="50" y="78" width="156" height="112" rx="24" ${common}/><path d="M128 42v36M92 118h.1M164 118h.1M96 154h64" ${common}/><rect x="24" y="118" width="26" height="52" rx="10" ${common}/><rect x="206" y="118" width="26" height="52" rx="10" ${common}/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M94 68L42 128l52 60M162 68l52 60-52 60M142 48l-28 160" ${common}/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M48 214h160M68 214v-70M116 214V86M164 214v-118M204 214V52" ${common}/></svg>`,
    folder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M30 84h78l24 28h94v98H30z" ${common}/><path d="M30 84v-28h74l22 28" ${common}/></svg>`,
    rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M138 48c36-20 66-18 70-14 4 4 6 34-14 70l-70 70-44 8 8-44z" ${common}/><circle cx="166" cy="76" r="16" ${common}/><path d="M84 142l-30 10 50 50 10-30M74 188l-28 28" ${common}/></svg>`,
    target: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="86" ${common}/><circle cx="128" cy="128" r="48" ${common}/><circle cx="128" cy="128" r="10" ${filled}/><path d="M184 72l32-32M184 40h32v32" ${common}/></svg>`,
    refresh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M202 100a76 76 0 0 0-136-32L46 94M54 156a76 76 0 0 0 136 32l20-26" ${common}/><path d="M46 52v42h42M210 204v-42h-42" ${common}/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128 28l78 30v62c0 52-32 86-78 108-46-22-78-56-78-108V58z" ${common}/><path d="M92 128l24 24 52-56" ${common}/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="108" cy="108" r="58" ${common}/><path d="M150 150l56 56" ${common}/></svg>`,
    cloud: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M78 186h112c28 0 48-18 48-44 0-25-20-44-46-44h-4c-8-34-34-56-68-56-38 0-68 30-68 68v2c-22 5-38 20-38 38 0 22 22 36 64 36z" ${common}/><path d="M128 88v70M96 126l32-36 32 36" ${common}/></svg>`,
    brain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M96 46c-28 0-50 22-50 50 0 8 2 16 6 22-14 10-22 26-22 44 0 28 22 50 50 50 18 0 34-10 42-24 8 14 24 24 42 24 28 0 50-22 50-50 0-18-8-34-22-44 4-6 6-14 6-22 0-28-22-50-50-50-14 0-26 6-36 16-4-10-10-16-16-16z" ${common}/><path d="M122 64v124M82 112h40M122 144h50" ${common}/></svg>`,
    filter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M42 54h172l-68 78v58l-36 20v-78z" ${common}/></svg>`,
    trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M86 42h84v50c0 34-18 60-42 60s-42-26-42-60z" ${common}/><path d="M86 62H46v22c0 26 20 48 48 52M170 62h40v22c0 26-20 48-48 52M128 152v36M92 216h72M108 188h40" ${common}/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="84" r="42" ${common}/><path d="M50 214c12-48 44-72 78-72s66 24 78 72" ${common}/></svg>`,
    app: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="44" y="44" width="168" height="168" rx="24" ${common}/><path d="M92 44v168M44 92h168M44 164h168M164 44v168" ${common}/></svg>`,
    tools: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M92 58l106 106-34 34L58 92z" ${common}/><path d="M158 72l26-26 26 26-26 26M64 178l-28 28M52 166l38 38" ${common}/></svg>`
  };
  return icons[name] ?? icons.document;
}

function makeGaugeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 145">
  <path d="M28 112 A82 82 0 0 1 72 40" fill="none" stroke="#F0645A" stroke-width="21" stroke-linecap="butt"/>
  <path d="M76 38 A82 82 0 0 1 110 28" fill="none" stroke="#F1BA46" stroke-width="21" stroke-linecap="butt"/>
  <path d="M114 28 A82 82 0 0 1 192 112" fill="none" stroke="#54B978" stroke-width="21" stroke-linecap="butt"/>
  <line x1="110" y1="112" x2="174" y2="66" stroke="#1D3148" stroke-width="7" stroke-linecap="round"/>
  <circle cx="110" cy="112" r="7" fill="#1D3148"/>
  <polygon points="174,66 154,72 166,88" fill="#1D3148"/>
</svg>`;
}

function writeSvgAssets(dir, names) {
  ensureDir(path.join(dir, "svg"));
  const lines = ["# SVG Assets", "", "| Asset | Meaning |", "| --- | --- |"];
  for (const [name, meaning, color = "#163A5F"] of names) {
    fs.writeFileSync(path.join(dir, "svg", `${name}.svg`), makeIcon(name, color));
    lines.push(`| \`svg/${name}.svg\` | ${meaning} |`);
  }
  fs.writeFileSync(path.join(dir, "SVG_ASSETS.md"), `${lines.join("\n")}\n`);
}

class Diagram {
  constructor(title, idPrefix, pageW = PAGE_W, pageH = PAGE_H) {
    this.title = title;
    this.idPrefix = idPrefix;
    this.pageW = pageW;
    this.pageH = pageH;
    this.cells = [];
    this.i = 1;
  }
  id(prefix) {
    return `${this.idPrefix}-${prefix}-${this.i++}`;
  }
  addCell(xml) {
    this.cells.push(xml);
  }
  rect({ id, x, y, w, h, value = "", fill = "#FFFFFF", stroke = "#2A5CAA", sw = 1.6, r = 1, font = 16, color = "#172033", align = "center", valign = "middle", extra = "" }) {
    const cellId = id ?? this.id("rect");
    const style = `rounded=${r};whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=${color};align=${align};verticalAlign=${valign};spacing=8;${extra}`;
    this.addCell(`<mxCell id="${cellId}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return cellId;
  }
  text({ id, x, y, w, h, value, font = 18, color = "#172033", align = "center", bold = false, extra = "" }) {
    const cellId = id ?? this.id("text");
    const style = `text;html=1;strokeColor=none;fillColor=none;align=${align};verticalAlign=middle;fontFamily=Arial;fontSize=${font};fontColor=${color};fontStyle=${bold ? 1 : 0};spacing=2;${extra}`;
    this.addCell(`<mxCell id="${cellId}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return cellId;
  }
  icon({ id, name, x, y, size = 42, color = "#163A5F" }) {
    const cellId = id ?? this.id("icon");
    const style = `shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;image=data:image/svg+xml,${svgData(makeIcon(name, color))};`;
    this.addCell(`<mxCell id="${cellId}" value="" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${size}" height="${size}" as="geometry"/></mxCell>`);
    return cellId;
  }
  svgImage({ id, svg, x, y, w, h }) {
    const cellId = id ?? this.id("svg");
    const style = `shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;image=data:image/svg+xml,${svgData(svg)};`;
    this.addCell(`<mxCell id="${cellId}" value="" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return cellId;
  }
  ellipse({ id, x, y, w, h, value = "", fill = "#FFFFFF", stroke = "#2A5CAA", sw = 1.6, font = 15, color = "#172033", extra = "" }) {
    const cellId = id ?? this.id("ellipse");
    const style = `ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=${color};align=center;verticalAlign=middle;spacing=6;${extra}`;
    this.addCell(`<mxCell id="${cellId}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return cellId;
  }
  edge({ id, sx, sy, tx, ty, points = [], color = "#172033", sw = 2, dashed = false, arrow = "classic", curved = false }) {
    const cellId = id ?? this.id("edge");
    const pts = points.length ? `<Array as="points">${points.map((p) => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const style = `endArrow=${arrow};html=1;rounded=${curved ? 1 : 0};strokeColor=${color};strokeWidth=${sw};endFill=1;dashed=${dashed ? 1 : 0};`;
    this.addCell(`<mxCell id="${cellId}" value="" style="${style}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${sx}" y="${sy}" as="sourcePoint"/><mxPoint x="${tx}" y="${ty}" as="targetPoint"/>${pts}</mxGeometry></mxCell>`);
    return cellId;
  }
  table({ x, y, w, h, rows, cols, values = [], fill = "#FFFFFF", stroke = "#91A4BC", headerFill = "#EAF2FF", font = 13 }) {
    const cw = w / cols;
    const rh = h / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = values[r]?.[c] ?? "";
        this.rect({
          x: x + c * cw,
          y: y + r * rh,
          w: cw,
          h: rh,
          value: v,
          fill: r === 0 ? headerFill : fill,
          stroke,
          sw: 1,
          r: 0,
          font,
          color: "#21344D"
        });
      }
    }
  }
  xml() {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="Electron" pages="1">\n  <diagram name="${esc(this.title)}" id="${this.idPrefix}">\n    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${this.pageW}" pageHeight="${this.pageH}" math="0" shadow="0">\n      <root>\n        <mxCell id="0"/>\n        <mxCell id="1" parent="0"/>\n        ${this.cells.join("\n        ")}\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>\n`;
  }
}

function baseTitle(d, title) {
  d.rect({ x: 0, y: 0, w: PAGE_W, h: PAGE_H, fill: "#FFFFFF", stroke: "#FFFFFF", sw: 0, r: 0 });
  d.text({ x: 40, y: 22, w: 1200, h: 42, value: title, font: 28, bold: true });
}

function chip(d, x, y, w, label, fill = "#F6FAFF", stroke = "#A9C5EA") {
  return d.rect({ x, y, w, h: 32, value: label, fill, stroke, sw: 1.2, r: 1, font: 13, color: "#17375E" });
}

function makeResearchFramework(outDir) {
  const d = new Diagram("Research Framework", "research-framework");
  baseTitle(d, "Research Framework");

  d.rect({ x: 42, y: 105, w: 180, h: 360, value: "", fill: "#F8FAFC", stroke: "#9AAEC4", font: 15 });
  d.text({ x: 62, y: 124, w: 140, h: 28, value: "<b>Input Datasets</b>", font: 15 });
  d.icon({ name: "database", x: 96, y: 154, size: 62, color: "#42566B" });
  ["Documents", "Tables", "Code", "Knowledge Graphs", "Logs"].forEach((t, idx) => {
    d.icon({ name: idx === 3 ? "graph" : idx === 1 ? "app" : "document", x: 66, y: 242 + idx * 38, size: 22, color: "#42566B" });
    d.text({ x: 96, y: 239 + idx * 38, w: 90, h: 26, value: t, font: 12, align: "left" });
  });

  d.rect({ x: 284, y: 96, w: 220, h: 128, value: "<b>Representation Layer</b><br><br>Encoder / Embedder", fill: "#EDF5FF", stroke: "#5488CF", font: 14, color: "#17375E" });
  for (let i = 0; i < 6; i++) d.rect({ x: 308 + i * 30, y: 172, w: 22, h: 22, fill: i < 5 ? "#6EA3DD" : "#F8FAFC", stroke: "#5488CF", r: 0, value: i === 5 ? "..." : "", font: 11 });
  d.rect({ x: 284, y: 244, w: 220, h: 190, value: "<b>Multi-Granular<br>Representations</b>", fill: "#F4F9FF", stroke: "#5488CF", font: 14, color: "#17375E" });
  ["Token", "Span", "Sentence", "Document", "Graph Subgraph"].forEach((t, idx) => chip(d, 302, 292 + idx * 32, 184, t));
  d.icon({ name: "graph", x: 358, y: 400, size: 58, color: "#5B7CB9" });

  d.rect({ x: 602, y: 96, w: 220, h: 368, value: "<b>Reasoning Module</b>", fill: "#F3F8EE", stroke: "#7D9E6E", font: 15, color: "#233B25" });
  d.rect({ x: 630, y: 150, w: 164, h: 234, value: "Reasoning Blocks × L", fill: "#FFFFFF", stroke: "#9AAD91", font: 13, color: "#233B25" });
  ["Self-Attention", "Cross-Attention", "FFN"].forEach((t, idx) => d.rect({ x: 654, y: 205 + idx * 70, w: 116, h: 38, value: t, fill: "#EAF4E2", stroke: "#7D9E6E", font: 13, color: "#233B25" }));
  d.ellipse({ x: 704, y: 172, w: 28, h: 28, value: "+", fill: "#FFFFFF", stroke: "#7D9E6E", font: 16 });
  d.ellipse({ x: 704, y: 252, w: 28, h: 28, value: "+", fill: "#FFFFFF", stroke: "#7D9E6E", font: 16 });
  d.rect({ x: 648, y: 404, w: 128, h: 38, value: "Thought / Plan", fill: "#F8FBF5", stroke: "#9AAD91", font: 13 });

  d.rect({ x: 882, y: 105, w: 142, h: 320, value: "<b>Evaluation</b>", fill: "#FFF8EA", stroke: "#D99A20", font: 15, color: "#5B3A00" });
  ["Answer Quality<br>(EM, F1)", "Faithfulness<br>(Attribution)", "Robustness<br>(Noise, OOD)", "Efficiency<br>(Time, Tokens)"].forEach((t, idx) => d.rect({ x: 904, y: 168 + idx * 58, w: 98, h: 42, value: t, fill: "#FFFDF7", stroke: "#D9A742", font: 11, color: "#3D2A00" }));

  d.rect({ x: 1090, y: 126, w: 145, h: 300, value: "<b>Results</b>", fill: "#F2F7FF", stroke: "#5488CF", font: 15, color: "#17375E" });
  d.icon({ name: "trophy", x: 1132, y: 178, size: 56, color: "#243B5A" });
  d.text({ x: 1112, y: 236, w: 100, h: 24, value: "Final Output", font: 12 });
  d.icon({ name: "chart", x: 1132, y: 278, size: 54, color: "#3B6BA5" });
  d.text({ x: 1118, y: 334, w: 90, h: 24, value: "Scorecard", font: 12 });
  for (let i = 0; i < 5; i++) {
    d.edge({ sx: 1118, sy: 370 + i * 18, tx: 1178, ty: 370 + i * 18, arrow: "none", color: "#8AA7CA", sw: 1.4 });
    d.text({ x: 1190, y: 358 + i * 18, w: 24, h: 18, value: "✓", font: 16, color: "#0D8F70" });
  }

  d.edge({ sx: 222, sy: 286, tx: 284, ty: 160 });
  d.edge({ sx: 504, sy: 160, tx: 602, ty: 190 });
  d.edge({ sx: 822, sy: 218, tx: 882, ty: 226 });
  d.edge({ sx: 1024, sy: 266, tx: 1090, ty: 276 });
  for (let i = 0; i < 5; i++) {
    d.edge({ sx: 504, sy: 308 + i * 26, tx: 602, ty: 222 + i * 32, color: "#5B83C0", dashed: true, sw: 1.3, points: [[552, 320 + i * 15]] });
  }
  d.edge({ sx: 1132, sy: 426, tx: 130, ty: 466, points: [[1132, 574], [130, 574]], dashed: true, color: "#E75C55", sw: 1.6 });
  d.rect({ x: 456, y: 548, w: 312, h: 42, value: "<b>Feedback Loop</b><br>Error Analysis • Data Augmentation • Hard Example Mining", fill: "#FFF9F8", stroke: "#E75C55", font: 11, color: "#B72E27" });

  fs.writeFileSync(path.join(outDir, "research-framework.drawio"), d.xml());
  writeSvgAssets(outDir, [["database", "Input dataset store"], ["document", "Documents and logs"], ["graph", "Knowledge graph / graph subgraph"], ["trophy", "Evaluation result"], ["chart", "Scorecard chart"]]);
}

function makeAgentPlatform(outDir) {
  const d = new Diagram("Agent Platform Architecture", "agent-platform");
  baseTitle(d, "Agent Platform Architecture");
  const leftLabels = [
    ["1. Interface<br>Layer", "#193B59"],
    ["2. Orchestration<br>Layer", "#0E7E84"],
    ["3. Execution<br>Layer", "#193B59"]
  ];
  leftLabels.forEach(([label, fill], idx) => d.rect({ x: 36, y: 92 + idx * 204, w: 142, h: 118, value: `<b>${label}</b>`, fill, stroke: fill, font: 16, color: "#FFFFFF" }));
  d.rect({ x: 218, y: 92, w: 1018, h: 108, fill: "#F7FBFF", stroke: "#4386D8", value: "" });
  const channels = [["app", "Web App"], ["document", "Mobile App"], ["bot", "Chat / Voice"], ["app", "Enterprise Apps"], ["code", "APIs / SDKs"]];
  channels.forEach(([icon, label], i) => {
    const x = 250 + i * 192;
    d.rect({ x, y: 116, w: 142, h: 56, value: label, fill: "#FFFFFF", stroke: "#4386D8", font: 13, color: "#122A44", align: "left", extra: "spacingLeft=52;" });
    d.icon({ name: icon, x: x + 16, y: 126, size: 34, color: "#164F92" });
  });
  d.rect({ x: 218, y: 220, w: 1018, h: 50, value: "API Gateway &amp; Authentication", fill: "#F8FBFF", stroke: "#4386D8", font: 16, color: "#163A5F" });
  d.icon({ name: "shield", x: 560, y: 231, size: 28, color: "#164F92" });
  channels.forEach((_, i) => d.edge({ sx: 321 + i * 192, sy: 172, tx: 321 + i * 192, ty: 220, sw: 1.6 }));

  d.rect({ x: 218, y: 292, w: 1018, h: 222, fill: "#F5FCFC", stroke: "#4AA1A8", value: "" });
  const modules = [["app", "Orchestrator<br><span style='font-size:11px'>Session Mgmt<br>Policy • Guardrails</span>"], ["document", "Planner<br><span style='font-size:11px'>Task Decomposition<br>Plan &amp; Re-plan</span>"], ["tools", "Tool Router<br><span style='font-size:11px'>Select Tools<br>Rank &amp; Route</span>"]];
  modules.forEach(([icon, label], i) => {
    const x = 280 + i * 298;
    d.rect({ x, y: 320, w: 230, h: 72, value: label, fill: "#FFFFFF", stroke: "#4AA1A8", font: 14, color: "#153943", align: "left", extra: "spacingLeft=68;" });
    d.icon({ name: icon, x: x + 22, y: 336, size: 38, color: "#153943" });
  });
  d.edge({ sx: 510, sy: 356, tx: 578, ty: 356, arrow: "classic", sw: 1.7 });
  d.edge({ sx: 808, sy: 356, tx: 876, ty: 356, arrow: "classic", sw: 1.7 });
  d.rect({ x: 260, y: 424, w: 900, h: 66, value: "<b>Multi-Agent Workers</b>", fill: "#FBFEFF", stroke: "#7ABBC1", font: 15, color: "#153943", extra: "dashed=1;" });
  [["bot", "Research Agent"], ["code", "Coder Agent"], ["chart", "Analyst Agent"]].forEach(([icon, label], i) => {
    const x = 320 + i * 240;
    d.rect({ x, y: 452, w: 170, h: 36, value: label, fill: "#FFFFFF", stroke: "#7ABBC1", font: 12, color: "#153943", align: "left", extra: "spacingLeft=42;" });
    d.icon({ name: icon, x: x + 14, y: 458, size: 24, color: "#153943" });
  });
  d.text({ x: 1065, y: 452, w: 40, h: 36, value: "•••", font: 24, color: "#153943" });
  d.edge({ sx: 395, sy: 392, tx: 395, ty: 424, arrow: "classic", dashed: true, sw: 1.5, color: "#4AA1A8" });
  d.edge({ sx: 694, sy: 392, tx: 694, ty: 424, arrow: "classic", dashed: true, sw: 1.5, color: "#4AA1A8" });
  d.edge({ sx: 985, sy: 392, tx: 985, ty: 424, arrow: "classic", dashed: true, sw: 1.5, color: "#4AA1A8" });

  d.rect({ x: 218, y: 540, w: 1018, h: 106, fill: "#F7FBFF", stroke: "#4386D8", value: "" });
  const stores = [["database", "Knowledge Store<br><span style='font-size:11px'>(RDBMS / Docs)</span>"], ["graph", "Vector Memory<br><span style='font-size:11px'>(Embeddings)</span>"], ["graph", "Graph Memory<br><span style='font-size:11px'>(Knowledge Graph)</span>"], ["document", "Audit Logs<br><span style='font-size:11px'>&amp; Traces</span>"], ["tools", "External Tools<br><span style='font-size:11px'>&amp; Services</span>"]];
  stores.forEach(([icon, label], i) => {
    const x = 250 + i * 192;
    d.rect({ x, y: 568, w: 148, h: 56, value: label, fill: "#FFFFFF", stroke: "#4386D8", font: 11, color: "#122A44", align: "left", extra: "spacingLeft=48;" });
    d.icon({ name: icon, x: x + 12, y: 580, size: 32, color: "#164F92" });
    d.edge({ sx: x + 74, sy: 540, tx: x + 74, ty: 514, sw: 1.5 });
  });
  d.edge({ sx: 727, sy: 270, tx: 727, ty: 292, sw: 1.6 });
  fs.writeFileSync(path.join(outDir, "agent-platform-architecture.drawio"), d.xml());
  writeSvgAssets(outDir, [["app", "Application channel"], ["document", "Document or mobile endpoint"], ["bot", "Agent worker"], ["code", "Code or API"], ["shield", "Authentication and guardrails"], ["tools", "Tool router / external tools"], ["database", "Knowledge store"], ["graph", "Memory graph"], ["chart", "Analyst output"]]);
}

function makeModelPipeline(outDir) {
  const d = new Diagram("Model Pipeline", "model-pipeline", 768, 512);
  d.rect({ x: 0, y: 0, w: 768, h: 512, fill: "#FFFFFF", stroke: "#CAD3DE", sw: 1, r: 0 });
  d.text({ x: 0, y: 6, w: 768, h: 32, value: "<b>3. Model Pipeline</b>", font: 22, color: "#172033" });

  const cardY = 45;
  const cardW = 86;
  const cardH = 197;
  const xs = [28, 139, 255, 366, 467, 569, 679];
  const topCards = [
    { title: "1. Ingestion", icon: "cloud", body: "Raw Data<br>(Sources)", extras: "sources" },
    { title: "2. Preprocessing", icon: "filter", body: "Clean • Chunk • Tag", extras: "checklines" },
    { title: "3. Embedding", icon: "graph", body: "Embed<br>(High-Dimensional)", extras: "vectors", color: "#5F58D6" },
    { title: "4. Retrieval", icon: "search", body: "Top-K<br>Relevant Context", extras: "rank" },
    { title: "5. Inference", icon: "brain", body: "LLM / Model<br>Generate", extras: "cubes" },
    { title: "6. Verifier", icon: "shield", body: "Verify &amp; Score<br>(Guardrails)", extras: "verify" },
    { title: "7. Output", icon: "document", body: "Final Answer<br>+ Sources", extras: "output" }
  ];

  topCards.forEach((card, i) => {
    const x = xs[i];
    const color = card.color ?? "#163A5F";
    d.rect({ x, y: cardY, w: cardW, h: cardH, value: "", fill: "#F9FBFE", stroke: "#9AAEC4", sw: 1.15, r: 1 });
    d.text({ x: x + 8, y: cardY + 12, w: cardW - 16, h: 16, value: `<b>${card.title}</b>`, font: 8.5, color: "#153A6A" });
    d.icon({ name: card.icon, x: x + 25, y: cardY + 42, size: 38, color });
    d.text({ x: x + 7, y: cardY + 93, w: cardW - 14, h: 30, value: card.body, font: 8.5, color: "#172033" });

    if (card.extras === "sources") {
      d.icon({ name: "document", x: x + 10, y: cardY + 123, size: 26, color: "#163A5F" });
      d.icon({ name: "database", x: x + 49, y: cardY + 122, size: 30, color: "#163A5F" });
      d.icon({ name: "document", x: x + 10, y: cardY + 161, size: 22, color: "#163A5F" });
      d.icon({ name: "document", x: x + 36, y: cardY + 161, size: 22, color: "#163A5F" });
    }
    if (card.extras === "checklines") {
      for (let n = 0; n < 3; n++) {
        d.ellipse({ x: x + 14, y: cardY + 122 + n * 22, w: 9, h: 9, value: "✓", fill: "#FFFFFF", stroke: "#91A4BC", sw: 1, font: 6, color: "#75879C" });
        d.edge({ sx: x + 31, sy: cardY + 127 + n * 22, tx: x + 72, ty: cardY + 127 + n * 22, arrow: "none", color: "#A8B4C3", sw: 2 });
      }
    }
    if (card.extras === "vectors") {
      const pts = [[28, 113], [50, 113], [39, 132], [19, 142], [61, 142], [39, 160], [28, 178], [50, 178]];
      pts.forEach(([px, py]) => d.ellipse({ x: x + px, y: cardY + py - 58, w: 8, h: 8, fill: "#6D64D8", stroke: "#6D64D8", sw: 1 }));
      [0, 1, 2, 3].forEach((n) => d.rect({ x: x + 9 + n * 19, y: cardY + 167, w: 12, h: 12, fill: "#8E86E9", stroke: "#665BD4", sw: 1, r: 0 }));
      d.text({ x: x + 61, y: cardY + 165, w: 18, h: 14, value: "…", font: 9, color: "#5F58D6" });
    }
    if (card.extras === "rank") {
      d.rect({ x: x + 10, y: cardY + 127, w: 66, h: 54, value: "", fill: "#FFFFFF", stroke: "#7A9BC6", sw: 1, r: 1 });
      [["1", "0.92"], ["2", "0.81"], ["…", "…"], ["K", "0.64"]].forEach(([a, b], n) => {
        d.text({ x: x + 18, y: cardY + 131 + n * 12, w: 12, h: 10, value: a, font: 7, color: "#17375E" });
        d.edge({ sx: x + 35, sy: cardY + 136 + n * 12, tx: x + 55, ty: cardY + 136 + n * 12, arrow: "none", color: "#91A4BC", sw: 1 });
        d.text({ x: x + 57, y: cardY + 131 + n * 12, w: 16, h: 10, value: b, font: 7, color: "#17375E" });
      });
    }
    if (card.extras === "cubes") {
      [[18, 132], [53, 152], [37, 171]].forEach(([px, py], n) => {
        d.rect({ x: x + px, y: cardY + py, w: 21, h: 21, value: "", fill: n === 1 ? "#E9E6FF" : "#F2F0FF", stroke: "#5545B8", sw: 1, r: 0 });
        d.edge({ sx: x + px, sy: cardY + py, tx: x + px + 10, ty: cardY + py - 9, arrow: "none", color: "#5545B8", sw: 1 });
        d.edge({ sx: x + px + 21, sy: cardY + py, tx: x + px + 31, ty: cardY + py - 9, arrow: "none", color: "#5545B8", sw: 1 });
        d.edge({ sx: x + px + 10, sy: cardY + py - 9, tx: x + px + 31, ty: cardY + py - 9, arrow: "none", color: "#5545B8", sw: 1 });
      });
    }
    if (card.extras === "verify") {
      d.rect({ x: x + 10, y: cardY + 128, w: 66, h: 54, value: "", fill: "#FFFFFF", stroke: "#7A9BC6", sw: 1, r: 1 });
      ["Grounded", "Safe", "Consistent"].forEach((label, n) => {
        d.text({ x: x + 15, y: cardY + 132 + n * 15, w: 42, h: 10, value: label, font: 7, align: "left", color: "#17375E" });
        d.text({ x: x + 59, y: cardY + 129 + n * 15, w: 12, h: 12, value: "✓", font: 10, color: "#0D8F70" });
      });
    }
    if (card.extras === "output") {
      d.rect({ x: x + 10, y: cardY + 132, w: 66, h: 50, value: "", fill: "#FFFFFF", stroke: "#7A9BC6", sw: 1, r: 1 });
      d.text({ x: x + 17, y: cardY + 137, w: 12, h: 14, value: "•", font: 14, color: "#164F92" });
      d.text({ x: x + 17, y: cardY + 153, w: 12, h: 14, value: "•", font: 14, color: "#164F92" });
      d.icon({ name: "code", x: x + 55, y: cardY + 160, size: 15, color: "#164F92" });
    }
    if (i < topCards.length - 1) {
      d.edge({ sx: x + cardW, sy: cardY + 87, tx: xs[i + 1], ty: cardY + 87, color: "#172033", sw: 1.6 });
    }
  });

  d.edge({ sx: xs[1] + cardW / 2, sy: cardY + cardH, tx: 130, ty: 274, points: [[xs[1] + cardW / 2, 261], [130, 261]], dashed: true, color: "#8FA2B8", sw: 1.2 });
  d.edge({ sx: xs[2] + cardW / 2, sy: cardY + cardH, tx: 255, ty: 274, points: [[xs[2] + cardW / 2, 261], [255, 261]], dashed: true, color: "#8FA2B8", sw: 1.2 });
  d.edge({ sx: xs[3] + cardW / 2, sy: cardY + cardH, tx: 380, ty: 274, points: [[xs[3] + cardW / 2, 261], [380, 261]], dashed: true, color: "#8FA2B8", sw: 1.2 });
  d.edge({ sx: xs[4] + cardW / 2, sy: cardY + cardH, tx: 602, ty: 274, points: [[xs[4] + cardW / 2, 261], [602, 261]], dashed: true, color: "#8FA2B8", sw: 1.2 });

  d.rect({ x: 27, y: 273, w: 197, h: 160, value: "", fill: "#FFFFFF", stroke: "#B7C4D4", sw: 1.05, r: 1 });
  d.text({ x: 40, y: 287, w: 170, h: 15, value: "<b>A. Example Chunk → Embedding</b>", font: 8.5, color: "#172033" });
  d.rect({ x: 39, y: 314, w: 92, h: 50, value: "The capital of France<br>is Paris.", fill: "#F8FAFD", stroke: "#B7C4D4", sw: 1, r: 1, font: 8, color: "#172033", align: "left" });
  d.edge({ sx: 139, sy: 339, tx: 200, ty: 339, color: "#164F92", sw: 1.8 });
  d.rect({ x: 39, y: 377, w: 168, h: 34, value: "[  0.21    -0.47     0.12     ...     0.33  ]", fill: "#FFFFFF", stroke: "#7A9BC6", sw: 1, r: 1, font: 8, color: "#163A5F" });
  d.text({ x: 94, y: 416, w: 66, h: 10, value: "d = 1536", font: 7, color: "#596B80" });

  d.rect({ x: 236, y: 273, w: 262, h: 160, value: "", fill: "#FFFFFF", stroke: "#B7C4D4", sw: 1.05, r: 1 });
  d.text({ x: 276, y: 287, w: 180, h: 15, value: "<b>B. Similarity (Query vs Corpus)</b>", font: 8.5, color: "#172033" });
  d.table({
    x: 252, y: 304, w: 226, h: 108, rows: 5, cols: 6,
    values: [
      ["Q \\ D", "D1", "D2", "D3", "...", "DN"],
      ["Q1", "0.71", "0.22", "0.08", "...", "0.31"],
      ["Q2", "0.15", "0.81", "0.17", "...", "0.28"],
      ["...", "...", "...", "...", "...", "..."],
      ["Qn", "0.09", "0.34", "0.62", "...", "0.36"]
    ],
    font: 7.5
  });
  const tcw = 226 / 6;
  const trh = 108 / 5;
  [[1, 1, "0.71"], [2, 2, "0.81"], [4, 3, "0.62"]].forEach(([r, c, v]) => d.rect({ x: 252 + c * tcw, y: 304 + r * trh, w: tcw, h: trh, fill: "#BEE9E0", stroke: "#91A4BC", sw: 1, r: 0, value: v, font: 7.5, color: "#17375E" }));

  d.rect({ x: 510, y: 273, w: 193, h: 160, value: "", fill: "#FFFFFF", stroke: "#B7C4D4", sw: 1.05, r: 1 });
  d.text({ x: 575, y: 287, w: 64, h: 15, value: "<b>C. Confidence</b>", font: 8.5, color: "#172033" });
  d.text({ x: 601, y: 312, w: 34, h: 12, value: "0.5", font: 8, color: "#172033" });
  d.svgImage({ svg: makeGaugeSvg(), x: 531, y: 323, w: 154, h: 101 });
  d.text({ x: 533, y: 389, w: 20, h: 12, value: "0", font: 8, color: "#172033" });
  d.text({ x: 657, y: 389, w: 26, h: 12, value: "1.0", font: 8, color: "#172033" });
  d.text({ x: 590, y: 390, w: 72, h: 18, value: "<b>0.86</b>", font: 15, color: "#122A44" });
  d.text({ x: 584, y: 410, w: 84, h: 12, value: "High Confidence", font: 8, color: "#078481" });

  fs.writeFileSync(path.join(outDir, "model-pipeline.drawio"), d.xml());
  writeSvgAssets(outDir, [["cloud", "Data ingestion"], ["filter", "Preprocessing"], ["graph", "Embedding vectors"], ["search", "Retrieval"], ["brain", "Model inference"], ["shield", "Verifier"], ["document", "Final output"], ["database", "Raw source database"], ["code", "Source link indicator"]]);
  fs.writeFileSync(path.join(outDir, "svg", "confidence-gauge.svg"), makeGaugeSvg());
  fs.appendFileSync(path.join(outDir, "SVG_ASSETS.md"), "| `svg/confidence-gauge.svg` | Confidence gauge recreation |\n");
}

function makeExperienceFlywheel(outDir) {
  const d = new Diagram("Experience Flywheel", "experience-flywheel");
  baseTitle(d, "Experience Flywheel");

  d.ellipse({ x: 500, y: 235, w: 280, h: 280, fill: "#133A52", stroke: "#133A52", sw: 0 });
  d.icon({ name: "target", x: 596, y: 292, size: 70, color: "#FFFFFF" });
  d.text({ x: 550, y: 372, w: 180, h: 70, value: "<b>Experience<br>Flywheel</b>", font: 24, color: "#FFFFFF" });

  const segs = [
    [455, 142, 370, 126, "#13A6A7", "1<br>Capture &amp; Store<br><span style='font-size:12px'>(Memory)</span>"],
    [746, 202, 188, 256, "#F1B13E", "2<br>Organize<br>&amp; Enable<br><span style='font-size:12px'>(Resources)</span>"],
    [470, 520, 348, 118, "#2C86C8", "3<br>Apply &amp; Deliver<br><span style='font-size:12px'>(Projects)</span>"],
    [355, 248, 150, 250, "#F06A5D", "4<br>Learn &amp;<br>Improve<br><span style='font-size:12px'>(Feedback)</span>"]
  ];
  segs.forEach(([x, y, w, h, fill, label]) => {
    d.rect({ x, y, w, h, value: `<b>${label}</b>`, fill, stroke: "#FFFFFF", sw: 4, r: 1, font: 15, color: "#FFFFFF", extra: "arcSize=16;" });
  });
  d.edge({ sx: 570, sy: 155, tx: 720, ty: 158, color: "#FFFFFF", sw: 3 });
  d.edge({ sx: 852, sy: 305, tx: 822, ty: 445, color: "#FFFFFF", sw: 3 });
  d.edge({ sx: 666, sy: 632, tx: 516, ty: 588, color: "#FFFFFF", sw: 3 });
  d.edge({ sx: 378, sy: 400, tx: 420, ty: 260, color: "#FFFFFF", sw: 3 });

  const cards = [
    [50, 125, 230, 142, "brain", "#0E7E84", "MEMORY", "Notes &amp; Insights<br>Decisions<br>Patterns<br>Lessons Learned"],
    [1000, 120, 230, 142, "folder", "#C56A00", "RESOURCES", "Templates<br>Playbooks<br>Components<br>References"],
    [52, 450, 230, 142, "user", "#D93E35", "SKILLS", "Technical Depth<br>Domain Knowledge<br>Problem Solving<br>Communication"],
    [1000, 444, 230, 142, "refresh", "#2C86C8", "REUSE", "Reusable Assets<br>Standardization<br>Automation<br>Leverage"]
  ];
  cards.forEach(([x, y, w, h, icon, color, title, lines]) => {
    d.rect({ x, y, w, h, fill: "#FFFFFF", stroke: color, sw: 2, r: 1, value: "" });
    d.icon({ name: icon, x: x + 24, y: y + 26, size: 54, color });
    d.text({ x: x + 92, y: y + 28, w: 110, h: 28, value: `<b>${title}</b>`, font: 16, color });
    lines.split("<br>").forEach((line, idx) => d.text({ x: x + 76, y: y + 70 + idx * 20, w: 130, h: 20, value: `• ${line}`, font: 12, align: "left", color: "#172033" }));
  });
  d.rect({ x: 410, y: 630, w: 460, h: 58, value: "<b>PROJECT DELIVERY</b><br><span style='font-size:12px'>Value to Users • Quality Outcomes • Stakeholder Trust</span>", fill: "#F8FAFD", stroke: "#748BA6", font: 16, color: "#172033" });
  d.icon({ name: "tools", x: 442, y: 642, size: 34, color: "#53677F" });
  d.edge({ sx: 280, sy: 196, tx: 455, ty: 210, points: [[355, 196]], dashed: true, color: "#9AAEC4", sw: 1.8 });
  d.edge({ sx: 1000, sy: 196, tx: 830, ty: 220, points: [[910, 196]], dashed: true, color: "#9AAEC4", sw: 1.8 });
  d.edge({ sx: 282, sy: 520, tx: 470, ty: 514, points: [[370, 520]], dashed: true, color: "#9AAEC4", sw: 1.8 });
  d.edge({ sx: 1000, sy: 520, tx: 812, ty: 510, points: [[912, 520]], dashed: true, color: "#9AAEC4", sw: 1.8 });
  d.edge({ sx: 640, sy: 630, tx: 640, ty: 515, dashed: true, color: "#9AAEC4", sw: 1.8 });

  fs.writeFileSync(path.join(outDir, "experience-flywheel.drawio"), d.xml());
  writeSvgAssets(outDir, [["target", "Central objective"], ["brain", "Memory"], ["folder", "Resources"], ["user", "Skills"], ["refresh", "Reuse loop"], ["tools", "Project delivery"]]);
}

const examples = [
  ["research-framework", makeResearchFramework],
  ["agent-platform-architecture", makeAgentPlatform],
  ["model-pipeline", makeModelPipeline],
  ["experience-flywheel", makeExperienceFlywheel]
];

for (const [name, fn] of examples) {
  const dir = path.join(root, name);
  ensureDir(dir);
  fn(dir);
}

console.log(`Generated ${examples.length} draw.io examples.`);
