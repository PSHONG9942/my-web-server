import urllib.request
import os

keywords = [
    "padang_besar", "langkawi", "cameron", "ipoh", "taiping", "pangkor", 
    "jonker", "Electric", "afamosa", "stadthuys", "pd", "penang", "gurney", 
    "ferringhi", "kinabalu", "kundasang", "sipadan", "kelantan", "kuching", 
    "mulu", "Water", "bako", "legoland", "desaru", "jb", "klia", 
    "batu_caves", "klcc"
]

base_url = "https://sjkcabm.pages.dev/tools/assets/"
out_dir = r"c:\Users\Admin\Desktop\my-web-server\tools\assets"

os.makedirs(out_dir, exist_ok=True)

for keyword in keywords:
    for i in [1, 2]:
        filename = f"{keyword}_{i}.png"
        url = base_url + filename
        out_path = os.path.join(out_dir, filename)
        if not os.path.exists(out_path):
            try:
                req = urllib.request.Request(
                    url, 
                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Referer': 'https://sjkcabm.pages.dev/tools/game'}
                )
                with urllib.request.urlopen(req) as response, open(out_path, 'wb') as out_file:
                    out_file.write(response.read())
                print(f"Downloaded {filename}")
            except Exception as e:
                print(f"Failed to download {filename}: {e}")
        else:
            print(f"Already exists {filename}")

print("Done")
