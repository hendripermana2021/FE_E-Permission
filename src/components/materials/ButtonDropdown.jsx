import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ButtonGroup() {
  return (
    <DropdownButton id="dropdownclass" variant="secondary" title="Action">
      <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Hapus</Dropdown.Item>
    </DropdownButton>
  );
}

export default ButtonGroup;
