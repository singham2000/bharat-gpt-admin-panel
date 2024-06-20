import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Navbar from "../Components/NavigationBar.js";
import axiosInstance from "../utils/axios.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal } from "react-bootstrap";
import { MdOutlineDeleteForever } from "react-icons/md";
import swal from "sweetalert";
const LandingPageBanner = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalHeading, setShowModalHeading] = useState(false);
  const [textFields, setTextFields] = useState({
    title: "",
    description: "",
  });

  const [textFieldsHeading, setTextFieldsHeading] = useState({
    topHeading: "",
    mainHeading: "",
  });

  const [file, setFile] = useState(null);
  const [fileHeading, setFileHeading] = useState(null);

  const handleInputChange = (e) => {
    setTextFields({
      ...textFields,
      [e.target.id]: e.target.value,
    });
  };

  const handleInputChangeHeading = (e) => {
    setTextFieldsHeading({
      ...textFieldsHeading,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileChangeHeading = (e) => {
    setFileHeading(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(textFields);
    console.log(file);
    formData.append("title", textFields.title);
    formData.append("description", textFields.description);
    formData.append("file", file);

    // window.alert(...formData);
    await axiosInstance.post("/api/aboutus/aboutuscard", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    handleGetAll();
    setShowModal(false);
  };

  const handleSubmitHeading = async () => {
    const formData = new FormData();
    console.log(textFieldsHeading);
    formData.append("topHeading", textFieldsHeading.topHeading);
    formData.append("mainHeading", textFieldsHeading.mainHeading);
    formData.append("file", fileHeading);

    // window.alert(...formData);
    await axiosInstance.post("/api/aboutus/aboutus", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    handleGetAll();
    setShowModalHeading(false);
    swal("Content updated successfully").then((value) => {
      window.replace("http://localhost:3000/", "_blank");
    });
  };

  const handleDelete = async (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Banner image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axiosInstance.delete("/api/aboutus/aboutuscard", {
          params: {
            id,
          },
        });
        swal("Poof! Deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Banner is safe!");
      }
    });
  };

  const handleGetAll = async () => {
    const { data } = await axiosInstance.get("/api/aboutus/aboutuscard");
    setRows(data.result);
  };

  useEffect(() => {
    handleGetAll();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
          }}
          className="mb-3 me-2"
        >
          Add About us Card
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setShowModalHeading(true);
          }}
          className="mb-3"
        >
          Edit About us Heading
        </Button>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Card Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <ProgressBar animated now={100} />
                </td>
              </tr>
            ) : (
              rows.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      src={`data:image/png;base64,${
                        JSON.parse(item.image).bg_img
                      }`}
                      alt="banner"
                      height={90}
                      width={160}
                    />
                  </td>
                  <td>
                    <MdOutlineDeleteForever
                      className="btn-hover"
                      style={{ fontSize: "60px", color: "red" }}
                      onClick={() => handleDelete(rows[i].id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* add form */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add About us Card Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Hero Title 1"
                  name="title"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Hero Title 2"
                  name="description"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Choose File for card image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showModalHeading}
          onHide={() => setShowModalHeading(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add About us headings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Top Heading</Form.Label>
                <Form.Control
                  type="text"
                  id="topHeading"
                  onChange={handleInputChangeHeading}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Main Heading</Form.Label>
                <Form.Control
                  type="text"
                  id="mainHeading"
                  onChange={handleInputChangeHeading}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Choose File</Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  onChange={handleFileChangeHeading}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModalHeading(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitHeading}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default LandingPageBanner;
