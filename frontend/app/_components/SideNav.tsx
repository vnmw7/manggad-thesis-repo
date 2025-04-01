import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Import all modular components
import NavLink from "./SideNav/NavLink";
import Dropdown from "./SideNav/Dropdown";
import CollectionItem from "./SideNav/CollectionItem";
import DropdownList from "./SideNav/DropdownList";
import ClockDisplay from "./SideNav/ClockDisplay";
import Logo from "./SideNav/Logo";

// Import types and data
import { SideNavProps, containerVariants } from "./SideNav/types";
import {
  bookCollections,
  manageCollections,
  mainNavLinks,
  adminNavLinks,
  dropdownMenus,
} from "./SideNav/navData";

// Import hooks and utilities
import {
  useTimeAndDate,
  useAuthentication,
  useNavigation,
} from "./SideNav/hooks";
import {
  createNavigationHandler,
  createItemRenderer,
} from "./SideNav/navigationUtils";

// Main SideNav Component
const SideNav = ({ onContentChange }: SideNavProps) => {
  const router = useRouter();
  const { mounted, formattedTime, formattedDate } = useTimeAndDate();
  const { isAuthenticated } = useAuthentication();
  const { openDropdown, toggleDropdown } = useNavigation();

  // Create navigation handler
  const handleNavigation = createNavigationHandler(router, onContentChange);

  // Create item renderer for collections
  const renderCollectionItem = createItemRenderer(router, handleNavigation);

  return (
    <div className="flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-5 h-auto w-full bg-white/60 p-5 backdrop-blur-lg lg:mr-4 lg:ml-5 lg:w-[280px] dark:bg-gray-900/80 dark:text-white"
        >
          {/* Logo and Navigation Links Section */}
          <div className="mb-4">
            <Logo onClick={() => handleNavigation("/home", "home")} />

            <div className="mb-5 space-y-2">
              {/* Render main navigation links */}
              {mainNavLinks.map((link, index) => (
                <NavLink
                  key={`nav-${index}`}
                  icon={link.icon}
                  label={link.label}
                  onClick={() => handleNavigation("/home", link.content)}
                />
              ))}

              {/* Admin Dashboard - Only visible when authenticated */}
              {isAuthenticated &&
                adminNavLinks.map((link, index) => (
                  <NavLink
                    key={`admin-${index}`}
                    icon={link.icon}
                    label={link.label}
                    onClick={() => handleNavigation("/home", link.content)}
                  />
                ))}

              {/* Render dropdown menus */}
              {dropdownMenus.map((menu) => {
                // Skip menus that require authentication if user is not authenticated
                if (menu.requiresAuth && !isAuthenticated) return null;

                return (
                  <Dropdown
                    key={menu.id}
                    icon={menu.icon}
                    label={menu.label}
                    isOpen={openDropdown === menu.id}
                    toggleDropdown={() => toggleDropdown(menu.id)}
                    id={menu.id}
                  >
                    <DropdownList>
                      {menu.items.map((item, idx) => {
                        const props = renderCollectionItem(item, idx);
                        const { key, ...otherProps } = props;
                        return <CollectionItem key={key} {...otherProps} />;
                      })}
                    </DropdownList>
                  </Dropdown>
                );
              })}
            </div>

            {/* Clock and Date Display */}
            {mounted && (
              <ClockDisplay
                formattedDate={formattedDate}
                formattedTime={formattedTime}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SideNav;
