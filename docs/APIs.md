# Backend API

This document describes the backend API.

## Log in

**Request** : ` POST /login/`

**Auth required** : No

**Body** :
```json
{
    "name": String,
    "password": String 
}
```

### Success response

**Code** : `200`

**Body** : 
```json
{   
    "token": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Log out

**Request** : ` PUT /logout/`

**Auth required** : Yes


### Success response

**Code** : `200`

**Body** : 
```json
{}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Sign up

**Request** : ` POST /signup/`

**Auth required** : No

**Body** :
```json
{
    "name": String,
    "password": String 
}
```

### Success response

**Code** : `200`

**Body** : 
```json
{}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```
## Create user 

**Request** : ` POST /api/user`

**Body** :
```json
{
    "name": String,
    "email": String,
    "password": String
}
```
### Success response

**Code** : `200`

**Body** :
```json
{
    "id": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Delete user 

**Request** : ` DELETE /api/user/delete-user/:id`

### Success response

**Code** : `200`

**Body** : 
```json
{}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get all users 

**Request** : ` GET /api/user`

### Success response

**Code** : `200`

**Body** : 
```json
[
    {
        "_id": String,
        "name": String,
        "email": String,
        "avatar": String,
        "password": String,
        "register_date": Date
    },
]
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get user

**Request** : ` GET /api/user/:id`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
{
        "_id": String,
        "name": String,
        "email": String,
        "avatar": String,
        "password": String,
        "register_date": Date
    },
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Update user

**Request** : ` PUT /api/user/update-user/:id`

**Body** :
```json
{
        "_id": String,
        "name": String,
        "email": String,
        "avatar": String,
        "password": String,
        "register_date": Date
    },
```

### Success response

**Code** : `200`

**Body** :
```json
{
    "id": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```


## Create patient 

**Request** : ` POST /api/patients/add`

**Auth required** : Yes

**Body** :
```json
{
    "name": String,
    "dob": Date,
    "avatar_id: String
    "notes": [String], 
    "medication": [String]
}
```

### Success response

**Code** : `200`

**Body** :
```json
{
    "id": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Delete patient 

**Request** : ` DELETE /api/patients/delete-patient/:id`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
{}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get all patients 

**Request** : ` GET /api/patients`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
[
    {
        "id": String,
        "name": String,
        "dob": String,
        "avatar_id: String,
        "notes": [String], 
        "medication": [String],
        "past_appointments": [{"date": String, "id": String}],
        "future_appointments": [{"date": String, "id": String}]
    }   
]
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get patient

**Request** : ` GET /api/patients/:id`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
{
    "id": String,
    "name": String,
    "avatar_id": String,
    "dob": String,
    "notes": [String], 
    "medication": [String],
    "past_appointments": [{"date": String, "id": String}],
    "future_appointments": [{"date": String, "id": String}]   
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Update patient

**Request** : ` PUT /api/patients/update-patient/:id`

**Body** :
```json
{
    "id": String,
    "name": String,
    "dob": String,
    "avatar_id": String
    "notes": [String], 
    "medication": [String],
    "past_appointments": [{"date": String, "id": String}],
    "future_appointments": [{"date": String, "id": String}]   
}
```

### Success response

**Code** : `200`

**Body** :
```json
{
    "id": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Find patients for user

**Request** : ` GET /api/patients/user/:userId`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
[
    {
        "id": String,
        "name": String,
        "dob": String,
        "avatar_id": String,
        "notes": [String], 
        "medication": [String],
        "past_appointments": [{"date": String, "id": String}],
        "future_appointments": [{"date": String, "id": String}]
    }   
]
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Create appointment 

**Request** : ` POST /api/appointments/add`

**Auth required** : Yes

**Body** :
```json
{
    "patientId": String,
    "date": String,
    "notes": [String] 
}
```

### Success response

**Code** : `200`

**Body** :
```json
{   
    "id": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Delete appointment 

**Request** : ` DELETE /api/appointments/delete-appointment/:id`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
{}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get all appointments 

**Request** : ` GET /api/appointments`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
[
    {   
        "id": String,
        "userId": String,
        "patientId": String,
        "date": String,
        "notes": [String] 
    }  
]
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get appointment

**Request** : ` GET /api/appointments/:id`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
{   
    "id": String,
    "userId": String,
    "patientId": String,
    "date": String,
    "notes": [String] 
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Update appointment

**Request** : ` PUT /api/appointments/update-appointment/:id`

**Body** :
```json
{   
    "id": String,
    "userId": String,
    "patientId": String,
    "date": String,
    "notes": [String] 
}
```

### Success response

**Code** : `200`

**Body** :
```json
{
    "id": String
}
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get appointments for user

**Request** : ` GET /api/appointments/user/:userId`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
[
    {   
        "id": String,
        "userId": String,
        "patientId": String,
        "date": String,
        "notes": [String] 
    }  
]
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

## Get appointments for patient

**Request** : ` GET /api/appointments/patient/:patientId`

**Auth required** : Yes

### Success response

**Code** : `200`

**Body** : 
```json
[
    {   
        "id": String,
        "userId": String,
        "patientId": String,
        "date": String,
        "notes": [String] 
    }  
]
```

### Error response

**Code** : `400`

**Body** : 
```json
{
    "message": String
}
```

