# Draw.io XML Patterns

Use these snippets as reminders; adapt coordinates and styles to the reference figure.

## Minimal Structure

```xml
<mxfile host="Electron" pages="1">
  <diagram name="Figure" id="figure-id">
    <mxGraphModel page="1" pageWidth="1672" pageHeight="941" math="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Editable Rectangle

```xml
<mxCell id="box1" value="Title"
  style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#111111;strokeWidth=1.5;fontFamily=Arial;"
  vertex="1" parent="1">
  <mxGeometry x="100" y="80" width="160" height="60" as="geometry"/>
</mxCell>
```

## Editable Text Label

```xml
<mxCell id="label1" value="Editable label"
  style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Arial;fontSize=14;"
  vertex="1" parent="1">
  <mxGeometry x="120" y="170" width="180" height="28" as="geometry"/>
</mxCell>
```

## SVG Image Cell

```xml
<mxCell id="icon1" value=""
  style="shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;image=data:image/svg+xml,%3Csvg...%3E;"
  vertex="1" parent="1">
  <mxGeometry x="120" y="100" width="48" height="48" as="geometry"/>
</mxCell>
```

## Connector With Points

```xml
<mxCell id="edge1" value=""
  style="endArrow=classic;html=1;rounded=0;strokeColor=#111111;strokeWidth=2;endFill=1;"
  edge="1" parent="1">
  <mxGeometry relative="1" as="geometry">
    <mxPoint x="100" y="100" as="sourcePoint"/>
    <mxPoint x="220" y="160" as="targetPoint"/>
    <Array as="points">
      <mxPoint x="160" y="100"/>
    </Array>
  </mxGeometry>
</mxCell>
```

## Group Container

Children use coordinates relative to the parent group.

```xml
<mxCell id="group1" value=""
  style="group;fillColor=none;strokeColor=none;"
  vertex="1" connectable="0" parent="1">
  <mxGeometry x="80" y="80" width="360" height="220" as="geometry"/>
</mxCell>

<mxCell id="group1-title" value="Group Title"
  style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5F7FA;strokeColor=#AAB2BD;fontFamily=Arial;"
  vertex="1" parent="group1">
  <mxGeometry x="16" y="16" width="328" height="36" as="geometry"/>
</mxCell>
```

## Practical Notes

- URL-encode SVGs before placing them in `image=data:image/svg+xml,...`.
- Keep generated IDs deterministic enough for debugging.
- Use `html=1` text for subscripts, superscripts, color spans, and line breaks.
- XML-escape text values: `&`, `<`, `>`, and quotes inside attributes.
- Use uncompressed XML. It is easier for agents to inspect, patch, and validate.
- If draw.io exports a PNG despite Electron GPU warnings, treat exit code and file existence as the primary signal.
