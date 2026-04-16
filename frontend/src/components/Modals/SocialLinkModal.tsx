import { useState } from "react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WebsiteIcon,
  YouTubeIcon,
} from "../../assets/Icons/index";
import { Plus } from "lucide-react";

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
    svg: <GithubIcon className="h-5 w-5" />,
  },
  {
    platform: "instagram",
    label: "Instagram",
    svg: <InstagramIcon className="h-5 w-5" />,
  },
  {
    platform: "twitter",
    label: "Twitter",
    svg: <TwitterIcon className="h-5 w-5" />,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    svg: <LinkedInIcon className="h-5 w-5" />,
  },
  {
    platform: "youtube",
    label: "YouTube",
    svg: <YouTubeIcon className="h-5 w-5" />,
  },
  {
    platform: "website",
    label: "Website",
    svg: <WebsiteIcon className="h-5 w-5" />,
  },
];

export function SocialLinkModal({
  isOpen,
  onClose,
  onAddLink,
  existingPlatforms,
}: SocialLinkModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialLink | null>(
    null,
  );
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  const availablePlatforms = platforms.filter(
    (p) => !existingPlatforms.includes(p.platform),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-100 max-w-[90vw] rounded-xl border border-(--color-border) bg-(--color-bg-primary) p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-(--color-text-primary)">
            Add Social Link
          </h2>
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-full p-2 text-gray-500 hover:bg-neutral-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-gray-200"
          >
            <Plus className="h-5 w-5 rotate-45" />
          </button>
        </div>

        {availablePlatforms.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            All platforms already added!
          </p>
        ) : !selectedPlatform ? (
          <div className="grid grid-cols-2 gap-3">
            {availablePlatforms.map((platform) => (
              <button
                key={platform.platform}
                onClick={() => setSelectedPlatform(platform as SocialLink)}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-(--color-border-secondary) p-3 transition-all hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                <div className="text-(--color-text-primary)">
                  {platform.svg}
                </div>
                <span className="font-medium text-(--color-text-primary)">
                  {platform.label}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-orange-400 bg-orange-50 p-3 dark:bg-orange-900/20">
              <div className="text-(--color-text-primary)">
                {selectedPlatform.svg}
              </div>
              <span className="font-medium text-(--color-text-primary)">
                {selectedPlatform.label}
              </span>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="ml-auto cursor-pointer text-gray-500 hover:text-gray-400"
              >
                <Plus className="h-5 w-5 rotate-45" />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-(--color-text-secondary)">
                Enter your {selectedPlatform.label} URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`https://${selectedPlatform.platform}.com/username`}
                className="w-full rounded-lg border border-(--color-border-secondary) bg-transparent px-4 py-2 text-(--color-text-primary) focus:border-orange-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!url}
              className="w-full cursor-pointer rounded-lg bg-orange-500 px-4 py-2 font-bold text-white transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
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
