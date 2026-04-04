import os
from PIL import Image

def process_image(src, dst):
    if not os.path.exists(src): return
    with Image.open(src) as img:
        # Resize to max 1200px width
        if img.width > 1200:
            w_percent = (1200 / float(img.width))
            h_size = int((float(img.height) * float(w_percent)))
            img = img.resize((1200, h_size), Image.Resampling.LANCZOS)
        
        # Save as optimized WEBP
        img.save(dst, "WEBP", optimize=True, quality=80)
        print(f"Processed {dst}")

process_image(r"C:\Users\naman\.gemini\antigravity\brain\d9b8529c-417d-4d4f-bc4d-a5fe58c6c587\elite_dental_clinic_sirsa_treatment_room_1775157027019.png", r"public\images\elite-dental-clinic-sirsa-treatment-room.webp")
process_image(r"C:\Users\naman\.gemini\antigravity\brain\d9b8529c-417d-4d4f-bc4d-a5fe58c6c587\elite_dental_clinic_sirsa_family_care_1775157043788.png", r"public\images\elite-dental-clinic-sirsa-family-care.webp")
process_image(r"C:\Users\naman\.gemini\antigravity\brain\d9b8529c-417d-4d4f-bc4d-a5fe58c6c587\elite_dental_clinic_sirsa_exterior_1775157059035.png", r"public\images\elite-dental-clinic-sirsa-exterior.webp")
