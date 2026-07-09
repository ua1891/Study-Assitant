import {useState} from "react";
import styles from "../styles/AddCourseForm.module.css";

function AddCourseForm({ onAdd, onClose}) {

    const[formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        rating: ""
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
    if (!formData.title.trim()|| !formData.description.trim() || !formData.duration.trim() || !formData.rating.trim()) return;

    onAdd(formData);
    setFormData({ title: "", description: "", duration: "", rating: "" });
    onClose();
  }

  return (
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
</div>
  </form>
);
}

export default AddCourseForm;