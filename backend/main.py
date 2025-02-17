from fastapi import FastAPI, APIRouter, HTTPException
from bson.objectid import ObjectId

from configurations import collection
from database.schemas import all_users
from database.user_model import User

# Create a FastAPI application instance.
app = FastAPI()
router = APIRouter()


@router.get("/")
async def get_all_users():
    data = collection.find()
    return all_users(data)


@router.post("/")
async def create_user(new_user: User):
    try:
        resp = collection.insert_one(dict(new_user))
        return {"status_code": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occured {e}.")


@router.put("/{user_id}")
async def update_user(user_id: str, updated_user: User):
    try:
        id = ObjectId(user_id)
        existing_user = collection.find_one({"_id": id})
        if not existing_user:
            return HTTPException(status_code=404, detail="User does not exists.")
        resp = collection.update_one({"_id": id}, {"$set": dict(updated_user)})
        return {"status_code": 200, "message": "User updated successfully."}

    except Exception as e:
            return HTTPException(status_code=500, detail=f"Some error occured {e}.")

@router.delete("/{user_id}")
async def delete_user(user_id: str):
    try:
        id = ObjectId(user_id)
        existing_user = collection.find_one({"_id": id})
        if not existing_user:
            return HTTPException(status_code=404, detail="User does not exists.")
        resp = collection.delete_one({"_id": id})
        return {"status_code": 200, "message": "User deleted successfully."}

    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occured {e}.")

app.include_router(router)
