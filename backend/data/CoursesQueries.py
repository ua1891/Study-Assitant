
from DbConnection import Course_collection
from schemas.CoursesSchema import CreateCourse
from bson import ObjectId

def Insert_Courses(course:CreateCourse):
        result= Course_collection.insert_one(course.model_dump())
        return str(result.inserted_id) 

def GetAllCourse():
        courses = []
        for course in Course_collection.find():
                course["id"] =str(course.pop("_id"))
                courses.append(course)
        return courses

def GetCourseByID(_ID:str):
        course = Course_collection.find_one({"_id":ObjectId(_ID)})
        if course:
                course["id"] =str(course.pop("_id"))
        return course

def UpdateCourse(_ID:str,course:CreateCourse):
        result= Course_collection.update_one({"_id":ObjectId(_ID)},{"$set":course.model_dump()})
        return result.modified_count 

def DeleteCourse(_ID:str):
        result= Course_collection.delete_one({"_id":ObjectId(_ID)})
        return result.deleted_count


