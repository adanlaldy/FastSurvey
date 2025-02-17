def individual_user(user):
    return {
        "id": str(user["_id"]),
        "name": user["name"]
    }

def all_users(users):
    return [individual_user(user) for user in users]