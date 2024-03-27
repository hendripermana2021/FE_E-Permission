import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import propTypes from "prop-types";

const DetailFormPermission = (props) => {
  const p = props.permission;

  const [zoomed, setZoomed] = useState(false);

  const handleImageClick = () => {
    setZoomed(!zoomed);
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <>
      <button className="dropdown-item" onClick={handleShow}>
        <i className="ti-info menu-icon me-2" />
        Detail
      </button>

      <Modal
        show={show}
        onHide={handleShow}
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Data Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="image-container col-md-3 col-sm-12">
              <img
                src={
                  p.namasantri.image != null
                    ? p.namasantri.image
                    : "/images/user.png"
                }
                alt="Student Image"
                style={{ maxWidth: "70%", cursor: "pointer" }}
                className={`img-fluid rounded-circle ${zoomed ? "zoomed" : ""}`}
                onClick={handleImageClick}
              />
            </div>
            <div className="col-md-3 col-sm-12">
              <label htmlFor="nameroom" className="fw-bold">
                Tanggal Perizinan
              </label>
              <p>{new Date(p.start_permission).toLocaleString()}</p>
              <label htmlFor="nameroom" className="fw-bold">
                Tanggal Kembali
              </label>
              <p>{new Date(p.end_permission).toLocaleString()}</p>
              <label htmlFor="nameroom" className="fw-bold">
                Alasan Perizinan
              </label>
              <p>{p.commented}</p>
            </div>
            <div className="col-md-3 col-sm-12">
              <label htmlFor="namaustadz" className="fw-bold">
                Status Perizinan
              </label>
              <p>
                {p.permission_status === 1 ? (
                  <span className="badge bg-success">Aktif</span>
                ) : p.permission_status === 2 ? (
                  <span className="badge bg-warning">Progress</span>
                ) : p.permission_status === 0 ? (
                  <span className="badge bg-danger">Tidak Aktif</span>
                ) : (
                  <span className="badge bg-danger">Rejected</span>
                )}
              </p>
              <label htmlFor="namaustadz" className="fw-bold">
                Perizinan Diajukan Oleh
              </label>
              <p>{p.created_permission.name_pegawai}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Score
              </label>
              <p>{(p.cpi_result * 100).toFixed(2)}%</p>
            </div>
            <div className="col-md-3 col-sm-12">
              <label htmlFor="namaustadz" className="fw-bold">
                Nama Santri
              </label>
              <p>{p.namasantri.name_santri}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Jenis Kelamin
              </label>
              <p>{p.namasantri.sex ? "Laki - Laki" : "Perempuan"}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Nama Ayah
              </label>
              <p>{p.namasantri.fathername}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Nama Ibu
              </label>
              <p>{p.namasantri.mothername}</p>
            </div>

            <div className="container mt-4">
              <label htmlFor="namaustadz" className="fw-bold">
                Deskripsi Perizinan
              </label>

              <div className="row mt-4">
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="namaustadz" className="fw-bold">
                    Kriteria
                  </label>
                  <p>
                    {p.cpi_data.map((c, index) => (
                      <span key={index}>
                        {c.kriteria.name_kriteria} <br />
                      </span>
                    ))}
                  </p>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="namaustadz" className="fw-bold">
                    Sub Kriteria
                  </label>
                  <p>
                    {p.cpi_data.map((c, index) => (
                      <span key={index}>
                        {c.subkriteria.name_sub} <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DetailFormPermission.propTypes = {
  permission: propTypes.object,
};

export default DetailFormPermission;
