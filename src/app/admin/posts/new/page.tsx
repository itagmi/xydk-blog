import { createPost } from "@/app/actions/posts";
import AdminPageShell from "@/components/admin/AdminPageShell";
import PostEditor from "@/components/dev-note/PostEditor";
import { ButtonLink } from "@/components/ui/Button";

export default function NewPostPage() {
  return (
    <AdminPageShell
      title="New Post"
      maxWidth="780"
      titleSize="section"
      actions={
        <ButtonLink href="/admin" variant="ghost">
          Cancel
        </ButtonLink>
      }
    >
      <PostEditor action={createPost} submitLabel="Save Post" />
    </AdminPageShell>
  );
}
