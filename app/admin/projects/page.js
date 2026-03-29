"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { toSlug } from "@/lib/slugify";

const EMPTY_FORM = {
  slug: "",
  customer: "",
  location: "Nashik",
  testimonial: "",
  images: [],
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setProjects(data);
  }

  useEffect(() => {
    fetchProjects().finally(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(project) {
    setEditing(project._id);
    setForm({
      slug: project.slug,
      customer: project.customer,
      location: project.location,
      testimonial: project.testimonial,
      images: project.images || [],
    });
    setShowForm(true);
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const data = await res.json();
          return data.url;
        })
      );
      setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }));
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.customer.trim()) {
      toast.error("Customer name is required");
      return;
    }
    // ensure slug is set (in case user cleared it somehow)
    if (!form.slug) setForm((f) => ({ ...f, slug: toSlug(f.customer) }));
    setSaving(true);
    try {
      const url = editing ? `/api/projects/${editing}` : "/api/projects";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Project updated" : "Project created");
      setShowForm(false);
      fetchProjects();
    } catch {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
  }

  return (
    <div>
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={openCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          + Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400 text-sm">No projects yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

              {/* Cover image */}
              <div className="relative h-52 bg-gray-100">
                {p.images?.[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.customer}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                    No image
                  </div>
                )}
                {/* Photo count badge */}
                <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {p.images?.length || 0} photo{p.images?.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Thumbnail strip */}
              {p.images?.length > 1 && (
                <div className="flex gap-1 px-4 pt-3">
                  {p.images.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative w-12 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      <Image src={img} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  {p.images.length > 5 && (
                    <div className="w-12 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400 shrink-0">
                      +{p.images.length - 5}
                    </div>
                  )}
                </div>
              )}

              {/* Details */}
              <div className="p-5 flex flex-col flex-1">
                <p className="font-bold text-base">{p.customer}</p>

                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-gray-500">📍 {p.location}</span>
                </div>

                {p.testimonial && (
                  <div className="mt-3 bg-orange-50 border-l-2 border-orange-300 px-3 py-2 rounded-r-lg">
                    <p className="text-xs text-gray-600 italic line-clamp-2">
                      "{p.testimonial}"
                    </p>
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-400 font-mono">
                  /{p.slug}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2 mt-auto">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 text-sm font-medium text-orange-500 border border-orange-200 hover:bg-orange-50 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-lg">
                {editing ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Customer Name *"
                  value={form.customer}
                  onChange={(v) => {
                    const updated = { ...form, customer: v };
                    if (!editing) updated.slug = toSlug(v);
                    setForm(updated);
                  }}
                />
                <Field
                  label="Location"
                  value={form.location}
                  onChange={(v) => setForm({ ...form, location: v })}
                />
              </div>

              {/* Slug preview */}
              {form.slug && (
                <p className="text-xs text-gray-400">
                  Slug: <span className="font-mono text-gray-600">{form.slug}</span>
                </p>
              )}

              <div>
                <label className="text-xs font-medium text-gray-600">Testimonial</label>
                <textarea
                  value={form.testimonial}
                  onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                  rows={3}
                  placeholder="Customer's feedback..."
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Multi-image upload */}
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Project Images (select multiple)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full mt-1 text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
                {uploading && (
                  <p className="text-xs text-gray-400 mt-1">Uploading...</p>
                )}

                {/* Image previews */}
                {form.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {form.images.map((url, i) => (
                      <div key={i} className="relative group">
                        <div className="relative h-16 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={url}
                            alt={`img-${i}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-medium"
                >
                  {saving ? "Saving..." : editing ? "Update Project" : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder = "" }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}
