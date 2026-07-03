import CourseCard from "./Components/CourseCard";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Study Assistant</h1>
      <CourseCard Title="Web Development" Description="Learn HTML, CSS, and JavaScript" Duration="12 weeks" Rating="4.5" />
      <CourseCard Title="Mobile App Development" Description="Build native mobile apps with React Native" Duration="16 weeks" Rating="4.7" />
    </div>
  );
}

export default App;