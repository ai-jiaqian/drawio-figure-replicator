import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const W = 1536;
const H = 1024;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function svgData(svg) {
  return encodeURIComponent(svg).replaceAll("'", "%27").replaceAll("(", "%28").replaceAll(")", "%29");
}

function iconSvg(name, color = "#123A5D") {
  const c = `fill="none" stroke="${color}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"`;
  const icons = {
    document: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M72 28h78l42 42v158H72z" ${c}/><path d="M150 30v42h42M96 116h72M96 150h72M96 184h48" ${c}/></svg>`,
    table: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="42" y="50" width="172" height="156" rx="10" ${c}/><path d="M42 96h172M42 142h172M96 50v156M154 50v156" ${c}/></svg>`,
    api: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M76 154a46 46 0 1 1 18-88 58 58 0 0 1 106 34 40 40 0 0 1-4 80h-28" ${c}/><path d="M96 174l-30-30 30-30M160 114l30 30-30 30M138 104l-22 80" ${c}/></svg>`,
    graph: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="66" cy="178" r="20" ${c}/><circle cx="126" cy="78" r="20" ${c}/><circle cx="196" cy="166" r="20" ${c}/><path d="M76 162l40-68M140 94l44 56M84 178l92-10" ${c}/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="82" r="40" ${c}/><path d="M52 214c14-48 44-72 76-72s62 24 76 72" ${c}/></svg>`,
    history: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M58 82a84 84 0 1 1-4 88M58 82H26V50" ${c}/><path d="M128 78v58l42 28" ${c}/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128 28l78 30v62c0 52-32 86-78 108-46-22-78-56-78-108V58z" ${c}/><path d="M92 128l24 24 52-56" ${c}/></svg>`,
    puzzle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M92 42h52v42c14-12 40-4 40 18s-26 30-40 18v42h-42c12 14 4 40-18 40s-30-26-18-40H42v-52h42c-12-14-4-40 18-40s30 26 18 40h24V42z" ${c}/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="92" ${c}/><path d="M84 130l30 30 62-70" ${c}/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128 34l100 180H28z" ${c}/><path d="M128 92v56M128 184h.1" ${c}/></svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><ellipse cx="128" cy="58" rx="78" ry="30" ${c}/><path d="M50 58v108c0 17 35 31 78 31s78-14 78-31V58M50 112c0 17 35 31 78 31s78-14 78-31" ${c}/></svg>`,
    scale: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128 42v166M72 78h112M72 78l-42 70h84zM184 78l-42 70h84zM84 218h88" ${c}/></svg>`
  };
  return icons[name] ?? icons.document;
}

class D {
  constructor() {
    this.cells = [];
    this.i = 1;
  }
  id(prefix) {
    return `${prefix}-${this.i++}`;
  }
  cell(xml) {
    this.cells.push(xml);
  }
  rect({ x, y, w, h, value = "", fill = "#FFFFFF", stroke = "#1F5D8A", sw = 1.4, r = 1, font = 15, color = "#0F1E33", align = "center", extra = "" }) {
    const id = this.id("rect");
    const style = `rounded=${r};whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=${color};align=${align};verticalAlign=middle;spacing=6;${extra}`;
    this.cell(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  text({ x, y, w, h, value, font = 16, color = "#0F1E33", align = "center", bold = false }) {
    const id = this.id("text");
    const style = `text;html=1;strokeColor=none;fillColor=none;align=${align};verticalAlign=middle;fontFamily=Arial;fontSize=${font};fontColor=${color};fontStyle=${bold ? 1 : 0};spacing=2;`;
    this.cell(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  icon({ name, x, y, size = 38, color = "#123A5D" }) {
    const id = this.id("icon");
    const style = `shape=image;imageAspect=0;aspect=fixed;image=data:image/svg+xml,${svgData(iconSvg(name, color))};`;
    this.cell(`<mxCell id="${id}" value="" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${size}" height="${size}" as="geometry"/></mxCell>`);
    return id;
  }
  ellipse({ x, y, w, h, value = "", fill = "#FFFFFF", stroke = "#1F5D8A", sw = 1.4, font = 14, color = "#0F1E33" }) {
    const id = this.id("ellipse");
    const style = `ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=${color};align=center;verticalAlign=middle;spacing=4;`;
    this.cell(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  hex({ x, y, w, h, value = "", fill = "#F7FBFF", stroke = "#103C80", sw = 3, font = 18 }) {
    const id = this.id("hex");
    const style = `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=#0F1E33;align=center;verticalAlign=middle;spacing=8;`;
    this.cell(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  diamond({ x, y, w, h, value }) {
    const id = this.id("diamond");
    const style = `rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F1E33;strokeWidth=1.2;fontFamily=Arial;fontSize=12;fontColor=#0F1E33;align=center;verticalAlign=middle;spacing=4;`;
    this.cell(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  edge({ sx, sy, tx, ty, points = [], color = "#0F1E33", sw = 1.6, dashed = false, arrow = "classic", label = "", font = 9 }) {
    const id = this.id("edge");
    const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join("")}</Array>` : "";
    const style = `endArrow=${arrow};html=1;rounded=1;strokeColor=${color};strokeWidth=${sw};endFill=1;dashed=${dashed ? 1 : 0};fontFamily=Arial;fontSize=${font};fontColor=${color};`;
    this.cell(`<mxCell id="${id}" value="${esc(label)}" style="${style}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${sx}" y="${sy}" as="sourcePoint"/><mxPoint x="${tx}" y="${ty}" as="targetPoint"/>${pts}</mxGeometry></mxCell>`);
    return id;
  }
  table({ x, y, w, h, rows, cols, values, font = 12, headerFill = "#EAF2FF", hi = {}, colWidths = null }) {
    const widths = colWidths ?? Array(cols).fill(w / cols);
    const rh = h / rows;
    for (let r = 0; r < rows; r++) {
      let cx = x;
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`;
        const cw = widths[c] ?? (w / cols);
        this.rect({
          x: cx,
          y: y + r * rh,
          w: cw,
          h: rh,
          value: values[r]?.[c] ?? "",
          fill: hi[key] ?? (r === 0 ? headerFill : "#FFFFFF"),
          stroke: "#7393BF",
          sw: 1,
          r: 0,
          font,
          color: "#0F1E33",
          extra: "spacing=0;spacingTop=0;spacingBottom=0;spacingLeft=1;spacingRight=1;overflow=hidden;"
        });
        cx += cw;
      }
    }
  }
  xml() {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="Electron" pages="1">\n  <diagram name="ContextForge" id="contextforge">\n    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${W}" pageHeight="${H}" math="0" shadow="0">\n      <root>\n        <mxCell id="0"/>\n        <mxCell id="1" parent="0"/>\n        ${this.cells.join("\n        ")}\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>\n`;
  }
}

function sourceCard(d, { x, y, w = 210, h = 176, icon, title, values, colWidths }) {
  d.rect({ x, y, w, h, value: "", fill: "#FDFEFF", stroke: "#0C6F8A", sw: 2, r: 1 });
  d.icon({ name: icon, x: x + 22, y: y + 18, size: 36, color: "#123A5D" });
  d.text({ x: x + 62, y: y + 18, w: w - 78, h: 28, value: `<b>${title}</b>`, font: 15, align: "left" });
  d.table({ x: x + 12, y: y + 70, w: w - 24, h: h - 84, rows: values.length, cols: values[0].length, values, font: 7.2, colWidths });
}

function draw() {
  const d = new D();
  d.rect({ x: 0, y: 0, w: W, h: H, fill: "#FFFFFF", stroke: "#FFFFFF", sw: 0, r: 0 });
  d.text({ x: 120, y: 14, w: 1290, h: 46, value: "<b>ContextForge: Multi-Source Context Assembly and Conflict Resolution</b>", font: 27 });

  // Conflict resolver
  d.rect({ x: 46, y: 124, w: 278, h: 604, fill: "#FFFDFD", stroke: "#DD2D2A", sw: 1.7, r: 1 });
  d.icon({ name: "scale", x: 72, y: 138, size: 40, color: "#D02B2B" });
  d.text({ x: 118, y: 143, w: 170, h: 28, value: "<b>CONFLICT RESOLVER</b>", font: 18, align: "left" });
  d.text({ x: 64, y: 181, w: 238, h: 24, value: "Input: Conflicting claims about the same fact", font: 12 });
  d.rect({ x: 76, y: 206, w: 148, h: 50, value: "<b>Conflict Detected</b><br>c<sub>i</sub> vs c<sub>j</sub>", fill: "#FFF5F4", stroke: "#DD2D2A", font: 12, color: "#9E2020" });
  d.icon({ name: "warning", x: 88, y: 222, size: 22, color: "#D02B2B" });
  const decisions = [
    [76, 285, "Contradiction<br>Detected?"],
    [76, 365, "Higher<br>Source Rank?"],
    [76, 445, "More Recent?"],
    [76, 525, "Higher<br>Confidence?"]
  ];
  decisions.forEach(([x, y, label]) => d.diamond({ x, y, w: 112, h: 56, value: label }));
  d.edge({ sx: 150, sy: 256, tx: 132, ty: 285 });
  d.edge({ sx: 132, sy: 341, tx: 132, ty: 365 });
  d.edge({ sx: 132, sy: 421, tx: 132, ty: 445 });
  d.edge({ sx: 132, sy: 501, tx: 132, ty: 525 });
  d.rect({ x: 226, y: 290, w: 80, h: 34, value: "No Conflict<br>(merge)", fill: "#EAF8EF", stroke: "#178953", font: 10, color: "#0E653E" });
  d.rect({ x: 226, y: 368, w: 76, h: 36, value: "Take Higher<br>Rank", fill: "#EAF8EF", stroke: "#178953", font: 10 });
  d.rect({ x: 226, y: 444, w: 76, h: 36, value: "Take More<br>Recent", fill: "#EAF8EF", stroke: "#178953", font: 10 });
  d.rect({ x: 226, y: 520, w: 82, h: 38, value: "Take Higher<br>Confidence", fill: "#EAF8EF", stroke: "#178953", font: 10 });
  d.rect({ x: 86, y: 580, w: 98, h: 36, value: "Flag for Human<br>Review", fill: "#FFF8EA", stroke: "#E58A00", font: 10, color: "#8A4A00" });
  d.edge({ sx: 188, sy: 313, tx: 226, ty: 307, label: "No" });
  d.edge({ sx: 188, sy: 393, tx: 226, ty: 386, label: "Yes" });
  d.edge({ sx: 188, sy: 473, tx: 226, ty: 462, label: "Yes" });
  d.edge({ sx: 188, sy: 553, tx: 226, ty: 540, label: "Yes" });
  d.edge({ sx: 132, sy: 581, tx: 132, ty: 616, label: "No" });
  d.text({ x: 88, y: 630, w: 184, h: 20, value: "<b>Source Rank (High → Low)</b>", font: 11 });
  [["document", "Docs"], ["database", "DB"], ["api", "APIs"], ["graph", "Graph"], ["user", "Notes"], ["history", "History"]].forEach(([ic, label], i) => {
    d.icon({ name: ic, x: 66 + i * 37, y: 655, size: 25, color: "#123A5D" });
    d.text({ x: 58 + i * 37, y: 681, w: 40, h: 20, value: label, font: 8 });
  });

  // Source cards and hub
  sourceCard(d, { x: 458, y: 72, icon: "document", title: "Documents", colWidths: [24, 72, 28, 62], values: [["ID", "Title", "Type", "Date"], ["D1", "Design Spec", "PDF", "2025-04-20"], ["D2", "API Guide", "PDF", "2025-04-18"], ["D3", "Security", "PDF", "2025-04-10"], ["...", "...", "...", "..."]] });
  sourceCard(d, { x: 826, y: 72, icon: "table", title: "Tables / DB", colWidths: [72, 46, 68], values: [["Table", "Rows", "Updated"], ["Customers", "12,842", "2025-04-21"], ["Orders", "98,102", "2025-04-20"], ["Products", "2,340", "2025-04-21"], ["...", "...", "..."]] });
  sourceCard(d, { x: 392, y: 294, icon: "user", title: "Human Notes", colWidths: [38, 92, 56], values: [["ID", "Author", "Trust"], ["N1", "Alice", "0.94"], ["N2", "Bob", "0.88"], ["N3", "Carol", "0.90"], ["...", "...", "..."]] });
  sourceCard(d, { x: 918, y: 294, icon: "api", title: "APIs / Services", colWidths: [72, 58, 56], values: [["API", "Endpoint", "Reliability"], ["UserSvc", "/users", "0.98"], ["Billing", "/charges", "0.96"], ["Inventory", "/stock", "0.94"], ["...", "...", "..."]] });
  sourceCard(d, { x: 462, y: 520, icon: "history", title: "History / Logs", colWidths: [74, 52, 60], values: [["Source", "Events", "Window"], ["Chat Logs", "3,210", "30 days"], ["Action Logs", "12,443", "30 days"], ["Run Logs", "1,882", "30 days"], ["...", "...", "..."]] });
  sourceCard(d, { x: 856, y: 520, icon: "graph", title: "Knowledge Graph", colWidths: [70, 56, 60], values: [["Type", "Count", "Updated"], ["Entities", "45,210", "2025-04-19"], ["Relations", "128,934", "2025-04-19"], ["Events", "6,781", "2025-04-18"], ["...", "...", "..."]] });

  d.hex({ x: 636, y: 272, w: 232, h: 256, value: "" });
  d.icon({ name: "puzzle", x: 732, y: 292, size: 42, color: "#153A80" });
  d.text({ x: 690, y: 338, w: 132, h: 28, value: "<b>Context Composer</b>", font: 17 });
  d.rect({ x: 672, y: 354, w: 80, h: 70, value: "", fill: "#F4F8FF", stroke: "#7393BF", font: 12 });
  d.icon({ name: "api", x: 699, y: 364, size: 24, color: "#153A80" });
  d.text({ x: 681, y: 394, w: 62, h: 20, value: "<b>Query</b>", font: 10 });
  d.rect({ x: 752, y: 354, w: 80, h: 70, value: "", fill: "#F4F8FF", stroke: "#7393BF", font: 12 });
  d.icon({ name: "document", x: 779, y: 363, size: 25, color: "#153A80" });
  d.text({ x: 762, y: 394, w: 62, h: 20, value: "<b>Evidence</b>", font: 10 });
  d.rect({ x: 672, y: 424, w: 80, h: 70, value: "", fill: "#F4F8FF", stroke: "#7393BF", font: 12 });
  d.icon({ name: "shield", x: 699, y: 434, size: 24, color: "#153A80" });
  d.text({ x: 678, y: 464, w: 68, h: 20, value: "<b>Constraints</b>", font: 9 });
  d.rect({ x: 752, y: 424, w: 80, h: 70, value: "", fill: "#F4F8FF", stroke: "#7393BF", font: 12 });
  d.icon({ name: "database", x: 779, y: 434, size: 25, color: "#153A80" });
  d.text({ x: 763, y: 464, w: 60, h: 20, value: "<b>Memory</b>", font: 10 });

  d.edge({ sx: 668, sy: 175, tx: 690, ty: 296, label: "normalize\nscore" });
  d.edge({ sx: 826, sy: 175, tx: 796, ty: 296, label: "normalize\nscore" });
  d.edge({ sx: 602, sy: 382, tx: 636, ty: 382, label: "cite\nscore" });
  d.edge({ sx: 918, sy: 382, tx: 868, ty: 382, label: "align\nscore" });
  d.edge({ sx: 646, sy: 612, tx: 674, ty: 486, label: "cite\nscore" });
  d.edge({ sx: 856, sy: 612, tx: 834, ty: 486, label: "align\nscore" });
  d.edge({ sx: 506, sy: 240, tx: 506, ty: 294, dashed: true, color: "#224A7A" });
  d.edge({ sx: 938, sy: 240, tx: 938, ty: 294, dashed: true, color: "#224A7A" });
  d.edge({ sx: 576, sy: 470, tx: 646, ty: 674, dashed: true, color: "#224A7A", points: [[600, 630]] });
  d.edge({ sx: 958, sy: 470, tx: 864, ty: 674, dashed: true, color: "#224A7A", points: [[930, 640]] });
  d.ellipse({ x: 380, y: 114, w: 30, h: 30, value: "<b>2</b>", fill: "#0D8290", stroke: "#0D8290", color: "#FFFFFF", font: 16 });
  d.text({ x: 352, y: 154, w: 75, h: 34, value: "Retrieve &amp;<br>Normalize", font: 12, color: "#0D6674" });
  d.ellipse({ x: 345, y: 386, w: 28, h: 28, value: "<b>5</b>", fill: "#E95A4F", stroke: "#E95A4F", color: "#FFFFFF", font: 16 });
  d.text({ x: 333, y: 420, w: 76, h: 40, value: "Resolve<br>Conflicts", font: 12, color: "#D3332D" });
  d.edge({ sx: 392, sy: 420, tx: 324, ty: 420, dashed: true, color: "#E95A4F", label: "" });

  // Right side panels
  d.rect({ x: 1165, y: 58, w: 252, h: 178, fill: "#FFFCF7", stroke: "#D48500", sw: 1.5, r: 1 });
  d.icon({ name: "shield", x: 1208, y: 74, size: 34, color: "#8A4A00" });
  d.text({ x: 1248, y: 74, w: 130, h: 28, value: "<b>QUALITY GATES</b>", font: 16, align: "left" });
  d.table({ x: 1176, y: 102, w: 214, h: 124, rows: 4, cols: 3, colWidths: [32, 146, 36], values: [["G1", "Grounded in Sources?", "✓"], ["G2", "Non-Duplicate?", "✓"], ["G3", "Policy-Safe?", "✓"], ["G4", "Budget-Fit?", "✓"]], font: 8.2, headerFill: "#FFFFFF", hi: { "0,2": "#EAF8EF", "1,2": "#EAF8EF", "2,2": "#EAF8EF", "3,2": "#EAF8EF" } });
  d.icon({ name: "check", x: 1446, y: 108, size: 55, color: "#D48500" });
  d.text({ x: 1428, y: 166, w: 92, h: 34, value: "<b>Pass</b><br>All Gates", font: 13, color: "#8A4A00" });
  d.edge({ sx: 1090, sy: 190, tx: 1165, ty: 150, dashed: true, color: "#0F61C8" });
  d.edge({ sx: 1390, sy: 150, tx: 1448, ty: 150, color: "#D48500" });

  d.rect({ x: 1180, y: 294, w: 318, h: 435, fill: "#FBFDFF", stroke: "#164F92", sw: 1.8, r: 1 });
  d.icon({ name: "document", x: 1214, y: 312, size: 38, color: "#164F92" });
  d.text({ x: 1264, y: 318, w: 190, h: 26, value: "<b>CITATION &amp; TRACE PACK</b>", font: 17, align: "left" });
  d.text({ x: 1200, y: 356, w: 246, h: 20, value: "Output: Structured trace of assembled context", font: 12 });
  d.table({ x: 1189, y: 383, w: 300, h: 220, rows: 8, cols: 5, colWidths: [52, 72, 86, 42, 48], values: [["Claim ID", "Source", "Span / Pointer", "Score", "Status"], ["C-001", "D1 (Sec 2.1)", "p.5: L12-L20", "0.92", "●"], ["C-002", "Customers", "row: 1021", "0.87", "●"], ["C-003", "API /users", "v1: fields[3]", "0.85", "●"], ["C-004", "KG:Entity#933", "relation#211", "0.78", "●"], ["C-005", "Chat Log", "t-2025-04-18", "0.62", "●"], ["C-006", "N2 Note", "lines 3-7", "0.55", "×"], ["...", "...", "...", "...", "..."]], font: 7.4, headerFill: "#EAF2FF", hi: { "1,4": "#EAF8EF", "2,4": "#EAF8EF", "3,4": "#EAF8EF", "4,4": "#FFF8D7", "5,4": "#FFF0E6", "6,4": "#FFF0F0" } });
  d.text({ x: 1196, y: 614, w: 240, h: 18, value: "<b>Status:</b>   ● Accepted     ● Weak     ● Flagged     ×", font: 10, color: "#0F1E33", align: "left" });
  d.rect({ x: 1194, y: 637, w: 276, h: 72, value: "<b>Trace Package Includes</b><br>Claim → Evidence mapping   Scoring decisions<br>Full source pointers       Conflict resolutions", fill: "#F7FBFF", stroke: "#7393BF", font: 9, align: "left" });
  d.ellipse({ x: 1128, y: 430, w: 30, h: 30, value: "<b>6</b>", fill: "#1C66B5", stroke: "#1C66B5", color: "#FFFFFF", font: 16 });
  d.text({ x: 1118, y: 464, w: 76, h: 40, value: "Finalize &amp;<br>Package", font: 12, color: "#164F92" });

  // Assembly buffer
  d.rect({ x: 346, y: 746, w: 798, h: 190, fill: "#FFFFFF", stroke: "#164F92", sw: 1.6, r: 1 });
  d.icon({ name: "database", x: 438, y: 756, size: 34, color: "#164F92" });
  d.text({ x: 486, y: 760, w: 380, h: 28, value: "<b>ASSEMBLY BUFFER</b>  (in-progress context blocks)", font: 18, align: "left" });
  const blocks = [
    ["Overview", "#0E8A7C", "320", "0.92", "Light"],
    ["Architecture", "#F28C13", "860", "0.88", "Medium"],
    ["Data & Schema", "#1A73B8", "740", "0.85", "Medium"],
    ["APIs", "#6250B8", "410", "0.80", "Heavy"],
    ["Constraints", "#0E8A7C", "210", "0.95", "Light"]
  ];
  blocks.forEach(([title, color, tok, trust, comp], i) => {
    const x = 356 + i * 132;
    d.rect({ x, y: 786, w: 122, h: 112, fill: "#FBFEFF", stroke: color, sw: 1.4, r: 1 });
    d.text({ x: x + 12, y: 798, w: 98, h: 20, value: `<b>${title}</b>`, font: 10.5, color, align: "left" });
    d.text({ x: x + 14, y: 834, w: 45, h: 18, value: "Tokens", font: 10, align: "left" });
    d.text({ x: x + 74, y: 834, w: 34, h: 18, value: tok, font: 10 });
    d.text({ x: x + 14, y: 856, w: 45, h: 18, value: "Trust", font: 10, align: "left" });
    d.text({ x: x + 74, y: 856, w: 34, h: 18, value: trust, font: 10 });
    d.text({ x: x + 14, y: 878, w: 66, h: 18, value: "Compression", font: 9.2, align: "left" });
    d.text({ x: x + 80, y: 878, w: 38, h: 18, value: comp, font: 9.2 });
    for (let n = 0; n < 7; n++) d.rect({ x: x + 10 + n * 15, y: 906, w: 13, h: 14, fill: n < 5 ? color : "#FFFFFF", stroke: color, sw: 1, r: 0 });
  });
  d.rect({ x: 990, y: 766, w: 142, h: 158, fill: "#FFFFFF", stroke: "#7A9BC6", sw: 1.2, r: 1 });
  d.text({ x: 1032, y: 770, w: 70, h: 22, value: "<b>Context Budget</b>", font: 11 });
  d.rect({ x: 1014, y: 812, w: 32, h: 24, fill: "#36A852", stroke: "#36A852", r: 1 });
  d.rect({ x: 1046, y: 800, w: 42, h: 24, fill: "#F2BC2E", stroke: "#F2BC2E", r: 1 });
  d.rect({ x: 1088, y: 812, w: 30, h: 24, fill: "#E85B4A", stroke: "#E85B4A", r: 1 });
  d.text({ x: 1022, y: 840, w: 88, h: 28, value: "<b>2,540 / 4,000</b><br>Tokens (63%)", font: 12 });
  d.rect({ x: 996, y: 874, w: 126, h: 44, value: "<b>Budget Formula</b><br>B = Σ tokens<sub>i</sub> ≤ T<sub>max</sub>", fill: "#F7FBFF", stroke: "#7A9BC6", font: 10 });
  d.ellipse({ x: 292, y: 760, w: 30, h: 30, value: "<b>3</b>", fill: "#0D8290", stroke: "#0D8290", color: "#FFFFFF", font: 16 });
  d.text({ x: 278, y: 798, w: 70, h: 42, value: "Assemble<br>Candidates", font: 12, color: "#0D6674" });
  d.ellipse({ x: 736, y: 690, w: 30, h: 30, value: "<b>4</b>", fill: "#1C66B5", stroke: "#1C66B5", color: "#FFFFFF", font: 16 });
  d.text({ x: 704, y: 724, w: 94, h: 30, value: "Validate<br>Against Gates", font: 12, color: "#164F92" });
  d.edge({ sx: 324, sy: 840, tx: 346, ty: 840, dashed: true, color: "#0D8290" });
  d.edge({ sx: 752, sy: 746, tx: 752, ty: 720, dashed: true, color: "#164F92" });
  d.edge({ sx: 1144, sy: 840, tx: 1340, ty: 730, dashed: true, color: "#164F92", points: [[1340, 840]] });
  d.rect({ x: 1164, y: 916, w: 152, h: 38, value: "Feedback: improve retrieval,<br>scoring, and source trust", fill: "#FFFFFF", stroke: "#164F92", sw: 1.2, r: 1, font: 10, color: "#164F92" });

  // Footer legend
  d.rect({ x: 48, y: 970, w: 1440, h: 38, fill: "#F8FAFD", stroke: "#123A5D", sw: 1.2, r: 1 });
  d.text({ x: 66, y: 980, w: 52, h: 18, value: "<b>Legend:</b>", font: 10, align: "left" });
  d.edge({ sx: 126, sy: 989, tx: 176, ty: 989, arrow: "classic" });
  d.text({ x: 182, y: 980, w: 80, h: 18, value: "Primary Flow", font: 10, align: "left" });
  d.edge({ sx: 264, sy: 989, tx: 314, ty: 989, dashed: true, arrow: "classic" });
  d.text({ x: 322, y: 980, w: 88, h: 18, value: "Feedback Loop", font: 10, align: "left" });
  d.rect({ x: 410, y: 977, w: 224, h: 22, value: "Score = Relevance × Source Trust × Freshness × Alignment", fill: "#FFFFFF", stroke: "#7393BF", font: 9 });
  [["document", "Document"], ["table", "Table / DB"], ["api", "API"], ["graph", "Graph"], ["history", "History"], ["user", "Human Note"]].forEach(([ic, label], i) => {
    const x = 648 + i * 82;
    d.icon({ name: ic, x, y: 978, size: 20, color: "#123A5D" });
    d.text({ x: x + 22, y: 978, w: 58, h: 18, value: label, font: 9, align: "left" });
  });
  d.text({ x: 1186, y: 980, w: 50, h: 18, value: "<b>Status:</b>", font: 10, align: "left" });
  d.text({ x: 1248, y: 980, w: 190, h: 18, value: "● Accepted     ● Weak     × Flagged", font: 10, align: "left" });

  return d;
}

function writeAssets() {
  const svgDir = path.join(root, "svg");
  fs.mkdirSync(svgDir, { recursive: true });
  const assets = [
    ["document", "Document or trace artifact"],
    ["table", "Structured table or database"],
    ["api", "API / service"],
    ["graph", "Knowledge graph"],
    ["user", "Human notes"],
    ["history", "History / logs"],
    ["shield", "Quality gate / constraints"],
    ["puzzle", "Context composer"],
    ["check", "Accepted status"],
    ["warning", "Conflict warning"],
    ["database", "Assembly buffer / storage"],
    ["scale", "Conflict resolver"]
  ];
  const lines = ["# SVG Assets", "", "| Asset | Meaning |", "| --- | --- |"];
  for (const [name, meaning] of assets) {
    fs.writeFileSync(path.join(svgDir, `${name}.svg`), iconSvg(name));
    lines.push(`| \`svg/${name}.svg\` | ${meaning} |`);
  }
  fs.writeFileSync(path.join(root, "SVG_ASSETS.md"), `${lines.join("\n")}\n`);
}

const diagram = draw();
fs.writeFileSync(path.join(root, "contextforge.drawio"), diagram.xml());
writeAssets();
console.log("Generated ContextForge draw.io example.");
