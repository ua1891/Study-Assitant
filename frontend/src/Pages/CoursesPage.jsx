import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import CourseCard from "../Components/CourseCard";
import Search from "../Components/Search";
import AddCourseForm from "../Components/AddCourseForm";
import Popup from "../Components/Popup";
import robotImg from "../assets/robot.png";
import styles from "../styles/CoursesPage.module.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://study-assitant.onrender.com/courses/")
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter courses by title (case-insensitive partial match)
  const filteredCourses = searchQuery.trim()
    ? courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : courses;

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page to 1 when search query changes
  function handleSearchChange(query) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  function handleRemove(id) {
    setCourseToDelete(id);
    setShowDeletePopup(true);
  }

  function confirmDelete() {
    fetch(`https://study-assitant.onrender.com/courses/deleteCourse/${courseToDelete}`, {
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
    return fetch("https://study-assitant.onrender.com/courses/addCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add course");
        return res.json();
      })
      .then((data) => {
        setCourses((prev) => [...prev, data]);
      });
  }

  function handleEdit(course) {
    setEditingCourse(course);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleUpdate(courseData) {
    return fetch(`https://study-assitant.onrender.com/courses/updateCourse/${editingCourse.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingCourse.id, ...courseData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update course");
        return res.json();
      })
      .then((updatedCourse) => {
        setCourses((prev) =>
          prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
        );
      });
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
      
      <div className={styles.heroContainer}>
        {/* Glow behind */}
        <div className={styles.heroGlow} />

        <div className={styles.heroTextWrapper}>
          <h1 className={styles.heroTitle}>
            Study Assistant AI <br/> Supercharge your prep.
          </h1>
          <p className={styles.heroSubtitle}>
            Upload your materials, generate intelligent study plans, and master your exams faster. The ultimate AI-powered workspace for serious learners.
          </p>
          <AnimatePresence mode="wait">
            {!showForm && (
              <motion.div
                key="addButton"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={styles.addCourseWrapper}
              >
                <button className={`addCourseBtn ${styles.addBtn}`} onClick={() => setShowForm(true)}>
                  <Plus size={20} />
                  Add New Course
                </button>
                <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className={styles.robotWrapper}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={robotImg} alt="Study Assistant AI" className={styles.robotImg} />
        </motion.div>
      </div>

      <div className={styles.pageBottom}>
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div key="form" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: "40px" }}>
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
            ) : currentCourses.length === 0 ? (
              <div className={styles.emptyState}>
                {searchQuery.trim() ? (
                  <>
                    <h3 className={styles.emptyTitle}>No results found</h3>
                    <p>We couldn't find any courses matching "{searchQuery}".</p>
                  </>
                ) : (
                  <>
                    <h3 className={styles.emptyTitle}>No courses yet</h3>
                    <p>Click "Add New Course" above to create your first course!</p>
                  </>
                )}
              </div>
            ) : (
              currentCourses.map((course) => (
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

        {totalPages > 1 && !loading && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  background: currentPage === index + 1 ? "var(--accent)" : "rgba(255, 255, 255, 0.05)",
                  color: currentPage === index + 1 ? "#0a0a0a" : "var(--text-secondary)",
                  border: currentPage === index + 1 ? "none" : "1px solid var(--border)",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s ease"
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <Popup
        show={showDeletePopup}
        title="Delete Course"
        message="Are you sure you want to permanently delete this course? This action cannot be undone."
        type="error"
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />
    </motion.div>
  );
}

export default CoursesPage;