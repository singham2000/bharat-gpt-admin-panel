import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Navbar from "../Components/NavigationBar.js";
import axiosInstance from "../utils/axios.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal } from "react-bootstrap";
import { MdOutlineDeleteForever } from "react-icons/md";
import swal from "sweetalert";

const ContactUs = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [textFields, setTextFields] = useState({
    socialName: "",
    link: "",
  });

  // const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setTextFields({
      ...textFields,
      [e.target.id]: e.target.value,
    });
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleSubmit = async () => {
    const formData = {};
    formData.socialName = textFields.socialName;
    formData.link = textFields.link;
    await axiosInstance.post("/api/contact/contacts", formData);
    handleGetAll();
    setShowModal(false);
  };

  // function convertToJson(inputData) {
  //   const convertedData = [];
  //   for (let i = 0; i < inputData.length; i++) {
  //     const bannerImagesString = inputData[i].bannerImages;
  //     const bannerImagesJson = JSON.parse(bannerImagesString);
  //     convertedData.push(bannerImagesJson);
  //   }
  //   return convertedData;
  // }

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
        await axiosInstance.delete("/api/contact/contacts", {
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
    const { data } = await axiosInstance.get("/api/contact/contacts");
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
          Add Social Media
        </Button>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Social media name</th>
              <th>links</th>
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
                  <td>{item.socialName}</td>
                  <td>{item.link}</td>
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
              <Form.Group controlId="socialName">
                <Form.Label>Social Media name</Form.Label>
                {/* <Form.Control
                  type="select"
                    <select id="socialMediaSelect">
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="pinterest">Pinterest</option>
                  <option value="snapchat">Snapchat</option>
                  <option value="reddit">Reddit</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                placeholder="Social media Name"
                name="socialName"
                onChange={handleInputChange}
                /> */}

                <Form.Control
                  as="select"
                  name="socialName"
                  onChange={handleInputChange}
                  placeholder="Select Social Media"
                >
                  <option value="">Select Social Media</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="pinterest">Pinterest</option>
                  <option value="snapchat">Snapchat</option>
                  <option value="reddit">Reddit</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="whatsapp">WhatsApp</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="link">
                <Form.Label>Social Media Link</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Social media link"
                  name="link"
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
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ContactUs;
