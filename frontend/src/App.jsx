import CourseCard from "./components/CourseCard";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
const courses = [
  {
    Title: "Web Development",
    Description: "Learn HTML, CSS, and JavaScript",
    Duration: "12 weeks",
    Rating: "4.5"
  },
  {
    Title: "Mobile App Development",
    Description: "Build native mobile apps with React Native",
    Duration: "16 weeks",
    Rating: "4.7"
  },
  {
    Title: "Data Science",
    Description: "Learn Python and machine learning",
    Duration: "20 weeks",
    Rating: "4.8"
  }
];
function App() {
  console.log(courses);
  return (
    <div>
      <Navbar />
      <Header />
      {courses.map((course) => (
        <CourseCard
          Title={course.Title}
          Description={course.Description}
          Duration={course.Duration}
          Rating={course.Rating}
        />
      ))}
      <Footer/>
    </div>
  );
}

export default App;