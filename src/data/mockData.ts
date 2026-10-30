import { Tournament, LeaderboardPlayer, ReelClip, UserProfile, WalletTransaction } from '../types';

const now = Date.now();

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'cm-match-101',
    title: '🔥 Bermuda Daily Paid Solo #142',
    map: 'Bermuda',
    mode: 'SOLO',
    entryFee: 20,
    prizePool: 650,
    firstPrize: 350,
    secondPrize: 150,
    thirdPrize: 70,
    perKill: 10,
    startTime: 'Today at 06:00 PM',
    startTimestamp: now + 12 * 60 * 1000, // Starts in 12 min -> Room is released!
    maxSlots: 48,
    joinedSlots: 42,
    status: 'ROOM_RELEASED',
    roomId: '74829104',
    roomPass: 'CM142',
    roomReleaseMinutes: 15,
    rules: [
      'Mobile phones only. PC/Emulator players banned immediately.',
      'Gun property is set to OFF.',
      'Character skill allowed (active & passive).',
      'Teaming up with enemies leads to instant disqualification.',
      'Take screenshot of your kills and rank after dying for payout verification.'
    ],
    bannerImage: '/src/assets/images/freefire_custom_room_1793363310004.jpg',
    registeredPlayers: [
      { userId: 'u-1', ign: 'CM BADSHAH', ffUid: '104928193', slot: 1 },
      { userId: 'u-2', ign: 'ViperSniper', ffUid: '984021029', slot: 2 },
      { userId: 'u-3', ign: 'OP_HEADSHOT', ffUid: '482019481', slot: 3 },
      { userId: 'u-4', ign: 'ThunderGod', ffUid: '682049182', slot: 4 }
    ]
  },
  {
    id: 'cm-match-102',
    title: '⚔️ Purgatory 1v4 Pro Squad Arena',
    map: 'Purgatory',
    mode: 'SQUAD',
    entryFee: 50,
    prizePool: 1800,
    firstPrize: 1000,
    secondPrize: 500,
    thirdPrize: 300,
    perKill: 20,
    startTime: 'Today at 07:30 PM',
    startTimestamp: now + 55 * 60 * 1000,
    maxSlots: 48,
    joinedSlots: 31,
    status: 'UPCOMING',
    roomId: '83920194',
    roomPass: 'PURG77',
    roomReleaseMinutes: 15,
    rules: [
      'Squad match (1v4 or full team permitted).',
      'Emulator strictly prohibited.',
      'Friendly fire OFF, Gun attributes OFF.',
      'Room ID & Password unlocks 15 minutes before 07:30 PM.'
    ],
    bannerImage: '/src/assets/images/cm_esports_hero_1793363309484.jpg',
    registeredPlayers: [
      { userId: 'u-1', ign: 'CM BADSHAH', ffUid: '104928193', slot: 12 }
    ]
  },
  {
    id: 'cm-match-103',
    title: '⚡ Kalahari Duo Rush Hour #88',
    map: 'Kalahari',
    mode: 'DUO',
    entryFee: 30,
    prizePool: 1100,
    firstPrize: 600,
    secondPrize: 300,
    thirdPrize: 200,
    perKill: 15,
    startTime: 'Today at 09:00 PM',
    startTimestamp: now + 140 * 60 * 1000,
    maxSlots: 48,
    joinedSlots: 18,
    status: 'UPCOMING',
    roomId: '94821038',
    roomPass: 'DUO88',
    roomReleaseMinutes: 15,
    rules: [
      'Duo team coordination.',
      'Roof camping banned.',
      'Both players get kill bounty directly.'
    ]
  },
  {
    id: 'cm-match-104',
    title: '🎯 Clash Squad 4v4 High Stakes Custom',
    map: 'Bermuda',
    mode: 'CLASH_SQUAD',
    entryFee: 40,
    prizePool: 1200,
    firstPrize: 900,
    secondPrize: 300,
    thirdPrize: 0,
    perKill: 10,
    startTime: 'Tonight at 10:30 PM',
    startTimestamp: now + 230 * 60 * 1000,
    maxSlots: 8,
    joinedSlots: 6,
    status: 'UPCOMING',
    roomId: '58392019',
    roomPass: 'CS4V4',
    roomReleaseMinutes: 15,
    rules: [
      'Best of 13 rounds.',
      'Grenades strictly limited to 1 per round.',
      'Gun property OFF. Limited ammo YES.'
    ]
  },
  {
    id: 'cm-match-105',
    title: '🎁 Free Entry Rookie Bermuda Cup',
    map: 'Bermuda',
    mode: 'SOLO',
    entryFee: 0,
    prizePool: 150,
    firstPrize: 100,
    secondPrize: 50,
    thirdPrize: 0,
    perKill: 0,
    startTime: 'Tomorrow at 04:00 PM',
    startTimestamp: now + 620 * 60 * 1000,
    maxSlots: 48,
    joinedSlots: 48,
    status: 'UPCOMING',
    roomId: '39201844',
    roomPass: 'FREE100',
    roomReleaseMinutes: 15,
    rules: [
      '100% Free Entry match for CM Esports community.',
      'Prize directly sent to winner Paytm/UPI.'
    ]
  },
  {
    id: 'cm-match-100',
    title: '🏆 Bermuda Grand Master Championship #141',
    map: 'Bermuda',
    mode: 'SOLO',
    entryFee: 25,
    prizePool: 800,
    firstPrize: 500,
    secondPrize: 200,
    thirdPrize: 100,
    perKill: 10,
    startTime: 'Yesterday at 08:00 PM',
    startTimestamp: now - 86400000,
    maxSlots: 48,
    joinedSlots: 48,
    status: 'COMPLETED',
    roomId: '62910482',
    roomPass: 'BOOYAH',
    roomReleaseMinutes: 15,
    rules: ['Match successfully finished. Payouts credited.'],
    winner: {
      first: 'CM BADSHAH (11 Kills)',
      second: 'AuraSniper (6 Kills)',
      third: 'GhostRider_FF (4 Kills)',
      mvp: 'CM BADSHAH'
    }
  }
];

export const INITIAL_LEADERBOARD: LeaderboardPlayer[] = [
  {
    rank: 1,
    name: 'Rohit Chaudhary',
    ign: 'CM BADSHAH',
    avatarLetter: 'CM',
    avatarBg: 'from-amber-500 to-rose-600',
    totalWinnings: 18500,
    booyahs: 46,
    kills: 312,
    badge: 'Grandmaster'
  },
  {
    rank: 2,
    name: 'Aman Verma',
    ign: 'ViperSniper_99',
    avatarLetter: 'VS',
    avatarBg: 'from-blue-500 to-cyan-500',
    totalWinnings: 12400,
    booyahs: 31,
    kills: 240,
    badge: 'Grandmaster'
  },
  {
    rank: 3,
    name: 'Sameer Khan',
    ign: 'OP_HEADSHOT_FF',
    avatarLetter: 'OP',
    avatarBg: 'from-purple-500 to-pink-500',
    totalWinnings: 9800,
    booyahs: 24,
    kills: 198,
    badge: 'Heroic'
  },
  {
    rank: 4,
    name: 'Deepak Patel',
    ign: 'ThunderGod_7',
    avatarLetter: 'TG',
    avatarBg: 'from-emerald-500 to-teal-500',
    totalWinnings: 7200,
    booyahs: 19,
    kills: 165,
    badge: 'Heroic'
  },
  {
    rank: 5,
    name: 'Karan Sharma',
    ign: 'Ghost_Bermuda',
    avatarLetter: 'GB',
    avatarBg: 'from-rose-500 to-orange-500',
    totalWinnings: 5900,
    booyahs: 15,
    kills: 142,
    badge: 'Master'
  },
  {
    rank: 6,
    name: 'Rohan Mehra',
    ign: 'Ninja_Clutch',
    avatarLetter: 'NC',
    avatarBg: 'from-indigo-500 to-violet-500',
    totalWinnings: 4350,
    booyahs: 11,
    kills: 118,
    badge: 'Diamond'
  }
];

export const INITIAL_REELS: ReelClip[] = [
  {
    id: 'reel-1',
    title: '🔥 CM BADSHAH 1v4 Clutch with M1887 in Bermuda Final Zone!',
    creatorName: 'Rohit Chaudhary',
    creatorIgn: 'CM BADSHAH',
    description: 'Unbelievable 1v4 turnaround when squad was wiped out. Watch pure headshot movement!',
    youtubeUrl: 'https://youtube.com/@cmbadshahlive37',
    embedId: 'dQw4w9WgXcQ',
    likes: 842,
    views: 4210,
    duration: '0:45',
    tag: '1v4 Clutch',
    createdAt: '2 hours ago'
  },
  {
    id: 'reel-2',
    title: '⚡ AWM Double Sniper Jump Shot Highlights from Custom Match #140',
    creatorName: 'Aman Verma',
    creatorIgn: 'ViperSniper_99',
    description: 'Quick scope transition and gloo wall cancel in Purgatory stadium.',
    youtubeUrl: 'https://youtube.com/@cmbadshahlive37',
    likes: 560,
    views: 2980,
    duration: '0:38',
    tag: 'Sniper Montage',
    createdAt: '5 hours ago'
  },
  {
    id: 'reel-3',
    title: '🏆 Winning ₹1,000 Grand Finals Booyah Moment - CM Esports Arena',
    creatorName: 'Rohit Chaudhary',
    creatorIgn: 'CM BADSHAH',
    description: 'Final zone heal battle and MP40 spray down. Thank you everyone for joining!',
    youtubeUrl: 'https://youtube.com/@cmbadshahlive37',
    likes: 1250,
    views: 6890,
    duration: '0:58',
    tag: 'Booyah Moment',
    createdAt: '1 day ago'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-default',
  name: 'Rohit Player',
  ign: 'CM_LEGEND',
  ffUid: '184920491',
  phone: '9876543210',
  walletBalance: 120,
  depositBalance: 50,
  winningBalance: 70,
  matchesPlayed: 14,
  totalKills: 48,
  totalWon: 620,
  isAdmin: false
};

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-001',
    type: 'WINNING_PRIZE',
    amount: 150,
    status: 'COMPLETED',
    timestamp: 'Yesterday, 08:45 PM',
    matchTitle: 'Bermuda Grand Master Championship #141',
    note: 'Booyah + 3 Kills Bounty credited'
  },
  {
    id: 'tx-002',
    type: 'ENTRY_FEE',
    amount: 20,
    status: 'COMPLETED',
    timestamp: 'Today, 02:15 PM',
    matchTitle: 'Bermuda Daily Paid Solo #142'
  },
  {
    id: 'tx-003',
    type: 'DEPOSIT',
    amount: 100,
    status: 'COMPLETED',
    timestamp: 'Yesterday, 04:30 PM',
    utr: '492019481928',
    payoutMethod: 'PhonePe UPI'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Custom Room ID aur Password kab milega?',
    a: 'Match shuru hone se theek 15 minute pehle aapke app me "My Matches" tab aur match card par Room ID & Password live reveal ho jayega. Wahan se copy karke Free Fire app me Custom > Join Room me paste karein.'
  },
  {
    q: 'Paisa jeetne par wallet se withdrawal kaise hoga?',
    a: 'Aap "Wallet" section me jaakar "Withdraw" tab par click karein. Apna UPI ID (Paytm, PhonePe ya Google Pay) daalein. Minimum withdrawal ₹30 hai. Rohit Chaudhary dwara verify hone par 5 se 15 minute me seedhe aapke account me bhej diya jaata hai.'
  },
  {
    q: 'Kya PC ya Emulator players allowed hain?',
    a: 'Nahi! PC aur Emulator players 100% strictly banned hain. Agar koi player PC se join karta hai toh usko turant kick aur ban kar diya jayega bina kisi refund ke.'
  },
  {
    q: 'Kya Gun property ON hoti hai?',
    a: 'Nahi, competitive fair esports ke liye Gun Property hamesha OFF rakhi jaati hai taki game pure skill aur movement par ho.'
  }
];
