import { useState } from "react";

import api from "../services/api";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully");

      onUploadSuccess();
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
        }}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}

export default FileUpload;
