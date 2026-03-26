import blogPostData from "./blog-posts.json" with { type: "json" };

const blogPostSeed = blogPostData.posts;

export const blogPosts = blogPostSeed
  .map((post) => ({
    ...post,
    dateObject: new Date(post.date),
    archiveKey: post.date.slice(0, 7),
  }))
  .sort((left, right) => right.dateObject - left.dateObject);

export const blogPostsByPath = new Map(blogPosts.map((post) => [post.path, post]));

export const blogCategories = Array.from(
  blogPosts.reduce((categories, post) => {
    post.categories.forEach((category) => {
      categories.set(category, (categories.get(category) ?? 0) + 1);
    });
    return categories;
  }, new Map()),
  ([name, count]) => ({ name, count }),
).sort((left, right) => left.name.localeCompare(right.name));

export const blogArchives = Array.from(
  blogPosts.reduce((archives, post) => {
    archives.set(post.archiveKey, (archives.get(post.archiveKey) ?? 0) + 1);
    return archives;
  }, new Map()),
  ([key, count]) => ({
    key,
    count,
    label: formatArchiveLabel(key),
  }),
).sort((left, right) => right.key.localeCompare(left.key));

export const blogCategoryFilters = blogCategories.map((category) => ({
  ...category,
  slug: slugify(category.name),
  path: `/blog/category/${slugify(category.name)}/`,
}));

export const blogArchiveFilters = blogArchives.map((archive) => ({
  ...archive,
  slug: archive.key,
  path: `/blog/archive/${archive.key}/`,
}));

export function getBlogPost(path) {
  return blogPostsByPath.get(path) ?? null;
}

export function isBlogPostPath(path) {
  return blogPostsByPath.has(path);
}

export function getRecentBlogPosts(limit = 5) {
  return blogPosts.slice(0, limit);
}

export function getBlogSidebarData({ recentPostLimit = 5 } = {}) {
  return {
    categories: blogCategoryFilters,
    recentPosts: getRecentBlogPosts(recentPostLimit),
    archives: blogArchiveFilters,
  };
}

export function getBlogPostsByCategory(categoryName) {
  return blogPosts.filter((post) => post.categories.includes(categoryName));
}

export function getBlogPostsByArchive(archiveKey) {
  return blogPosts.filter((post) => post.archiveKey === archiveKey);
}

export function getBlogCategoryFilter(slug) {
  return blogCategoryFilters.find((category) => category.slug === slug) ?? null;
}

export function getBlogArchiveFilter(slug) {
  return blogArchiveFilters.find((archive) => archive.slug === slug) ?? null;
}

export function formatBlogDate(dateInput) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(typeof dateInput === "string" ? new Date(dateInput) : dateInput);
}

function formatArchiveLabel(key) {
  const [year, month] = key.split("-");
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
  }).format(new Date(`${year}-${month}-01T00:00:00Z`));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
