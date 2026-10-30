import React, { useState } from 'react';
import { UserProfile, WalletTransaction } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  transactions: WalletTransaction[];
  onAddFunds: (amount: number, utr: string) => void;
  onWithdrawFunds: (amount: number, upiId: string, method: string) => boolean;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  user,
  transactions,
  onAddFunds,
  onWithdrawFunds
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'DEPOSIT' | 'WITHDRAW' | 'HISTORY'>('OVERVIEW');
  const [depositAmount, setDepositAmount] = useState<number>(50);
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState<number>(50);
  const [withdrawUpi, setWithdrawUpi] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('UPI ID');

  const [historyFilter, setHistoryFilter] = useState<'ALL' | 'DEPOSIT' | 'WITHDRAWAL' | 'ENTRY_FEE' | 'WINNING_PRIZE'>('ALL');

  if (!isOpen) return null;

  const UPI_ID = 'rohitchaudhary1642008@okaxis';

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 6) {
      alert('Kripya valid 12-digit UPI UTR / Transaction ID enter karein.');
      return;
    }
    onAddFunds(depositAmount, utrNumber);
    alert(`₹${depositAmount} ka deposit request submit ho gaya! Aapke wallet me balance update ho chuka hai.`);
    setUtrNumber('');
    setActiveTab('OVERVIEW');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount < 30) {
      alert('Minimum withdrawal amount ₹30 hai.');
      return;
    }
    if (withdrawAmount > user.winningBalance) {
      alert(`Aapke paas sirf ₹${user.winningBalance} winning balance hai. Aap deposit balance direct withdraw nahi kar sakte.`);
      return;
    }
    if (!withdrawUpi) {
      alert('Kripya apna UPI ID ya Mobile Number enter karein.');
      return;
    }

    const success = onWithdrawFunds(withdrawAmount, withdrawUpi, payoutMethod);
    if (success) {
      alert(`₹${withdrawAmount} ka withdrawal request safal raha! 10-15 minute me Rohit Chaudhary dwara verify hoke aapke account me bhej diya jayega.`);
      setWithdrawUpi('');
      setActiveTab('OVERVIEW');
    }
  };

  const filteredTxs = transactions.filter((t) => {
    if (historyFilter === 'ALL') return true;
    return t.type === historyFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* MODAL HEADER */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#0e131b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ffd700]/20 border border-[#ffd700]/40 flex items-center justify-center text-[#ffd700] text-sm font-black">
              ₹
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-white">
                CM Esports Wallet
              </h3>
              <p className="text-[10px] text-gray-400">Owner: Rohit Chaudhary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 cursor-pointer transition"
          >
            <i className="fas fa-times text-base"></i>
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="grid grid-cols-4 border-b border-gray-800 text-center text-xs font-bold bg-[#0b0e14]">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`py-2.5 transition cursor-pointer ${
              activeTab === 'OVERVIEW'
                ? 'text-[#ffd700] border-b-2 border-[#ffd700]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('DEPOSIT')}
            className={`py-2.5 transition cursor-pointer ${
              activeTab === 'DEPOSIT'
                ? 'text-[#10b981] border-b-2 border-[#10b981]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Add Money
          </button>
          <button
            onClick={() => setActiveTab('WITHDRAW')}
            className={`py-2.5 transition cursor-pointer ${
              activeTab === 'WITHDRAW'
                ? 'text-[#ff2a5f] border-b-2 border-[#ff2a5f]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Withdraw
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`py-2.5 transition cursor-pointer ${
              activeTab === 'HISTORY'
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 hide-scrollbar">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              {/* BALANCE CARD */}
              <div className="bg-gradient-to-br from-gray-900 via-[#151b26] to-[#0e131b] border border-[#ffd700]/40 rounded-2xl p-4 shadow-xl glow-gold text-center relative overflow-hidden">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Total Wallet Balance
                </div>
                <div className="text-3xl font-black text-[#ffd700] my-1 tabular-nums">
                  ₹{user.walletBalance}
                </div>
                <div className="text-[11px] text-gray-300">
                  Instant Match Entry & Quick Withdrawal
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-800 text-left text-xs">
                  <div className="bg-[#0b0e14]/80 p-2.5 rounded-xl border border-gray-800">
                    <div className="text-[10px] text-gray-400">Deposit Balance</div>
                    <div className="text-sm font-bold text-white tabular-nums">
                      ₹{user.depositBalance}
                    </div>
                    <div className="text-[9px] text-gray-500">For Match Entries</div>
                  </div>
                  <div className="bg-[#0b0e14]/80 p-2.5 rounded-xl border border-gray-800">
                    <div className="text-[10px] text-[#10b981] font-semibold">Winnings Balance</div>
                    <div className="text-sm font-bold text-[#10b981] tabular-nums">
                      ₹{user.winningBalance}
                    </div>
                    <div className="text-[9px] text-emerald-400/80">Withdrawable Cash</div>
                  </div>
                </div>
              </div>

              {/* QUICK ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTab('DEPOSIT')}
                  className="py-3 px-4 rounded-xl bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold text-xs shadow glow-emerald flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                >
                  <i className="fas fa-plus-circle"></i> Add Money (UPI)
                </button>
                <button
                  onClick={() => setActiveTab('WITHDRAW')}
                  className="py-3 px-4 rounded-xl bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs shadow glow-accent flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Withdraw Cash
                </button>
              </div>

              {/* RECENT TRANSACTIONS PREVIEW */}
              <div className="bg-[#0b0e14] border border-gray-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                  <span>Recent Activity</span>
                  <button
                    onClick={() => setActiveTab('HISTORY')}
                    className="text-[#00f0ff] hover:underline cursor-pointer text-[11px]"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-1.5">
                  {transactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white text-[11px]">
                          {tx.type === 'DEPOSIT' && 'Deposit Added'}
                          {tx.type === 'ENTRY_FEE' && 'Match Entry Paid'}
                          {tx.type === 'WINNING_PRIZE' && 'Booyah Winning Prize'}
                          {tx.type === 'WITHDRAWAL' && 'Cash Withdrawal'}
                        </div>
                        <div className="text-[10px] text-gray-400">{tx.timestamp}</div>
                      </div>
                      <div
                        className={`font-black text-xs tabular-nums ${
                          tx.type === 'DEPOSIT' || tx.type === 'WINNING_PRIZE'
                            ? 'text-[#10b981]'
                            : 'text-rose-400'
                        }`}
                      >
                        {tx.type === 'DEPOSIT' || tx.type === 'WINNING_PRIZE' ? '+' : '-'}₹
                        {tx.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEPOSIT (ADD MONEY) */}
          {activeTab === 'DEPOSIT' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-extrabold text-white text-sm">UPI Se Paisa Add Karein</h4>
                <p className="text-gray-400 text-[11px]">
                  PhonePe, Google Pay, ya Paytm se scan karein aur UTR number daalein.
                </p>
              </div>

              {/* AMOUNT SELECTOR */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 uppercase font-bold">
                  Amount Chuniye (₹)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[20, 50, 100, 200, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                        depositAmount === amt
                          ? 'bg-[#10b981] text-black shadow'
                          : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI DETAILS BOX */}
              <div className="bg-[#0b0e14] border border-gray-800 rounded-xl p-3.5 space-y-3">
                <div className="text-center space-y-1">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Official UPI ID</div>
                  <div className="flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 px-3 py-2 rounded-xl">
                    <span className="font-mono font-bold text-white text-xs select-all">
                      {UPI_ID}
                    </span>
                    <button
                      type="button"
                      onClick={copyUpi}
                      className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-[#00f0ff] rounded text-[10px] font-bold cursor-pointer transition"
                    >
                      {copiedUpi ? 'COPIED!' : 'COPY'}
                    </button>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Recipient: <strong className="text-white">Rohit Chaudhary (CM Esports)</strong>
                  </div>
                </div>

                {/* QR Code representation */}
                <div className="bg-white p-3 rounded-xl w-36 h-36 mx-auto flex flex-col items-center justify-center text-black text-center shadow-lg">
                  <i className="fas fa-qrcode text-6xl text-gray-900 mb-1"></i>
                  <span className="text-[9px] font-extrabold text-gray-800">SCAN TO PAY ₹{depositAmount}</span>
                </div>
              </div>

              {/* SUBMISSION FORM */}
              <form onSubmit={handleDepositSubmit} className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    12-Digit UPI UTR / Ref Number Daalein
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 429182910482"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981] mt-1 font-mono tracking-wide"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    PhonePe / Paytm payment receipt me se 12-digit UTR copy karein.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold text-xs rounded-xl shadow glow-emerald cursor-pointer transition active:scale-95"
                >
                  Confirm ₹{depositAmount} Deposit
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: WITHDRAW */}
          {activeTab === 'WITHDRAW' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-extrabold text-white text-sm">Jeeta Hua Paisa Withdraw Karein</h4>
                <p className="text-gray-400 text-[11px]">
                  Seedhe apne Paytm, PhonePe, ya UPI ID me withdrawal paayein.
                </p>
              </div>

              {/* WITHDRAWABLE BALANCE BANNER */}
              <div className="bg-[#0b0e14] border border-[#10b981]/30 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">Available Winning Cash</div>
                  <div className="text-lg font-black text-[#10b981] tabular-nums">
                    ₹{user.winningBalance}
                  </div>
                </div>
                <div className="text-right text-[10px] text-gray-400">
                  Minimum Withdrawal: <strong className="text-white">₹30</strong>
                </div>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-3">
                {/* METHOD PICKER */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Payout Method
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {['UPI ID', 'PhonePe', 'Paytm'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPayoutMethod(m)}
                        className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          payoutMethod === m
                            ? 'bg-[#ff2a5f] text-white shadow'
                            : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* UPI OR NUMBER */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    {payoutMethod === 'UPI ID' ? 'Enter UPI ID' : `Enter ${payoutMethod} Number`}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      payoutMethod === 'UPI ID' ? 'example@okaxis or @paytm' : 'Ex: 9876543210'
                    }
                    value={withdrawUpi}
                    onChange={(e) => setWithdrawUpi(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                  />
                </div>

                {/* AMOUNT INPUT */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase">
                    Withdrawal Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max={user.winningBalance}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff2a5f] mt-1 tabular-nums"
                  />
                  <div className="flex gap-2 mt-2">
                    {[30, 50, 100, user.winningBalance].map((amt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setWithdrawAmount(amt)}
                        className="px-2.5 py-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        {amt === user.winningBalance ? 'Max All' : `₹${amt}`}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={user.winningBalance < 30}
                  className="w-full py-3 bg-[#ff2a5f] hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs rounded-xl shadow glow-accent cursor-pointer transition active:scale-95"
                >
                  Request Instant Withdrawal
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: HISTORY */}
          {activeTab === 'HISTORY' && (
            <div className="space-y-3 text-xs">
              {/* FILTER BUTTONS */}
              <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'DEPOSIT', label: 'Deposits' },
                  { id: 'WINNING_PRIZE', label: 'Winnings' },
                  { id: 'WITHDRAWAL', label: 'Withdrawals' },
                  { id: 'ENTRY_FEE', label: 'Fees' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setHistoryFilter(f.id as any)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap cursor-pointer transition ${
                      historyFilter === f.id
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-900 text-gray-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* LIST */}
              <div className="space-y-2">
                {filteredTxs.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 text-xs">
                    Koi transactions nahi mili.
                  </div>
                ) : (
                  filteredTxs.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-xl bg-[#0b0e14] border border-gray-800/90 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-xs">
                          {tx.type === 'DEPOSIT' && 'Deposit Credited'}
                          {tx.type === 'ENTRY_FEE' && 'Match Entry Fee'}
                          {tx.type === 'WINNING_PRIZE' && 'Tournament Prize'}
                          {tx.type === 'WITHDRAWAL' && 'Cash Withdrawal'}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          {tx.timestamp}
                          {tx.matchTitle ? ` · ${tx.matchTitle}` : ''}
                          {tx.utr ? ` · UTR: ${tx.utr}` : ''}
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-black text-xs tabular-nums ${
                            tx.type === 'DEPOSIT' || tx.type === 'WINNING_PRIZE'
                              ? 'text-[#10b981]'
                              : 'text-rose-400'
                          }`}
                        >
                          {tx.type === 'DEPOSIT' || tx.type === 'WINNING_PRIZE' ? '+' : '-'}₹
                          {tx.amount}
                        </div>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            tx.status === 'COMPLETED'
                              ? 'bg-emerald-950 text-emerald-400'
                              : tx.status === 'PENDING'
                              ? 'bg-amber-950 text-amber-400'
                              : 'bg-rose-950 text-rose-400'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
