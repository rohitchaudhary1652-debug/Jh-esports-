import React, { useState } from 'react';
import { Tournament, UserProfile } from '../types';

interface MyMatchesTabProps {
  tournaments: Tournament[];
  user: UserProfile;
  onBrowseMatches: () => void;
  onSubmitResult: (matchId: string, kills: number, proofNote: string) => void;
}

export const MyMatchesTab: React.FC<MyMatchesTabProps> = ({
  tournaments,
  user,
  onBrowseMatches,
  onSubmitResult
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [reportingMatch, setReportingMatch] = useState<Tournament | null>(null);
  const [reportedKills, setReportedKills] = useState<number>(0);
  const [proofNote, setProofNote] = useState<string>('');

  const myMatches = tournaments.filter((m) =>
    m.registeredPlayers?.some((p) => p.userId === user.id || p.ffUid === user.ffUid)
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingMatch) return;
    onSubmitResult(reportingMatch.id, reportedKills, proofNote);
    alert('Match screenshot report successfully submit ho gaya! Admin Rohit Chaudhary jald hi verify karke wallet me prize bhej denge.');
    setReportingMatch(null);
    setProofNote('');
    setReportedKills(0);
  };

  return (
    <div className="space-y-4">
      {/* HEADER CARD */}
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff2a5f]/20 border border-[#ff2a5f]/40 flex items-center justify-center text-[#ff2a5f] text-lg font-bold">
            <i className="fas fa-ticket-alt"></i>
          </div>
          <div>
            <h2 className="font-display font-extrabold text-base text-white">
              My Enrolled Matches
            </h2>
            <p className="text-xs text-gray-400">
              Aapke sabhi registered custom matches aur unke Room ID / Pass status
            </p>
          </div>
        </div>
      </div>

      {/* QUICK INSTRUCTIONS GUIDE */}
      <div className="bg-[#0b0e14] border border-gray-800 rounded-2xl p-4 text-xs space-y-2">
        <div className="font-extrabold text-[#ffd700] flex items-center gap-2">
          <i className="fas fa-info-circle"></i> Room Kaise Join Karein?
        </div>
        <ol className="list-decimal list-inside space-y-1 text-gray-300 text-[11px] leading-relaxed">
          <li>Match shuru hone se 15 minute pehle niche se Room ID aur Pass copy karein.</li>
          <li>Free Fire game open karein &gt; Mode Selection &gt; <strong>Custom</strong> par tap karein.</li>
          <li>Niche <strong>Search Room ID</strong> me Room ID paste karein aur Enter dabayein.</li>
          <li>Password daalkar join karein aur apne registered Slot par hi baithein.</li>
        </ol>
      </div>

      {/* LIST OF ENROLLED MATCHES */}
      {myMatches.length === 0 ? (
        <div className="bg-[#151b26] border border-gray-800 rounded-2xl p-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-gray-800/80 mx-auto flex items-center justify-center text-gray-500 text-2xl">
            <i className="fas fa-gamepad"></i>
          </div>
          <h3 className="font-display font-extrabold text-sm text-white">
            Aapne abhi tak koi Custom Match join nahi kiya hai
          </h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Upcoming matches list me se apne manpasand Bermuda, Purgatory ya 1v4 match me slot book karein!
          </p>
          <button
            onClick={onBrowseMatches}
            className="px-4 py-2 bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow glow-accent transition cursor-pointer"
          >
            Matches Explore Karein
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myMatches.map((match) => {
            const playerEnrollment = match.registeredPlayers?.find(
              (p) => p.userId === user.id || p.ffUid === user.ffUid
            );
            const isRoomAvailable = Boolean(match.roomId && match.roomPass);

            return (
              <div
                key={match.id}
                className="bg-[#151b26] border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-800/80 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40">
                        {match.mode}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                        {match.map}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-950 text-[#10b981] border border-emerald-500/30">
                        Slot #{playerEnrollment?.slot || 1}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-base text-white">
                      {match.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <i className="far fa-calendar-alt mr-1"></i> {match.startTime}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-gray-400">Total Prize</div>
                    <div className="font-extrabold text-sm text-[#ffd700] tabular-nums">
                      ₹{match.prizePool}
                    </div>
                  </div>
                </div>

                {/* Body: Credentials Box */}
                <div className="p-4 space-y-3">
                  {isRoomAvailable ? (
                    <div className="bg-[#0b0e14] border border-[#00f0ff]/40 rounded-xl p-3.5 space-y-2.5 glow-cyan">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[#00f0ff] flex items-center gap-1.5">
                          <i className="fas fa-unlock-alt"></i> ROOM ID & PASSWORD LIVE
                        </span>
                        <span className="text-[10px] bg-[#00f0ff]/10 text-[#00f0ff] font-bold px-2 py-0.5 rounded">
                          Ready to Join
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-900 p-2.5 rounded-lg border border-gray-800 flex items-center justify-between">
                          <div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase">Room ID</div>
                            <div className="font-mono font-black text-white text-base tracking-wider">
                              {match.roomId}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopy(match.roomId!, `room-${match.id}`)}
                            className="px-2.5 py-1.5 bg-[#00f0ff] hover:bg-cyan-400 text-black font-extrabold rounded text-[10px] transition cursor-pointer"
                          >
                            {copiedKey === `room-${match.id}` ? 'COPIED!' : 'COPY ID'}
                          </button>
                        </div>

                        <div className="bg-gray-900 p-2.5 rounded-lg border border-gray-800 flex items-center justify-between">
                          <div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase">Password</div>
                            <div className="font-mono font-black text-[#ffd700] text-base tracking-wider">
                              {match.roomPass}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopy(match.roomPass!, `pass-${match.id}`)}
                            className="px-2.5 py-1.5 bg-[#ffd700] hover:bg-amber-400 text-black font-extrabold rounded text-[10px] transition cursor-pointer"
                          >
                            {copiedKey === `pass-${match.id}` ? 'COPIED!' : 'COPY PASS'}
                          </button>
                        </div>
                      </div>

                      <div className="text-[10px] text-gray-400 text-center">
                        Aapka Assigned Slot: <strong className="text-white">Slot #{playerEnrollment?.slot}</strong>. Dusre slot par baithenge toh kick ho sakte hain.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-3.5 text-center space-y-1">
                      <div className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5">
                        <i className="fas fa-lock"></i> Room Credentials Locked
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Room ID & Pass match start hone se 15 minute pehle yahan automatically show ho jayega.
                      </p>
                    </div>
                  )}

                  {/* Registered details */}
                  <div className="bg-gray-900/80 p-2.5 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 text-[11px]">Player: </span>
                      <span className="text-white font-bold">{playerEnrollment?.ign}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[11px]">UID: </span>
                      <span className="font-mono text-gray-300 font-bold">{playerEnrollment?.ffUid}</span>
                    </div>
                  </div>

                  {/* Submit Proof / Kills Button */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setReportingMatch(match)}
                      className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold border border-gray-700 transition cursor-pointer"
                    >
                      <i className="fas fa-upload text-gray-400 mr-1.5"></i> Submit Match Result / Kills
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* REPORT RESULT MODAL */}
      {reportingMatch && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setReportingMatch(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>

            <div>
              <div className="text-[10px] text-[#ff2a5f] uppercase font-black">
                MATCH RESULT SUBMISSION
              </div>
              <h3 className="font-display font-extrabold text-base text-white">
                {reportingMatch.title}
              </h3>
              <p className="text-xs text-gray-400">
                Apna total kills aur screenshot detail daalein taki prize jaldi credit ho sake.
              </p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Aapke Total Kills
                </label>
                <input
                  type="number"
                  min="0"
                  max="48"
                  value={reportedKills}
                  onChange={(e) => setReportedKills(Number(e.target.value))}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Booyah / Screenshot Note (Link or UTR)
                </label>
                <textarea
                  rows={2}
                  value={proofNote}
                  onChange={(e) => setProofNote(e.target.value)}
                  placeholder="Ex: Rank #1 Booyah, Screenshot sent on WhatsApp/Instagram @cmbadshah37"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold text-xs py-2.5 rounded-xl shadow glow-emerald cursor-pointer transition active:scale-95"
              >
                Submit Result to Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
