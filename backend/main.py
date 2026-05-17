from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Konfigurasi CORS agar React (port 5173) diizinkan mengambil data dari API (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pindahkan dummy data ke sini
players_db = [
  {"id": 1, "name": "Sudirman", "position": "ST", "rating": 85, "top": "15%", "left": "50%", "img": "https://i.pravatar.cc/150?img=11"},
  {"id": 2, "name": "Witan", "position": "LW", "rating": 82, "top": "25%", "left": "20%", "img": "https://i.pravatar.cc/150?img=12"},
  {"id": 3, "name": "Egy", "position": "RW", "rating": 80, "top": "25%", "left": "80%", "img": "https://i.pravatar.cc/150?img=13"},
  # ... (bisa tambahkan pemain lain di sini)
]

@app.get("/")
def read_root():
    return {"message": "API Talent Scouting Berjalan Lancar! ⚽"}

@app.get("/api/players")
def get_players():
    return players_db