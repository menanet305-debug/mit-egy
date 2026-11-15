#!/usr/bin/env python3
"""Convert hero and about images to optimized WebP and place them in public/images/.

Keeps quality high (q=82) while cutting file size vs the Unsplash JPEG.
"""
from PIL import Image
import os

TARGETS = [
    # (src path, dest name, target size)
    ("/tmp/hero-src.jpg", "hero-workspace.webp", (1920, 1080)),
]

# About-page images (same Unsplash IDs used in about/page.tsx)
ABOUT_IMGS = {
    "about-hero": "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "about-story": "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
}

DEST_DIR = "/home/z/my-project/public/images"
os.makedirs(DEST_DIR, exist_ok=True)


def save_webp(im: Image.Image, dest: str, quality: int = 82) -> None:
    im.save(dest, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(dest) / 1024
    print(f"  -> {dest}: {im.size[0]}x{im.size[1]}, {kb:.0f} KB")


for src, name, size in TARGETS:
    im = Image.open(src).convert("RGB")
    if im.size != size:
        im = im.resize(size, Image.LANCZOS)
    save_webp(im, os.path.join(DEST_DIR, name))
    print(f"OK {name}")
