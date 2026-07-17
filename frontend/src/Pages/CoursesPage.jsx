import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import CourseCard from "../Components/CourseCard";
import Header from "../Components/Header";
import AddCourseForm from "../Components/AddCourseForm";
import Popup from "../Components/Popup";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/courses/")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);

  // Filter courses by title (case-insensitive partial match)
  const filteredCourses = searchQuery.trim()
    ? courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : courses;

  // Show "Not Found" popup when search has no results
  useEffect(() => {
    if (searchQuery.trim() && filteredCourses.length === 0 && !loading) {
      setShowNotFoundPopup(true);
    } else {
      setShowNotFoundPopup(false);
    }
  }, [searchQuery, filteredCourses.length, loading]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div style={{ padding: "0 0 60px" }}>
        <AnimatePresence mode="wait">
          {!showForm && (
            <motion.div
              key="addButton"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}
            >
              <button className="addCourseBtn" onClick={() => setShowForm(true)}>
                <Plus size={18} />
                Add New Course
              </button>
            </motion.div>
          )}

          {showForm && (
            <motion.div key="form">
              <AddCourseForm
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onClose={closeForm}
                initialData={editingCourse}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="courseCardgrid">
          <AnimatePresence>
            {loading ? (
              // Show skeleton cards while loading
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="skeleton-card"
                >
                  <div>
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" style={{ width: '80%' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <div className="skeleton" style={{ width: '30%', height: '16px' }} />
                    <div className="skeleton" style={{ width: '20%', height: '16px' }} />
                  </div>
                </motion.div>
              ))
            ) : (
              filteredCourses.map((course) => (
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
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <Popup
        show={showDeletePopup}
        title="Delete Course"
        message="Are you sure you want to permanently delete this course? This action cannot be undone."
        type="error"
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />

      <Popup
        show={showNotFoundPopup}
        title="No Results Found"
        message={`We couldn't find any courses matching "${searchQuery}". Try a different keyword.`}
        type="warning"
        onClose={() => {
          setShowNotFoundPopup(false);
          setSearchQuery("");
        }}
      />
    </motion.div>
  );
}

export default CoursesPage;