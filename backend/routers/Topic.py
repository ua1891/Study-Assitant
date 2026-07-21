# pyrefly: ignore [missing-import]
from re import U

from fastapi import APIRouter, HTTPException
from schemas.TopicSchema import CreateTopic as Topic,TopicResponse
from data.TopicsQueries import (
    Insert_Topic,
    GetAllTopics,
    GetTopicByID,
    UpdateTopic,
    DeleteTopic,
    GetTopicsByCourseID,
)

router = APIRouter(prefix="/topics", tags=["Topics"])
@router.get("/", response_model=list[TopicResponse])#get all topics
def get_topics():
        return  GetAllTopics()

@router.get("/course/{course_id}", response_model=list[TopicResponse])#get topics by course id
def get_topics_by_course(course_id: str):
    return GetTopicsByCourseID(course_id)
    

@router.get("/{topic_id}", response_model=TopicResponse)#get single topic by id
def Get_topic(topic_id: str):
    topic = GetTopicByID(topic_id)
    if topic:
        return topic   
    raise HTTPException(status_code=404, detail="Topic not found")


@router.post("/addTopic", response_model=TopicResponse)#add a new Topic
def Add_Topic(topic: Topic):
    ID=Insert_Topic(topic)
    return {
        "id":ID,
        **topic.model_dump()
    }
@router.put("/updateTopic/{topic_id}",response_model=TopicResponse)#update a topic by id
def Update_Topic(topic_id:str,topic:Topic):
    Updated=UpdateTopic(topic_id,topic)
    if Updated==0:
                raise HTTPException(status_code=404, detail="No topics found for this course")
    return GetTopicByID(topic_id)

@router.delete("/deleteTopic/{topic_id}")#delete a topic by id
def Delete_Topic(topic_id:str):
    deleted=DeleteTopic(topic_id)
    if deleted==0:
            raise HTTPException(status_code=404, detail="Topic not found")
    return "Topic has been deleted."