import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin
}) => {
  const [authTab, setAuthTab] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  // Form states
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupIgn, setSignupIgn] = useState('');
  const [signupUid, setSignupUid] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPass, setSignupPass] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      ...currentUser,
      id: `usr-${Date.now()}`,
      phone: loginId.includes('@') ? '9876543210' : loginId,
      ffUid: loginId.length === 9 || loginId.length === 10 ? loginId : currentUser.ffUid,
      name: 'Active Player'
    };
    onLogin(newUser);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: signupName,
      ign: signupIgn,
      ffUid: signupUid,
      phone: signupPhone,
      walletBalance: 50, // Welcome signup bonus ₹50!
      depositBalance: 50,
      winningBalance: 0,
      matchesPlayed: 0,
      totalKills: 0,
      totalWon: 0,
      isAdmin: false
    };
    onLogin(newUser);
    alert(`Badhaai ho! Aapka account ban gaya hai. ₹50 Welcome bonus wallet me add kar diya gaya hai.`);
    onClose();
  };

  const handleAdminQuickLogin = () => {
    onLogin({
      id: 'usr-admin-rohit',
      name: 'Rohit Chaudhary',
      ign: 'CM BADSHAH',
      ffUid: '104928193',
      phone: '9812345678',
      walletBalance: 2500,
      depositBalance: 500,
      winningBalance: 2000,
      matchesPlayed: 52,
      totalKills: 384,
      totalWon: 18500,
      isAdmin: true
    });
    alert('Logged in as Owner / Admin (Rohit Chaudhary)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff2a5f] to-purple-600 mx-auto flex items-center justify-center text-white font-black text-xl mb-2 shadow-lg glow-accent">
            CM
          </div>
          <h3 className="font-display font-extrabold text-lg text-white">
            Player Account
          </h3>
          <p className="text-xs text-gray-400">
            Login ya Sign Up karke custom matches join karein
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-800 text-xs font-bold">
          <button
            onClick={() => setAuthTab('LOGIN')}
            className={`flex-1 pb-2 transition cursor-pointer ${
              authTab === 'LOGIN'
                ? 'text-[#ff2a5f] border-b-2 border-[#ff2a5f]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthTab('SIGNUP')}
            className={`flex-1 pb-2 transition cursor-pointer ${
              authTab === 'SIGNUP'
                ? 'text-[#ff2a5f] border-b-2 border-[#ff2a5f]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            New Account
          </button>
        </div>

        {/* LOGIN FORM */}
        {authTab === 'LOGIN' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Mobile Number ya FF UID
              </label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Ex: 9876543210 ya 194829104"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow glow-accent cursor-pointer transition active:scale-95"
            >
              Login Karein
            </button>

            <div className="pt-2 border-t border-gray-800 space-y-2">
              <button
                type="button"
                onClick={handleAdminQuickLogin}
                className="w-full py-2 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <i className="fas fa-crown text-[#ffd700]"></i> Login as Owner (Rohit Chaudhary)
              </button>
            </div>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-2.5 text-xs">
            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Aapka Naam
              </label>
              <input
                type="text"
                required
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Ex: Rohit Chaudhary"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#ff2a5f] mt-0.5"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Free Fire In-Game Name (IGN)
              </label>
              <input
                type="text"
                required
                value={signupIgn}
                onChange={(e) => setSignupIgn(e.target.value)}
                placeholder="Ex: CM BADSHAH"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#ff2a5f] mt-0.5"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Free Fire UID
              </label>
              <input
                type="text"
                required
                value={signupUid}
                onChange={(e) => setSignupUid(e.target.value)}
                placeholder="Ex: 104928193"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#ff2a5f] mt-0.5 font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                placeholder="Ex: 9876543210"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#ff2a5f] mt-0.5"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={signupPass}
                onChange={(e) => setSignupPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#ff2a5f] mt-0.5"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00f0ff] hover:bg-cyan-400 text-black font-extrabold text-xs py-2.5 rounded-xl shadow glow-cyan cursor-pointer transition active:scale-95 mt-2"
            >
              Sign Up & Get ₹50 Bonus
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
