import React, { useState } from "react";

export default function App() {
  // 1. STATE NAVIGASI TAB
  const [activeTab, setActiveTab] = useState("dashboard");

  // 2. STATE UTAMA DATA PEMAIN (Data Riil Tanpa Pembobotan Skor AI)
  const [players, setPlayers] = useState([
    { id: 1, name: "Sudirman", position: "ST", line: "forward", rating: 85, top: "18%", left: "50%", img: "https://i.pravatar.cc/150?img=11", status: "Siap Kompetisi" },
    { id: 2, name: "Witan", position: "LM", line: "midfield", rating: 82, top: "45%", left: "20%", img: "https://i.pravatar.cc/150?img=12", status: "Siap Kompetisi" },
    { id: 3, name: "Egy", position: "RM", line: "midfield", rating: 80, top: "45%", left: "80%", img: "https://i.pravatar.cc/150?img=13", status: "Masa Pemantauan" },
    { id: 4, name: "Evan", position: "CAM", line: "forward", rating: 79, top: "25%", left: "50%", img: "https://i.pravatar.cc/150?img=14", status: "Siap Kompetisi" },
    { id: 5, name: "Klok", position: "CDM", line: "midfield", rating: 83, top: "55%", left: "50%", img: "https://i.pravatar.cc/150?img=15", status: "Siap Kompetisi" },
    { id: 6, name: "Asnawi", position: "RB", line: "defender", rating: 84, top: "72%", left: "82%", img: "https://i.pravatar.cc/150?img=16", status: "Siap Kompetisi" },
    { id: 7, name: "Arhan", position: "LB", line: "defender", rating: 81, top: "72%", left: "18%", img: "https://i.pravatar.cc/150?img=17", status: "Siap Kompetisi" },
    { id: 8, name: "Baggott", position: "CB", line: "defender", rating: 86, top: "75%", left: "38%", img: "https://i.pravatar.cc/150?img=18", status: "Siap Kompetisi" },
    { id: 9, name: "Amat", position: "CB", line: "defender", rating: 87, top: "75%", left: "62%", img: "https://i.pravatar.cc/150?img=19", status: "Masa Pemantauan" },
    { id: 10, name: "Nadeo", position: "GK", line: "goalkeeper", rating: 78, top: "90%", left: "50%", img: "https://i.pravatar.cc/150?img=20", status: "Pemulihan" },
  ]);

  // 3. STATE MANAJEMEN FORM (TAMBAH / EDIT PEMAIN)
  const [formData, setFormData] = useState({ id: "", name: "", position: "ST", line: "forward", rating: "", status: "Siap Kompetisi" });
  const [isEditing, setIsEditing] = useState(false);

  // 4. STATE DUMMY DATA PERTANDINGAN (MATCHES)
  const [matches, setMatches] = useState([
    { id: 1, opponent: "Garuda Muda FC", type: "Uji Coba Internal", date: "24 Mei 2026", score: "3 - 1", status: "Selesai" },
    { id: 2, opponent: "Bhayangkara Muda", type: "Liga SSB Regional", date: "30 Mei 2026", score: "vs", status: "Mendatang" },
  ]);

  // 5. STATE PENGATURAN (SETTINGS)
  const [settings, setSettings] = useState({
    clubName: "SSB Talent Scouting Indonesia",
    season: "2026/2027",
    formationDefault: "4-3-3",
  });

  // ==========================================
  // HANDLER LOGIKA CRUD PEMAIN (MURNI TANPA AI)
  // ==========================================
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSavePlayer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rating) return alert("Mohon lengkapi data!");

    if (isEditing) {
      // UPDATE DATA
      setPlayers(
        players.map((p) =>
          p.id === formData.id
            ? {
                ...p,
                name: formData.name,
                position: formData.position,
                line: formData.line,
                rating: parseInt(formData.rating),
                status: formData.status,
              }
            : p,
        ),
      );
      setIsEditing(false);
    } else {
      // TAMBAH DATA BARU (Posisi koordinat lapangan diacak/disesuaikan otomatis secara kasat mata)
      const positionCoordinates = {
        forward: { top: "25%", left: `${30 + Math.random() * 40}%` },
        midfield: { top: "50%", left: `${20 + Math.random() * 60}%` },
        defender: { top: "75%", left: `${20 + Math.random() * 60}%` },
        goalkeeper: { top: "90%", left: "50%" },
      };

      const newPlayer = {
        id: Date.now(),
        name: formData.name,
        position: formData.position,
        line: formData.line,
        rating: parseInt(formData.rating),
        status: formData.status,
        top: positionCoordinates[formData.line].top,
        left: positionCoordinates[formData.line].left,
        img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}`,
      };
      setPlayers([...players, newPlayer]);
    }
    setFormData({ id: "", name: "", position: "ST", line: "forward", rating: "", status: "Siap Kompetisi" });
  };

  const handleEditTrigger = (player) => {
    setFormData({
      id: player.id,
      name: player.name,
      position: player.position,
      line: player.line,
      rating: player.rating,
      status: player.status,
    });
    setIsEditing(true);
  };

  const handleDeletePlayer = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus atlet ini dari daftar?")) {
      setPlayers(players.filter((p) => p.id !== id));
      if (formData.id === id) {
        setIsEditing(false);
        setFormData({ id: "", name: "", position: "ST", line: "forward", rating: "", status: "Siap Kompetisi" });
      }
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 font-sans overflow-hidden text-zinc-100">
      {/* SIDEBAR NAVIGATION KIRI */}
      <aside className="w-64 bg-zinc-950 flex flex-col border-r border-zinc-800">
        <div className="p-6 text-xl font-black text-emerald-500 border-b border-zinc-800 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-zinc-950 text-base">⚽</div>
          TALENT SCOUT
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "dashboard" ? "bg-emerald-600 text-white shadow-md" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
          >
            <span className="text-sm">📊</span> Dashboard Tim
          </button>
          <button
            onClick={() => setActiveTab("players")}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "players" ? "bg-emerald-600 text-white shadow-md" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
          >
            <span className="text-sm">🏃‍♂️</span> Kelola Pemain
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "matches" ? "bg-emerald-600 text-white shadow-md" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
          >
            <span className="text-sm">⚔️</span> Riwayat Match
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "settings" ? "bg-emerald-600 text-white shadow-md" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
          >
            <span className="text-sm">⚙️</span> Pengaturan
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex items-center gap-3">
          <img src="https://i.pravatar.cc/150?img=33" alt="Coach" className="w-9 h-9 rounded-full object-cover border border-emerald-500" />
          <div className="truncate">
            <p className="text-xs font-bold text-zinc-200">Coach Shin</p>
            <p className="text-[10px] text-zinc-500 font-medium">Head Scout Panel</p>
          </div>
        </div>
      </aside>

      {/* WORKSPACE SEBELAH KANAN */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* HEADER TOP BAR */}
        <header className="bg-zinc-900/80 sticky top-0 z-40 border-b border-zinc-800 p-4 px-8 flex justify-between items-center backdrop-blur-md">
          <div>
            <h2 className="text-base font-bold text-zinc-100 uppercase tracking-wide">
              {activeTab === "dashboard" && "Tactical Overview"}
              {activeTab === "players" && "Player Database Directory"}
              {activeTab === "matches" && "Match Records Panel"}
              {activeTab === "settings" && "System Configuration"}
            </h2>
            <p className="text-[11px] text-zinc-500">
              {settings.clubName} — Musim {settings.season}
            </p>
          </div>
          <span className="text-[11px] bg-zinc-800 border border-zinc-700 font-bold px-3 py-1.5 rounded-lg text-emerald-400">🟢 ONLINE LOCALHOST</span>
        </header>

        {/* CONTAINER ISI KONTEN TAB */}
        <div className="p-8 flex-1">
          {/* ==========================================
               TAB 1: DASHBOARD TIM (Visual Lapangan)
               ========================================== */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Lapangan */}
              <div className="xl:col-span-2 flex justify-center">
                <div className="relative w-full max-w-2xl aspect-[3/4] bg-emerald-800 border-4 border-zinc-950 rounded-2xl shadow-2xl overflow-hidden bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/45/Football_field.svg')] bg-cover bg-center bg-no-repeat">
                  <div className="absolute inset-0 bg-black/5"></div>

                  {players.map((player) => (
                    <div key={player.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer hover:scale-110 transition-transform duration-200 z-10" style={{ top: player.top, left: player.left }}>
                      <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl p-1.5 w-16 sm:w-20 flex flex-col items-center shadow-lg">
                        <div className="absolute -top-2 -left-2 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-md border border-zinc-800">{player.rating}</div>
                        <img src={player.img} alt={player.name} className="w-8 h-8 rounded-full object-cover border border-zinc-700 mb-1" />
                        <p className="text-[9px] font-bold text-zinc-100 truncate w-full text-center uppercase tracking-tight">{player.name.split(" ")[0]}</p>
                        <p className="text-[8px] font-medium text-emerald-400 uppercase">{player.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Status Ringkasan */}
              <div className="space-y-6">
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 border-b border-zinc-800 pb-2">Komposisi Skuad</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs p-2.5 bg-zinc-900 rounded-xl border border-zinc-800/40">
                      <span className="text-zinc-400">Total Atlet Terdaftar</span>
                      <span className="font-extrabold text-emerald-400 text-sm">{players.length} Pemain</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-2.5 bg-zinc-900 rounded-xl border border-zinc-800/40">
                      <span className="text-zinc-400">Rata-Rata Rating Tim</span>
                      <span className="font-extrabold text-amber-400 text-sm">{(players.reduce((acc, p) => acc + p.rating, 0) / (players.length || 1)).toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs leading-relaxed text-zinc-400">
                  💡 <strong>Informasi Sinkronisasi:</strong> Menggunakan struktur data *Reactive State*. Mengurangi atau menambah atlet pada tab <strong>Kelola Pemain</strong> akan otomatis memperbarui plot koordinat visual lapangan di
                  samping kiri.
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
               TAB 2: KELOLA PEMAIN (Form & Tabel CRUD)
               ========================================== */}
          {activeTab === "players" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Input Data */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 h-fit">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">{isEditing ? "📝 Edit Profil Atlet" : "➕ Registrasi Atlet Baru"}</h3>
                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ id: "", name: "", position: "ST", line: "forward", rating: "", status: "Siap Kompetisi" });
                      }}
                      className="text-[10px] text-rose-500 font-bold hover:underline"
                    >
                      Batal
                    </button>
                  )}
                </div>

                <form onSubmit={handleSavePlayer} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Nama Pemain</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="CONTOH: ASNAWI MANGKUALAM"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500 uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Posisi Taktis</label>
                      <select name="position" value={formData.position} onChange={handleInputChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-300 focus:outline-none focus:border-emerald-500">
                        <option value="ST">ST (Striker)</option>
                        <option value="LW">LW (Left Wing)</option>
                        <option value="RW">RW (Right Wing)</option>
                        <option value="CAM">CAM (Attacking Mid)</option>
                        <option value="CM">CM (Central Mid)</option>
                        <option value="CDM">CDM (Defensive Mid)</option>
                        <option value="LM">LM (Left Mid)</option>
                        <option value="RM">RM (Right Mid)</option>
                        <option value="LB">LB (Left Back)</option>
                        <option value="CB">CB (Center Back)</option>
                        <option value="RB">RB (Right Back)</option>
                        <option value="GK">GK (Goalkeeper)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Lini Sektor</label>
                      <select name="line" value={formData.line} onChange={handleInputChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-300 focus:outline-none focus:border-emerald-500">
                        <option value="forward">Forward (Depan)</option>
                        <option value="midfield">Midfield (Tengah)</option>
                        <option value="defender">Defender (Belakang)</option>
                        <option value="goalkeeper">Goalkeeper (Kiper)</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Rating Bakat (1-100)</label>
                      <input
                        type="number"
                        name="rating"
                        min="1"
                        max="100"
                        value={formData.rating}
                        onChange={handleInputChange}
                        placeholder="E.g. 85"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Status Kondisi</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-300 focus:outline-none focus:border-emerald-500">
                        <option value="Siap Kompetisi">Siap Kompetisi</option>
                        <option value="Masa Pemantauan">Masa Pemantauan</option>
                        <option value="Pemulihan">Pemulihan</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-white transition shadow-md cursor-pointer ${isEditing ? "bg-amber-600 hover:bg-amber-500" : "bg-emerald-600 hover:bg-emerald-500"}`}
                  >
                    {isEditing ? "Simpan Perubahan" : "Daftarkan Pemain"}
                  </button>
                </form>
              </div>

              {/* Tabel List Direktori */}
              <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 overflow-x-auto">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Database Anggota Skuad Terdaftar</h3>
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr class="border-b border-zinc-800 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      <th className="p-3">Nama Lengkap</th>
                      <th className="p-3">Posisi Lapangan</th>
                      <th class="p-3 text-center">Rating</th>
                      <th className="p-3">Kondisi Status</th>
                      <th className="p-3 text-center">Aksi Kerja</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-zinc-900 text-zinc-300">
                    {players.map((player) => (
                      <tr key={player.id} className="hover:bg-zinc-900/40 transition">
                        <td className="p-3 font-semibold text-zinc-100 uppercase tracking-wide flex items-center gap-2">
                          <img src={player.img} alt={player.name} className="w-6 h-6 rounded-full object-cover border border-zinc-700" />
                          {player.name}
                        </td>
                        <td className="p-3 font-mono text-zinc-400">
                          {player.position} <span className="text-[10px] text-zinc-600">({player.line})</span>
                        </td>
                        <td className="p-3 text-center font-bold text-emerald-400">{player.rating}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${player.status === "Siap Kompetisi" ? "bg-emerald-950 text-emerald-400 border border-emerald-900" : player.status === "Masa Pemantauan" ? "bg-amber-950 text-amber-400 border border-amber-900" : "bg-rose-950 text-rose-400 border border-rose-900"}`}
                          >
                            {player.status}
                          </span>
                        </td>
                        <td className="p-3 text-center space-x-1.5">
                          <button onClick={() => handleEditTrigger(player)} className="px-2 py-1 bg-zinc-900 hover:bg-amber-600 text-zinc-400 hover:text-white rounded-md text-[10px] font-bold transition cursor-pointer">
                            Edit
                          </button>
                          <button onClick={() => handleDeletePlayer(player.id)} className="px-2 py-1 bg-zinc-900 hover:bg-rose-600 text-zinc-500 hover:text-white rounded-md text-[10px] font-bold transition cursor-pointer">
                            Kurang
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================
               TAB 3: RIWAYAT PERTANDINGAN (MATCHES)
               ========================================== */}
          {activeTab === "matches" && (
            <div className="max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Agenda Jadwal & Hasil Pertandingan Tim</h3>
                <button
                  onClick={() => {
                    const opp = prompt("Masukkan Nama Tim Lawan:");
                    if (opp) setMatches([...matches, { id: Date.now(), opponent: opp, type: "Uji Coba Seleksi", date: "Juni 2026", score: "vs", status: "Mendatang" }]);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  ➕ Jadwalkan Match
                </button>
              </div>

              <div className="space-y-3">
                {matches.map((m) => (
                  <div key={m.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center hover:border-zinc-700 transition">
                    <div>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block">
                        {m.type} · {m.date}
                      </span>
                      <span className="font-bold text-zinc-100 text-sm mt-1 block uppercase tracking-wide">SSB Squad Utama vs {m.opponent}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-base font-black tracking-wider ${m.status === "Selesai" ? "text-zinc-100" : "text-zinc-600"}`}>{m.score}</span>
                      <p className={`text-[9px] font-bold mt-0.5 uppercase ${m.status === "Selesai" ? "text-zinc-500" : "text-amber-500"}`}>{m.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
               TAB 4: PENGATURAN SYSTEM (SETTINGS)
               ========================================== */}
          {activeTab === "settings" && (
            <div className="max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4 border-b border-zinc-800 pb-2">Konfigurasi Profil SSB</h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Nama Organisasi / Klub</label>
                  <input
                    type="text"
                    value={settings.clubName}
                    onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Tahun Musim Aktif</label>
                    <input
                      type="text"
                      value={settings.season}
                      onChange={(e) => setSettings({ ...settings, season: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Default Blueprint Formasi</label>
                    <select
                      value={settings.formationDefault}
                      onChange={(e) => setSettings({ ...settings, formationDefault: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-300 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="4-3-3">4-3-3 (Attacking)</option>
                      <option value="4-4-2">4-4-2 (Classic)</option>
                      <option value="3-5-2">3-5-2 (Wingback Dominant)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => alert("Pengaturan profil sistem internal SSB berhasil disimpan!")}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl uppercase tracking-wider transition shadow-md cursor-pointer"
                  >
                    Simpan Konfigurasi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
