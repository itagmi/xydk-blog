"use client";

import { useState } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import MarkdownContent from "./MarkdownContent";
import { Button } from "@/components/ui/Button";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500"] });

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title?: string;
    content?: string;
    tags?: string;
    published?: boolean;
  };
  submitLabel?: string;
  category?: string;
};

export default function PostEditor({ action, defaultValues = {}, submitLabel = "Save", category = "dev_note" }: Props) {
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState(defaultValues.content ?? "");
  const [published, setPublished] = useState(defaultValues.published ?? false);

  return (
    <form action={action} className="flex flex-col gap-6">
      <input type="hidden" name="category" value={category} />
      <input
        name="title"
        defaultValue={defaultValues.title}
        placeholder="Title"
        required
        className={`${bricolage.className} border-b border-white/15 bg-transparent pb-3 text-3xl font-medium text-white/90 placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors`}
      />

      <input
        name="tags"
        defaultValue={defaultValues.tags}
        placeholder="Tags (comma separated)"
        className="border-b border-white/10 bg-transparent pb-2 text-xs uppercase tracking-[0.1em] text-white/40 placeholder:text-white/15 focus:border-white/25 focus:outline-none transition-colors"
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant={preview ? "tab" : "tabActive"}
            onClick={() => setPreview(false)}
          >
            Write
          </Button>
          <Button
            type="button"
            variant={preview ? "tabActive" : "tab"}
            onClick={() => setPreview(true)}
          >
            Preview
          </Button>
        </div>

        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write in Markdown..."
          required
          rows={20}
          className={`min-h-[400px] resize-y border border-white/10 bg-white/[0.02] p-5 font-mono text-sm leading-relaxed text-white/75 placeholder:text-white/20 focus:border-white/25 focus:outline-none transition-colors ${
            preview ? "hidden" : "block w-full"
          }`}
        />
        {preview && (
          <div className="min-h-[400px] border border-white/10 p-5">
            <MarkdownContent content={content} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex cursor-pointer items-center gap-3">
          <div
            onClick={() => setPublished(!published)}
            className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
              published ? "bg-white/40" : "bg-white/10"
            }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                published ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.1em] text-white/40">
            {published ? "Published" : "Draft"}
          </span>
          <input type="hidden" name="published" value={String(published)} />
        </label>

        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
