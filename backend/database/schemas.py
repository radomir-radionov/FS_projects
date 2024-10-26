from pydantic import BaseModel, HttpUrl
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    image_url: HttpUrl
    project_url: HttpUrl

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
