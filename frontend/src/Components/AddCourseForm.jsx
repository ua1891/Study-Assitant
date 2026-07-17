import { useState, useEffect } from "react";
import styles from "../styles/AddCourseForm.module.css";
import Popup from "./Popup";

// This form is reused for BOTH adding a new course and editing an existing one.
// Which mode it's in depends entirely on whether `initialData` was passed:
//   - initialData is null/undefined -> Add mode (empty form, calls onAdd)
//   - initialData is a course object -> Edit mode (pre-filled form, calls onUpdate)
function AddCourseForm({ onAdd, onUpdate, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    rating: ""
  });

  // Controls the info/warning/success popup shown after validation or submission
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "info",
  });

  // Runs whenever `initialData` changes (i.e. whenever a course's Edit button is clicked).
  // We can't just use initialData as the useState default above, because this component
  // is already mounted and sitting in "Add mode" before the user picks a course to edit -
  // useState's default only runs once, on first mount, so it would miss later edits.
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

  // Generic change handler - works for every input because each one's `name`
  // attribute matches a key in formData (title, description, duration, rating)
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's native form submit/page reload

    // Basic required-field validation before hitting the backend at all
    if (!formData.title.trim() || !formData.description.trim() || !formData.duration.trim() || !formData.rating.trim()) {
      setPopup({
        show: true,
        title: "Warning",
        message: "Please fill all fields before submitting.",
        type: "warning",
      });
      return;
    }

    // Route to the correct handler depending on which mode we're in.
    // Edit mode (initialData exists) -> PUT via onUpdate
    // Add mode (initialData is null) -> POST via onAdd
    if (initialData) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }

    // Reset the form back to empty regardless of mode, ready for next use
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
      {/* Popup is intentionally OUTSIDE this <form> element.
          Buttons inside a <form> default to type="submit" unless told otherwise,
          which caused Popup's own button to accidentally re-trigger this form's
          onSubmit while the form was mid-unmount - moving it out avoids that entirely. */}
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
          {/* Button label reflects the current mode, so the user always knows
              whether they're creating something new or editing something existing */}
          <button type="submit" className={styles.submitBtn}>
            {initialData ? "Update Course" : "Add Course"}
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

          // Only close (and reset editingCourse, back in CoursesPage) after a
          // successful add/update - a validation warning should let the user
          // keep editing, not close the form out from under them
          if (popup.type === "success") {
            onClose();
          }
        }}
      />
    </>
  );
}

export default AddCourseForm;