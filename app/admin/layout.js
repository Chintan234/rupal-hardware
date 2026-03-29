import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin — Rupal Hardware" };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
