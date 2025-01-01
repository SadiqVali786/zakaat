import APP_PATHS from "@/config/path.config";
import { ICONS } from "../icons";

// export const GITHUB_REPO = "https://github.com/----";
export const NAVBAR_LINKS = [
  {
    title: "Home",
    link: APP_PATHS.HOME,
  },
  {
    title: "Tweets",
    link: APP_PATHS.TWEETS,
  },
  {
    title: "Applications",
    link: APP_PATHS.ZAKAAT_APPLICATIONS,
  },
  {
    title: "Download",
    link: APP_PATHS.DOWNLOAD,
  },
  {
    title: "ContactUs",
    link: APP_PATHS.CONTACT_US,
  },
];

export const donorSidebar = [
  {
    label: "Tweets",
    path: APP_PATHS.TWEETS,
    icon: ICONS.tweets,
  },
  {
    label: "Following Tweets",
    path: APP_PATHS.FOLLOWING_TWEETS,
    icon: ICONS["following-tweets"],
  },
  {
    label: "Zakaat Applications",
    path: APP_PATHS.ZAKAAT_APPLICATIONS,
    icon: ICONS["zakaat-applications"],
  },
  {
    label: "Bookmarks",
    path: APP_PATHS.BOOKMARKED_APPLICATIONS,
    icon: ICONS.bookmarks,
  },
  {
    label: "Donations History",
    path: APP_PATHS.DONATIONS_HISTORY,
    icon: ICONS["donations-history"],
  },
];

export const verifierSidebar = [
  {
    label: "Search Applicant",
    path: APP_PATHS.SEARCH_APPLICANT,
    icon: ICONS["search-black"],
  },
  {
    label: "Apply",
    path: APP_PATHS.APPLY,
    icon: ICONS["apply-zakaat-application"],
  },
  {
    label: "Edit",
    path: APP_PATHS.EDIT_APPLICATION,
    icon: ICONS.edit,
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
