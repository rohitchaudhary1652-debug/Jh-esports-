import React, { useState } from 'react';
import { Tournament, WalletTransaction, MapType, MatchMode } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournaments: Tournament[];
  transactions: WalletTransaction[];
  onCreateTournament: (tournament: Tournament) => void;
  onUpdateRoomCredentials: (matchId: string, roomId: string, roomPass: string, releaseNow: boolean) => void;
  onDeclareWinner: (matchId: string, firstWinner: string, mvp: string) => void;
  onApproveTransaction: (txId: string) => void;
  onRejectTransaction: (txId: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  tournaments,
  transactions,
  onCreateTournament,
  onUpdateRoomCredentials,
  onDeclareWinner,
  onApproveTransaction,
  onRejectTransaction
}) => {
  const [adminTab, setAdminTab] = useState<'MATCHES' | 'ROOMS' | 'WINNERS' | 'WALLETS'>('ROOMS');

  // New match form state
  const [newTitle, setNewTitle] = useState('🔥 Bermuda Daily Solo #143');
  const [newMap, setNewMap] = useState<MapType>('Bermuda');
  const [newMode, setNewMode] = useState<MatchMode>('SOLO');
  const [newEntryFee, setNewEntryFee] = useState<number>(20);
  const [newPrizePool, setNewPrizePool] = useState<number>(700);
  const [newFirstPrize, setNewFirstPrize] = useState<number>(400);
  const [newPerKill, setNewPerKill] = useState<number>(10);
  const [newTime, setNewTime] = useState('Today at 08:30 PM');
  const [newMaxSlots, setNewMaxSlots] = useState<number>(48);

  // Room state
  const [selectedMatchId, setSelectedMatchId] = useState<string>(tournaments[0]?.id || '');
  const [customRoomId, setCustomRoomId] = useState('');
  const [customRoomPass, setCustomRoomPass] = useState('');

  // Winner state
  const [winnerMatchId, setWinnerMatchId] = useState<string>(tournaments[0]?.id || '');
  const [winnerFirst, setWinnerFirst] = useState('CM BADSHAH');
  const [winnerMvp, setWinnerMvp] = useState('CM BADSHAH (8 Kills)');

  if (!isOpen) return null;

  const handleCreateMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Tournament = {
      id: `cm-match-${Date.now()}`,
      title: newTitle,
      map: newMap,
      mode: newMode,
      entryFee: newEntryFee,
      prizePool: newPrizePool,
      firstPrize: newFirstPrize,
      secondPrize: Math.round(newPrizePool * 0.25),
      thirdPrize: Math.round(newPrizePool * 0.15),
      perKill: newPerKill,
      startTime: newTime,
      startTimestamp: Date.now() + 45 * 60 * 1000,
      maxSlots: newMaxSlots,
      joinedSlots: 1,
      status: 'UPCOMING',
      roomReleaseMinutes: 15,
      rules: [
        'Mobile players only. PC strictly banned.',
        'Gun attributes OFF.',
        'Teaming up results in ban.'
      ],
      registeredPlayers: []
    };
    onCreateTournament(created);
    alert('Naya Custom Match safaltapoorvak launch ho gaya!');
    setAdminTab('ROOMS');
  };

  const handleSaveCredentials = (releaseNow: boolean) => {
    if (!selectedMatchId || !customRoomId || !customRoomPass) {
      alert('Kripya Match, Room ID aur Password sabhi enter karein.');
      return;
    }
    onUpdateRoomCredentials(selectedMatchId, customRoomId, customRoomPass, releaseNow);
    alert(releaseNow ? 'Room ID aur Password sabhi players ke liye LIVE release ho gaya!' : 'Credentials update ho gaye hain.');
    setCustomRoomId('');
    setCustomRoomPass('');
  };

  const handleDeclareWinnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!winnerMatchId || !winnerFirst) return;
    onDeclareWinner(winnerMatchId, winnerFirst, winnerMvp);
    alert(`Booyah Winner "${winnerFirst}" declare ho gaya aur prize wallet me bhej diya gaya!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#0e131b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300 text-sm font-black">
              <i className="fas fa-user-shield text-[#ff2a5f]"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base text-white">
                  Owner Admin Dashboard
                </h3>
                <span className="text-[10px] bg-red-950 text-rose-400 border border-rose-800/60 px-1.5 py-0.2 rounded font-black">
                  ROHIT CHAUDHARY
                </span>
              </div>
              <p className="text-[10px] text-gray-400">Manage Rooms, Matches, & Player Payouts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 cursor-pointer transition"
          >
            <i className="fas fa-times text-base"></i>
          </button>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-4 border-b border-gray-800 text-center text-xs font-bold bg-[#0b0e14]">
          <button
            onClick={() => setAdminTab('ROOMS')}
            className={`py-2.5 transition cursor-pointer ${
              adminTab === 'ROOMS'
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Room Pass
          </button>
          <button
            onClick={() => setAdminTab('MATCHES')}
            className={`py-2.5 transition cursor-pointer ${
              adminTab === 'MATCHES'
                ? 'text-[#ff2a5f] border-b-2 border-[#ff2a5f]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            New Match
          </button>
          <button
            onClick={() => setAdminTab('WINNERS')}
            className={`py-2.5 transition cursor-pointer ${
              adminTab === 'WINNERS'
                ? 'text-[#ffd700] border-b-2 border-[#ffd700]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Winners
          </button>
          <button
            onClick={() => setAdminTab('WALLETS')}
            className={`py-2.5 transition cursor-pointer ${
              adminTab === 'WALLETS'
                ? 'text-[#10b981] border-b-2 border-[#10b981]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Approvals
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 hide-scrollbar text-xs">
          {/* TAB 1: ROOM CREDENTIALS CONTROLLER */}
          {adminTab === 'ROOMS' && (
            <div className="space-y-4">
              <div className="bg-[#0b0e14] border border-gray-800 p-3 rounded-xl space-y-1">
                <div className="font-extrabold text-[#00f0ff] flex items-center gap-1.5">
                  <i className="fas fa-broadcast-tower"></i> Room ID & Pass Live Release
                </div>
                <p className="text-gray-400 text-[11px]">
                  Yahan se Room ID aur Password daalte hi sabhi registered players ke app me reveal ho jayega.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Select Match
                  </label>
                  <select
                    value={selectedMatchId}
                    onChange={(e) => setSelectedMatchId(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00f0ff] mt-1"
                  >
                    {tournaments.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.mode} - {m.map}) [{m.status}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase">
                      Custom Room ID
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 84920194"
                      value={customRoomId}
                      onChange={(e) => setCustomRoomId(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00f0ff] mt-1 font-mono tracking-wider font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase">
                      Room Password
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: CM99"
                      value={customRoomPass}
                      onChange={(e) => setCustomRoomPass(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00f0ff] mt-1 font-mono tracking-wider font-bold text-[#ffd700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSaveCredentials(false)}
                    className="py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-xl border border-gray-700 transition cursor-pointer"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveCredentials(true)}
                    className="py-2.5 bg-[#00f0ff] hover:bg-cyan-400 text-black font-extrabold rounded-xl shadow glow-cyan transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <i className="fas fa-paper-plane"></i> Release Live Now
                  </button>
                </div>
              </div>

              {/* ACTIVE MATCHES QUICK STATUS */}
              <div className="space-y-2 pt-2 border-t border-gray-800">
                <div className="text-[10px] text-gray-400 uppercase font-bold">
                  Current Match Status List
                </div>
                {tournaments.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-between text-[11px]"
                  >
                    <div>
                      <div className="font-bold text-white">{m.title}</div>
                      <div className="text-gray-400 text-[10px]">
                        ID: {m.roomId || 'Not Set'} · Pass: {m.roomPass || 'Not Set'}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'ROOM_RELEASED'
                          ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                          : m.status === 'COMPLETED'
                          ? 'bg-gray-800 text-gray-400'
                          : 'bg-amber-950 text-amber-400'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CREATE MATCH */}
          {adminTab === 'MATCHES' && (
            <form onSubmit={handleCreateMatchSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Tournament Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Map</label>
                  <select
                    value={newMap}
                    onChange={(e) => setNewMap(e.target.value as MapType)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                  >
                    <option value="Bermuda">Bermuda</option>
                    <option value="Purgatory">Purgatory</option>
                    <option value="Kalahari">Kalahari</option>
                    <option value="Nexterra">Nexterra</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Mode</label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as MatchMode)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                  >
                    <option value="SOLO">SOLO</option>
                    <option value="DUO">DUO</option>
                    <option value="SQUAD">SQUAD (1v4)</option>
                    <option value="CLASH_SQUAD">CLASH SQUAD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Entry Fee (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newEntryFee}
                    onChange={(e) => setNewEntryFee(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Prize Pool (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newPrizePool}
                    onChange={(e) => setNewPrizePool(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Per Kill (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newPerKill}
                    onChange={(e) => setNewPerKill(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    1st Booyah Prize (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newFirstPrize}
                    onChange={(e) => setNewFirstPrize(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Max Slots
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="48"
                    required
                    value={newMaxSlots}
                    onChange={(e) => setNewMaxSlots(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Match Timing Text
                </label>
                <input
                  type="text"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="Ex: Tonight at 09:30 PM"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow glow-accent transition cursor-pointer active:scale-95"
              >
                Create & Publish Tournament
              </button>
            </form>
          )}

          {/* TAB 3: WINNERS */}
          {adminTab === 'WINNERS' && (
            <form onSubmit={handleDeclareWinnerSubmit} className="space-y-3">
              <div className="bg-[#0b0e14] border border-gray-800 p-3 rounded-xl space-y-1">
                <div className="font-extrabold text-[#ffd700] flex items-center gap-1.5">
                  <i className="fas fa-trophy"></i> Booyah Winner & Payout Distributor
                </div>
                <p className="text-gray-400 text-[11px]">
                  Winner declare karte hi prize amount winner ke wallet me instantly credit ho jayega.
                </p>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Select Completed Match
                </label>
                <select
                  value={winnerMatchId}
                  onChange={(e) => setWinnerMatchId(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ffd700] mt-1"
                >
                  {tournaments.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title} (Prize: ₹{m.prizePool})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  1st Winner Player Name / IGN
                </label>
                <input
                  type="text"
                  required
                  value={winnerFirst}
                  onChange={(e) => setWinnerFirst(e.target.value)}
                  placeholder="Ex: CM BADSHAH"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ffd700] mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  MVP / Kill Leader
                </label>
                <input
                  type="text"
                  required
                  value={winnerMvp}
                  onChange={(e) => setWinnerMvp(e.target.value)}
                  placeholder="Ex: ViperSniper (9 Kills)"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ffd700] mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ffd700] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow glow-gold transition cursor-pointer active:scale-95"
              >
                Confirm Winner & Credit Prize Pool
              </button>
            </form>
          )}

          {/* TAB 4: APPROVALS */}
          {adminTab === 'WALLETS' && (
            <div className="space-y-3">
              <div className="text-[10px] text-gray-400 uppercase font-bold">
                Pending Deposits & Withdrawals
              </div>

              {transactions.filter((t) => t.status === 'PENDING').length === 0 ? (
                <div className="p-6 text-center text-gray-500 bg-[#0b0e14] border border-gray-800 rounded-xl">
                  Koi pending approvals nahi hain. Sabhi payments clear hain!
                </div>
              ) : (
                transactions
                  .filter((t) => t.status === 'PENDING')
                  .map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 bg-[#0b0e14] border border-gray-800 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-xs">
                          {tx.type} Request - ₹{tx.amount}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {tx.timestamp} · {tx.utr ? `UTR: ${tx.utr}` : tx.upiId || ''}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onApproveTransaction(tx.id)}
                          className="px-2.5 py-1 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold text-[10px] rounded-lg cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectTransaction(tx.id)}
                          className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-rose-400 font-bold text-[10px] rounded-lg cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
