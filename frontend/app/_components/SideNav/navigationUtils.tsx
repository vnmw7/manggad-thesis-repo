import { useRouter } from "next/navigation";
import { ContentType, CollectionItemData } from "./navData";

/**
 * Creates a navigation handler that manages content changes and routing
 */
export const createNavigationHandler = (
  router: ReturnType<typeof useRouter>,
  onContentChange?: (content: ContentType) => void,
) => {
  return (path: string, content?: ContentType) => {
    // Check if this is a content change request
    const isHomePath = path === "/home";
    // Handle content change request: check conditions sequentially
    if (isHomePath) {
      if (content) {
        if (onContentChange) {
          onContentChange(content); // Now safe to call
          return; // Exit after handling content change
        }
      }
    }

    // Default case: use router navigation
    router.push(path);
  };
};

// Function to render collection items with consistent formatting
export const createItemRenderer = (
  router: ReturnType<typeof useRouter>,
  handleNavigation: (path: string, content?: ContentType) => void,
) => {
  return (item: CollectionItemData, index: number) => {
    const onClick = () => {
      // Handle navigation based on whether item has a path or content
      if (item.path) {
        router.push(item.path);
      } else if (item.content) {
        handleNavigation("/home", item.content);
      }
    };

    return {
      key: `collection-${index}`,
      icon: item.icon,
      label: item.label,
      onClick,
    };
  };
};
