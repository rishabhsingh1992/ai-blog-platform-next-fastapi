export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-muted text-center">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </div>
    </footer>
  );
}
