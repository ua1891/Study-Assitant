from DbConnection import Note_collection
from bson import ObjectId
from datetime import datetime


def Insert_Note(note: dict):
    note["created_at"] = datetime.utcnow()
    result = Note_collection.insert_one(note)
    return str(result.inserted_id)

def GetAllNotes():
    notes = list(Note_collection.find())
    for n in notes:
        n["id"] = str(n["_id"])
        del n["_id"]
    return notes

def DeleteNote(note_id: str):
    result = Note_collection.delete_one({"_id": ObjectId(note_id)})
    return result.deleted_count > 0