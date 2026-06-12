import Hero from "@/components/Hero";
import AboutScrollContent from "@/components/home/AboutScrollContent";
import ContactSection from "@/components/home/ContactSection";
import SideHustlesSection from "@/components/home/SideHustlesSection";
import ScrollSection from "@/components/hero/ScrollSection";

type BookPreview = {
  title: string;
  author: string;
  status: string;
  cover_image: string | null;
  category: string | null;
};

async function fetchBooks(): Promise<BookPreview[]> {
  const apiUrl = process.env.NEXT_PUBLIC_BOOKS_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/api/books/public`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const books = await fetchBooks();

  return (
    <>
      <Hero />
      <ScrollSection>
        <AboutScrollContent />
      </ScrollSection>
      <ScrollSection flex className="relative z-10 overflow-x-clip max-lg:justify-start max-lg:py-28">
        <SideHustlesSection books={books} />
      </ScrollSection>
      <ScrollSection flex>
        <ContactSection />
      </ScrollSection>
    </>
  );
}
