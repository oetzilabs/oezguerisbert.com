import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((p) => ["published", "draft", "archived"].includes(p.data.status))
      .sort(
        (a, b) => (a.data.updatedDate ?? a.data.pubDate).valueOf() - (b.data.updatedDate ?? b.data.pubDate).valueOf()
      )
      .map((post) => ({
        ...post.data,
        link: `/blogs/${post.slug}/`,
      })),
  });
}
