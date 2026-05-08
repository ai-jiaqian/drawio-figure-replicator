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
    camera: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M70 82l22-30h72l22 30h28v122H42V82z" ${c}/><circle cx="128" cy="144" r="42" ${c}/></svg>`,
    brain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M94 50c-28 0-44 20-38 46-24 10-28 48 0 62-2 34 42 58 72 30V64c-8-9-18-14-34-14zM162 50c28 0 44 20 38 46 24 10 28 48 0 62 2 34-42 58-72 30V64c8-9 18-14 34-14z" ${c}/><path d="M82 104h34M78 146h38M140 104h34M140 146h38" ${c}/></svg>`,
    flask: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M96 38h64M112 38v64L54 206c-8 14 2 32 18 32h112c16 0 26-18 18-32l-58-104V38" ${c}/><path d="M84 178h88" ${c}/></svg>`,
    clipboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="58" y="48" width="140" height="176" rx="12" ${c}/><path d="M98 48c0-20 60-20 60 0v22H98zM92 122l22 22 50-58M92 178h76" ${c}/></svg>`,
    rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M132 174l-50 28 28-50C88 126 94 86 142 48c24-19 48-24 66-24 0 18-5 42-24 66-38 48-78 54-52 84z" ${c}/><path d="M74 156l-28 8 46-46M140 182l-8 28 46-46M158 70h.1" ${c}/></svg>`,
    pulse: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M34 140h44l18-52 34 104 30-82h62" ${c}/></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M42 54h74c20 0 32 12 32 32v116c0-18-12-30-32-30H42zM214 54h-66v148c0-18 12-30 32-30h34z" ${c}/></svg>`,
    table: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="42" y="50" width="172" height="156" rx="10" ${c}/><path d="M42 96h172M42 142h172M96 50v156M154 50v156" ${c}/></svg>`,
    bot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="58" y="78" width="140" height="104" rx="18" ${c}/><path d="M128 42v36M86 118h.1M170 118h.1M96 150h64M42 124H20M236 124h-22" ${c}/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="112" cy="112" r="70" ${c}/><path d="M164 164l52 52" ${c}/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M94 78l-52 50 52 50M162 78l52 50-52 50M144 58l-32 140" ${c}/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128 28l78 30v62c0 52-32 86-78 108-46-22-78-56-78-108V58z" ${c}/><path d="M92 128l24 24 52-56" ${c}/></svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><ellipse cx="128" cy="58" rx="78" ry="30" ${c}/><path d="M50 58v108c0 17 35 31 78 31s78-14 78-31V58M50 112c0 17 35 31 78 31s78-14 78-31" ${c}/></svg>`,
    document: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M72 28h78l42 42v158H72z" ${c}/><path d="M150 30v42h42M96 116h72M96 150h72M96 184h48" ${c}/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="92" cy="84" r="32" ${c}/><circle cx="172" cy="88" r="28" ${c}/><path d="M38 210c10-48 32-72 66-72s56 24 66 72M148 148c26 2 48 24 58 62" ${c}/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M50 70h156M98 70V46h60v24M76 70l10 150h84l10-150M112 104v82M144 104v82" ${c}/></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128 36c34 0 58 24 58 58v42l22 34H48l22-34V94c0-34 24-58 58-58zM104 204h48" ${c}/></svg>`,
    loop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M78 78a72 72 0 0 1 108 8l20 22M206 68v40h-40M178 178a72 72 0 0 1-108-8l-20-22M50 188v-40h40" ${c}/></svg>`,
    trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M78 48h100v34c0 46-22 78-50 78S78 128 78 82zM96 206h64M112 160v46M144 160v46M78 76H42c0 34 16 54 46 58M178 76h36c0 34-16 54-46 58" ${c}/></svg>`,
    cross: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="86" ${c}/><path d="M92 92l72 72M164 92l-72 72" ${c}/></svg>`
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
  add(xml) {
    this.cells.push(xml);
  }
  rect({ x, y, w, h, value = "", fill = "#FFFFFF", stroke = "#123A5D", sw = 1.4, r = 1, font = 12, color = "#0D1B2E", align = "center", valign = "middle", extra = "" }) {
    const id = this.id("rect");
    const style = `rounded=${r};whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=${color};align=${align};verticalAlign=${valign};spacing=4;${extra}`;
    this.add(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  text({ x, y, w, h, value, font = 12, color = "#0D1B2E", align = "center", bold = false }) {
    const id = this.id("text");
    const style = `text;html=1;strokeColor=none;fillColor=none;align=${align};verticalAlign=middle;fontFamily=Arial;fontSize=${font};fontColor=${color};fontStyle=${bold ? 1 : 0};spacing=1;`;
    this.add(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  icon({ name, x, y, size = 28, color = "#123A5D" }) {
    const id = this.id("icon");
    const style = `shape=image;imageAspect=0;aspect=fixed;image=data:image/svg+xml,${svgData(iconSvg(name, color))};`;
    this.add(`<mxCell id="${id}" value="" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${size}" height="${size}" as="geometry"/></mxCell>`);
    return id;
  }
  ellipse({ x, y, w, h, value = "", fill = "#FFFFFF", stroke = "#123A5D", sw = 1.3, font = 12, color = "#0D1B2E" }) {
    const id = this.id("ellipse");
    const style = `ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};fontFamily=Arial;fontSize=${font};fontColor=${color};align=center;verticalAlign=middle;spacing=2;`;
    this.add(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  diamond({ x, y, w, h, value, fill = "#FFFFFF", stroke = "#123A5D", font = 9 }) {
    const id = this.id("diamond");
    const style = `rhombus;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;fontFamily=Arial;fontSize=${font};fontColor=#0D1B2E;align=center;verticalAlign=middle;spacing=2;`;
    this.add(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  edge({ sx, sy, tx, ty, points = [], color = "#0D1B2E", sw = 1.6, dashed = false, arrow = "classic", label = "", font = 9 }) {
    const id = this.id("edge");
    const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join("")}</Array>` : "";
    const style = `endArrow=${arrow};html=1;rounded=1;strokeColor=${color};strokeWidth=${sw};endFill=1;dashed=${dashed ? 1 : 0};fontFamily=Arial;fontSize=${font};fontColor=${color};`;
    this.add(`<mxCell id="${id}" value="${esc(label)}" style="${style}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${sx}" y="${sy}" as="sourcePoint"/><mxPoint x="${tx}" y="${ty}" as="targetPoint"/>${pts}</mxGeometry></mxCell>`);
    return id;
  }
  table({ x, y, w, h, values, font = 8, headerFill = "#EAF2FF", stroke = "#7895BF", colWidths = null, hi = {} }) {
    const rows = values.length;
    const cols = values[0].length;
    const widths = colWidths ?? Array(cols).fill(w / cols);
    const rh = h / rows;
    for (let r = 0; r < rows; r++) {
      let cx = x;
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`;
        this.rect({
          x: cx,
          y: y + r * rh,
          w: widths[c],
          h: rh,
          value: values[r][c],
          fill: hi[key] ?? (r === 0 ? headerFill : "#FFFFFF"),
          stroke,
          sw: 1,
          r: 0,
          font,
          extra: "spacing=0;spacingLeft=1;spacingRight=1;overflow=hidden;"
        });
        cx += widths[c];
      }
    }
  }
  panel({ x, y, w, h, title, num, color = "#123A5D", fill = "#FFFFFF" }) {
    this.rect({ x, y, w, h, fill, stroke: color, sw: 1.7, r: 1 });
    this.text({ x: x + 20, y: y + 10, w: w - 40, h: 30, value: `<b>${num}. ${title}</b>`, font: 19, color });
  }
  xml() {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="Electron" pages="1">\n  <diagram name="SkillCircuit" id="skillcircuit">\n    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${W}" pageHeight="${H}" math="0" shadow="0">\n      <root>\n        <mxCell id="0"/>\n        <mxCell id="1" parent="0"/>\n        ${this.cells.join("\n        ")}\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>\n`;
  }
}

function taskStream(d) {
  d.panel({ x: 28, y: 52, w: 290, h: 366, title: "Task Stream", num: 1, color: "#103C80" });
  d.text({ x: 78, y: 96, w: 170, h: 18, value: "Incoming tasks (q<sub>i</sub>)", font: 11 });
  [["q1", "Build API for user profile", "P1", "#FFEEEE"], ["q2", "Research auth patterns", "P2", "#FFF3E0"], ["q3", "Fix failing integration test", "P1", "#FFEEEE"], ["...", "...", "", "#FFFFFF"], ["qk", "Refactor data pipeline", "P3", "#FFF7D6"]].forEach(([qid, body, pri, fill], i) => {
    const y = 116 + i * 30;
    d.rect({ x: 74, y, w: 32, h: 26, value: qid, fill: "#F7FBFF", stroke: "#6F8EB7", font: 10 });
    d.rect({ x: 106, y, w: 154, h: 26, value: body, fill: "#FFFFFF", stroke: "#6F8EB7", font: 9, align: "left" });
    if (pri) d.rect({ x: 264, y, w: 30, h: 26, value: pri, fill, stroke: "#FA7A3A", font: 11, color: "#C42C18" });
  });
  d.rect({ x: 50, y: 280, w: 248, h: 116, fill: "#FBFDFF", stroke: "#2C5E9E", sw: 1.1, r: 1, extra: "dashed=1;" });
  d.text({ x: 110, y: 292, w: 124, h: 18, value: "Priority distribution", font: 11 });
  [["P1", 58, "#E94A45"], ["P2", 42, "#F28C13"], ["P3", 28, "#F2B233"]].forEach(([label, h, color], i) => {
    const x = 104 + i * 56;
    d.rect({ x, y: 362 - h, w: 24, h, fill: color, stroke: color, r: 0 });
    d.text({ x: x - 6, y: 365, w: 36, h: 16, value: label, font: 9 });
  });
  d.edge({ sx: 86, sy: 372, tx: 260, ty: 372, arrow: "classic" });
  d.text({ x: 62, y: 374, w: 36, h: 16, value: "Low", font: 8 });
  d.text({ x: 260, y: 374, w: 36, h: 16, value: "High", font: 8 });
}

function teamExecution(d) {
  d.panel({ x: 340, y: 52, w: 330, h: 366, title: "Team Execution", num: 2, color: "#0B6D70" });
  const tx = 352;
  const ty = 92;
  const tw = 304;
  const th = 282;
  const c1 = 74;
  const c2 = 184;
  const header = 30;
  const row = 63;
  d.rect({ x: tx, y: ty, w: tw, h: th, fill: "#FFFFFF", stroke: "#6F8EB7", sw: 1.2, r: 0 });
  d.rect({ x: tx, y: ty, w: tw, h: header, fill: "#EAF2FF", stroke: "#6F8EB7", sw: 1, r: 0 });
  [tx + c1, tx + c1 + c2].forEach((x) => d.edge({ sx: x, sy: ty, tx: x, ty: ty + th, arrow: "none", sw: 1, color: "#6F8EB7" }));
  [ty + header, ty + header + row, ty + header + row * 2, ty + header + row * 3, ty + th].forEach((y) => {
    d.edge({ sx: tx, sy: y, tx: tx + tw, ty: y, arrow: "none", sw: 1, color: "#6F8EB7" });
  });
  d.text({ x: tx + 18, y: ty + 8, w: 38, h: 14, value: "Agent", font: 8 });
  d.text({ x: tx + c1 + 42, y: ty + 8, w: 98, h: 14, value: "Message Flow / Tool Calls", font: 8 });
  d.text({ x: tx + c1 + c2 + 8, y: ty + 8, w: 32, h: 14, value: "State", font: 8 });

  const agents = [
    ["bot", "Planner", "Plan q<sub>i</sub>", "tool: decompose", "state<br>planning<br>..."],
    ["search", "Researcher", "Find patterns", "tool: web.search", "state<br>searching<br>..."],
    ["code", "Builder", "Implement module", "tool: code.exec", "state<br>coding<br>..."],
    ["shield", "Reviewer", "Review changes", "tool: test.run", "state<br>reviewing<br>..."]
  ];
  agents.forEach(([ic, name, message, tool, state], i) => {
    const top = ty + header + i * row;
    const cy = top + row / 2;
    d.icon({ name: ic, x: tx + 8, y: cy - 13, size: 25, color: "#103C80" });
    d.text({ x: tx + 38, y: cy - 9, w: 34, h: 18, value: name, font: 7.6, align: "left" });
    d.rect({ x: tx + c1 + 16, y: cy - 13, w: 54, h: 25, value: message, fill: "#F7FBFF", stroke: "#6F8EB7", font: 7.4 });
    d.edge({ sx: tx + c1 + 72, sy: cy, tx: tx + c1 + c2 - 12, ty: cy, arrow: "classic", sw: 1.2 });
    d.rect({ x: tx + c1 + 98, y: cy + 12, w: 72, h: 18, value: tool, fill: "#FFF9EA", stroke: "#8A7A55", font: 7.2 });
    d.rect({ x: tx + c1 + c2 + 7, y: cy - 22, w: 32, h: 44, value: state, fill: "#F7FBFF", stroke: "#6F8EB7", font: 6.4 });
  });
  [ty + header + row - 13, ty + header + row * 2 - 13, ty + header + row * 3 - 13].forEach((y) => {
    d.edge({ sx: tx + c1 + 58, sy: y, tx: tx + c1 + 58, ty: y + 28, arrow: "classic", sw: 1.2 });
  });
  d.edge({ sx: tx + 38, sy: 394, tx: tx + 78, ty: 394, arrow: "classic", sw: 1.2 });
  d.text({ x: tx + 86, y: 386, w: 56, h: 18, value: "message", font: 9, align: "left" });
  d.rect({ x: tx + 178, y: 384, w: 44, h: 18, fill: "#FFF9EA", stroke: "#8A7A55", font: 8 });
  d.text({ x: tx + 230, y: 386, w: 58, h: 18, value: "tool call", font: 9, align: "left" });
}

function traceMiner(d) {
  d.panel({ x: 704, y: 52, w: 360, h: 244, title: "Trace Miner", num: 3, color: "#3B7424" });
  d.text({ x: 724, y: 92, w: 70, h: 16, value: "Event Log", font: 10, align: "left" });
  d.table({
    x: 714,
    y: 112,
    w: 330,
    h: 120,
    font: 7.5,
    colWidths: [60, 72, 90, 64, 44],
    values: [
      ["Time", "Agent", "Action", "Artifact", "Reward"],
      ["10:01:12", "Planner", "plan.create", "plan_42", "−"],
      ["10:01:17", "Researcher", "web.search", "res_77", "0.1"],
      ["10:01:43", "Builder", "code.exec", "mod_a.py", "0.3"],
      ["10:02:21", "Reviewer", "test.run", "report_12", "0.4"],
      ["10:02:22", "Reviewer", "approve", "merge_33", "1.0"],
      ["...", "...", "...", "...", "..."]
    ]
  });
  d.text({ x: 718, y: 246, w: 46, h: 18, value: "Filters", font: 10, align: "left" });
  [["All", "#F7FBFF"], ["Success ✓", "#EAF8EF"], ["Failure ×", "#FFF0F0"], ["Agent: All", "#EAF2FF"]].forEach(([label, fill], i) => {
    d.rect({ x: 766 + i * 70, y: 244, w: i === 3 ? 80 : 58, h: 20, value: label, fill, stroke: "#6F8EB7", font: 8 });
  });
  d.rect({ x: 704, y: 306, w: 360, h: 112, fill: "#FBFEF8", stroke: "#689F38", sw: 1.2, r: 1, extra: "dashed=1;" });
  d.text({ x: 846, y: 312, w: 78, h: 18, value: "Rule Extractor", font: 10, color: "#356B20" });
  d.rect({ x: 728, y: 332, w: 70, h: 56, fill: "#FFFFFF", stroke: "#6F8EB7" });
  d.edge({ sx: 742, sy: 348, tx: 782, ty: 348, arrow: "classic", sw: 1.2 });
  d.edge({ sx: 742, sy: 364, tx: 782, ty: 364, arrow: "classic", sw: 1.2 });
  d.edge({ sx: 742, sy: 380, tx: 782, ty: 380, arrow: "classic", sw: 1.2 });
  d.edge({ sx: 802, sy: 360, tx: 838, ty: 360, arrow: "classic" });
  d.rect({ x: 838, y: 334, w: 120, h: 54, value: "Sequence Pattern<br>A<sub>1</sub> → A<sub>2</sub> → ... → A<sub>n</sub>", fill: "#FFFFFF", stroke: "#6F8EB7", font: 10 });
  d.edge({ sx: 960, sy: 360, tx: 994, ty: 360, arrow: "classic" });
  d.icon({ name: "document", x: 1008, y: 334, size: 42, color: "#123A5D" });
  d.text({ x: 994, y: 376, w: 70, h: 20, value: "<b>Rule</b>", font: 12 });
  d.text({ x: 730, y: 396, w: 286, h: 16, value: "min support: 5                         min reward: 0.5", font: 8 });
}

function registry(d) {
  d.panel({ x: 1092, y: 52, w: 402, h: 366, title: "Skill Registry", num: 4, color: "#C66F00" });
  d.icon({ name: "database", x: 1438, y: 64, size: 36, color: "#123A5D" });
  d.table({
    x: 1104,
    y: 102,
    w: 378,
    h: 266,
    font: 7.2,
    colWidths: [58, 72, 98, 96, 54],
    stroke: "#E0A247",
    headerFill: "#FFF2D8",
    hi: { "1,0": "#F7FBFF", "2,0": "#F7FBFF", "3,0": "#F7FBFF", "4,0": "#F7FBFF" },
    values: [
      ["Skill ID", "Trigger<br>(when)", "Preconditions<br>(if)", "Tool Recipe<br>(do)", "Score"],
      ["SKL-101<br><b>v3</b>", "New API<br>request", "auth ready<br>repo exists", "decompose →<br>code.exec →<br>test.run", "0.92 ↑"],
      ["SKL-102<br><b>v2</b>", "Search<br>best pattern", "internet ok", "web.search →<br>summarize", "0.74 ↑"],
      ["SKL-103<br><b>v1</b>", "Fix failing<br>test", "tests exist", "reproduce →<br>patch →<br>test.run", "0.81 ↑"],
      ["SKL-104<br><b>v3</b>", "Code<br>refactor", "coverage &gt; 60%<br>no open PR", "analyze →<br>refactor →<br>lint", "0.67 ↓"],
      ["...", "...", "...", "...", "..."]
    ]
  });
  [
    [1128, 178, "v3", "#42A65A"],
    [1128, 230, "v2", "#F28C13"],
    [1128, 282, "v1", "#1A73B8"],
    [1128, 334, "v3", "#42A65A"]
  ].forEach(([x, y, label, fill]) => {
    d.rect({ x, y, w: 28, h: 18, value: `<b>${label}</b>`, fill, stroke: fill, font: 9, color: "#FFFFFF" });
  });
  [[1466, 177, "↑", "#1D8B45"], [1466, 229, "↑", "#1D8B45"], [1466, 281, "↑", "#1D8B45"], [1466, 333, "↓", "#E02A25"]].forEach(([x, y, label, color]) => {
    d.text({ x, y, w: 18, h: 20, value: `<b>${label}</b>`, font: 16, color });
  });
  [["v1 initial", "#EAF2FF"], ["v2 improved", "#FFF3E0"], ["v3 stable", "#EAF8EF"], ["↑ improving", "#EAF8EF"], ["↓ dropping", "#FFF0F0"]].forEach(([label, fill], i) => {
    d.rect({ x: 1110 + i * 72, y: 378, w: 68, h: 24, value: label, fill, stroke: "#C9D4E2", font: 8 });
  });
}

function distillationLab(d) {
  d.panel({ x: 36, y: 448, w: 700, h: 326, title: "Distillation Lab", num: 5, color: "#103C80" });
  d.rect({ x: 48, y: 488, w: 496, h: 118, fill: "#FBFFFB", stroke: "#3A8B4A", r: 1 });
  d.icon({ name: "trophy", x: 56, y: 498, size: 28, color: "#3A8B4A" });
  d.text({ x: 92, y: 496, w: 150, h: 18, value: "<b>Positive Traces</b> (success)", font: 10, align: "left" });
  d.text({ x: 288, y: 496, w: 130, h: 18, value: "Pattern Induction", font: 10 });
  ["A1", "A2", "A3", "...", "An"].forEach((label, i) => {
    d.ellipse({ x: 64 + i * 34, y: 538, w: 22, h: 22, value: label, fill: "#EAF8EF", stroke: "#3A8B4A", font: 8 });
    if (i < 4) d.edge({ sx: 86 + i * 34, sy: 549, tx: 96 + i * 34, ty: 549, arrow: "classic", sw: 1.1 });
  });
  d.edge({ sx: 224, sy: 550, tx: 252, ty: 550, arrow: "classic" });
  d.table({ x: 252, y: 516, w: 154, h: 72, font: 7.5, colWidths: [58, 44, 52], values: [["Pattern", "Support", "Avg Reward"], ["P1", "52", "0.92"], ["P2", "31", "0.81"], ["...", "...", "..."]] });
  d.edge({ sx: 406, sy: 552, tx: 434, ty: 552, arrow: "classic" });
  d.rect({ x: 434, y: 516, w: 98, h: 72, fill: "#F7FBFF", stroke: "#3A8B4A" });
  d.icon({ name: "database", x: 462, y: 524, size: 32, color: "#123A5D" });
  d.text({ x: 450, y: 560, w: 72, h: 32, value: "skill script<br>+ preconditions<br>+ tool recipe", font: 8 });
  d.rect({ x: 48, y: 620, w: 496, h: 118, fill: "#FFFDFD", stroke: "#E24A44", r: 1, extra: "dashed=1;" });
  d.icon({ name: "cross", x: 56, y: 630, size: 28, color: "#E24A44" });
  d.text({ x: 92, y: 628, w: 150, h: 18, value: "<b>Negative Traces</b> (failure)", font: 10, align: "left" });
  d.text({ x: 288, y: 628, w: 120, h: 18, value: "Failure Taxonomy", font: 10 });
  ["A1", "A2", "A3", "...", "Ak"].forEach((label, i) => {
    d.ellipse({ x: 64 + i * 34, y: 670, w: 22, h: 22, value: label, fill: "#FFF3F2", stroke: "#E24A44", font: 8 });
    if (i < 4) d.edge({ sx: 86 + i * 34, sy: 681, tx: 96 + i * 34, ty: 681, arrow: "classic", sw: 1.1 });
  });
  d.edge({ sx: 224, sy: 682, tx: 286, ty: 682, arrow: "classic" });
  d.diamond({ x: 304, y: 648, w: 56, h: 48, value: "Error type?", stroke: "#456B99", font: 8 });
  ["Logic", "Env", "Data", "Other"].forEach((label, i) => d.rect({ x: 260 + i * 44, y: 706, w: 36, h: 18, value: label, fill: "#FFFFFF", stroke: "#6F8EB7", font: 7 }));
  d.edge({ sx: 360, sy: 682, tx: 432, ty: 682, arrow: "classic" });
  d.rect({ x: 434, y: 644, w: 98, h: 78, fill: "#FFF4F2", stroke: "#E24A44" });
  d.icon({ name: "shield", x: 462, y: 652, size: 34, color: "#E24A44" });
  d.text({ x: 444, y: 690, w: 82, h: 30, value: "guardrail rule<br>+ block / warn", font: 8 });
  d.rect({ x: 554, y: 488, w: 166, h: 156, fill: "#FFFFFF", stroke: "#7A9BC6" });
  d.text({ x: 594, y: 496, w: 86, h: 18, value: "<b>Skill Scoring</b>", font: 10 });
  d.text({ x: 566, y: 522, w: 140, h: 94, value: "score(skill) =<br>reuse_rate × success_delta − cost<br><br>reuse_rate = #uses / time_window<br>success_delta = E[reward] − baseline<br>cost = runtime_cost + maintenance_cost", font: 8, align: "left" });
  d.edge({ sx: 544, sy: 550, tx: 554, ty: 550, arrow: "classic" });
}

function deployMonitor(d) {
  d.panel({ x: 828, y: 448, w: 570, h: 326, title: "Deployment & Monitoring", num: 6, color: "#0B6D70" });
  d.text({ x: 852, y: 492, w: 104, h: 18, value: "Rollout Stages", font: 10, align: "left" });
  const stages = [
    ["document", "Draft", "#F7FBFF", "#1A73B8"],
    ["code", "Shadow Run<br>(100% mirror)", "#FFFFFF", "#6F8EB7"],
    ["users", "Canary<br>(5–20%)", "#FFFFFF", "#6F8EB7"],
    ["users", "Active<br>(100%)", "#F3FFF4", "#3A8B4A"],
    ["trash", "Deprecated", "#FFF4F2", "#E24A44"]
  ];
  stages.forEach(([ic, label, fill, stroke], i) => {
    const x = 852 + i * 112;
    d.rect({ x, y: 516, w: 64, h: 58, fill, stroke, r: 1, extra: i === 1 || i === 2 ? "dashed=1;" : "" });
    d.icon({ name: ic, x: x + 20, y: 522, size: 24, color: stroke });
    d.text({ x: x + 6, y: 550, w: 52, h: 20, value: label, font: 8 });
    if (i < stages.length - 1) d.edge({ sx: x + 64, sy: 545, tx: x + 104, ty: 545, arrow: "classic" });
  });
  d.rect({ x: 844, y: 588, w: 210, h: 136, fill: "#FBFDFF", stroke: "#6F8EB7" });
  d.text({ x: 862, y: 596, w: 142, h: 18, value: "Performance (score over time)", font: 9, align: "left" });
  d.edge({ sx: 870, sy: 704, tx: 1030, ty: 704, arrow: "classic", sw: 1.1 });
  d.edge({ sx: 870, sy: 704, tx: 870, ty: 620, arrow: "classic", sw: 1.1 });
  [[880, 670, 910, 640, 938, 650, 970, 628, 1028, 620, "#168557"], [880, 684, 920, 674, 955, 668, 990, 660, 1028, 650, "#2C5E9E"], [880, 696, 920, 692, 955, 688, 990, 690, 1028, 690, "#E24A44"]].forEach(([x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, color]) => {
    d.edge({ sx: x1, sy: y1, tx: x5, ty: y5, points: [[x2, y2], [x3, y3], [x4, y4]], color, arrow: "none", sw: 1.5 });
  });
  d.table({ x: 1064, y: 588, w: 246, h: 136, font: 7.4, colWidths: [45, 50, 56, 50, 45], values: [["Time", "Skill", "Type", "Severity", "Status"], ["10:22", "SKL-103 v1", "Logic Error", "High", "Open"], ["09:47", "SKL-101 v3", "Timeout", "Medium", "Triage"], ["09:12", "SKL-104 v3", "Data Drift", "Low", "Open"], ["...", "...", "...", "...", "..."]] });
  d.rect({ x: 1316, y: 588, w: 66, h: 136, fill: "#F7FBFF", stroke: "#6F8EB7" });
  d.icon({ name: "alert", x: 1336, y: 602, size: 30, color: "#123A5D" });
  d.text({ x: 1324, y: 638, w: 50, h: 70, value: "<b>Alerts</b><br>Error rate &gt; 2%<br>Latency &gt; P95<br>Drop in score", font: 8 });
  d.rect({ x: 846, y: 742, w: 530, h: 22, fill: "#FBFDFF", stroke: "#6F8EB7" });
  [["Monitoring Signals", "pulse"], ["Latency (P95)", "pulse"], ["Cost / Run", "database"], ["Reuse Rate", "loop"], ["User Feedback", "users"]].forEach(([label, ic], i) => {
    const x = 868 + i * 100;
    d.icon({ name: ic, x, y: 744, size: 16, color: "#123A5D" });
    d.text({ x: x + 18, y: 744, w: 78, h: 16, value: label, font: 8, align: "left" });
  });
}

function timeline(d) {
  d.rect({ x: 28, y: 798, w: 1458, h: 196, fill: "#FFFFFF", stroke: "#123A5D", sw: 1.4, r: 1, extra: "dashed=1;" });
  d.text({ x: 596, y: 806, w: 340, h: 24, value: "<b>7. Experience Accumulation Timeline</b>", font: 17, color: "#103C80" });
  const steps = [
    ["1", "Capture", "camera", "#103C80", "traces, logs<br>artifacts"],
    ["2", "Understand", "brain", "#0B7A78", "patterns, taxonomy,<br>insights"],
    ["3", "Distill", "flask", "#4A8732", "skills & guardrails<br>(verifies)"],
    ["4", "Validate", "clipboard", "#F0A51C", "offline eval +<br>A/B canary"],
    ["5", "Release", "rocket", "#EF6C22", "deploy to<br>production"],
    ["6", "Monitor", "pulse", "#E24A44", "metrics &<br>incidents"],
    ["7", "Learn", "book", "#B9486A", "update, version,<br>improve"]
  ];
  steps.forEach(([n, title, ic, color, desc], i) => {
    const x = 82 + i * 202;
    d.ellipse({ x, y: 844, w: 24, h: 24, value: `<b>${n}</b>`, fill: color, stroke: color, color: "#FFFFFF", font: 12 });
    d.rect({ x: x + 28, y: 834, w: 92, h: 56, fill: "#FFFFFF", stroke: color });
    d.icon({ name: ic, x: x + 38, y: 846, size: 25, color });
    d.text({ x: x + 70, y: 842, w: 44, h: 18, value: `<b>${title}</b>`, font: 8.5, align: "left" });
    d.text({ x: x + 70, y: 860, w: 48, h: 28, value: desc, font: 7.2, align: "left" });
    if (i < steps.length - 1) d.edge({ sx: x + 120, sy: 862, tx: x + 188, ty: 862, dashed: true, arrow: "classic" });
  });
  d.text({ x: 42, y: 944, w: 60, h: 18, value: "Asset Types", font: 10, align: "left" });
  [["Memory", "database", "raw traces, logs,<br>observations"], ["Resource", "document", "docs, patterns,<br>playbooks"], ["Skill", "code", "skills, recipes,<br>guardrails"], ["Evaluation", "shield", "datasets, tests,<br>benchmarks"], ["Release", "rocket", "versions, notes,<br>changelog"], ["Telemetry", "pulse", "metrics, alerts,<br>dashboards"], ["Knowledge", "book", "lessons, updates,<br>roadmap"]].forEach(([title, ic, desc], i) => {
    const x = 110 + i * 193;
    d.rect({ x, y: 914, w: 162, h: 62, fill: "#FBFDFF", stroke: i < 2 ? "#6F8EB7" : i < 4 ? "#5EA35A" : i < 5 ? "#EF8B32" : "#D05A68" });
    d.icon({ name: ic, x: x + 14, y: 930, size: 30, color: "#123A5D" });
    d.text({ x: x + 56, y: 922, w: 80, h: 18, value: `<b>${title}</b>`, font: 10, align: "left" });
    d.text({ x: x + 56, y: 942, w: 84, h: 26, value: desc, font: 8, align: "left" });
    if (i < 6) d.edge({ sx: x + 162, sy: 944, tx: x + 186, ty: 944, dashed: true, arrow: "classic" });
  });
}

function draw() {
  const d = new D();
  d.rect({ x: 0, y: 0, w: W, h: H, fill: "#FFFFFF", stroke: "#FFFFFF", sw: 0, r: 0 });
  d.text({ x: 398, y: 14, w: 740, h: 34, value: "<b>SkillCircuit: Closed-Loop Skill Distillation for Agent Teams</b>", font: 25 });
  taskStream(d);
  teamExecution(d);
  traceMiner(d);
  registry(d);
  distillationLab(d);
  deployMonitor(d);
  timeline(d);

  d.edge({ sx: 318, sy: 154, tx: 340, ty: 154 });
  d.edge({ sx: 318, sy: 216, tx: 340, ty: 216 });
  d.edge({ sx: 318, sy: 308, tx: 340, ty: 308 });
  d.edge({ sx: 670, sy: 188, tx: 704, ty: 188 });
  d.edge({ sx: 1064, sy: 188, tx: 1092, ty: 188 });
  d.edge({ sx: 158, sy: 418, tx: 158, ty: 448, dashed: true, color: "#123A5D" });
  d.edge({ sx: 736, sy: 552, tx: 828, ty: 552 });
  d.edge({ sx: 736, sy: 686, tx: 828, ty: 686 });
  d.rect({ x: 746, y: 504, w: 66, h: 74, fill: "#F7FBFF", stroke: "#6F8EB7" });
  d.icon({ name: "database", x: 768, y: 516, size: 30, color: "#0B6D70" });
  d.text({ x: 758, y: 550, w: 44, h: 18, value: "New Skills", font: 8 });
  d.rect({ x: 746, y: 628, w: 66, h: 74, fill: "#FFF4F2", stroke: "#E24A44" });
  d.icon({ name: "shield", x: 768, y: 640, size: 30, color: "#E24A44" });
  d.text({ x: 758, y: 674, w: 44, h: 18, value: "Guardrails", font: 8 });
  d.rect({ x: 1416, y: 594, w: 80, h: 148, fill: "#F8FFFE", stroke: "#0B6D70" });
  d.icon({ name: "loop", x: 1437, y: 610, size: 38, color: "#0B6D70" });
  d.text({ x: 1426, y: 652, w: 62, h: 76, value: "<b>Feedback<br>Loop</b><br>outcomes,<br>metrics,<br>incidents", font: 11, color: "#0B6D70" });
  d.edge({ sx: 1382, sy: 658, tx: 1416, ty: 658 });
  d.edge({ sx: 1456, sy: 594, tx: 1456, ty: 430, dashed: true, color: "#123A5D", points: [[1456, 430], [1390, 430], [1390, 418]] });
  d.edge({ sx: 1456, sy: 742, tx: 1456, ty: 798, dashed: true, color: "#123A5D" });
  d.edge({ sx: 28, sy: 128, tx: 74, ty: 128 });
  d.edge({ sx: 28, sy: 166, tx: 74, ty: 166 });
  d.edge({ sx: 28, sy: 202, tx: 74, ty: 202 });
  d.edge({ sx: 28, sy: 858, tx: 82, ty: 858, dashed: true, color: "#123A5D" });
  d.edge({ sx: 1490, sy: 976, tx: 1510, ty: 976, dashed: true, color: "#123A5D" });
  return d;
}

function writeAssets() {
  const svgDir = path.join(root, "svg");
  fs.mkdirSync(svgDir, { recursive: true });
  const assets = [
    ["camera", "Capture traces and artifacts"],
    ["brain", "Understand patterns"],
    ["flask", "Distill skills"],
    ["clipboard", "Validate and checklist"],
    ["rocket", "Release"],
    ["pulse", "Monitor telemetry"],
    ["book", "Learn and document"],
    ["table", "Registry table"],
    ["bot", "Planner agent"],
    ["search", "Research agent"],
    ["code", "Builder or code artifact"],
    ["shield", "Reviewer or guardrail"],
    ["database", "Skill or memory store"],
    ["document", "Rule or artifact"],
    ["users", "Team or rollout users"],
    ["trash", "Deprecated stage"],
    ["alert", "Incident alert"],
    ["loop", "Feedback loop"],
    ["trophy", "Positive trace"],
    ["cross", "Negative trace"]
  ];
  const lines = ["# SVG Assets", "", "| Asset | Meaning |", "| --- | --- |"];
  for (const [name, meaning] of assets) {
    fs.writeFileSync(path.join(svgDir, `${name}.svg`), iconSvg(name));
    lines.push(`| \`svg/${name}.svg\` | ${meaning} |`);
  }
  fs.writeFileSync(path.join(root, "SVG_ASSETS.md"), `${lines.join("\n")}\n`);
}

const diagram = draw();
fs.writeFileSync(path.join(root, "skillcircuit.drawio"), diagram.xml());
writeAssets();
console.log("Generated SkillCircuit draw.io example.");
