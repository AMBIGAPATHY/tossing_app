from PIL import Image
import os

SRC = "assets/logo.png"   # your source logo (prefer 512×512 PNG with transparency)
OUT_DIR = "assets"
SIZES = [32, 180, 192, 256, 512]

os.makedirs(OUT_DIR, exist_ok=True)
img = Image.open(SRC).convert("RGBA")

for s in SIZES:
    canvas = Image.new("RGBA", (s, s), (255, 255, 255, 0))
    icon = img.copy()
    icon.thumbnail((s, s), Image.Resampling.LANCZOS)
    x = (s - icon.width) // 2
    y = (s - icon.height) // 2
    canvas.paste(icon, (x, y), icon)
    out_path = os.path.join(OUT_DIR, f"icon-{s}.png")
    canvas.save(out_path, format="PNG")
    print("wrote", out_path)
