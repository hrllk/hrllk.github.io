import os
import re

posts_dir = "/Users/alzar/task/sources/personal/blog-back/_posts"
files = [f for f in os.listdir(posts_dir) if f.endswith(".md")]

def fix_front_matter(content):
    if not content.startswith("---"):
        return content
    
    parts = content.split("---", 2)
    if len(parts) < 3:
        return content
    
    front_matter_raw = parts[1]
    body = parts[2]
    
    lines = front_matter_raw.strip().split("\n")
    metadata = {}
    
    # Simple parse
    current_key = None
    for line in lines:
        if ":" in line:
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip()
            if val:
                metadata[key] = val
                current_key = key
            else:
                metadata[key] = []
                current_key = key
        elif line.strip().startswith("-") and current_key:
            val = line.strip().lstrip("-").strip()
            if isinstance(metadata[current_key], list):
                metadata[current_key].append(val)

    # Reconstruct Front Matter
    new_fm = []
    new_fm.append("layout: post")
    
    # Title - wrap in quotes if not already
    title = metadata.get("title", "")
    if title and not (title.startswith('"') and title.endswith('"')):
        title = f'"{title}"'
    new_fm.append(f"title: {title}")
    
    # Category
    category = ""
    if "category" in metadata:
        category = metadata["category"]
    elif "categories" in metadata:
        cats = metadata["categories"]
        if isinstance(cats, list) and len(cats) > 0:
            category = cats[0]
        elif isinstance(cats, str):
            category = cats
            
    if category:
        new_fm.append(f"category: {category}")
    
    # Published
    published = metadata.get("published", "false")
    new_fm.append(f"published: {published}")
    
    # Join with separator
    result = "---\n" + "\n".join(new_fm) + "\n---\n" + body
    return result

for filename in files:
    path = os.path.join(posts_dir, filename)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Only fix if layout is missing (as a proxy for needing fix)
    if "layout: post" not in content[:200]:
        new_content = fix_front_matter(content)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Fixed: {filename}")
