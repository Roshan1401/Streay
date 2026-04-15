import { useState } from "react";

export interface SocialLink {
  platform: string;
  label: string;
  svg: React.ReactNode;
  url: string;
}

interface SocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLink: (link: SocialLink) => void;
  existingPlatforms: string[];
}

const platforms = [
  {
    platform: "github",
    label: "GitHub",
    svg: (
      <svg
        className="w-5 h-5"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 496 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
      </svg>
    ),
  },
  {
    platform: "instagram",
    label: "Instagram",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
      </svg>
    ),
  },
  {
    platform: "twitter",
    label: "Twitter",
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    platform: "youtube",
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    platform: "website",
    label: "Website",
    svg: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export function SocialLinkModal({
  isOpen,
  onClose,
  onAddLink,
  existingPlatforms,
}: SocialLinkModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialLink | null>(null);
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  const availablePlatforms = platforms.filter(
    (p) => !existingPlatforms.includes(p.platform)
  );

  const handleSubmit = () => {
    if (selectedPlatform && url) {
      onAddLink({ ...selectedPlatform, url });
      setSelectedPlatform(null);
      setUrl("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedPlatform(null);
    setUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-(--color-bg-primary) rounded-xl p-6 w-[400px] max-w-[90vw] shadow-2xl border border-(--color-border)">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-(--color-text-primary)">Add Social Link</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 cursor-pointer rounded-full hover:bg-neutral-200 p-2 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {availablePlatforms.length === 0 ? (
          <p className="text-center text-gray-500 py-4">All platforms already added!</p>
        ) : !selectedPlatform ? (
          <div className="grid grid-cols-2 gap-3">
            {availablePlatforms.map((platform) => (
              <button
                key={platform.platform}
                onClick={() => setSelectedPlatform(platform as SocialLink)}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border border-(--color-border-secondary) hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
              >
                <div className="text-(--color-text-primary)">

                {platform.svg}
                </div>
                <span className="font-medium text-(--color-text-primary)">{platform.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-orange-400 bg-orange-50 dark:bg-orange-900/20">
            <div className="text-(--color-text-primary)">

              {selectedPlatform.svg}
              </div>
              <span className="font-medium text-(--color-text-primary)">{selectedPlatform.label}</span>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="ml-auto text-gray-500 hover:text-gray-300 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                Enter your {selectedPlatform.label} URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`https://${selectedPlatform.platform}.com/username`}
                className="w-full px-4 py-2 rounded-lg border border-(--color-border-secondary) bg-transparent text-(--color-text-primary) focus:border-orange-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!url}
              className="w-full py-2 cursor-pointer px-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Add Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { platforms };
