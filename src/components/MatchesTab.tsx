import React, { useState, useEffect } from 'react';
import { Tournament, UserProfile, MatchMode } from '../types';

interface MatchesTabProps {
  tournaments: Tournament[];
  user: UserProfile;
  onJoinMatch: (matchId: string, slot: number, ign: string, ffUid: string) => void;
  onOpenAuth: () => void;
  onOpenWallet: () => void;
  onViewRules: (tournament: Tournament) => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({
  tournaments,
  user,
  onJoinMatch,
  onOpenAuth,
  onOpenWallet,
  onViewRules
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | MatchMode | 'FREE'>('ALL');
  const [joiningMatch, setJoiningMatch] = useState<Tournament | null>(null);
  const [playerIgn, setPlayerIgn] = useState(user.ign);
  const [playerUid, setPlayerUid] = useState(user.ffUid);
  const [selectedSlot, setSelectedSlot] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Update timer tick every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setPlayerIgn(user.ign);
    setPlayerUid(user.ffUid);
  }, [user]);

  const filteredMatches = tournaments.filter((m) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'FREE') return m.entryFee === 0;
    return m.mode === selectedFilter;
  });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(type);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getFormatTimeRemaining = (timestamp: number) => {
    const diff = timestamp - now;
    if (diff <= 0) return 'In Progress / Started';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
    return `Starts in ${minutes}m`;
  };

  const handleOpenJoin = (match: Tournament) => {
    // Pick the first empty slot
    const takenSlots = match.registeredPlayers?.map((p) => p.slot) || [];
    let freeSlot = 1;
    for (let i = 1; i <= match.maxSlots; i++) {
      if (!takenSlots.includes(i)) {
        freeSlot = i;
        break;
      }
    }
    setSelectedSlot(freeSlot);
    setJoiningMatch(match);
  };

  const submitJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joiningMatch) return;

    if (user.walletBalance < joiningMatch.entryFee) {
      alert(`Wallet balance kam hai! Aapke paas ₹${user.walletBalance} hain jabki Entry Fee ₹${joiningMatch.entryFee} hai. Pehle Add Money karein.`);
      onOpenWallet();
      return;
    }

    onJoinMatch(joiningMatch.id, selectedSlot, playerIgn || user.ign, playerUid || user.ffUid);
    setJoiningMatch(null);
  };

  return (
    <div className="space-y-4">
      {/* USER PROFILE MINI BANNER */}
      <div className="bg-[#151b26] border border-gray-800/80 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff2a5f]/20 to-purple-600/30 border border-[#ff2a5f]/40 flex items-center justify-center text-[#ff2a5f] font-bold text-sm shrink-0">
            {user.ign.slice(0, 2).toUpperCase() || 'FF'}
          </div>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>{user.ign || 'Guest Player'}</span>
              <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">
                Lvl 65+
              </span>
            </div>
            <div className="text-xs text-gray-400">
              UID: <span className="font-mono text-gray-300">{user.ffUid}</span> · Won: <span className="text-[#ffd700] font-semibold">₹{user.totalWon}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onOpenAuth}
          className="px-3 py-1.5 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer active:scale-95 whitespace-nowrap"
        >
          {user.name === 'Guest Player' ? 'Login / Sign Up' : 'Account'}
        </button>
      </div>

      {/* CM ESPORTS ARENA HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden border border-[#ff2a5f]/30 shadow-2xl">
        <div className="relative h-44 sm:h-52 w-full">
          <img
            src="/src/assets/images/cm_esports_hero_1793363309484.jpg"
            alt="CM Esports Free Fire Arena"
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/60 to-transparent"></div>
          
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="bg-[#ff2a5f] text-white font-extrabold text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow glow-accent">
                ⚡ CM ESPORTS TOURNAMENT ARENA
              </span>
              <span className="text-[11px] text-[#10b981] font-bold bg-[#10b981]/10 border border-[#10b981]/30 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                ACTIVE TODAY
              </span>
            </div>

            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1 text-balance">
                Free Fire Daily Paid Customs & 1v4 Challenge
              </h2>
              <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                Room ID & Password match start hone se 15 minute pehle aapke dashboard me show ho jayega. Jeeto cash prize seedhe Paytm/PhonePe me!
              </p>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-800/80">
                <a
                  href="https://instagram.com/cmbadshah37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-950/70 to-pink-950/70 hover:from-purple-900 hover:to-pink-900 border border-pink-500/30 text-xs font-bold text-white px-3 py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <i className="fab fa-instagram text-pink-400"></i>
                  <span>@cmbadshah37</span>
                </a>
                <a
                  href="https://youtube.com/@cmbadshahlive37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-950/70 to-gray-900 hover:from-red-900 hover:to-gray-800 border border-red-500/30 text-xs font-bold text-white px-3 py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <i className="fab fa-youtube text-red-500"></i>
                  <span>cmbadshahlive37</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH CATEGORIES FILTER */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
        {[
          { id: 'ALL', label: '🔥 All Matches' },
          { id: 'SOLO', label: '👤 Solo' },
          { id: 'DUO', label: '👥 Duo' },
          { id: 'SQUAD', label: '⚔️ Squad (1v4)' },
          { id: 'CLASH_SQUAD', label: '🎯 Clash Squad' },
          { id: 'FREE', label: '🎁 Free Entry' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer shrink-0 ${
              selectedFilter === tab.id
                ? 'bg-[#ff2a5f] text-white shadow glow-accent'
                : 'bg-[#151b26] border border-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MATCH CARDS LIST */}
      <div className="space-y-4">
        {filteredMatches.map((match) => {
          const isJoined = match.registeredPlayers?.some((p) => p.userId === user.id || p.ffUid === user.ffUid);
          const isFull = match.joinedSlots >= match.maxSlots;
          const isRoomReleased = match.status === 'ROOM_RELEASED' || (match.startTimestamp - now <= 15 * 60 * 1000 && match.status !== 'COMPLETED');
          const percentFilled = Math.min(100, Math.round((match.joinedSlots / match.maxSlots) * 100));

          return (
            <div
              key={match.id}
              className="bg-[#151b26] border border-gray-800/90 rounded-2xl overflow-hidden hover:border-gray-700/80 transition shadow-lg"
            >
              {/* Card Header Strip */}
              <div className="px-4 py-3 border-b border-gray-800/80 flex items-center justify-between gap-2 bg-[#0e131b]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700">
                    {match.map}
                  </span>
                  <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40">
                    {match.mode}
                  </span>
                  {match.entryFee === 0 && (
                    <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40">
                      FREE ENTRY
                    </span>
                  )}
                </div>

                {/* Status Indicator */}
                <div>
                  {match.status === 'COMPLETED' ? (
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                      FINISHED
                    </span>
                  ) : isRoomReleased ? (
                    <span className="text-[10px] font-extrabold text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 glow-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
                      ROOM OPEN
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 border border-amber-600/30 px-2 py-0.5 rounded">
                      {getFormatTimeRemaining(match.startTimestamp)}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-white leading-snug">
                      {match.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <i className="far fa-clock text-gray-500 mr-1"></i>
                      {match.startTime}
                    </p>
                  </div>
                </div>

                {/* Prize Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2 bg-[#0b0e14] p-3 rounded-xl border border-gray-800/80 text-center">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Prize Pool</div>
                    <div className="text-sm font-extrabold text-[#ffd700] tabular-nums">
                      ₹{match.prizePool}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">1st Booyah</div>
                    <div className="text-sm font-extrabold text-[#10b981] tabular-nums">
                      ₹{match.firstPrize}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Per Kill</div>
                    <div className="text-sm font-extrabold text-rose-400 tabular-nums">
                      {match.perKill > 0 ? `₹${match.perKill}` : 'None'}
                    </div>
                  </div>
                </div>

                {/* Slots Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>
                      Slots: <span className="text-white font-bold">{match.joinedSlots}/{match.maxSlots}</span>
                    </span>
                    <span className={isFull ? 'text-rose-400 font-semibold' : 'text-gray-400'}>
                      {match.maxSlots - match.joinedSlots} slots remaining
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isFull ? 'bg-rose-500' : 'bg-gradient-to-r from-[#ff2a5f] to-amber-500'
                      }`}
                      style={{ width: `${percentFilled}%` }}
                    ></div>
                  </div>
                </div>

                {/* Room ID & Pass Display if released */}
                {isRoomReleased && match.status !== 'COMPLETED' && (
                  <div className="bg-[#0b0e14] border border-[#00f0ff]/40 rounded-xl p-3 space-y-2 glow-cyan">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#00f0ff] flex items-center gap-1.5">
                        <i className="fas fa-key"></i> CUSTOM ROOM CREDENTIALS
                      </span>
                      <span className="text-[10px] text-gray-400">Join inside Free Fire app</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-900 p-2 rounded-lg border border-gray-800 flex items-center justify-between">
                        <div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Room ID</div>
                          <div className="font-mono font-black text-white text-sm tracking-wide">
                            {match.roomId || 'PENDING'}
                          </div>
                        </div>
                        {match.roomId && (
                          <button
                            onClick={() => handleCopy(match.roomId!, `room-${match.id}`)}
                            className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded text-[10px] font-bold cursor-pointer"
                          >
                            {copiedId === `room-${match.id}` ? 'COPIED!' : 'COPY'}
                          </button>
                        )}
                      </div>

                      <div className="bg-gray-900 p-2 rounded-lg border border-gray-800 flex items-center justify-between">
                        <div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Password</div>
                          <div className="font-mono font-black text-[#ffd700] text-sm tracking-wide">
                            {match.roomPass || 'PENDING'}
                          </div>
                        </div>
                        {match.roomPass && (
                          <button
                            onClick={() => handleCopy(match.roomPass!, `pass-${match.id}`)}
                            className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded text-[10px] font-bold cursor-pointer"
                          >
                            {copiedId === `pass-${match.id}` ? 'COPIED!' : 'COPY'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Winner announcement if completed */}
                {match.status === 'COMPLETED' && match.winner && (
                  <div className="bg-gradient-to-r from-amber-950/40 to-gray-900 border border-[#ffd700]/30 rounded-xl p-3 text-xs">
                    <div className="font-extrabold text-[#ffd700] flex items-center gap-1.5 mb-1">
                      <i className="fas fa-trophy"></i> Booyah Winner: {match.winner.first}
                    </div>
                    <div className="text-gray-400 text-[11px]">
                      MVP: {match.winner.mvp} · Prize distributed to winner wallet
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onViewRules(match)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white font-bold text-xs border border-gray-800 transition cursor-pointer"
                  >
                    Rules & Info
                  </button>

                  {isJoined ? (
                    <div className="flex-1 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-[#10b981] font-extrabold text-xs text-center flex items-center justify-center gap-1.5">
                      <i className="fas fa-check-circle"></i> Enrolled
                    </div>
                  ) : match.status === 'COMPLETED' ? (
                    <button
                      disabled
                      className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-500 font-bold text-xs cursor-not-allowed"
                    >
                      Ended
                    </button>
                  ) : isFull ? (
                    <button
                      disabled
                      className="flex-1 py-2.5 rounded-xl bg-gray-800 text-rose-400 font-bold text-xs cursor-not-allowed"
                    >
                      Slots Full
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenJoin(match)}
                      className="flex-1 py-2.5 rounded-xl bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs transition shadow glow-accent cursor-pointer active:scale-95"
                    >
                      {match.entryFee === 0 ? 'Join Free' : `Join (₹${match.entryFee})`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* JOIN MATCH MODAL */}
      {joiningMatch && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setJoiningMatch(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>

            <div>
              <div className="text-[10px] text-[#ff2a5f] uppercase font-black tracking-wide">
                CONFIRM TOURNAMENT ENTRY
              </div>
              <h3 className="font-display font-extrabold text-lg text-white leading-tight">
                {joiningMatch.title}
              </h3>
              <p className="text-xs text-gray-400">
                {joiningMatch.map} · {joiningMatch.mode} · {joiningMatch.startTime}
              </p>
            </div>

            {/* Wallet summary */}
            <div className="bg-[#0b0e14] border border-gray-800 p-3 rounded-xl flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-gray-400">Your Wallet Balance</div>
                <div className="font-extrabold text-[#ffd700] text-sm tabular-nums">
                  ₹{user.walletBalance}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400">Entry Fee</div>
                <div className="font-extrabold text-rose-400 text-sm tabular-nums">
                  ₹{joiningMatch.entryFee}
                </div>
              </div>
            </div>

            <form onSubmit={submitJoin} className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Free Fire In-Game Name (IGN)
                </label>
                <input
                  type="text"
                  required
                  value={playerIgn}
                  onChange={(e) => setPlayerIgn(e.target.value)}
                  placeholder="Ex: CM BADSHAH"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Free Fire UID Number
                </label>
                <input
                  type="text"
                  required
                  value={playerUid}
                  onChange={(e) => setPlayerUid(e.target.value)}
                  placeholder="Ex: 194829104"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff2a5f] mt-1 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Select Room Slot (1 to {joiningMatch.maxSlots})
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(Number(e.target.value))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                >
                  {Array.from({ length: joiningMatch.maxSlots }, (_, i) => i + 1).map((slotNum) => {
                    const isTaken = joiningMatch.registeredPlayers?.some((p) => p.slot === slotNum);
                    return (
                      <option key={slotNum} value={slotNum} disabled={isTaken}>
                        Slot #{slotNum} {isTaken ? '(Taken)' : '(Available)'}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs py-3 rounded-xl shadow glow-accent cursor-pointer transition active:scale-95"
                >
                  {joiningMatch.entryFee === 0
                    ? 'Confirm Free Registration'
                    : `Pay ₹${joiningMatch.entryFee} & Join Now`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
