import { defineCollection, z } from "astro:content";

const runtimeAssetPath = z.string().regex(/^\/media\/.+/);
const runtimeOrRemoteImage = z.union([z.string().url(), runtimeAssetPath]);

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    path: z.string(),
    source_url: z.string().url(),
    migration_status: z.enum(["migrated", "placeholder", "pending_policy"]),
    notes: z.string(),
  }),
});

const gallery = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    path: z.string(),
    source_url: z.string().url(),
    notes: z.string(),
    migration_status: z.enum(["sample_scaffold", "migrated"]),
    sections: z.array(
      z.object({
        slug: z.string(),
        title: z.string(),
        path: z.string(),
        source_url: z.string().url(),
        summary: z.string(),
        notes: z.string(),
        groups: z.array(
          z.object({
            slug: z.string(),
            title: z.string(),
            source_type: z.enum(["jetpack_tiled_gallery", "wordpress_shortcode_gallery"]),
            gallery_type: z.string().optional(),
            source_block_index: z.number().int().positive(),
            notes: z.string(),
            items: z.array(
              z.object({
                wordpress_id: z.number().int().positive(),
                title: z.string(),
                image_url: runtimeOrRemoteImage,
                image_path: z.string(),
                legacy_attachment_url: z.string().url(),
                legacy_attachment_path: z.string(),
                caption: z.string().nullable(),
                notes: z.string(),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { gallery, pages };
