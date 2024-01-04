import SearchBox from "./materials/SearchBox";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonGroup from "./materials/ButtonDropdown";
import FormInputRooms from "./materials/InputFormROoms";

const TableRooms = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/room");
      setRoom(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  return (
    <div className=" container-fluid col-lg-12 grid-margin stretch-card mt-4">
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
                      <td>{rooms.nameroom}</td>
                      <td>{rooms.namaustadz.name_pegawai}</td>
                      <td>
                        <ButtonGroup />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRooms;
