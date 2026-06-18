import {
  defaultDesignHouseContent,
  type DesignHouseContent,
  type NavLink,
  type SocialLink,
} from "./designHouseContent";

const SITE_CODE = "designhouseistanbul";

type SectionRow = {
  section_type: string;
  sort_order: number;
  data_json: Record<string, unknown>;
};

type MenuRow = {
  location: string;
  menu_items?: Array<{
    label: string;
    url: string | null;
    sort_order: number;
    is_visible: boolean;
    target_blank?: boolean | null;
  }>;
};

function env() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return Boolean(v && typeof v === "object" && !Array.isArray(v));
}

function mergeRecord<T extends object>(base: T, patch: unknown): T {
  if (!isRecord(patch)) return base;
  return { ...base, ...patch } as T;
}

function cleanLinks(rows: unknown, fallback: NavLink[]): NavLink[] {
  if (!Array.isArray(rows)) return fallback;
  const links = rows
    .map((row) => {
      if (!isRecord(row)) return null;
      const label = typeof row.label === "string" ? row.label : "";
      const href = typeof row.href === "string" ? row.href : typeof row.url === "string" ? row.url : "";
      return label && href ? { label, href } : null;
    })
    .filter(Boolean) as NavLink[];
  return links.length ? links : fallback;
}

function cleanSocial(rows: unknown, fallback: SocialLink[]): SocialLink[] {
  return cleanLinks(rows, fallback);
}

async function restGet<T>(path: string): Promise<T | null> {
  const { url, anonKey } = env();
  if (!url || !anonKey) return null;

  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return (await res.json()) as T;
}

function applySections(content: DesignHouseContent, sections: SectionRow[]): DesignHouseContent {
  const byType = new Map(sections.map((section) => [section.section_type, section.data_json]));

  const nav = mergeRecord(content.nav, byType.get("designhouse_nav"));
  const footer = mergeRecord(content.footer, byType.get("designhouse_footer"));

  return {
    ...content,
    nav: {
      ...nav,
      links: cleanLinks(nav.links, content.nav.links),
      social: cleanSocial(nav.social, content.nav.social),
    },
    hero: mergeRecord(content.hero, byType.get("designhouse_hero")),
    heroCards: mergeRecord(content.heroCards, byType.get("designhouse_hero_cards")),
    clients: mergeRecord(content.clients, byType.get("designhouse_clients")),
    disciplines: mergeRecord(content.disciplines, byType.get("designhouse_disciplines")),
    services: mergeRecord(content.services, byType.get("designhouse_services")),
    news: mergeRecord(content.news, byType.get("designhouse_news")),
    stats: mergeRecord(content.stats, byType.get("designhouse_stats")),
    testimonials: mergeRecord(content.testimonials, byType.get("designhouse_testimonials")),
    footer: {
      ...footer,
      menu: cleanLinks(footer.menu, content.footer.menu),
      social: cleanSocial(footer.social, content.footer.social),
      contact_links: cleanSocial(footer.contact_links, content.footer.contact_links),
    },
  };
}

function applyMenus(content: DesignHouseContent, menus: MenuRow[]): DesignHouseContent {
  const header = menus.find((menu) => menu.location === "header");
  const footer = menus.find((menu) => menu.location === "footer");
  const toLinks = (menu: MenuRow | undefined, fallback: NavLink[]) => {
    const rows = (menu?.menu_items ?? [])
      .filter((item) => item.is_visible)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((item) => ({ label: item.label, href: item.url ?? "#" }));
    return rows.length ? rows : fallback;
  };

  return {
    ...content,
    nav: {
      ...content.nav,
      links: toLinks(header, content.nav.links),
    },
    footer: {
      ...content.footer,
      menu: toLinks(footer, content.footer.menu),
    },
  };
}

export async function fetchDesignHouseContent(): Promise<DesignHouseContent> {
  let content = defaultDesignHouseContent;
  const sites = await restGet<Array<{ id: string }>>(
    `sites?select=id&code=eq.${SITE_CODE}&is_active=eq.true&limit=1`
  );
  const siteId = sites?.[0]?.id;
  if (!siteId) return content;

  const pages = await restGet<Array<{ id: string }>>(
    `pages?select=id&site_id=eq.${siteId}&slug=eq.home&status=eq.active&limit=1`
  );
  const pageId = pages?.[0]?.id;
  if (pageId) {
    const sections = await restGet<SectionRow[]>(
      `page_sections?select=section_type,sort_order,data_json&page_id=eq.${pageId}&order=sort_order.asc`
    );
    if (sections?.length) content = applySections(content, sections);
  }

  const menus = await restGet<MenuRow[]>(
    `menus?select=location,menu_items(label,url,sort_order,is_visible,target_blank)&site_id=eq.${siteId}&is_active=eq.true`
  );
  if (menus?.length) content = applyMenus(content, menus);

  return content;
}
