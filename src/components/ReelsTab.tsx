import React, { useState } from 'react';
import { ReelClip, UserProfile } from '../types';

interface ReelsTabProps {
  reels: ReelClip[];
  user: UserProfile;
  onAddReel: (reel: Omit<ReelClip, 'id' | 'likes' | 'views' | 'createdAt'>) => void;
}

export const ReelsTab: React.FC<ReelsTabProps> = ({ reels, user, onAddReel }) => {
  const [reelList, setReelList] = useState<ReelClip[]>(reels);
  const [likedReelIds, setLikedReelIds] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTag, setNewTag] = useState('1v4 Clutch');
  const [newDesc, setNewDesc] = useState('');

  const toggleLike = (reelId: string) => {
    const isLiked = likedReelIds.includes(reelId);
    setLikedReelIds(isLiked ? likedReelIds.filter((id) => id !== reelId) : [...likedReelIds, reelId]);
    setReelList((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          return { ...r, likes: isLiked ? r.likes - 1 : r.likes + 1 };
        }
        return r;
      })
    );
  };

  const handleShare = (title: string, url: string) => {
    if (navigator.share) {
      navigator.share({
        title: `CM Esports - ${title}`,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('Reel link copied to clipboard!');
    }
  };

  const handleSubmitReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    onAddReel({
      title: newTitle,
      creatorName: user.name,
      creatorIgn: user.ign,
      description: newDesc || 'Free Fire tournament clutch submitted on CM Esports',
      youtubeUrl: newUrl,
      tag: newTag,
      duration: '0:45'
    });

    setIsUploadOpen(false);
    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
    alert('Aapki Reel submit ho gayi hai! Verification ke baad feed me show hogi.');
  };

  return (
    <div className="space-y-4">
      {/* HEADER & UPLOAD BAR */}
      <div className="flex items-center justify-between bg-[#151b26] p-4 rounded-2xl border border-gray-800 shadow-md">
        <div>
          <h2 className="font-display font-extrabold text-base text-white flex items-center gap-2">
            <i className="fas fa-film text-[#ff2a5f]"></i> FF Gameplay Reels
          </h2>
          <p className="text-xs text-gray-400">Watch & Upload Free Fire Highlights</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-3.5 py-1.5 bg-[#ff2a5f] hover:bg-rose-600 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow glow-accent transition cursor-pointer active:scale-95"
        >
          <i className="fas fa-plus"></i> Post Reel
        </button>
      </div>

      {/* REELS FEED */}
      <div className="space-y-4">
        {reelList.map((reel) => {
          const isLiked = likedReelIds.includes(reel.id);

          return (
            <div
              key={reel.id}
              className="bg-[#151b26] border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Creator Info */}
              <div className="p-3.5 flex items-center justify-between border-b border-gray-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff2a5f] to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                    {reel.creatorIgn.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{reel.creatorIgn}</span>
                      <span className="text-[10px] text-[#00f0ff] bg-[#00f0ff]/10 px-1.5 py-0.2 rounded border border-[#00f0ff]/30">
                        {reel.tag}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400">{reel.createdAt}</div>
                  </div>
                </div>

                <a
                  href={reel.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-400 hover:text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition"
                >
                  <i className="fab fa-youtube text-red-500"></i> YouTube
                </a>
              </div>

              {/* Video Player / Showcase Card */}
              <div className="relative aspect-video w-full bg-[#0b0e14] flex flex-col items-center justify-center p-4 text-center overflow-hidden group">
                <img
                  src="/src/assets/images/freefire_custom_room_1793363310004.jpg"
                  alt={reel.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/50 to-transparent"></div>

                <div className="relative z-10 space-y-3 max-w-sm px-4">
                  <a
                    href={reel.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-[#ff2a5f] hover:bg-rose-600 flex items-center justify-center text-white text-xl mx-auto shadow-2xl glow-accent transition duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <i className="fas fa-play ml-1"></i>
                  </a>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white leading-snug">
                    {reel.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 line-clamp-2">
                    {reel.description}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-4 py-3 flex items-center justify-between text-xs bg-[#0e131b]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(reel.id)}
                    className={`flex items-center gap-1.5 font-bold transition cursor-pointer ${
                      isLiked ? 'text-[#ff2a5f]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <i className={`${isLiked ? 'fas text-[#ff2a5f]' : 'far'} fa-heart text-base`}></i>
                    <span className="tabular-nums">{reel.likes}</span>
                  </button>

                  <button
                    onClick={() => handleShare(reel.title, reel.youtubeUrl)}
                    className="flex items-center gap-1.5 font-bold text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <i className="fas fa-share-alt text-sm"></i>
                    <span>Share</span>
                  </button>
                </div>

                <div className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                  <i className="far fa-eye text-gray-500"></i>
                  <span className="tabular-nums">{reel.views} views</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* UPLOAD REEL MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>

            <div>
              <div className="text-[10px] text-[#ff2a5f] uppercase font-black">
                FREE FIRE CLIPS
              </div>
              <h3 className="font-display font-extrabold text-base text-white">
                Post Gameplay Reel
              </h3>
              <p className="text-xs text-gray-400">
                Apna best clutch ya headshot montage CM Esports feed par share karein.
              </p>
            </div>

            <form onSubmit={handleSubmitReel} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Reel Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 1v4 Clutch in Purgatory Custom"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  YouTube / Video Link
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://youtube.com/shorts/... or video link"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Category Tag
                </label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                >
                  <option value="1v4 Clutch">1v4 Clutch</option>
                  <option value="Sniper Montage">Sniper Montage</option>
                  <option value="Booyah Moment">Booyah Moment</option>
                  <option value="Custom Highlights">Custom Highlights</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Bhai log like aur subscribe zarur karna!"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff2a5f] mt-1"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff2a5f] hover:bg-rose-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow glow-accent cursor-pointer transition active:scale-95"
              >
                Submit Reel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
