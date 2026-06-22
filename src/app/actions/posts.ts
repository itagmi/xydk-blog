"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function categoryBasePath(category: string) {
  return category === "ui_ux" ? "/ui-ux-thought" : "/development-note";
}

function adminRedirectPath(category: string) {
  return category === "ui_ux" ? "/admin/uiux" : "/admin";
}

export async function createPost(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const description = (formData.get("description") as string) || undefined;
  const published = formData.get("published") === "true";
  const category = (formData.get("category") as string) || "dev_note";
  const tagNames = ((formData.get("tags") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const baseSlug = toSlug(title);
  let slug = baseSlug;
  let i = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      ...(description !== undefined && { description }),
      published,
      category,
      tags: {
        connectOrCreate: tagNames.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });

  revalidatePath(categoryBasePath(category));
  redirect(adminRedirectPath(category));
}

export async function updatePost(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const description = (formData.get("description") as string) || undefined;
  const published = formData.get("published") === "true";
  const tagNames = ((formData.get("tags") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      ...(description !== undefined && { description }),
      published,
      tags: {
        set: [],
        connectOrCreate: tagNames.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });

  revalidatePath(categoryBasePath(post.category));
  redirect(adminRedirectPath(post.category));
}

export async function deletePost(id: string) {
  await requireAuth();
  const post = await prisma.post.delete({ where: { id } });
  revalidatePath(categoryBasePath(post.category));
}

export async function togglePublish(id: string, published: boolean) {
  await requireAuth();
  const post = await prisma.post.update({ where: { id }, data: { published } });
  revalidatePath(categoryBasePath(post.category));
  revalidatePath(adminRedirectPath(post.category));
}
