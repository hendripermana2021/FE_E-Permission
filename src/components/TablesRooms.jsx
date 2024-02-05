import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SearchBox from "./materials/SearchBox";
import FormInputRooms from "./materials/InputFormROoms";
import serverDev from "../Server";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const TableRooms = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [NamaRuangan, setNamaRuangan] = useState("");
  const [id_ustadz, setid_ustadz] = useState("");
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getRoom();
    getEmployee();
  }, []);

  const getRoom = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/room`);
      setRoom(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/pegawai");
      setEmployee(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  // Fungsi untuk menampilkan form edit dengan ID yang dipilih
  const handleShowModal = async (id) => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/room/${id}`);
      setModalData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const handleEdit = async () => {
    try {
      // Kirim permintaan PATCH menggunakan axios
      await axios.patch(`${serverDev}/v1/api/room/update/${modalData.id}`, {
        nameroom: NamaRuangan,
        id_ustadz: id_ustadz,
      });
      // Tutup modal setelah berhasil
      setShowModal(false);
      // Lakukan refresh data atau langkah-langkah lain yang diperlukan
      getRoom();
    } catch (error) {
      console.error("Error editing room data:", error);
    }
  };

  return (
    <div className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Tabel Kamar Santri/wati</h3>
          <div className="table-responsive">
            <div className="row">
              <div className="searchboxclass col-md-6">
                <SearchBox />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <FormInputRooms />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Id Ruangan</th>
                  <th>Nama Ruangan</th>
                  <th>Nama Ustadz</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : room.length === 0 ? (
                  <tr>
                    <td colSpan="5">No rooms available</td>
                  </tr>
                ) : (
                  room.map((rooms, index) => (
                    <tr key={rooms.id}>
                      <td>{index + 1}</td>
                      <td>{rooms.nameroom || "Nama Room Kosong"}</td>
                      <td>
                        {rooms.namaustadz
                          ? rooms.namaustadz.name_pegawai
                          : "Nama Ustadz Kosong"}
                      </td>
                      <td>
                        <ButtonGroup className="mb-2">
                          <Button
                            variant="info"
                            onClick={() => handleShowModal(rooms.id)}
                          >
                            Edit
                          </Button>
                          <Button variant="danger">Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <>
              {/* Modal */}
              <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
                onHide={() => setShowModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleEdit}>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Nama Ruangan</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nama Ruangan"
                        value={modalData ? modalData.nameroom : ""}
                        onChange={(e) => setNamaRuangan(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>Wali Kamar</Form.Label>
                      <Form.Select
                        value={modalData ? modalData.id_ustadz : ""}
                        onChange={(e) => setid_ustadz(e.target.value)}
                      >
                        {loading ? (
                          <option>Default select</option>
                        ) : (
                          employee.map((employee, index) => (
                            <option key={index + 1} value={employee.id}>
                              {employee.name_pegawai}
                            </option>
                          ))
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRooms;
