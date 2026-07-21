from schemas.CoursesSchema import CreateCourse as Course,CourseResponse
from fastapi import APIRouter, HTTPException
from data.CoursesQueries import (
    Insert_Courses,
    GetAllCourse,
    GetCourseByID,
    UpdateCourse,
    DeleteCourse,
)

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("/", response_model=list[CourseResponse])#get all courses
def get_courses():
    courses = GetAllCourse()
    if not courses:
        raise HTTPException(status_code=404, detail="No courses found") 
    return courses


#this one is just for getting single course by id
@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: str):
    course = GetCourseByID(course_id)
    if course:
        return course
    else:
        raise HTTPException(status_code=404, detail="Course not found")
        

@router.post("/addCourse", response_model=CourseResponse)
def add_course(course: Course):
   
    Inserted_id =Insert_Courses(course)
    return {
        "id":Inserted_id,
        **course.model_dump()
    }


@router.put("/updateCourse/{course_id}", response_model=CourseResponse)  #Update a course by id
def update_course(course_id: str, course: Course):  
    updated= UpdateCourse(course_id,course)
    if updated==0:   
        raise HTTPException(status_code=404, detail="Course not found")
    return GetCourseByID(course_id)

@router.delete("/deleteCourse/{course_id}")  #Delete a course by id
def delete_course(course_id: str):
    Count=DeleteCourse(course_id)
    if Count==0:    
            raise HTTPException(status_code=404, detail="Course not found")
    
    return "Course  and its topics have been deleted."
    
