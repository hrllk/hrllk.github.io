import os
import re

posts_dir = "/Users/alzar/task/sources/personal/blog-back/_posts"
files = [f for f in os.listdir(posts_dir) if f.endswith(".md")]

def refine_content(content):
    # 1. Remove TODO comments
    content = re.sub(r'<!--\s*TODO:.*?-->', '', content, flags=re.DOTALL)
    
    # 2. Convert "### Header\n---" to "## Header"
    # Matches case-insensitive headers and removes following horizontal line
    lines = content.split("\n")
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Check if it's a "### Header" followed by "---"
        if i + 1 < len(lines) and re.match(r'^###\s+', line) and re.match(r'^---$', lines[i+1].strip()):
            # Upgrade to ## and skip the next line (---)
            new_header = re.sub(r'^###\s+', '## ', line)
            new_lines.append(new_header)
            i += 2
            continue
        
        new_lines.append(line)
        i += 1
    
    return "\n".join(new_lines)

for filename in files:
    path = os.path.join(posts_dir, filename)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = refine_content(content)
    
    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Refined Body: {filename}")
