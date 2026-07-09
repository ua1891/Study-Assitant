import { useState } from "react";

import CourseCard from "./Components/CourseCard";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import initialCourses from "./data/courses";
import AddCourseForm from "./Components/AddCourseForm";
import "./App.css";

function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  function handleRemove(id) {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  }
  {/*Add courses in Array*/}
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
      <Footer />
    </div>
  );
}
export default App;