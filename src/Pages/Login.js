import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    setShow(false);
    setError("");
    event.preventDefault();
    try {
      const { data } = await axiosInstance.post("/api/user/login", {
        email: email,
        password: password,
      });
      if (data.success) {
        swal("Logged in!", "", "success");
        localStorage.setItem("userAdminBharatGPT", true);
        navigate("/");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setShow(true);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  className="mt-2"
                  variant="primary"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Alert
          variant="danger"
          show={show}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Row>
    </Container>
  );
};

export default LoginForm;
