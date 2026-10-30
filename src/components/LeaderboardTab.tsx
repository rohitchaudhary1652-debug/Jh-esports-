import React from 'react';
import { LeaderboardPlayer } from '../types';

interface LeaderboardTabProps {
  players: LeaderboardPlayer[];
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ players }) => {
  const topThree = players.slice(0, 3);
  const remaining = players.slice(3);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Grandmaster':
        return 'bg-gradient-to-r from-red-600 to-amber-500 text-white border-amber-400/50';
      case 'Heroic':
        return 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-pink-400/50';
      case 'Master':
        return 'bg-purple-900/60 text-purple-300 border-purple-500/40';
      default:
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className="space-y-4">
      {/* TROPHY HERO HEADER */}
      <div className="relative rounded-2xl overflow-hidden border border-[#ffd700]/30 shadow-2xl">
        <div className="relative h-44 sm:h-48 w-full bg-[#0b0e14]">
          <img
            src="/src/assets/images/tournament_champion_trophy_1793363307897.jpg"
            alt="CM Esports Hall of Fame"
            className="w-full h-full object-cover object-center opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/60 to-transparent"></div>

          <div className="absolute inset-0 p-4 flex flex-col justify-end text-center items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-3 py-0.5 rounded-full mb-1">
              👑 CM ESPORTS HALL OF FAME
            </span>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
              Top Champions & FF Kings
            </h2>
            <p className="text-xs text-gray-300 max-w-sm mt-0.5">
              Sabse zyada tournament cash prize aur Booyah jeetne waale pro players
            </p>
          </div>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-3 gap-2 pt-2 items-end">
        {/* 2nd Place */}
        {topThree[1] && (
          <div className="bg-[#151b26] border border-gray-700/80 rounded-2xl p-3 text-center space-y-1.5 shadow-lg">
            <div className="relative inline-block">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 text-black font-extrabold flex items-center justify-center mx-auto text-sm shadow">
                {topThree[1].avatarLetter}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-300 text-black font-black text-[10px] flex items-center justify-center border-2 border-[#151b26]">
                2
              </span>
            </div>
            <div className="font-bold text-xs text-white truncate">{topThree[1].ign}</div>
            <div className="text-[10px] text-gray-400">{topThree[1].booyahs} Booyahs</div>
            <div className="text-xs font-black text-[#ffd700] tabular-nums">
              ₹{topThree[1].totalWinnings.toLocaleString()}
            </div>
          </div>
        )}

        {/* 1st Place - Champion */}
        {topThree[0] && (
          <div className="bg-gradient-to-b from-[#1c2233] to-[#151b26] border-2 border-[#ffd700]/70 rounded-2xl p-3.5 text-center space-y-2 shadow-2xl relative glow-gold -mt-2">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#ffd700] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              CHAMPION
            </div>
            <div className="relative inline-block mt-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-black font-black flex items-center justify-center mx-auto text-base shadow-lg ring-2 ring-[#ffd700]">
                {topThree[0].avatarLetter}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ffd700] text-black font-black text-xs flex items-center justify-center border-2 border-[#151b26]">
                1
              </span>
            </div>
            <div>
              <div className="font-extrabold text-sm text-white truncate">{topThree[0].ign}</div>
              <div className="text-[10px] text-gray-300">
                {topThree[0].booyahs} Booyahs · {topThree[0].kills} Kills
              </div>
            </div>
            <div className="text-sm font-black text-[#ffd700] tabular-nums">
              ₹{topThree[0].totalWinnings.toLocaleString()}
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <div className="bg-[#151b26] border border-gray-700/80 rounded-2xl p-3 text-center space-y-1.5 shadow-lg">
            <div className="relative inline-block">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow">
                {topThree[2].avatarLetter}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-[#151b26]">
                3
              </span>
            </div>
            <div className="font-bold text-xs text-white truncate">{topThree[2].ign}</div>
            <div className="text-[10px] text-gray-400">{topThree[2].booyahs} Booyahs</div>
            <div className="text-xs font-black text-[#ffd700] tabular-nums">
              ₹{topThree[2].totalWinnings.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* FULL LEADERBOARD LIST */}
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl p-4 space-y-3">
        <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wide flex justify-between px-2">
          <span>Player & Rank</span>
          <span>Earnings & Stats</span>
        </div>

        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.rank}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                player.rank === 1
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-[#0b0e14] border-gray-800/80 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                    player.rank === 1
                      ? 'bg-[#ffd700] text-black'
                      : player.rank === 2
                      ? 'bg-slate-300 text-black'
                      : player.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  #{player.rank}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{player.ign}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border ${getBadgeColor(
                        player.badge
                      )}`}
                    >
                      {player.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {player.name} · {player.kills} Kills
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-extrabold text-xs text-[#ffd700] tabular-nums">
                  ₹{player.totalWinnings.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#10b981] font-semibold">
                  {player.booyahs} Booyahs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
