import React, { useState } from 'react';

export const PwaBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  if (dismissed) return null;

  const handleInstallClick = () => {
    // If standard BeforeInstallPrompt event is stored
    const win = window as any;
    if (win.deferredPrompt) {
      win.deferredPrompt.prompt();
      win.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstalled(true);
        }
        win.deferredPrompt = null;
      });
    } else {
      // Show helpful instructions modal or prompt
      alert('Mobile me Install karne ke liye: Browser ke 3-dots menu (⋮) par tap karein aur "Add to Home screen" / "Install app" select karein.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-950/80 via-[#151b26] to-rose-950/80 border-b border-purple-500/20 px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs">
          <div className="w-8 h-8 rounded-lg bg-[#ff2a5f] flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">
            <i className="fas fa-download"></i>
          </div>
          <div>
            <div className="font-bold text-white leading-tight">App Phone Me Install Karein</div>
            <div className="text-[11px] text-gray-300">Fast room notification & full screen experience</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="bg-[#ff2a5f] hover:bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow transition cursor-pointer active:scale-95 whitespace-nowrap"
          >
            {installed ? 'Installed!' : 'Install App'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-gray-400 hover:text-white p-1 cursor-pointer transition"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
