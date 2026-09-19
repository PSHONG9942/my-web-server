import os
import re
import urllib.request
import glob

# Find all images referenced in the html files
science_dir = r"c:\Users\Admin\Desktop\my-web-server\science"
images_dir = os.path.join(science_dir, "images")
os.makedirs(images_dir, exist_ok=True)

image_files = set()
pattern = re.compile(r'images/([^"\'\s<>]+)')

for filepath in glob.glob(os.path.join(science_dir, "*.html")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        matches = pattern.findall(content)
        for match in matches:
            image_files.add(match)

base_url = "https://sjkcabm.pages.dev/science/images/"

for img in image_files:
    url = base_url + img
    out_path = os.path.join(images_dir, img)
    if not os.path.exists(out_path):
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Referer': 'https://sjkcabm.pages.dev/science/'}
            )
            with urllib.request.urlopen(req) as response, open(out_path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {img}")
        except Exception as e:
            print(f"Failed to download {img}: {e}")
    else:
        print(f"Already exists {img}")

print("Done")
