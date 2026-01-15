/* eslint-disable no-unused-vars */
// src/components/Prodi/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk HTTP request
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import Swal from "sweetalert2"; // Import SweetAlert2 untuk notifikasi

export default function CreateProdi() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [fakultasId, setFakultasId] = useState("");
  const [fakultasList, setFakultasList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch daftar fakultas saat komponen dimount
  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
      .then((response) => {
        setFakultasList(response.data.result);
      })
      .catch((error) => {
        setError("Gagal mengambil data fakultas");
        console.error("Error fetching fakultas:", error);
      });
  }, []);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nama.trim()) {
      setError("Nama Program Studi harus diisi");
      return;
    }

    if (!fakultasId) {
      setError("Silakan pilih Fakultas");
      return;
    }
    
    try {
      const response = await axios.post(
        "https://project-apiif-3-b.vercel.app/api/api/prodi",
        {
          nama: nama,
          fakultas_id: fakultasId,
        }
      );

      await Swal.fire({
        title: "Berhasil!",
        text: "Data Program Studi berhasil ditambahkan",
        icon: "success",
        timer: 1500
      });

      navigate("/prodi");
    } catch (error) {
      setError("Gagal menambahkan Program Studi");
      console.error("Error creating prodi:", error);
      
      Swal.fire({
        title: "Error!",
        text: "Gagal menambahkan Program Studi",
        icon: "error"
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Program Studi Baru</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Program Studi
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fakultas" className="form-label">
            Fakultas
          </label>
          <select
            className="form-select"
            id="fakultas"
            value={fakultasId}
            onChange={(e) => setFakultasId(e.target.value)}
            required
          >
            <option value="">Pilih Fakultas</option>
            {fakultasList.map((fakultas) => (
              <option key={fakultas.id} value={fakultas.id}>
                {fakultas.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/prodi")}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
