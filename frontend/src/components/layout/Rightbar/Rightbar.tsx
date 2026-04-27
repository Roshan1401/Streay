import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import ProfileSection from "./ProfileSection";
import ActivitySection from "./ActivitySection";
import ActionsSection from "./ActionsSection";

function Rightbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 border-l border-(--color-border) bg-(--color-bg-primary) px-7 py-6 lg:w-55 xl:w-75">
      <ProfileSection />
      <ActivitySection />
      <ActionsSection handleLogout={handleLogout} />
    </div>
  );
}

export default Rightbar;
