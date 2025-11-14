import React from "react";
import { LuUser, PiChats, RiUserSearchLine, logo, profile } from "../assets";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import { useAuth } from "../context/AuthContext";
export default function SideMenu({ activeLeftSidebar, setActiveLeftSidebar }) {
  const sideMenuOptions = [
    { Icon: LuUser, name: "profile" },
    { Icon: PiChats, name: "recentChats" },
    { Icon: RiUserSearchLine, name: "searchUser" },
  ];

  const { logout, user } = useAuth();

  return (
    <div className="side-menu h-full md:w-full md:h-[60px] md:px-4 w-[60px] flex flex-col items-center justify-between py-4 bg-backgroundLight1 dark:bg-backgroundDark2 border-r border-border_light dark:border-border_dark md:flex-row md:border-t md:border-r-0">
      <div className="w-10 md:w-8 mb-2 md:mb-0">
        <div className="bg-primary rounded-full p-2 flex items-center justify-center">
          <img src={logo} alt="ochat" className="w-6 h-6" />
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-8 md:gap-6 md:flex-row">
          {sideMenuOptions.map(({ Icon, name }, index) => (
            <li
              key={index}
              className={`text-2xl md:text-xl cursor-pointer transition-colors p-2 rounded-lg ${
                name === activeLeftSidebar 
                  ? "text-primary bg-whatsapp_active dark:bg-whatsapp_green_dark/20" 
                  : "text-text_light_secondary dark:text-text_dark_secondary hover:bg-hover_light dark:hover:bg-hover_dark"
              }`}
              onClick={() => setActiveLeftSidebar(name)}
            >
              <Icon />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 items-center md:flex-row">
        <div className="text-xl md:text-lg cursor-pointer">
          <ThemeSwitchButton />
        </div>

        <button
          onClick={logout}
          className="md:hidden text-red-500 hover:text-red-600 cursor-pointer text-xs font-medium px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Logout
        </button>
        <img
          className="md:hidden size-8 rounded-full object-cover cursor-pointer ring-2 ring-border_light dark:ring-border_dark"
          src={user.avatarUrl}
          alt="profile"
          loading="lazy"
        />
      </div>
    </div>
  );
}
