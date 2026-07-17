from schemas.CoursesSchema import Course
from fastapi import APIRouter, HTTPException
from data.courses import courses_data
from data.Topic import topics_data

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
        
    raise HTTPException(status_code=404, detail="Course not found")
        

@router.post("/addCourse", response_model=Course)
def add_course(course: Course):
    new_course = course.dict()
    if new_course["id"] is None:
        new_course["id"] = max((c["id"] for c in courses_data), default=0) + 1
    courses_data.append(new_course)
    return new_course

@router.put("/updateCourse/{course_id}", response_model=Course)  #Update a course by id
def update_course(course_id: int, course: Course):  
    for existing_course in courses_data:
        if existing_course["id"] == course_id:
            existing_course.update(course.dict())
            return existing_course
    raise HTTPException(status_code=404, detail="Course not found")

@router.delete("/deleteCourse/{course_id}")  #Delete a course by id
def delete_course(course_id: int):
    for existing_course in courses_data:
        if existing_course["id"] == course_id:
            courses_data.remove(existing_course)
            # Cascade: remove all topics that belong to this course
            topics_to_remove = [t for t in topics_data if t.get("course_id") == course_id]
            for t in topics_to_remove:
                topics_data.remove(t)
            return {"message": f"Course {course_id} and its topics have been deleted."}
    raise HTTPException(status_code=404, detail="Course not found")
