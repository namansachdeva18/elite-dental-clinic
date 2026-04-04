import os
from PIL import Image, ImageDraw

def create_fallback(path):
    img = Image.new('RGB', (800, 600), color = '#f3f4f6')
    d = ImageDraw.Draw(img)
    d.text((350, 300), "Image Not Found", fill="#9ca3af")
    img.save(path, "WEBP", quality=80)
    print(f"Created {path}")

def optimize_directory(folder_path):
    for filename in os.listdir(folder_path):
        filepath = os.path.join(folder_path, filename)
        
        # ensure lowercase formatting
        lower_name = filename.lower()
        if lower_name != filename:
            new_filepath = os.path.join(folder_path, lower_name)
            os.rename(filepath, new_filepath)
            filepath = new_filepath
            filename = lower_name

        if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
            webp_name = filename.rsplit(".", 1)[0] + ".webp"
            webp_path = os.path.join(folder_path, webp_name)
            
            with Image.open(filepath) as img:
                # convert to RGB if PNG/alpha exists
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                    
                # aggressive downscaling rule to fit < 200kb easily
                if img.width > 1200:
                    w_percent = (1200 / float(img.width))
                    h_size = int((float(img.height) * float(w_percent)))
                    img = img.resize((1200, h_size), Image.Resampling.LANCZOS)
                
                img.save(webp_path, "WEBP", quality=75, optimize=True)
            
            print(f"Converted {filename} to {webp_name}")
            os.remove(filepath)

if __name__ == '__main__':
    images_dir = r"public\images"
    optimize_directory(images_dir)
    create_fallback(os.path.join(images_dir, "fallback.webp"))
