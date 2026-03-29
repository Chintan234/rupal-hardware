"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, enquiriesRes] = await Promise.all([
          fetch("/api/enquiries/stats"),
          fetch("/api/enquiries?status=All"),
        ]);

        if (statsRes.status === 401) {
          router.push("/admin/login");
          return;
        }

        const statsData = await statsRes.json();
        const enquiriesData = await enquiriesRes.json();

        setStats(statsData);
        setRecent(enquiriesData.slice(0, 5));
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading...
      </div>
    );
  }

  const cards = [
    { label: "Total Enquiries", value: stats?.total ?? 0, color: "bg-blue-50 text-blue-600" },
    { label: "New", value: stats?.new ?? 0, color: "bg-orange-50 text-orange-600" },
    { label: "Contacted", value: stats?.contacted ?? 0, color: "bg-green-50 text-green-600" },
    { label: "Closed", value: stats?.closed ?? 0, color: "bg-gray-100 text-gray-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-xl p-5 ${card.color}`}>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-sm mt-1 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm text-orange-500 hover:underline">
            View All →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Phone</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium">{e.name}</td>
                    <td className="py-3 pr-4 text-gray-500">{e.phone}</td>
                    <td className="py-3 pr-4 text-gray-400">
                      {new Date(e.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    New: "bg-orange-100 text-orange-600",
    Contacted: "bg-green-100 text-green-600",
    Closed: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.New}`}>
      {status}
    </span>
  );
}
