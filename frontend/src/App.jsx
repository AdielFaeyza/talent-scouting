import React from 'react';

// 1. Dummy Data Pemain (Tetap sama)
const players = [
  { id: 1, name: "Sudirman", position: "ST", rating: 85, top: "15%", left: "50%", img: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Witan", position: "LW", rating: 82, top: "25%", left: "20%", img: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Egy", position: "RW", rating: 80, top: "25%", left: "80%", img: "https://i.pravatar.cc/150?img=13" },
  { id: 4, name: "Evan", position: "CM", rating: 79, top: "45%", left: "35%", img: "https://i.pravatar.cc/150?img=14" },
  { id: 5, name: "Klok", position: "CM", rating: 83, top: "45%", left: "65%", img: "https://i.pravatar.cc/150?img=15" },
  { id: 6, name: "Asnawi", position: "RB", rating: 84, top: "70%", left: "85%", img: "https://i.pravatar.cc/150?img=16" },
  { id: 7, name: "Arhan", position: "LB", rating: 81, top: "70%", left: "15%", img: "https://i.pravatar.cc/150?img=17" },
  { id: 8, name: "Baggott", position: "CB", rating: 86, top: "75%", left: "35%", img: "https://i.pravatar.cc/150?img=18" },
  { id: 9, name: "Amat", position: "CB", rating: 87, top: "75%", left: "65%", img: "https://i.pravatar.cc/150?img=19" },
  { id: 10, name: "Nadeo", position: "GK", rating: 78, top: "90%", left: "50%", img: "https://i.pravatar.cc/150?img=20" },
];

// 2. Komponen Kartu Pemain (Tetap sama)
const PlayerCard = ({ player }) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
      style={{ top: player.top, left: player.left }}
    >
      <div className="relative bg-zinc-800 rounded-lg shadow-xl p-1 border-2 border-emerald-500 w-16 sm:w-20 flex flex-col items-center">
        <div className="absolute -top-2 -left-2 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow">
          {player.rating}
        </div>
        <img src={player.img} alt={player.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-zinc-500 mb-1" />
        <div className="text-center w-full">
          <p className="text-white text-[9px] sm:text-[11px] font-bold truncate uppercase">{player.name}</p>
          <p className="text-emerald-400 text-[8px] sm:text-[10px] font-semibold">{player.position}</p>
        </div>
      </div>
    </div>
  );
};

// 3. Komponen Utama (Dashboard Layout)
export default function App() {
  return (
    // Container Utama: Flexbox satu layar penuh (h-screen)
    <div className="flex h-screen bg-zinc-900 font-sans overflow-hidden">
      
      {/* SIDEBAR KIRI */}
      <aside className="w-64 bg-zinc-950 text-white flex flex-col border-r border-zinc-800">
        {/* Logo */}
        <div className="p-6 text-2xl font-extrabold text-emerald-500 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-zinc-950 text-xl">⚽</div>
          TalentScout
        </div>
        
        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <a href="#" className="px-4 py-3 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-3 shadow-md">
            <span>📊</span> Dashboard
          </a>
          <a href="#" className="px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition flex items-center gap-3">
            <span>🏃‍♂️</span> Players
          </a>
          <a href="#" className="px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition flex items-center gap-3">
            <span>⚔️</span> Matches
          </a>
          <a href="#" className="px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition flex items-center gap-3">
            <span>⚙️</span> Settings
          </a>
        </nav>
      </aside>

      {/* AREA KONTEN KANAN */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* HEADER ATAS */}
        <header className="bg-zinc-900/95 sticky top-0 z-50 border-b border-zinc-800 p-4 px-8 flex justify-between items-center text-white backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-zinc-200">Team Overview</h2>
          <div className="flex items-center gap-4 hover:bg-zinc-800 p-2 rounded-lg cursor-pointer transition">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">Coach Shin</p>
              <p className="text-xs text-emerald-400">Head Coach</p>
            </div>
            <img src="https://i.pravatar.cc/150?img=33" alt="Coach" className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover" />
          </div>
        </header>

        {/* KONTEN UTAMA (Lapangan) */}
        <div className="p-8 flex flex-col items-center">
          <div className="w-full max-w-3xl flex justify-between items-end mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Player Stats <span className="text-emerald-500">Formation</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">4-3-3 Attacking Formation</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition shadow-lg">
              Edit Formation
            </button>
          </div>

          {/* Container Lapangan */}
          <div className="relative w-full max-w-3xl aspect-[2/3] sm:aspect-[3/4] bg-emerald-700 border-4 border-zinc-800 rounded-xl shadow-2xl overflow-hidden bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/45/Football_field.svg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/10"></div>

            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}