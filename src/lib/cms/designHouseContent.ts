import { IMAGES } from "@/lib/images";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroCard = {
  img: string;
  label: string;
  back: [string, string];
};

export type ClientRow = [string, string];

export type DisciplineItem = {
  n: string;
  name: string;
  desc: string;
  img: string;
  bg: string;
};

export type ServiceItem = {
  n: string;
  title: string;
  body: string;
  count: number;
  suffix: string;
  metric: string;
  img: string;
  cta_label: string;
  cta_href: string;
};

export type NewsPost = {
  tag: string;
  title: string;
  img: string;
  tint: "clay" | "butter" | "sky" | "lilac" | "acid";
  href: string;
};

export type StatTile = {
  value: string;
  label: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export type DesignHouseContent = {
  nav: {
    logo_label: string;
    logo_href: string;
    links: NavLink[];
    contact_label: string;
    contact_href: string;
    menu_open_label: string;
    menu_close_label: string;
    inquiry_label: string;
    inquiry_href: string;
    social: SocialLink[];
  };
  hero: {
    top_title: string;
    bottom_title: string;
    stats: HeroStat[];
    description: string;
    description_italic: string;
    intro_kicker: string;
    intro_title: string;
  };
  heroCards: {
    loop_ms: number;
    items: HeroCard[];
  };
  clients: {
    kicker: string;
    index: string;
    title: string;
    rows: ClientRow[];
  };
  disciplines: {
    kicker: string;
    index_label: string;
    title_line_1: string;
    title_line_2: string;
    intro: string;
    scroll_label: string;
    cta_label: string;
    cta_href: string;
    items: DisciplineItem[];
  };
  services: {
    kicker: string;
    index: string;
    title: string;
    items: ServiceItem[];
  };
  news: {
    kicker: string;
    index_label: string;
    posts: NewsPost[];
  };
  stats: {
    kicker: string;
    index: string;
    tiles: StatTile[];
  };
  testimonials: {
    kicker: string;
    items: TestimonialItem[];
  };
  footer: {
    kicker: string;
    index_label: string;
    email: string;
    cta_line_1: string;
    cta_line_2: string;
    cta_suffix: string;
    email_label: string;
    menu_title: string;
    menu: NavLink[];
    social_title: string;
    social: SocialLink[];
    studio_title: string;
    studio_lines: string[];
    contact_title: string;
    contact_links: SocialLink[];
    brand: string;
    copyright: string;
  };
};

export const defaultDesignHouseContent: DesignHouseContent = {
  nav: {
    logo_label: "Design House",
    logo_href: "#top",
    links: [
      { label: "Expertise", href: "#expertise" },
      { label: "Clients", href: "#clients" },
      { label: "Studio", href: "#studio" },
      { label: "News", href: "#news" },
      { label: "Contact", href: "#contact" },
    ],
    contact_label: "Contact",
    contact_href: "#contact",
    menu_open_label: "Menu",
    menu_close_label: "Close",
    inquiry_label: "New business inquiries ->",
    inquiry_href: "#contact",
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Behance", href: "#" },
    ],
  },
  hero: {
    top_title: "Crafted Bold",
    bottom_title: "Built to Last",
    stats: [
      { value: "12+", label: "years" },
      { value: "900+", label: "students" },
      { value: "40+", label: "schools" },
      { value: "0", label: "boring portfolios" },
    ],
    description:
      "Design House Istanbul helps students build standout portfolios and win places at the world's best art & design schools.",
    description_italic: "win places",
    intro_kicker: "( Istanbul )",
    intro_title: "Design House",
  },
  heroCards: {
    loop_ms: 3600,
    items: [
      { img: IMAGES.fashion, label: "Fashion", back: ["#c9c2f0", "#f0bcd2"] },
      { img: IMAGES.spatial, label: "Spatial", back: ["#a9d6e5", "#d8f24a"] },
      { img: IMAGES.fineArt, label: "Fine Arts", back: ["#f0bcd2", "#c9c2f0"] },
      { img: IMAGES.industrial, label: "Industrial", back: ["#d8f24a", "#a9d6e5"] },
      { img: IMAGES.photography, label: "Photo & Film", back: ["#f0e2a6", "#ec6242"] },
      { img: IMAGES.visual, label: "Visual", back: ["#ec6242", "#c9c2f0"] },
    ],
  },
  clients: {
    kicker: "( Where our students get in )",
    index: "01",
    title: "Destinations",
    rows: [
      ["Central Saint Martins", "IED Milano"],
      ["Royal College of Art", "NABA Milano"],
      ["Parsons School of Design", "Domus Academy"],
      ["Rhode Island School of Design", "Konstfack"],
      ["Politecnico di Milano", "UMPRUM Prague"],
      ["Pratt Institute", "Sandberg Instituut"],
      ["University of the Arts London", "SCAD"],
      ["ArtCenter College of Design", "CalArts"],
      ["Aalto University", "School of Visual Arts"],
      ["Design Academy Eindhoven", "Cooper Union"],
      ["Glasgow School of Art", "OCAD University"],
      ["Bezalel Academy", "Emily Carr"],
      ["Goldsmiths, London", "Musashino Art University"],
      ["ECAL Lausanne", "Tama Art University"],
      ["HEAD Geneve", "RMIT"],
      ["Gerrit Rietveld Academie", "ELISAVA Barcelona"],
    ],
  },
  disciplines: {
    kicker: "( Disciplines )",
    index_label: "02 - Selected work",
    title_line_1: "Selected",
    title_line_2: "Work",
    intro: "Six creative paths we help students master - from first sketch to final portfolio.",
    scroll_label: "Scroll ->",
    cta_label: "Find your\npath ->",
    cta_href: "#contact",
    items: [
      { n: "01", name: "Spatial Design", desc: "Architecture & interior", img: IMAGES.spatial, bg: "var(--sky)" },
      { n: "02", name: "Visual Comms", desc: "Graphic design & type", img: IMAGES.visual, bg: "var(--clay)" },
      { n: "03", name: "Fine Arts", desc: "Studio practice", img: IMAGES.fineArt, bg: "var(--butter)" },
      { n: "04", name: "Industrial", desc: "Product & object", img: IMAGES.industrial, bg: "var(--acid)" },
      { n: "05", name: "Fashion", desc: "Concept & textile", img: IMAGES.fashion, bg: "var(--lilac)" },
      { n: "06", name: "Photo & Film", desc: "Visual storytelling", img: IMAGES.photography, bg: "var(--sky)" },
    ],
  },
  services: {
    kicker: "( What we do )",
    index: "03",
    title: "We make portfolios impossible to ignore",
    items: [
      {
        n: "01",
        title: "Portfolio",
        body:
          "We help you build a body of work with a clear creative voice. From idea to final artwork, we shape projects that show range, intent and craft - the things admissions panels actually look for.",
        count: 96,
        suffix: "%",
        metric: "first-choice acceptance",
        img: IMAGES.newsPortfolio,
        cta_label: "Learn more ->",
        cta_href: "#contact",
      },
      {
        n: "02",
        title: "Mentorship",
        body:
          "One-on-one guidance from practicing artists and designers. We meet you where you are, push your thinking, and keep you accountable through every critique, draft and deadline.",
        count: 900,
        suffix: "+",
        metric: "students mentored",
        img: IMAGES.newsMentor,
        cta_label: "Learn more ->",
        cta_href: "#contact",
      },
      {
        n: "03",
        title: "Admissions",
        body:
          "Strategy that gets you in. We map school fit, deadlines, interviews and statements - the full path to the world's best art & design programmes, minus the guesswork.",
        count: 40,
        suffix: "+",
        metric: "partner schools placed into",
        img: IMAGES.newsStudents,
        cta_label: "Learn more ->",
        cta_href: "#contact",
      },
    ],
  },
  news: {
    kicker: "( Journal )",
    index_label: "04 - Notes from the studio",
    posts: [
      { tag: "Results", title: "Where our students land", img: IMAGES.newsStudents, tint: "clay", href: "#" },
      { tag: "Inside", title: "Anatomy of an accepted portfolio", img: IMAGES.newsPortfolio, tint: "butter", href: "#" },
      { tag: "Studio", title: "How we shape a creative voice", img: IMAGES.newsMentor, tint: "sky", href: "#" },
    ],
  },
  stats: {
    kicker: "( By the numbers )",
    index: "05",
    tiles: [
      { value: "12+", label: "Years" },
      { value: "900+", label: "Students" },
      { value: "(212)", label: "Istanbul" },
      { value: "40+", label: "Schools" },
      { value: "96%", label: "Accepted" },
      { value: "18", label: "Disciplines" },
      { value: "3", label: "Dogs" },
      { value: "∞", label: "Late Nights" },
    ],
  },
  testimonials: {
    kicker: "( Kind words )",
    items: [
      {
        name: "Elif Demir",
        role: "Now studying at",
        company: "Central Saint Martins",
        quote:
          "They helped me find my voice as an artist. My portfolio finally felt like me - and it got me into my dream school.",
      },
      {
        name: "Marcus Hale",
        role: "Parent of admitted student",
        company: "Parsons, New York",
        quote:
          "The mentorship was structured, honest, and genuinely caring. They kept us informed at every stage of the admissions journey.",
      },
      {
        name: "Renee Frey",
        role: "Now studying at",
        company: "Royal College of Art",
        quote:
          "Every critique pushed my work further. Their attention to detail and care for craft is exactly what set my application apart.",
      },
    ],
  },
  footer: {
    kicker: "( New business )",
    index_label: "06 - Let's talk",
    email: "hello@designhouseist.com",
    cta_line_1: "Build your",
    cta_line_2: "future",
    cta_suffix: ".",
    email_label: "hello@designhouseist.com ->",
    menu_title: "Menu",
    menu: [
      { label: "Disciplines", href: "#disciplines" },
      { label: "Expertise", href: "#expertise" },
      { label: "Studio", href: "#studio" },
      { label: "News", href: "#news" },
      { label: "Contact", href: "#contact" },
    ],
    social_title: "Social",
    social: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Behance", href: "#" },
      { label: "TikTok", href: "#" },
    ],
    studio_title: "Studio",
    studio_lines: ["Istanbul, TR", "By appointment"],
    contact_title: "Say hi",
    contact_links: [
      { label: "hello@designhouseist.com", href: "mailto:hello@designhouseist.com" },
      { label: "+90 212 000 0000", href: "tel:+902120000000" },
    ],
    brand: "Design House Istanbul",
    copyright: "© {year} Design House Istanbul. All rights reserved. All wrongs reversed.",
  },
};

