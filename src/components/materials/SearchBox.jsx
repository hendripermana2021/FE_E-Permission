import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchBox() {
  return (
    <div className="searchbox1 d-flex justify-content-start">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button className="buttonsearch" variant="outline-success pu-2">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchBox;
