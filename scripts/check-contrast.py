#!/usr/bin/env python3
"""WCAG contrast ratio check for the site's text color tokens (light mode)."""

def srgb_to_lin(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i+2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * srgb_to_lin(r) + 0.7152 * srgb_to_lin(g) + 0.0722 * srgb_to_lin(b)

def ratio(fg: str, bg: str) -> float:
    l1, l2 = luminance(fg), luminance(bg)
    if l1 < l2:
        l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

checks = [
    ("muted-foreground #6b6b6b", "#6b6b6b", "#ffffff", 4.5),
    ("muted-foreground on muted bg", "#6b6b6b", "#f5f5f5", 4.5),
    ("brand-gold #c29a59 on white (body)", "#c29a59", "#ffffff", 4.5),
    ("brand-gold #c29a59 on white (large 3:1)", "#c29a59", "#ffffff", 3.0),
    ("brand-navy #1a2b4c on white", "#1a2b4c", "#ffffff", 4.5),
    ("white on brand-gold (buttons)", "#ffffff", "#c29a59", 4.5),
    ("brand-navy on brand-gold (buttons)", "#1a2b4c", "#c29a59", 4.5),
    ("white/70 on brand-navy (footer links)", "#b6bfce", "#1a2b4c", 4.5),
    ("white/85 on brand-navy (hero subtitle)", "#d3d9e3", "#1a2b4c", 4.5),
]

print(f"{'pair':45} ratio   required  pass")
for name, fg, bg, req in checks:
    r = ratio(fg, bg)
    print(f"{name:45} {r:5.2f}:1  {req:4.1f}:1   {'PASS' if r >= req else 'FAIL'}")
