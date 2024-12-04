import APP_PATHS from "@/config/path.config";
import adobe from "../../../public/adobe.svg";
import atlassian from "../../../public/atlassian.svg";

export const GITHUB_REPO = "https://github.com/----";

export const navbar = [
  { id: 1, label: "Home", path: APP_PATHS.HOME },
  { id: 2, label: "About", path: APP_PATHS.ABOUT },
  { id: 2, label: "Download", path: APP_PATHS.DOWNLOAD },
  { id: 2, label: "Contactus", path: APP_PATHS.CONTACT_US },
];

export const donorSidebar = [
  {
    Dashboard: [
      { id: 1, label: "Tweets", path: APP_PATHS.HOME },
      { id: 2, label: "Notifications", path: APP_PATHS.ABOUT },
      { id: 3, label: "Following Tweets", path: APP_PATHS.DOWNLOAD },
      { id: 7, label: "Following", path: APP_PATHS.CONTACT_US },
      { id: 4, label: "Saved Applications", path: APP_PATHS.CONTACT_US },
      { id: 5, label: "Genuine Applications", path: APP_PATHS.CONTACT_US },
      { id: 6, label: "Unverified Applications", path: APP_PATHS.CONTACT_US },
    ],
    Settings: [
      { id: 1, label: "Profile", path: APP_PATHS.CONTACT_US },
      { id: 2, label: "Edit Profile", path: APP_PATHS.CONTACT_US },
      { id: 3, label: "Donations History", path: APP_PATHS.CONTACT_US },
    ],
  },
];

export const verifierSidebar = [
  {
    Dashboard: [
      { id: 1, label: "Apply", path: APP_PATHS.HOME },
      { id: 2, label: "Search By Photo", path: APP_PATHS.ABOUT },
      { id: 2, label: "Search By Phone Number", path: APP_PATHS.ABOUT },
    ],
  },
];

export const acceptorSidebar = [
  {
    Dashboard: [
      { id: 1, label: "Apply", path: APP_PATHS.HOME },
      { id: 2, label: "Profile", path: APP_PATHS.ABOUT },
      { id: 2, label: "Bookmarked", path: APP_PATHS.ABOUT },
      { id: 2, label: "My Applications", path: APP_PATHS.ABOUT },
      { id: 2, label: "Donations History", path: APP_PATHS.ABOUT },
    ],
  },
];

export const socials = [
  {
    icon: adobe,
    alt: "youtube",
    href: "https://www.youtube.com/@100xDevs-n1w",
  },
  { icon: adobe, alt: "twitter", href: "https://x.com/100xDevs" },
];

export const footerItems = [
  {
    label: "About Us",
    href: "/",
  },
  {
    label: "Terms of Service",
    href: "/",
  },
  {
    label: "Privacy Policy",
    href: "/",
  },
  {
    label: "Faqs",
    href: "/",
  },
  {
    label: "Contact Us",
    href: "/",
  },
  {
    label: "Testimonials",
    href: "/",
  },
];

export const trustedSocialActivists = [
  {
    icon: adobe,
    name: "Wali Rahmani",
  },
  {
    icon: atlassian,
    name: "HYC Salman Khan",
  },
  {
    icon: atlassian,
    name: "Real Miya Bhai",
  },
];
