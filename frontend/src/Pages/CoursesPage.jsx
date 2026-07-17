import { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import Header from "../Components/Header";
import AddCourseForm from "../Components/AddCourseForm";
import Popup from "../Components/Popup";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/courses/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched courses data:", data);
        setCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  function handleRemove(id) {
    setCourseToDelete(id);
    setShowDeletePopup(true);
  }
  function confirmDelete() {
    fetch(`http://127.0.0.1:8000/courses/deleteCourse/${courseToDelete}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete course");
        return res.json();
      })
      .then(() => {
        setCourses((prev) => prev.filter((course) => course.id !== courseToDelete));
        setCourseToDelete(null);
        setShowDeletePopup(false);
      })
      .catch((error) => console.error("Error deleting course:", error));
  }
  function cancelDelete() {
    setCourseToDelete(null);
    setShowDeletePopup(false);
  }

  function handleAdd(courseData) {
    fetch("http://127.0.0.1:8000/courses/addCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses((prev) => [...prev, data]);
      })
      .catch((error) => console.error("Error adding course:", error));
  }

  function handleEdit(course) {
    setEditingCourse(course);
    setShowForm(true);
  }

  function handleUpdate(courseData) {
    fetch(`http://127.0.0.1:8000/courses/updateCourse/${editingCourse.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingCourse.id, ...courseData }),
    })
      .then((res) => res.json())
      .then((updatedCourse) => {
        setCourses((prev) =>
          prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
        );
      })
      .catch((error) => console.error("Error updating course:", error));
  }

  function closeForm() {
    setShowForm(false);
    setEditingCourse(null);
  }
    return (
    <div>
      <Header />
      {!showForm && (
        <button className="addCourseBtn" onClick={() => setShowForm(true)}>
          + Add Course
        </button>
      )}
      {showForm && (
        <AddCourseForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onClose={closeForm}
          initialData={editingCourse}
        />
      )}
      <div className="courseCardgrid">
        {courses && courses.map((course) => {
          if (!course) return null;
          return (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              duration={course.duration}
              rating={course.rating}
              onRemove={handleRemove}
              onEdit={handleEdit}
            />
          );
        })}
      </div>
      {showDeletePopup && (
        <Popup
          show={true}
          title="Delete Course"
          message="Are you sure you want to delete this course?"
          type="warning"
          onConfirm={confirmDelete}
          onClose={cancelDelete}
        />
      )}
    </div>
  );
}

export default CoursesPage;