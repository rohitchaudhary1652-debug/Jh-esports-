import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenWallet: () => void;
  onOpenNotifications: () => void;
  onOpenAdmin: () => void;
  unreadNotifsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenWallet,
  onOpenNotifications,
  onOpenAdmin,
  unreadNotifsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0e14]/95 backdrop-blur-md border-b border-gray-800/90 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff2a5f] to-purple-600 flex items-center justify-center font-black text-white text-xl shadow-lg glow-accent shrink-0">
            CM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-white tracking-wider">
                CM ESPORTS
              </span>
              <span className="text-[10px] bg-[#ff2a5f] text-white px-1.5 py-0.5 rounded font-black tracking-wide">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">
              Owner: <span className="text-gray-300 font-semibold">Rohit Chaudhary</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Wallet Balance Badge */}
          <button
            onClick={onOpenWallet}
            aria-label="Open Wallet"
            className="bg-gray-900/90 hover:bg-gray-800 border border-gray-700/80 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold text-[#ffd700] cursor-pointer transition shadow-sm active:scale-95"
          >
            <i className="fas fa-wallet text-[#ffd700]"></i>
            <span className="tabular-nums">₹{user.walletBalance}</span>
            <i className="fas fa-plus-circle text-xs text-[#00f0ff]"></i>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="relative p-2.5 rounded-xl bg-gray-900/90 hover:bg-gray-800 border border-gray-700/80 text-gray-300 hover:text-white cursor-pointer transition active:scale-95"
          >
            <i className="fas fa-bell text-sm"></i>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ff2a5f] rounded-full ring-2 ring-[#0b0e14]"></span>
            )}
          </button>

          {/* Admin Panel Toggle */}
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Control Panel"
            className="px-2.5 py-2 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-xs font-bold text-gray-300 border border-gray-700/80 hover:border-[#ff2a5f]/60 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <i className="fas fa-user-shield text-[#ff2a5f]"></i>
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
