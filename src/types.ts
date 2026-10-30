export type MatchMode = 'SOLO' | 'DUO' | 'SQUAD' | 'CLASH_SQUAD';
export type MatchStatus = 'UPCOMING' | 'ROOM_RELEASED' | 'LIVE' | 'COMPLETED';
export type MapType = 'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra';

export interface Tournament {
  id: string;
  title: string;
  map: MapType;
  mode: MatchMode;
  entryFee: number;
  prizePool: number;
  firstPrize: number;
  secondPrize: number;
  thirdPrize: number;
  perKill: number;
  startTime: string;
  startTimestamp: number;
  maxSlots: number;
  joinedSlots: number;
  status: MatchStatus;
  roomId?: string;
  roomPass?: string;
  roomReleaseMinutes: number;
  rules: string[];
  bannerImage?: string;
  registeredPlayers?: {
    userId: string;
    ign: string;
    ffUid: string;
    slot: number;
  }[];
  winner?: {
    first: string;
    second?: string;
    third?: string;
    mvp?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  ign: string;
  ffUid: string;
  phone: string;
  walletBalance: number;
  depositBalance: number;
  winningBalance: number;
  matchesPlayed: number;
  totalKills: number;
  totalWon: number;
  isAdmin: boolean;
  avatar?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'ENTRY_FEE' | 'WINNING_PRIZE';
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
  timestamp: string;
  utr?: string;
  upiId?: string;
  payoutMethod?: string;
  note?: string;
  matchTitle?: string;
}

export interface ReelClip {
  id: string;
  title: string;
  creatorName: string;
  creatorIgn: string;
  description: string;
  youtubeUrl: string;
  embedId?: string;
  likes: number;
  views: number;
  duration?: string;
  tag: string;
  createdAt: string;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  ign: string;
  avatarLetter: string;
  avatarBg: string;
  totalWinnings: number;
  booyahs: number;
  kills: number;
  badge: 'Grandmaster' | 'Heroic' | 'Master' | 'Diamond';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
