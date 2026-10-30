import { useState, useEffect } from 'react';
import {
  Tournament,
  UserProfile,
  WalletTransaction,
  ReelClip,
  LeaderboardPlayer
} from './types';
import {
  INITIAL_TOURNAMENTS,
  INITIAL_LEADERBOARD,
  INITIAL_REELS,
  INITIAL_USER,
  INITIAL_TRANSACTIONS
} from './data/mockData';
import { Header } from './components/Header';
import { PwaBanner } from './components/PwaBanner';
import { MatchesTab } from './components/MatchesTab';
import { MyMatchesTab } from './components/MyMatchesTab';
import { ReelsTab } from './components/ReelsTab';
import { LeaderboardTab } from './components/LeaderboardTab';
import { AiAssistantTab } from './components/AiAssistantTab';
import { WalletModal } from './components/WalletModal';
import { AuthModal } from './components/AuthModal';
import { AdminModal } from './components/AdminModal';
import { RulesModal } from './components/RulesModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  // Persistent State in localStorage
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cm_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    const saved = localStorage.getItem('cm_tournaments');
    return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
  });

  const [reels, setReels] = useState<ReelClip[]>(() => {
    const saved = localStorage.getItem('cm_reels');
    return saved ? JSON.parse(saved) : INITIAL_REELS;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>(() => {
    const saved = localStorage.getItem('cm_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('cm_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 'notif-1',
      title: 'Room ID Release Alert',
      message: 'Bermuda Daily Paid Solo #142 ka Room ID & Password live release ho chuka hai! "My Matches" me jaakar copy karein.',
      timestamp: '10 min ago',
      type: 'ROOM',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Welcome Bonus Credited',
      message: 'CM Esports join karne par aapke wallet me free practice entry bonus add kar diya gaya hai.',
      timestamp: 'Today',
      type: 'PAYMENT',
      read: false
    }
  ]);

  // Tab State
  const [activeTab, setActiveTab] = useState<'matches' | 'reels' | 'my-matches' | 'leaderboard' | 'ai'>('matches');

  // Modal States
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [rulesModalMatch, setRulesModalMatch] = useState<Tournament | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('cm_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cm_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('cm_reels', JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem('cm_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('cm_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handler: Join Match
  const handleJoinMatch = (matchId: string, slot: number, ign: string, ffUid: string) => {
    const targetMatch = tournaments.find((m) => m.id === matchId);
    if (!targetMatch) return;

    if (user.walletBalance < targetMatch.entryFee) {
      alert('Wallet balance kam hai! Pehle Add Money karein.');
      setWalletModalOpen(true);
      return;
    }

    // Deduct entry fee
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - targetMatch.entryFee,
      depositBalance: Math.max(0, prev.depositBalance - targetMatch.entryFee),
      matchesPlayed: prev.matchesPlayed + 1
    }));

    // Add transaction
    if (targetMatch.entryFee > 0) {
      const newTx: WalletTransaction = {
        id: `tx-${Date.now()}`,
        type: 'ENTRY_FEE',
        amount: targetMatch.entryFee,
        status: 'COMPLETED',
        timestamp: 'Just now',
        matchTitle: targetMatch.title
      };
      setTransactions((prev) => [newTx, ...prev]);
    }

    // Update match enrollment
    setTournaments((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          const updatedPlayers = [
            ...(m.registeredPlayers || []),
            { userId: user.id, ign, ffUid, slot }
          ];
          return {
            ...m,
            joinedSlots: m.joinedSlots + 1,
            registeredPlayers: updatedPlayers
          };
        }
        return m;
      })
    );

    // Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Slot Booked Successfully!',
      message: `${targetMatch.title} me aapka Slot #${slot} confirm ho gaya hai. Room ID start hone se 15 min pehle reveal hoga.`,
      timestamp: 'Just now',
      type: 'MATCH',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    alert(`Badhaai ho! Aapka Slot #${slot} confirm ho chuka hai. Room credentials "My Matches" me milenge.`);
    setActiveTab('my-matches');
  };

  // Handler: Add Funds (Deposit)
  const handleAddFunds = (amount: number, utr: string) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
      depositBalance: prev.depositBalance + amount
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'DEPOSIT',
      amount,
      status: 'COMPLETED',
      timestamp: 'Just now',
      utr,
      payoutMethod: 'UPI'
    };
    setTransactions((prev) => [newTx, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Money Added to Wallet',
        message: `₹${amount} aapke wallet me add ho gaye hain. UTR: ${utr}`,
        timestamp: 'Just now',
        type: 'PAYMENT',
        read: false
      },
      ...prev
    ]);
  };

  // Handler: Withdraw Funds
  const handleWithdrawFunds = (amount: number, upiId: string, method: string) => {
    if (amount > user.winningBalance) return false;

    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
      winningBalance: prev.winningBalance - amount
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'WITHDRAWAL',
      amount,
      status: 'PENDING',
      timestamp: 'Just now',
      upiId,
      payoutMethod: method
    };
    setTransactions((prev) => [newTx, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Withdrawal Processing',
        message: `₹${amount} ka withdrawal request receive hua hai (${method}: ${upiId}). Rohit Chaudhary dwara verify ho raha hai.`,
        timestamp: 'Just now',
        type: 'PAYMENT',
        read: false
      },
      ...prev
    ]);

    return true;
  };

  // Admin: Create tournament
  const handleCreateTournament = (tournament: Tournament) => {
    setTournaments((prev) => [tournament, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Tournament Published!',
        message: `${tournament.title} (${tournament.mode}) is now open for registrations!`,
        timestamp: 'Just now',
        type: 'MATCH',
        read: false
      },
      ...prev
    ]);
  };

  // Admin: Update room credentials
  const handleUpdateRoomCredentials = (matchId: string, roomId: string, roomPass: string, releaseNow: boolean) => {
    setTournaments((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            roomId,
            roomPass,
            status: releaseNow ? 'ROOM_RELEASED' : m.status
          };
        }
        return m;
      })
    );

    if (releaseNow) {
      const match = tournaments.find((m) => m.id === matchId);
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: '⚡ ROOM ID & PASS LIVE!',
          message: `${match?.title || 'Custom Match'} ka Room ID: ${roomId} aur Password: ${roomPass} hai. Join now!`,
          timestamp: 'Just now',
          type: 'ROOM',
          read: false
        },
        ...prev
      ]);
    }
  };

  // Admin: Declare winner
  const handleDeclareWinner = (matchId: string, firstWinner: string, mvp: string) => {
    const match = tournaments.find((m) => m.id === matchId);
    if (!match) return;

    setTournaments((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            status: 'COMPLETED',
            winner: { first: firstWinner, mvp }
          };
        }
        return m;
      })
    );

    // If current user is winner or demo
    if (firstWinner.toLowerCase().includes(user.ign.toLowerCase()) || firstWinner.includes('CM BADSHAH')) {
      const prize = match.firstPrize || match.prizePool;
      setUser((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance + prize,
        winningBalance: prev.winningBalance + prize,
        totalWon: prev.totalWon + prize
      }));

      const newTx: WalletTransaction = {
        id: `tx-${Date.now()}`,
        type: 'WINNING_PRIZE',
        amount: prize,
        status: 'COMPLETED',
        timestamp: 'Just now',
        matchTitle: match.title,
        note: `Booyah 1st prize credited!`
      };
      setTransactions((prev) => [newTx, ...prev]);
    }
  };

  // Admin: Approve / Reject Transaction
  const handleApproveTransaction = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'COMPLETED' } : t))
    );
    alert('Transaction approved successfully!');
  };

  const handleRejectTransaction = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'REJECTED' } : t))
    );
    alert('Transaction rejected.');
  };

  // Add Reel
  const handleAddReel = (newReelData: any) => {
    const createdReel: ReelClip = {
      ...newReelData,
      id: `reel-${Date.now()}`,
      likes: 1,
      views: 12,
      createdAt: 'Just now'
    };
    setReels((prev) => [createdReel, ...prev]);
  };

  // Submit Result
  const handleSubmitResult = (matchId: string, kills: number, proofNote: string) => {
    const match = tournaments.find((m) => m.id === matchId);
    if (!match) return;

    setUser((prev) => ({
      ...prev,
      totalKills: prev.totalKills + kills
    }));

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Result Received',
        message: `${match.title} ke liye ${kills} Kills ka proof submit hua: "${proofNote}". Verification in progress.`,
        timestamp: 'Just now',
        type: 'MATCH',
        read: false
      },
      ...prev
    ]);
  };

  const myMatchesCount = tournaments.filter((m) =>
    m.registeredPlayers?.some((p) => p.userId === user.id || p.ffUid === user.ffUid)
  ).length;

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-[#0b0e14] min-h-screen flex flex-col justify-between text-gray-100 antialiased pb-24">
      {/* TOP HEADER */}
      <Header
        user={user}
        onOpenWallet={() => setWalletModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
      />

      {/* PWA INSTALL BANNER */}
      <PwaBanner />

      {/* MAIN VIEWPORT CONTAINER */}
      <main className="flex-1 max-w-lg mx-auto w-full px-3.5 sm:px-4 pt-4 pb-6">
        {activeTab === 'matches' && (
          <MatchesTab
            tournaments={tournaments}
            user={user}
            onJoinMatch={handleJoinMatch}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenWallet={() => setWalletModalOpen(true)}
            onViewRules={(tournament) => setRulesModalMatch(tournament)}
          />
        )}

        {activeTab === 'reels' && (
          <ReelsTab
            reels={reels}
            user={user}
            onAddReel={handleAddReel}
          />
        )}

        {activeTab === 'my-matches' && (
          <MyMatchesTab
            tournaments={tournaments}
            user={user}
            onBrowseMatches={() => setActiveTab('matches')}
            onSubmitResult={handleSubmitResult}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardTab
            players={leaderboard}
          />
        )}

        {activeTab === 'ai' && (
          <AiAssistantTab />
        )}
      </main>

      {/* MOBILE BOTTOM DOCK NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0e14]/95 backdrop-blur-md border-t border-gray-800 mobile-dock">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex flex-col items-center gap-1 transition cursor-pointer ${
              activeTab === 'matches' ? 'text-[#ff2a5f]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fas fa-crosshairs text-lg"></i>
            <span className="text-[10px] font-bold">Matches</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`flex flex-col items-center gap-1 transition cursor-pointer ${
              activeTab === 'reels' ? 'text-[#ff2a5f]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fas fa-film text-lg"></i>
            <span className="text-[10px] font-bold">Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('my-matches')}
            className={`flex flex-col items-center gap-1 transition cursor-pointer relative ${
              activeTab === 'my-matches' ? 'text-[#ff2a5f]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fas fa-ticket-alt text-lg"></i>
            <span className="text-[10px] font-bold">My Matches</span>
            {myMatchesCount > 0 && (
              <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-[#ff2a5f] text-white text-[9px] font-black flex items-center justify-center">
                {myMatchesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center gap-1 transition cursor-pointer ${
              activeTab === 'leaderboard' ? 'text-[#ffd700]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fas fa-crown text-lg"></i>
            <span className="text-[10px] font-bold">Rank</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex flex-col items-center gap-1 transition cursor-pointer ${
              activeTab === 'ai' ? 'text-[#00f0ff]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fas fa-robot text-lg"></i>
            <span className="text-[10px] font-bold">AI Bot</span>
          </button>
        </div>
      </nav>

      {/* ALL MODALS */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        user={user}
        transactions={transactions}
        onAddFunds={handleAddFunds}
        onWithdrawFunds={handleWithdrawFunds}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={user}
        onLogin={(updatedUser) => setUser(updatedUser)}
      />

      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        tournaments={tournaments}
        transactions={transactions}
        onCreateTournament={handleCreateTournament}
        onUpdateRoomCredentials={handleUpdateRoomCredentials}
        onDeclareWinner={handleDeclareWinner}
        onApproveTransaction={handleApproveTransaction}
        onRejectTransaction={handleRejectTransaction}
      />

      <RulesModal
        tournament={rulesModalMatch}
        onClose={() => setRulesModalMatch(null)}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
      />
    </div>
  );
}
