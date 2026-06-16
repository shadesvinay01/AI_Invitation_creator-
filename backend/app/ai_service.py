import os
import json

THEMES = [
    "royal_rajput", "golden_mandala", "watercolor_florals", "emerald_foil", 
    "tropical_palm", "classic_damask", "peacock_majesty", "vintage_lace", 
    "art_deco", "celestial", "minimalist_botanical", "rose_gold_brush", 
    "haldi_marigold", "gothic_romance", "rustic_wood", "modern_clean", 
    "boho_pampas", "lotus_pond", "pearl_ribbon", "geometric_marble"
]

def parse_prompt(prompt: str) -> dict:
    """
    Parses a natural language prompt into structured event data.
    """
    print("Using local mock parsing.")
    theme = "royal_rajput"
    lower_prompt = prompt.lower()
    
    if "beach" in lower_prompt or "tropical" in lower_prompt: theme = "tropical_palm"
    elif "haldi" in lower_prompt: theme = "haldi_marigold"
    elif "modern" in lower_prompt: theme = "modern_clean"
    elif "rose" in lower_prompt or "brush" in lower_prompt: theme = "rose_gold_brush"
    elif "minimal" in lower_prompt: theme = "minimalist_botanical"
    elif "lace" in lower_prompt: theme = "vintage_lace"
    elif "deco" in lower_prompt or "gatsby" in lower_prompt: theme = "art_deco"
    elif "gothic" in lower_prompt: theme = "gothic_romance"
    elif "wood" in lower_prompt or "rustic" in lower_prompt: theme = "rustic_wood"
    elif "peacock" in lower_prompt: theme = "peacock_majesty"
    elif "celestial" in lower_prompt or "night" in lower_prompt: theme = "celestial"
    
    return {
        "title": "Aarav & Priya",
        "subtitle": "Together with their families",
        "date": "December 20th, 2026",
        "venue": "The Grand Palace, Jaipur",
        "theme_id": theme
    }

