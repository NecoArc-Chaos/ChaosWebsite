#!/usr/bin/env python3
"""Subset Chinese/Japanese fonts with glyphs actually used in the site."""
import os
import re
import subprocess
import sys
import tempfile

FONT_DIR = os.path.join("src", "assets", "fonts")
FONTS = [
    "ZenMaruGothic-Medium.ttf",
    "MarukoGothicCJKsc-Medium.ttf",
]

# 收集源码中用到的字符
CHARS = set()

# 基础 ASCII（字母、数字、常见标点）
for c in (
    "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789"
    " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    "\t\n\r"
):
    CHARS.add(c)

# 扫描 src/ 目录
for root, dirs, files in os.walk("src"):
    for f in files:
        if f.endswith((".ts", ".astro", ".md", ".json", ".html", ".js", ".mjs", ".css", ".styl")):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as fh:
                    text = fh.read()
                    # CJK 统一汉字
                    CHARS.update(re.findall(r"[\u4e00-\u9fff]", text))
                    # CJK 扩展 A
                    CHARS.update(re.findall(r"[\u3400-\u4dbf]", text))
                    # CJK 标点符号
                    CHARS.update(re.findall(r"[\u3000-\u303f\uff00-\uffef]", text))
                    # 日文假名
                    CHARS.update(re.findall(r"[\u3040-\u309f\u30a0-\u30ff]", text))
                    # 全角 ASCII
                    CHARS.update(re.findall(r"[\uff01-\uff5e]", text))
            except Exception:
                pass

# 确保包含一些基础符号（即使源码里没扫描到）
for c in "。，！？、；：「」『』【】（）《》…—·～・。、":
    CHARS.add(c)

chars_str = "".join(sorted(CHARS))
print(f"Collected {len(CHARS)} unique characters for subsetting.")

# 如果没有 fonttools，直接跳过
try:
    import fontTools.subset  # noqa: F401
except ImportError:
    print("fonttools not installed, skip font subsetting.")
    sys.exit(0)


def subset_font(font_name: str):
    src = os.path.join(FONT_DIR, font_name)
    if not os.path.exists(src):
        print(f"Font not found: {src}")
        return

    # 备份原文件（如果还没有备份）
    backup = src + ".orig"
    if not os.path.exists(backup):
        with open(src, "rb") as f:
            data = f.read()
        with open(backup, "wb") as f:
            f.write(data)

    # 写入临时文本文件
    fd, text_path = tempfile.mkstemp(suffix=".txt", prefix="subset-")
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(chars_str)

    out = src + ".subset.ttf"
    cmd = [
        "pyftsubset",
        src,
        f"--text-file={text_path}",
        f"--output-file={out}",
        "--layout-features=*",
        "--glyph-names",
        "--symbol-cmap",
        "--legacy-cmap",
        "--notdef-glyph",
        "--recommended-glyphs",
        "--name-IDs=*",
        "--name-legacy",
        "--name-languages=*",
    ]

    print(f"Subsetting {font_name} ...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"pyftsubset failed for {font_name}: {result.stderr}")
        os.unlink(text_path)
        return

    # 覆盖原文件
    os.replace(out, src)
    os.unlink(text_path)
    print(f"Subset {font_name} done.")


for font in FONTS:
    subset_font(font)

print("All fonts subsetted.")
