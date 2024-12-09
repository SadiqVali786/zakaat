import APP_PATHS from "@/config/path.config";
import { ICONS } from "../icons";

// export const GITHUB_REPO = "https://github.com/----";

export const navbar = [
  { id: 1, label: "Home", path: APP_PATHS.HOME },
  { id: 2, label: "About", path: APP_PATHS.ABOUT },
  { id: 2, label: "Download", path: APP_PATHS.DOWNLOAD },
  { id: 2, label: "Contactus", path: APP_PATHS.CONTACT_US },
];

export const donorSidebar = [
  {
    id: 1,
    label: "Zakaat Applications",
    path: APP_PATHS.ZAKAAT_APPLICATIONS,
    icon: ICONS["zakaat-applications"],
  },
  {
    id: 2,
    label: "Bookmarks",
    path: APP_PATHS.BOOKMARKED_APPLICATIONS,
    icon: ICONS.bookmarks,
  },
  {
    id: 3,
    label: "My Profile",
    path: APP_PATHS.DONOR_PROFILE,
    icon: ICONS["my-profile"],
  },
  {
    id: 4,
    label: "My Connections",
    path: APP_PATHS.MY_CONNECTIONS,
    icon: ICONS["my-connections"],
  },
  {
    id: 5,
    label: "Donations History",
    path: APP_PATHS.DONATIONS_HISTORY,
    icon: ICONS["donations-history"],
  },
];

export const verifierSidebar = [
  {
    id: 1,
    label: "Apply",
    path: APP_PATHS.APPLY,
    icon: ICONS["apply-zakaat-application"],
  },
  {
    id: 2,
    label: "Search Applicant",
    path: APP_PATHS.SEARCH_APPLICANT,
    icon: ICONS["search-black"],
  },
  {
    id: 2,
    label: "My Profile",
    path: APP_PATHS.VERIFIER_PROFILE,
    icon: ICONS["my-profile"],
  },
];

export const socials = [
  {
    id: 1,
    icon: ICONS.youtube,
    alt: "youtube",
    href: "https://www.youtube.com/@100xDevs-n1w",
  },
  {
    id: 2,
    icon: ICONS.twitter,
    alt: "twitter",
    href: "https://x.com/100xDevs",
  },
  {
    id: 3,
    icon: ICONS.facebook,
    alt: "facebook",
    href: "https://x.com/100xDevs",
  },
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
    icon: ICONS.youtube,
    name: "Wali Rahmani",
  },
  {
    icon: ICONS.youtube,
    name: "HYC Salman Khan",
  },
  {
    icon: ICONS.youtube,
    name: "Real Miya Bhai",
  },
];
