import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { AdminBlogManager } from '@/components/admin/AdminBlogManager';

export const metadata: Metadata = {
  title: 'Admin Content Studio | Pathwisse',
  description: 'Manage and publish blog posts and guides to the Pathwisse platform and Cloudflare D1 database.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <main id="main" style={{ minHeight: '85vh', background: '#F8FAFC', padding: '40px 20px' }}>
        <AdminBlogManager />
      </main>
      <Footer />
    </>
  );
}
