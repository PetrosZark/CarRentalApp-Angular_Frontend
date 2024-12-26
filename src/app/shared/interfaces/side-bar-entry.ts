// Represents an entry in the sidebar navigation menu
export interface SideBarEntry {
    text: string;         // Display text for the sidebar item
    routerLink: string;   // Path to navigate when the item is clicked (Angular router link)
    visible?: boolean;    // (Optional) Determines if the item is visible in the menu
}
