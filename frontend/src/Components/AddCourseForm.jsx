import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, X, Save } from "lucide-react";
import styles from "../styles/AddCourseForm.module.css";
import Popup from "./Popup";

function AddCourseForm({ onAdd, onUpdate, onClose, initialData }) {
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        duration: initialData.duration,
        rating: initialData.rating,
      });
    }
  }, [initialData]);

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
        title: "Missing Details",
        message: "Please fill in all fields before submitting.",
        type: "warning",
      });
      return;
    }

    if (initialData) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }

    setFormData({ title: "", description: "", duration: "", rating: "" });

    setPopup({
      show: true,
      title: "Success",
      message: initialData ? "Course updated successfully!" : "Course added successfully!",
      type: "success",
    });
  }

  return (
    <>
      <motion.form 
        onSubmit={handleSubmit} 
        className={styles.addCourseForm}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className={styles.formTitle}>
          {initialData ? "Edit Course" : "Add New Course"}
        </h3>
        
        <div className={styles.inputGroup}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Introduction to Data Structures"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Briefly describe what this course covers..."
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows="3"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 4 Weeks"
              value={formData.duration}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Rating</label>
            <input
              type="text"
              name="rating"
              placeholder="e.g. ⭐⭐⭐⭐"
              value={formData.rating}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            <X size={16} />
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            {initialData ? <Save size={16} /> : <Plus size={16} />}
            {initialData ? "Update Course" : "Add Course"}
          </button>
        </div>
      </motion.form>

      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => {
          setPopup({ ...popup, show: false });
          if (popup.type === "success") {
            onClose();
          }
        }}
      />
    </>
  );
}

export default AddCourseForm;