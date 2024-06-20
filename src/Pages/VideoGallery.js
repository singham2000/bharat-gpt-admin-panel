import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axiosInstance from "../utils/axios";
import Navbar from "../Components/NavigationBar.js";
import { BsWindowSidebar } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import { Modal, Form } from "react-bootstrap";

const VideoGallery = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [textFields, setTextFields] = useState({
    label: "",
    links:[]
  });
  const getAllVideos = async () => {
    const { data } = await axiosInstance.get(
      "/api/landing_page/gallery_videos"
    );
    setRows(data.result);
    console.log(data);
  };

  useEffect(() => {
    getAllVideos();
    return () => {};
  }, []);

  const handleInputChange = (e) => {
    setTextFields({
      ...textFields,
      [e.target.id]: e.target.value,
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
        await axiosInstance.delete("/api/landing_page/gallery_videos", {
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Label</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.label}</td>
                <td>
                  <Table striped bordered hover>
                    <thead>
                      <th>SL.NO.</th>
                      <th>Video</th>
                    </thead>
                    <tbody>
                      {JSON.parse(item.links).map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td
                            onClick={() => {
                              window.open(item, "_blank");
                            }}
                          >
                            {item}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
                <td>
                  {" "}
                  <MdOutlineDeleteForever
                    className="btn-hover"
                    style={{ fontSize: "60px", color: "red" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Video gallery</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="hero_support">
                <Form.Label>Label For </Form.Label>
                <Form.Control
                  type="text"
                  name="hero_support"
                  placeholder="Enter text"
                  onChange={handleInputChange}
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
            <Button variant="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default VideoGallery;
