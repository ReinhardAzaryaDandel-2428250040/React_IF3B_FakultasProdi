/* eslint-disable no-unused-vars */
// src/components/Prodi/Edit.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk HTTP request
import { useNavigate, useParams } from "react-router-dom"; // Import untuk navigasi dan ambil parameter
import Swal from "sweetalert2"; // Import SweetAlert2 untuk notifikasi

export default function EditProdi() {
  const { id } = useParams(); // Ambil parameter id prodi dari URL
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  // State untuk menyimpan nama prodi
  const [nama, setNama] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Ambil data prodi berdasarkan id dari API
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
      .then((response) => {
        console.log(response.data);
        setNama(response.data.result.nama); // Set nama prodi dari response API
      })
      .catch((error) => {
        setError("Failed to fetch prodi data"); // Set pesan error jika gagal mengambil data
      });
  }, [id]);

  // Fungsi untuk meng-handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setError("");
    setSuccess("");

    // Validasi input
    if (nama.trim() === "") {
      setError("Nama Prodi is required");
      return;
    }

    try {
      // PATCH request ke endpoint edit prodi
      const response = await axios.patch(
        `https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`,
        { nama }
      );

      // Jika berhasil
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Prodi updated successfully",
          icon: "success",
        });
        navigate("/prodi"); // Kembali ke halaman list prodi
      } else {
        setError("Failed to update prodi");
      }
    } catch (error) {
      setError("An error occurred while updating prodi");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Prodi</h2>
      {/* Jika ada pesan error */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses */}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form edit prodi */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Prodi</label>
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Enter Prodi Name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
