import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function StudentPrescriptions() {
  const [uploaded, setUploaded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await api.get("/prescriptions/my");
      setUploaded(res.data || []);
    } catch (err) {
      console.error("Failed to fetch prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  async function handleUpload(e) {
    e.preventDefault();
    if (!fileName.trim()) return;
    setUploading(true);
    try {
      const res = await api.post("/prescriptions/upload", { name: fileName });
      setUploaded([res.data, ...uploaded]);
      setFileName("");
      alert("Prescription uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload prescription.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <DashboardLayout role="student">
      <div className="student-page">
        <div className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6">
          <h1 className="text-2xl font-bold text-blue-900">Upload Prescriptions</h1>
          <p className="text-sm text-blue-600 mt-1">
            Upload and view prescription files from your medical past history.
          </p>
        </div>

        <form
          onSubmit={handleUpload}
          className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6"
        >
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Upload Section</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Prescription filename (example: report.pdf)"
              className="student-input flex-1 p-3"
            />
            <button disabled={uploading} className={`student-btn-primary px-5 py-3 font-semibold ${uploading ? "opacity-50" : ""}`}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        <div className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Uploaded Prescriptions</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-blue-600 animate-pulse text-sm">Loading prescriptions...</p>
            ) : uploaded.length === 0 ? (
              <p className="text-gray-400 italic text-sm">No prescriptions found.</p>
            ) : uploaded.map((file) => (
              <div
                key={file.id}
                className="border border-blue-100 rounded-xl p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-semibold text-blue-900">{file.name}</div>
                  <div className="text-sm text-blue-600">
                    REF: {file.id} | {file.date ? new Date(file.date).toLocaleDateString() : "Just now"}
                  </div>
                </div>
                <button className="student-btn-secondary text-blue-700 px-4 py-2 text-sm font-semibold">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
