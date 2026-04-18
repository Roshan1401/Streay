import { useState } from "react";
import banner from "../../assets/banner.jpg";
import profilImg from "../../assets/image.png";
import {
  SocialLinkModal,
  platforms,
  type SocialLink,
} from "../Modals/SocialLinkModal";
import EditModal from "../Modals/EditModal";
import { Pencil, Plus } from "lucide-react";

function SocialLinkButton({
  svg,
  label,
  url,
}: {
  svg: React.ReactNode;
  label: string;
  url?: string;
}) {
  const Component = url ? "a" : "button";
  return (
    <Component
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-fit cursor-pointer items-center gap-3 rounded-lg border border-(--color-border-secondary) px-3 py-1.5 text-(--color-text-primary) shadow-2xl transition-colors hover:border-orange-400"
    >
      {svg}
      <span className="text-md font-medium">{label}</span>
    </Component>
  );
}

function ProfileHeader() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      platform: "github",
      label: "GitHub",
      svg: platforms[0].svg,
      url: "https://github.com/roshanpatil",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setzIsEditModalOpen] = useState(false);

  const handleAddLink = (link: SocialLink) => {
    setSocialLinks([...socialLinks, link]);
  };

  return (
    <div>
      <SocialLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLink={handleAddLink}
        existingPlatforms={socialLinks.map((l) => l.platform)}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setzIsEditModalOpen(false)}
      />

      <div className="relative">
        <div className="h-40 overflow-hidden border-b border-(--color-border) bg-black md:h-50 xl:h-70">
          <img
            src={banner}
            className="h-full w-full object-cover"
            alt="Banner"
          />
        </div>
        <div className="lg:-bottom-15.7 absolute -bottom-12 left-4 size-26 transform overflow-hidden rounded-full border-2 border-orange-400 transition-all duration-200 hover:scale-105 md:-bottom-18 md:left-6 md:size-36 xl:-bottom-25 xl:left-1/8 xl:size-50 xl:-translate-x-1/2 2xl:left-30 dark:border-black">
          <img
            src={profilImg}
            className="h-full w-full object-cover"
            alt="Profile"
          />
        </div>
      </div>
      <div className="relative pt-15 md:pt-22 xl:pt-32">
        <div className="flex flex-col gap-1 px-4 md:gap-2 xl:px-10">
          <span className="text-2xl font-bold text-(--color-text-primary) md:text-4xl">
            Roshan Patil
          </span>
          <span className="text-md text-(--color-text-secondary) md:text-xl">
            @patilrosha99
          </span>
          <span className="mt-1 text-lg text-(--color-text-primary) md:mt-2 md:text-2xl">
            Learning web dev
          </span>
          <div className="mt-7 flex flex-col items-center gap-5 md:flex-row">
            <div className="grid grid-cols-3 gap-2 md:flex">
              {socialLinks.map((link) => (
                <SocialLinkButton
                  key={link.platform}
                  svg={link.svg}
                  label={link.label}
                  url={link.url}
                />
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border border-(--color-border-secondary) px-2 py-2 text-center text-3xl transition-all duration-100 hover:scale-115 hover:border-orange-400 md:w-fit md:rounded-full"
            >
              <Plus className="h-5 w-5 text-(--color-text-primary) md:h-6 md:w-6" />
              <span className="flex text-sm font-semibold text-(--color-text-primary) md:hidden">
                Add Link
              </span>
            </button>
          </div>
        </div>
        <div className="absolute top-10 right-3 p-4 md:top-17 lg:top-29 lg:right-5">
          <button
            onClick={() => setzIsEditModalOpen(true)}
            className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-(--color-border-secondary) bg-orange-500 px-2 py-2 text-white shadow-2xl transition-all duration-100 hover:scale-105 md:rounded-lg md:px-4"
          >
            <Pencil className="h-5 w-5" />
            <span className="hidden text-xl font-bold md:flex">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
