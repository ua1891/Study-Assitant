import {useState} from "react";

import CourseCard from "./Components/CourseCard";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import initialCourses from "./data/courses";
import "./App.css";

function App() {
  const [courses, setCourses] = useState(initialCourses);
  function handleRemove(id) {
  setCourses((prev) => prev.filter((course) => course.id !== id));
}
function handleAdd() {
  const newCourse = {
    id: Date.now(),
    title: "New Course",
    description: "Add a description",
    duration: "TBD",
    rating: "⭐",
  };
  setCourses((prev) => [...prev, newCourse]);
}
  return (
    <div>
      <Navbar />
      <Header />
      <button onClick={handleAdd}>+ Add Course</button>{/* Button to add a new course */}
      <div className="courseCardgrid">
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