/* eslint-disable no-unused-vars */
// src/components/Fakultas/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request
import { useNavigate, useParams } from "react-router-dom";
import { use } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function EditFakultas() {
  const { id } = useParams(); // Ambil parameter id fakultas dari URL
  const navigate = useNavigate(); // Hook untuk navigasi programatis

  // Inisialisasi state untuk menyimpan nama fakultas
  const [nama, setNama] = useState("");
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fungsi untuk mengambil data fakultas berdasarkan id
    axios.get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
      .then((response) => {
        console.log(response.data);
        setNama(response.data.result.nama); // Set nama fakultas dari response API
      })
      .catch((error) => {
        setError("Failed to fetch fakultas data"); // Set pesan error jika gagal mengambil data
      });
  }, [id]);

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika nama kosong, set pesan error
    if (nama.trim() === "") {
      setError("Nama Fakultas is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data fakultas
      const response = await axios.patch(
        `https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, // Endpoint API yang dituju
        {
          nama
        }
      );

      // Jika response HTTP status 200 (HTTP_OK), berarti berhasil
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Fakultas updated successfully",
          icon: "success"
        });
        navigate("/fakultas"); // Navigasi kembali ke halaman list fakult
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to update fakultas");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating fakultas");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Fakultas</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi nama fakultas */}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">
            Nama Fakultas
          </label>
          {/* Input untuk nama fakultas dengan class bootstrap */}
          <input
            type="text" className="form-control" id="nama"
            value={nama} // Nilai input disimpan di state nama
            onChange={(e) => setNama(e.target.value)} // Update state saat input berubah
            placeholder="Enter Fakultas Name" // Placeholder teks untuk input
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}