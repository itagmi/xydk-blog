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

export async function markInquiryRead(id: string) {
  await requireAuth();
  await prisma.inquiry.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/inquiries");
}
