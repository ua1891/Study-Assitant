import { useState } from "react";
import CourseCard from "./Components/CourseCard";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import initialCourses from "./data/courses";
import AddCourseForm from "./Components/AddCourseForm";
import Popup from "./Components/Popup";
import "./App.css";

function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  {/*Adding a delete popup and this is the useState for it*/ }
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);


  function handleRemove(id) {
    setCourseToDelete(id);
    setShowDeletePopup(true);
  }
  function confirmDelete() {
    setCourses((prev) =>
      prev.filter((course) => course.id !== courseToDelete)
    );

    setCourseToDelete(null);
    setShowDeletePopup(false);
  }
  function cancelDelete() {
    setCourseToDelete(null);
    setShowDeletePopup(false);
  }

  {/*Add courses in Array*/ }
  function handleAdd(courseData) {
    const newCourse = {
      id: Date.now(),
      ...courseData,
    };
    setCourses((prev) => [...prev, newCourse]);
  }
  return (
    <div>
      <Navbar />
      <Header />
      {!showForm && (
        <button className="addCourseBtn" onClick={() => setShowForm(true)}>
          + Add Course
        </button>
      )}
      {/* Buttonn for Adding new course */}
      {showForm && (
        <AddCourseForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
      )}      <div className="courseCardgrid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}//New Prop
            title={course.title}
            description={course.description}
            duration={course.duration}
            rating={course.rating}
            onRemove={handleRemove}//New Prop
          />
        ))}
      </div>
      {/* Adding the delete popup component here*/}
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
      <Footer />
    </div>
  );
}
export default App;