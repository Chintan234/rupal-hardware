"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const STATUS_OPTIONS = ["All", "New", "Contacted", "Closed"];

export default function EnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  async function fetchEnquiries() {
    const params = new URLSearchParams();
    if (status !== "All") params.set("status", status);
    if (search) params.set("search", search);

    const res = await fetch(`/api/enquiries?${params}`);
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setEnquiries(data);
  }

  useEffect(() => {
    setLoading(true);
    fetchEnquiries().finally(() => setLoading(false));
  }, [status, search]);

  async function updateStatus(id, newStatus) {
    await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    toast.success("Status updated");
    fetchEnquiries();
    if (selected?._id === id) setSelected({ ...selected, status: newStatus });
  }

  async function deleteEnquiry(id) {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    toast.success("Enquiry deleted");
    setSelected(null);
    fetchEnquiries();
  }

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Enquiries</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                ${status === s
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 text-gray-600 hover:border-orange-400"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-400 text-sm">Loading...</p>
          ) : enquiries.length === 0 ? (
            <p className="p-6 text-gray-400 text-sm">No enquiries found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Source</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr
                      key={e._id}
                      onClick={() => setSelected(e)}
                      className={`border-t cursor-pointer hover:bg-orange-50 transition
                        ${selected?._id === e._id ? "bg-orange-50" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium">{e.name}</td>
                      <td className="px-4 py-3 text-gray-500">{e.phone}</td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {new Date(e.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          e.source === "enquiry"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-purple-50 text-purple-600"
                        }`}>
                          {e.source === "enquiry" ? "Enquiry" : "Contact"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={e.status}
                          onClick={(ev) => ev.stopPropagation()}
                          onChange={(ev) => updateStatus(e._id, ev.target.value)}
                          className="text-xs border border-gray-200 rounded px-2 py-1 outline-none"
                        >
                          {["New", "Contacted", "Closed"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(ev) => { ev.stopPropagation(); deleteEnquiry(e._id); }}
                          className="text-red-400 hover:text-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-80 bg-white rounded-xl shadow-sm p-6 shrink-0 hidden lg:block">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-lg">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Phone" value={selected.phone} />
              {selected.email && <Row label="Email" value={selected.email} />}
              {selected.company && <Row label="Company" value={selected.company} />}
              <Row label="Source" value={selected.source} />
              <Row label="Date" value={new Date(selected.createdAt).toLocaleString("en-IN")} />
              <Row label="Status" value={selected.status} />

              {selected.products?.length > 0 && (
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Products</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selected.products.map((p, i) => (
                      <li key={i}>{p.title || p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.message && (
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Message</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selected.message}</p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2">
              {["New", "Contacted", "Closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected._id, s)}
                  className={`w-full py-2 rounded-lg text-sm font-medium border transition
                    ${selected.status === s
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-600 hover:border-orange-400"
                    }`}
                >
                  Mark as {s}
                </button>
              ))}
              <button
                onClick={() => deleteEnquiry(selected._id)}
                className="w-full py-2 rounded-lg text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50"
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs uppercase">{label}</p>
      <p className="text-gray-700 font-medium">{value}</p>
    </div>
  );
}
