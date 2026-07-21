from DbConnection import Topics_Collection
from schemas.TopicSchema import CreateTopic 
from bson import ObjectId

def Insert_Topic(topic:CreateTopic):
        result= Topics_Collection.insert_one(topic.model_dump())
        return str(result.inserted_id)
def GetAllTopics():
        topics = []
        for topic in Topics_Collection.find():
                topic["id"] =str(topic.pop("_id"))
                topics.append(topic)
        return topics

def GetTopicByID(_ID:str):
        topic = Topics_Collection.find_one({"_id":ObjectId(_ID)})
        if topic:
                topic["id"] =str(topic.pop("_id"))
        return topic
def GetTopicsByCourseID(course_id:str):
        topics = []
        for topic in Topics_Collection.find({"course_id":course_id}):
                  topic["id"] =str(topic.pop("_id"))
                  topics.append(topic)
        return topics

def UpdateTopic(_ID:str,topic:CreateTopic):
        result= Topics_Collection.update_one({"_id":ObjectId(_ID)},{"$set":topic.model_dump()})
        return result.modified_count

def DeleteTopic(_ID:str):
        result= Topics_Collection.delete_one({"_id":ObjectId(_ID)})
        return result.deleted_count
