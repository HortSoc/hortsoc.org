import galleryPage from "../content/gallery/gallery-page.json" with { type: "json" };

export const galleryCollections = [galleryPage];
export const gallerySections = galleryPage.sections;

export function getGalleryCollectionForPath(path) {
  return galleryCollections.find((collection) => collection.path === path) ?? null;
}

export function getGalleryCollectionsForPath(path) {
  return galleryCollections.filter((collection) => collection.path === path);
}

export function getGallerySectionForPath(path) {
  return gallerySections.find((section) => section.path === path) ?? null;
}
