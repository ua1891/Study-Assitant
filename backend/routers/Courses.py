from schemas.CoursesSchema import Course
from fastapi import APIRouter
from data.courses import courses_data

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("/", response_model=list[Course])#get all courses
def get_courses():  
    return courses_data
#this one is just for gtting single course by id
@router.get("/{course_id}", response_model=Course)
def get_course(course_id: int):
    for course in courses_data:
        if course["id"] == course_id:
            return course
    return {"error": "Course not found"}    

@router.post("/addCourse", response_model=Course)   #Add a new course
def add_course(course: Course):
    courses_data.append(course.dict())
    return course

@router.put("/updateCourse/{course_id}", response_model=Course)  #Update a course by id
def update_course(course_id: int, course: Course):  
    for existing_course in courses_data:
        if existing_course["id"] == course_id:
            existing_course.update(course.dict())
            return existing_course
    return {"error": "Course not found"}

@router.delete("/deleteCourse/{course_id}")  #Delete a course by id
def delete_course(course_id: int):
    for existing_course in courses_data:
        if existing_course["id"] == course_id:
            courses_data.remove(existing_course)
            return {"message": f"Course with id {course_id} has been deleted."}
    return {"error": "Course not found"}
