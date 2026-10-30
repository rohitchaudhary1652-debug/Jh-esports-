import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'ROOM' | 'PAYMENT' | 'MATCH';
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl w-full max-w-sm p-4 space-y-4 shadow-2xl relative max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <i className="fas fa-bell text-[#ff2a5f]"></i>
            <h3 className="font-display font-extrabold text-base text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] text-[#00f0ff] hover:underline cursor-pointer font-semibold"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 hide-scrollbar">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              Koi notifications nahi hain.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl border text-xs transition ${
                  notif.read
                    ? 'bg-[#0b0e14] border-gray-800 text-gray-400'
                    : 'bg-[#1a2233] border-purple-500/30 text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span className="flex items-center gap-1.5">
                    {notif.type === 'ROOM' && <i className="fas fa-key text-[#00f0ff]"></i>}
                    {notif.type === 'PAYMENT' && <i className="fas fa-wallet text-[#ffd700]"></i>}
                    {notif.type === 'MATCH' && <i className="fas fa-trophy text-[#ff2a5f]"></i>}
                    {notif.title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-gray-300">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
