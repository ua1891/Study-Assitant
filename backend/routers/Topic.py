from fastapi import APIRouter
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
    return {"error": "Topic not found"}

@router.post("/addTopic",response_model=Topic)#add a new Topic
def Add_Topic(topic:Topic):
     topics_data.append(topic.dict())
     return topic

@router.put("/updateTopic/{topic_id}",response_model=Topic)#update a topic by id
def Update_Topic(topic_id:int,topic:Topic):
    for existing_topic in topics_data:
        if existing_topic["id"] == topic_id:
            existing_topic.update(topic.dict())
            return existing_topic
    return {"error": "Topic not found"}

@router.delete("/deleteTopic/{topic_id}")#delete a topic by id
def Delete_Topic(topic_id:int):
    for existing_topic in topics_data:
        if existing_topic["id"] == topic_id:
            topics_data.remove(existing_topic)
            return {"message": f"Topic with id {topic_id} has been deleted."}
    return {"error": "Topic not found"}
