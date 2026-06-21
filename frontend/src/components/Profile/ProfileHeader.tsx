import { useEffect, useState } from "react";
import {
  SocialLinkModal,
  platforms,
  type SocialLink,
} from "../Modals/SocialLinkModal";
import EditModal from "../Modals/EditModal";
import { Pencil, Plus } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { PublicProfile } from "../../types/types";
import useProfileStore from "../../store/useProfileStore";

interface ProfileHeaderProps {
  profileData: PublicProfile | null;
}

const EMPTY_SOCIAL_LINKS: { platform: string; url: string }[] = [];

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

function ProfileHeader({ profileData }: ProfileHeaderProps) {
  const ownProfile = useProfileStore((state) => state.profile);
  const isOwnProfile = ownProfile?.id === profileData?.profile?.id;
  const profile = isOwnProfile ? ownProfile : (profileData?.profile ?? null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const links = profileData?.socialLinks ?? EMPTY_SOCIAL_LINKS;
    const finalResult = links.map((link) => {
      const platformInfo = platforms.find((p) => p.platform === link.platform);
      return {
        platform: link.platform,
        label: platformInfo ? platformInfo.label : link.platform,
        svg: platformInfo ? platformInfo.svg : null,
        url: link.url,
      };
    });

    setSocialLinks(finalResult);
  }, [profileData?.socialLinks]);

  const handleAddLink = async (link: SocialLink) => {
    if (!profile?.id) return;

    const previous = socialLinks;
    setSocialLinks([...socialLinks, link]);

    const { error } = await supabase.from("social_links").insert({
      user_id: profile.id,
      platform: link.platform,
      url: link.url,
    });

    if (error) {
      setSocialLinks(previous);
      console.error("Failed to add social link:", error.message);
    }
  };

  const handleRemoveLink = async (platform: string) => {
    if (!profile?.id) return;

    const previous = socialLinks;
    setSocialLinks(socialLinks.filter((l) => l.platform !== platform));

    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("user_id", profile.id)
      .eq("platform", platform);

    if (error) {
      setSocialLinks(previous);
      console.error("Failed to remove social link:", error.message);
    }
  };

  const handleOnSaveEdit = async (data: {
    name: string;
    username: string;
    bio: string;
    avatar_url: string;
    banner_url: string;
    country: string;
    state: string;
    city: string;
  }) => {
    if (!profile?.id) return;

    const updatedFields: Record<string, string> = {};

    if (data.name !== profile.name) updatedFields.name = data.name;
    if (data.username !== profile.username)
      updatedFields.username = data.username;
    if (data.bio !== profile.bio) updatedFields.bio = data.bio;
    if (data.avatar_url !== profile.avatar_url)
      updatedFields.avatar_url = data.avatar_url;
    if (data.banner_url !== profile.banner_url)
      updatedFields.banner_url = data.banner_url;
    if (data.country !== profile.country) updatedFields.country = data.country;
    if (data.state !== profile.state) updatedFields.state = data.state;
    if (data.city !== profile.city) updatedFields.city = data.city;

    if (Object.keys(updatedFields).length === 0) {
      setIsEditModalOpen(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updatedFields)
      .eq("id", profile.id);

    if (error) {
      console.error("Failed to update profile:", error.message);
      return;
    }

    if (isOwnProfile) {
      setProfile({
        ...ownProfile!,
        ...updatedFields,
      });
    }
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <SocialLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLink={handleAddLink}
        onRemoveLink={handleRemoveLink}
        existingLinks={socialLinks}
        existingPlatforms={socialLinks.map((l) => l.platform)}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={{
          name: profile?.name || "",
          username: profile?.username || "",
          bio: profile?.bio || "",
          country: profile?.country || "",
          state: profile?.state || "",
          city: profile?.city || "",
          avatar_url: profile?.avatar_url || "",
          banner_url: profile?.banner_url || "",
        }}
        onSave={handleOnSaveEdit}
      />

      <div className="relative">
        <div className="h-40 overflow-hidden border-b border-(--color-border) bg-black md:h-50 xl:h-70">
          <img
            src={profile?.banner_url}
            className="h-full w-full object-cover"
            alt="Banner"
          />
        </div>
        <div className="lg:-bottom-15.7 absolute -bottom-12 left-4 size-26 transform overflow-hidden rounded-full border-2 border-orange-400 transition-all duration-200 hover:scale-105 md:-bottom-18 md:left-6 md:size-36 xl:-bottom-25 xl:left-1/8 xl:size-50 xl:-translate-x-1/2 2xl:left-30 dark:border-black">
          <img
            src={profile?.avatar_url}
            className="h-full w-full object-cover"
            alt="Profile"
          />
        </div>
      </div>
      <div className="relative pt-15 md:pt-22 xl:pt-32">
        <div className="flex flex-col gap-1 px-4 md:gap-2 xl:px-10">
          <span className="text-2xl font-bold text-(--color-text-primary) md:text-3xl xl:text-4xl">
            {profile?.name || "Adam"}
          </span>
          <span className="text-md text-(--color-text-secondary) md:text-lg xl:text-xl">
            @{profile?.username || "adamBoka"}
          </span>
          <span className="mt-1 text-lg text-(--color-text-secondary) md:mt-2 md:text-xl">
            {profile?.bio || "I am the first man on earth"}
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
        {isOwnProfile && (
          <div className="absolute top-10 right-3 p-4 md:top-17 lg:top-18 lg:right-5 xl:top-28">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-(--color-border-secondary) bg-orange-500 px-2 py-2 text-white shadow-2xl transition-all duration-100 hover:scale-105 md:rounded-lg md:px-4"
            >
              <Pencil className="h-4 w-4 xl:h-5 xl:w-5" />
              <span className="hidden text-lg font-bold md:flex xl:text-xl">
                Edit
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
