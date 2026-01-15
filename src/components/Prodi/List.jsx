import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export default function List() {

    // state prodi untuk menyimpan data response API Fakultas
    const [prodi, setProdi] = useState([])

    // panggil API Prodi menggunakan useEffect dan axios
    useEffect( ()=> {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
        .then( (response) => {
            console.log(response.data);
            setProdi(response.data.result);
        })
    }, [])

    // Handle delete prodi
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Periksa kembali",
            text: `Apakah Kamu yakin ingin menghapus prodi ${nama}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Terhapus!",
                            text: "Data prodi berhasil dihapus.",
                            icon: "success",
                            timer: 1500
                        });
                        // Refresh data after delete
                        axios
                            .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
                            .then((response) => {
                                setProdi(response.data.result);
                            });
                    })
                    .catch((error) => {
                        console.error("Error deleting prodi:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menghapus data prodi.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Daftar Program Studi</h2>
                <NavLink to="/prodi/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg"></i> Tambah Program Studi
                </NavLink>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>No.</th>
                            <th>Nama Program Studi</th>
                            <th>Fakultas</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodi.map((data, index) => (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.nama}</td>
                                <td>{data.fakultas.nama}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <NavLink
                                            to={`/prodi/edit/${data.id}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </NavLink>
                                        <button
                                            onClick={() => handleDelete(data.id, data.nama)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            <i className="bi bi-trash"></i> Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {prodi.length === 0 && (
                <div className="alert alert-info text-center">
                    Belum ada data Program Studi. Silakan tambah data baru.
                </div>
            )}
        </div>
    )
}