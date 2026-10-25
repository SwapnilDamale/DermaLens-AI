import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell
      title="Page not found"
      intro="That page does not exist. Head back to the homepage to keep exploring."
      primary={{ label: "Go to homepage", href: "/" }}
    />
  );
}
