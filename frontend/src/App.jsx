import CourseCard from "./components/CourseCard";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import courses from "./data/courses";
import "./App.css";

function App() {
  console.log(courses);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="courseCardgrid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            duration={course.duration}
            rating={course.rating}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;