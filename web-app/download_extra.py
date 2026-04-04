import urllib.request
from PIL import Image
import os

def dl_and_process(url, dst):
    if os.path.exists(dst): return
    temp_path = "temp_dl.jpg"
    print(f"Downloading {url} ...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(temp_path, 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    
    with Image.open(temp_path) as img:
        img = img.resize((800, 600), Image.Resampling.LANCZOS)
        img.save(dst, "WEBP", optimize=True, quality=80)
        print(f"Processed {dst}")
    os.remove(temp_path)

dl_and_process("https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop", r"public\images\elite-dental-clinic-sirsa-treatment-room-2.webp")
dl_and_process("https://images.unsplash.com/photo-1598256989800-fea5a18a513e?q=80&w=1200&auto=format&fit=crop", r"public\images\elite-dental-clinic-sirsa-treatment-room-3.webp")
dl_and_process("https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop", r"public\images\elite-dental-clinic-sirsa-reception.webp")
dl_and_process("https://images.unsplash.com/photo-1590611936760-eeb9bc598548?q=80&w=1200&auto=format&fit=crop", r"public\images\elite-dental-clinic-sirsa-waiting-lounge.webp")
