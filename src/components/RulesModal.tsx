import React from 'react';
import { Tournament } from '../types';

interface RulesModalProps {
  tournament: Tournament | null;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ tournament, onClose }) => {
  if (!tournament) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <i className="fas fa-times"></i>
        </button>

        <div>
          <span className="text-[10px] text-[#ff2a5f] font-extrabold uppercase tracking-wider">
            OFFICIAL TOURNAMENT RULES
          </span>
          <h3 className="font-display font-extrabold text-lg text-white">
            {tournament.title}
          </h3>
          <p className="text-xs text-gray-400">
            Map: {tournament.map} · Mode: {tournament.mode} · Timing: {tournament.startTime}
          </p>
        </div>

        {/* PRIZE MATRIX */}
        <div className="bg-[#0b0e14] border border-gray-800 p-3 rounded-xl grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="text-[10px] text-gray-400">Entry Fee</div>
            <div className="font-extrabold text-white">
              {tournament.entryFee === 0 ? 'FREE' : `₹${tournament.entryFee}`}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400">1st Prize</div>
            <div className="font-extrabold text-[#ffd700]">₹{tournament.firstPrize}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400">Per Kill</div>
            <div className="font-extrabold text-[#10b981]">
              {tournament.perKill > 0 ? `₹${tournament.perKill}` : 'None'}
            </div>
          </div>
        </div>

        {/* RULES LIST */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-gray-200">Fair Play & Game Guidelines:</div>
          <ul className="space-y-1.5 text-gray-300 text-[11px]">
            {tournament.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <i className="fas fa-check-circle text-[#10b981] mt-0.5 shrink-0 text-xs"></i>
                <span>{rule}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle text-[#10b981] mt-0.5 shrink-0 text-xs"></i>
              <span>Room ID & Password starts 15 minutes before match in dashboard.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-exclamation-triangle text-rose-500 mt-0.5 shrink-0 text-xs"></i>
              <span>PC / Emulators are strictly banned. Only genuine mobile devices.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow glow-accent transition cursor-pointer"
        >
          Samajh Gaya (Close)
        </button>
      </div>
    </div>
  );
};
