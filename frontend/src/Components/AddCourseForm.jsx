import { useState } from "react";
import styles from "../styles/AddCourseForm.module.css";
import Popup from "./Popup";

function AddCourseForm({ onAdd, onClose }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    rating: ""
  });
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "info",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.duration.trim() || !formData.rating.trim()) {

      setPopup({
        show: true,
        title: "Warning",
        message: "Please fill all fields before submitting.",
        type: "warning",
      });

      return;
    }

    onAdd(formData);
    setFormData({ title: "", description: "", duration: "", rating: "" });
    setPopup({
      show: true,
      title: "Success",
      message: "Course added successfully!",
      type: "success",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.addCourseForm}>
        <input
          type="text"
          name="title"
          placeholder="Course title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g. ⭐⭐⭐⭐)"
          value={formData.rating}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>
            Add Course
          </button>

          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
          <Popup
            show={popup.show}
            title={popup.title}
            message={popup.message}
            type={popup.type}
            onClose={() => {
              setPopup({
                ...popup,
                show: false,
              });

              if (popup.type === "success") {
                onClose(); // Close the form only after clicking OK
              }
            }}
          />
        </div>
      </form>
    </>
  );
}

export default AddCourseForm;