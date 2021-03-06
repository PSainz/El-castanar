import React from "react";
import { Formik } from "formik";
import { send } from "emailjs-com";
import "./Form.scss";

const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const USER_ID = process.env.REACT_APP_USER_ID;

const Form = () => {
  const initialValues = {
    name: "",
    last_name: "",
    email: "",
    phone: "",
    event_type: "",
    message: "",
  };

  const validate = (values) => {
    let errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/i;

    if (!values.email) {
      errors.email = "";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Email inválido";
    }

    if (!values.name) {
      errors.name = "";
    } else if (values.name.length < 3) {
      errors.name = "Demasiado corto";
    }

    if (!values.last_name) {
      errors.last_name = "";
    } else if (values.last_name.length < 4) {
      errors.last_name = "Demasiado corto";
    }

    if (!values.phone) {
      errors.phone = "";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "Teléfono inválido";
    }

    if (!values.event_type) {
      errors.event_type = "";
    } else if (values.event_type.length < 4) {
      errors.event_type = "Demasiado corto";
    }

    if (!values.message) {
      errors.message = "";
    } else if (values.message.length < 4) {
      errors.message = "Demasiado corto";
    }

    return errors;
  };

  const submitForm = (values, { resetForm }) => {
    send(SERVICE_ID, TEMPLATE_ID, values, USER_ID)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Enviado!");
        resetForm();
      })
      .catch((err) => {
        console.log("FAILED...", err);
        alert("Error al enviar!");
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <div className="container-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={values.name}
                  placeholder="Nombre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "input-error" : null}
                />
                {errors.name && touched.name && (
                  <span className="error">{errors.name}</span>
                )}
              </div>
              <div className="form-row">
                <input
                  type="last_name"
                  name="last_name"
                  placeholder="Apellidos"
                  id="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.last_name && touched.last_name ? "input-error" : null
                  }
                />
                {errors.last_name && touched.last_name && (
                  <span className="error">{errors.last_name}</span>
                )}
              </div>
              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="form-row">
                <input
                  type="phone"
                  name="phone"
                  placeholder="Teléfono"
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone && touched.phone ? "input-error" : null
                  }
                />
                {errors.phone && touched.phone && (
                  <span className="error">{errors.phone}</span>
                )}
              </div>
              <div className="form-row">
                <input
                  type="event_type"
                  name="event_type"
                  placeholder="Tipo de evento"
                  id="event_type"
                  value={values.event_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.event_type && touched.event_type
                      ? "input-error"
                      : null
                  }
                />
                {errors.event_type && touched.event_type && (
                  <span className="error">{errors.event_type}</span>
                )}
              </div>
              <div className="form-row">
                <textarea
                  type="message"
                  name="message"
                  placeholder="Mensaje"
                  id="message"
                  rows="5"
                  cols="40"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.message && touched.message ? "input-error" : null
                  }
                />
                {errors.message && touched.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>
              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Enviar
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Form;
