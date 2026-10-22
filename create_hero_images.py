from PIL import Image, ImageDraw, ImageFilter
import random
import math

def create_ai_assistant_image():
    """Crea imagen para slide 1: IA y Automatización"""
    width, height = 600, 600
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colores: cyan, magenta, azul
    cyan = (6, 182, 212, 255)
    magenta = (217, 70, 239, 255)
    blue = (59, 130, 246, 255)
    white = (255, 255, 255, 255)
    
    # Círculos concéntricos con gradiente simulado (centro cyan)
    center_x, center_y = width // 2, height // 2
    
    # Círculo exterior grande (magenta)
    for i in range(120, 50, -5):
        alpha = int(100 * (1 - (120 - i) / 70))
        color = (217, 70, 239, alpha)
        draw.ellipse([center_x - i, center_y - i, center_x + i, center_y + i], 
                     outline=color, width=2)
    
    # Rectángulos flotantes (simulan datos/elementos UI)
    rects = [
        (100, 150, 200, 200, cyan),
        (350, 120, 480, 180, magenta),
        (120, 350, 250, 420, blue),
        (380, 350, 510, 420, cyan),
        (200, 250, 330, 310, magenta),
    ]
    
    for x1, y1, x2, y2, color in rects:
        alpha_color = (color[0], color[1], color[2], 180)
        draw.rectangle([x1, y1, x2, y2], outline=alpha_color, width=3)
        # Líneas internas simulando contenido
        for line_y in range(y1 + 20, y2, 15):
            draw.line([x1 + 10, line_y, x2 - 10, line_y], fill=alpha_color, width=1)
    
    # Círculo central brillante (cyan)
    center_radius = 40
    draw.ellipse([center_x - center_radius, center_y - center_radius, 
                  center_x + center_radius, center_y + center_radius], 
                 outline=cyan, width=4)
    draw.ellipse([center_x - center_radius + 8, center_y - center_radius + 8, 
                  center_x + center_radius - 8, center_y + center_radius - 8], 
                 outline=blue, width=2)
    
    # Pequeños puntos conectores
    points = [
        (150, 100, cyan),
        (450, 100, magenta),
        (150, 500, blue),
        (450, 500, cyan),
    ]
    
    for px, py, pcolor in points:
        draw.ellipse([px - 8, py - 8, px + 8, py + 8], fill=pcolor)
    
    return img

def create_web_design_image():
    """Crea imagen para slide 2: Diseño Web"""
    width, height = 600, 600
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colores
    cyan = (6, 182, 212, 255)
    pink = (236, 72, 153, 255)
    green = (74, 222, 128, 255)
    white = (255, 255, 255, 180)
    
    # Laptop/pantalla central
    screen_x, screen_y = 150, 150
    screen_w, screen_h = 300, 250
    
    # Marco de pantalla
    draw.rectangle([screen_x, screen_y, screen_x + screen_w, screen_y + screen_h], 
                   outline=cyan, width=4)
    
    # Contenido de pantalla (líneas simulando web)
    content_colors = [cyan, pink, green, cyan]
    for i, color in enumerate(content_colors):
        y = screen_y + 30 + i * 50
        draw.line([screen_x + 20, y, screen_x + screen_w - 20, y], fill=color, width=3)
    
    # Botón en la pantalla
    btn_y = screen_y + screen_h - 40
    draw.rectangle([screen_x + 120, btn_y, screen_x + 180, btn_y + 25], 
                   outline=pink, width=2)
    
    # Teclado abajo
    keyboard_y = screen_y + screen_h + 20
    key_colors = [cyan, pink, green]
    for i in range(3):
        for j in range(4):
            key_x = screen_x + 40 + j * 60
            key_y = keyboard_y + i * 30
            draw.rectangle([key_x, key_y, key_x + 40, key_y + 20], 
                          outline=key_colors[(i + j) % 3], width=1)
    
    # Elementos flotantes alrededor
    # Lupa (search)
    circle_x, circle_y = 80, 280
    draw.ellipse([circle_x - 25, circle_y - 25, circle_x + 25, circle_y + 25], 
                outline=green, width=3)
    draw.line([circle_x + 20, circle_y + 20, circle_x + 35, circle_y + 35], 
             fill=green, width=3)
    
    # Teléfono (responsive)
    phone_x, phone_y = 500, 200
    draw.rectangle([phone_x - 20, phone_y - 50, phone_x + 20, phone_y + 50], 
                  outline=cyan, width=2)
    draw.rectangle([phone_x - 15, phone_y - 40, phone_x + 15, phone_y + 40], 
                  outline=cyan, width=1)
    
    # Líneas conectoras
    draw.line([screen_x - 20, screen_y + 100, circle_x + 25, circle_y], 
             fill=(100, 100, 100, 100), width=1)
    draw.line([screen_x + screen_w + 20, screen_y + 100, phone_x - 20, phone_y], 
             fill=(100, 100, 100, 100), width=1)
    
    return img

def create_optimization_image():
    """Crea imagen para slide 3: Optimización Web"""
    width, height = 600, 600
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colores
    cyan = (6, 182, 212, 255)
    magenta = (217, 70, 239, 255)
    orange = (249, 115, 22, 255)
    white = (255, 255, 255, 180)
    
    # Gráfico de velocidad (gauges/speedometer)
    center_x, center_y = 300, 250
    radius = 100
    
    # Círculo base del gauge
    draw.ellipse([center_x - radius, center_y - radius, 
                  center_x + radius, center_y + radius], 
                outline=cyan, width=4)
    
    # Líneas del gauge (como velocímetro)
    for angle in range(0, 180, 10):
        rad = math.radians(angle + 180)
        x1 = center_x + (radius - 10) * math.cos(rad)
        y1 = center_y + (radius - 10) * math.sin(rad)
        x2 = center_x + radius * math.cos(rad)
        y2 = center_y + radius * math.sin(rad)
        draw.line([x1, y1, x2, y2], fill=cyan, width=2)
    
    # Aguja de velocidad (pointing right/fast)
    needle_angle = math.radians(45)
    needle_x = center_x + 80 * math.cos(needle_angle)
    needle_y = center_y + 80 * math.sin(needle_angle)
    draw.line([center_x, center_y, needle_x, needle_y], fill=magenta, width=4)
    
    # Centro del gauge
    draw.ellipse([center_x - 10, center_y - 10, center_x + 10, center_y + 10], 
                fill=magenta)
    
    # Gráficas de rendimiento a los lados
    # Gráfica izquierda (barras)
    graph_x, graph_y = 100, 100
    bar_width = 15
    bar_heights = [60, 80, 50, 70, 90, 75]
    for i, height in enumerate(bar_heights):
        x1 = graph_x + i * 25
        y1 = graph_y + 120 - height
        x2 = x1 + bar_width
        y2 = graph_y + 120
        color = [cyan, magenta, orange, cyan, magenta, orange][i]
        draw.rectangle([x1, y1, x2, y2], outline=color, width=2)
    
    # Gráfica derecha (líneas)
    graph2_x = 480
    points_data = [(0, 80), (20, 60), (40, 70), (60, 40), (80, 50), (100, 30)]
    for i in range(len(points_data) - 1):
        x1, y1 = graph2_x + points_data[i][0], graph_y + points_data[i][1]
        x2, y2 = graph2_x + points_data[i+1][0], graph_y + points_data[i+1][1]
        draw.line([x1, y1, x2, y2], fill=orange, width=3)
    
    # Puntos en la línea
    for x, y in points_data:
        px, py = graph2_x + x, graph_y + y
        draw.ellipse([px - 4, py - 4, px + 4, py + 4], fill=orange)
    
    # Flash/lightning (speed indicator)
    flash_x, flash_y = 80, 450
    points_flash = [
        (flash_x, flash_y - 30),
        (flash_x - 15, flash_y - 10),
        (flash_x - 5, flash_y - 5),
        (flash_x - 10, flash_y + 30),
        (flash_x + 10, flash_y + 10),
        (flash_x + 5, flash_y + 5),
    ]
    draw.polygon(points_flash, outline=magenta, width=3)
    
    # Checkmark (optimizado)
    check_x, check_y = 520, 450
    draw.line([check_x - 20, check_y, check_x - 5, check_y + 20], 
             fill=cyan, width=4)
    draw.line([check_x - 5, check_y + 20, check_x + 20, check_y - 10], 
             fill=cyan, width=4)
    
    return img

# Crear directorio si no existe
import os
output_dir = "public/images/hero"
os.makedirs(output_dir, exist_ok=True)

# Generar imágenes
print("Generando imágenes del HERO...")

img1 = create_ai_assistant_image()
img1.save(f"{output_dir}/hero-ai.png", "PNG")
print(f"Creada: {output_dir}/hero-ai.png")

img2 = create_web_design_image()
img2.save(f"{output_dir}/hero-web-design.png", "PNG")
print(f"Creada: {output_dir}/hero-web-design.png")

img3 = create_optimization_image()
img3.save(f"{output_dir}/hero-optimization.png", "PNG")
print(f"Creada: {output_dir}/hero-optimization.png")

print("Imagenes creadas exitosamente!")
