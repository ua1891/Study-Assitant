# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException
from schemas.TopicSchema import Topic
from data.Topic import topics_data

router = APIRouter(prefix="/topics", tags=["Topics"])
@router.get("/", response_model=list[Topic])#get all topics
def get_topics():
        return topics_data

@router.get("/{topic_id}", response_model=Topic)#get single topic by id
def Get_topic(topic_id: int):
    for topic in topics_data:
        if topic["id"] == topic_id:
            return topic
    raise HTTPException(status_code=404, detail="Topic not found")

@router.get("/course/{course_id}", response_model=list[Topic])#get topics by course id
def get_topics_by_course(course_id: int):
    return [topic for topic in topics_data if topic.get("course_id") == course_id]

@router.post("/addTopic", response_model=Topic)#add a new Topic
def Add_Topic(topic: Topic):
    new_topic = topic.dict()
    if new_topic["id"] is None:
        new_topic["id"] = max((t["id"] for t in topics_data), default=0) + 1
    topics_data.append(new_topic)
    return new_topic

@router.put("/updateTopic/{topic_id}",response_model=Topic)#update a topic by id
def Update_Topic(topic_id:int,topic:Topic):
    for existing_topic in topics_data:
        if existing_topic["id"] == topic_id:
            existing_topic.update(topic.dict())
            return existing_topic
    raise HTTPException(status_code=404, detail="Topic not found")  

@router.delete("/deleteTopic/{topic_id}")#delete a topic by id
def Delete_Topic(topic_id:int):
    for existing_topic in topics_data:
        if existing_topic["id"] == topic_id:
            topics_data.remove(existing_topic)
            return {"message": f"Topic with id {topic_id} has been deleted."}
    raise HTTPException(status_code=404, detail="Topic not found")