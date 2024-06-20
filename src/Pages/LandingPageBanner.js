import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Navbar from "../Components/NavigationBar.js";
import axiosInstance from "../utils/axios.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal } from "react-bootstrap";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import swal from "sweetalert";
const LandingPageBanner = () => {
  const [idToUpdate, setIdToUpdate] = useState(0);
  const [rows, setRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [textFields, setTextFields] = useState({
    hero_support: "",
    hero_title_1: "",
    hero_title_2: "",
    sub_title_1: "",
    sub_title_2: "",
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setTextFields({
      ...textFields,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdate = (id) => {
    setIsEdit(true);
    setIdToUpdate(id);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("hero_support", textFields.hero_support);
    formData.append("hero_title_1", textFields.hero_title_1);
    formData.append("hero_title_2", textFields.hero_title_2);
    formData.append("sub_title_1", textFields.sub_title_1);
    formData.append("sub_title_2", textFields.sub_title_2);
    formData.append("file", file);

    // Log the ID you intend to update (for debugging purposes)
    console.log(idToUpdate);

    try {
      if (isEdit) {
        // If editing existing data, use PUT request
        await axiosInstance.put(
          `/api/landing_page/landing_page_image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              id: idToUpdate,
            },
          }
        );
      } else {
        // If creating new data, use POST request
        await axiosInstance.post(
          `/api/landing_page/landing_page_image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // After successful submission, fetch updated data and close modal
      handleGetAll();
      setShowModal(false);
    } catch (error) {
      // Handle errors if any
      console.error("Error while submitting form:", error);
      // Optionally, display an error message or handle error state
    }
  };

  function convertToJson(inputData) {
    const convertedData = [];
    for (let i = 0; i < inputData.length; i++) {
      const bannerImagesString = inputData[i].bannerImages;
      const bannerImagesJson = JSON.parse(bannerImagesString);
      convertedData.push(bannerImagesJson);
    }
    return convertedData;
  }

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
        await axiosInstance.delete("/api/landing_page/landing_page_image", {
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
    const { data } = await axiosInstance.get(
      "/api/landing_page/landing_page_image"
    );
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
          className="mb-3"
        >
          Add New Banner
        </Button>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Banner Top Text 1</th>
              <th>Banner Top Text 2</th>
              <th>Banner Text 1</th>
              <th>Banner Text 2</th>
              <th>Banner Text 3</th>
              <th>Image</th>
              <th>Actions</th>
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
              convertToJson(rows)?.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.sub_title_1}</td>
                  <td>{item.sub_title_2}</td>
                  <td>{item.hero_title_1}</td>
                  <td>{item.hero_title_2}</td>
                  <td>{item.hero_support}</td>
                  <td>
                    <img
                      src={`data:image/png;base64,${item.bg_img}`}
                      alt="banner"
                      height={90}
                      width={160}
                    />
                  </td>
                  <td>
                    <CiEdit
                      className="btn-hover primary"
                      style={{ fontSize: "60px" }}
                      onClick={() => {
                        handleUpdate(rows[i].id);
                        setTextFields({
                          hero_support: item.hero_support,
                          hero_title_1: item.hero_title_1,
                          hero_title_2: item.hero_title_2,
                          sub_title_1: item.sub_title_1,
                          sub_title_2: item.sub_title_2,
                        });
                      }}
                    />
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
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? "Edit" : "Add"} Banner Slide</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="hero_support">
                <Form.Label>Hero Support</Form.Label>
                <Form.Control
                  value={textFields.hero_support}
                  type="text"
                  name="hero_support"
                  placeholder="Enter text"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="hero_title_1">
                <Form.Label>Hero Title 1</Form.Label>
                <Form.Control
                  value={textFields.hero_title_1}
                  type="text"
                  placeholder="Hero Title 1"
                  name="hero_title_1"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="hero_title_2">
                <Form.Label>Hero Title 2</Form.Label>
                <Form.Control
                  value={textFields.hero_title_2}
                  type="text"
                  placeholder="Hero Title 2"
                  name="hero_title_2"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="sub_title_1">
                <Form.Label>Sub Title 1</Form.Label>
                <Form.Control
                  value={textFields.sub_title_1}
                  type="text"
                  placeholder="Sub Title 1"
                  name="sub_title_1"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="sub_title_2">
                <Form.Label>Sub Title 2</Form.Label>
                <Form.Control
                  value={textFields.sub_title_2}
                  type="text"
                  placeholder="Sub Title 2"
                  name="sub_title_2"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="bg_img">
                <Form.Label>Choose File for background image</Form.Label>
                <Form.Control
                  type="file"
                  name="bg_img"
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
      </div>
    </div>
  );
};

export default LandingPageBanner;
