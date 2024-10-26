from sqlalchemy.orm import Session
from . import models, schemas

def get_user_by_email(db: Session, email: str):
    """Retrieve a user by their email."""
    return db.query(models.User).filter(models.User.email == email).first()

def get_project(db: Session, project_id: int):
    """Retrieve a single project by its ID."""
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def get_projects(db: Session, skip: int = 0, limit: int = 10):
    """Retrieve all projects with pagination."""
    return db.query(models.Project).offset(skip).limit(limit).all()

def create_project(db: Session, project: schemas.ProjectCreate):
    """Create a new project with string conversion for URLs."""
    db_project = models.Project(
        title=project.title,
        description=project.description,
        image_url=str(project.image_url), 
        project_url=str(project.project_url)
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project: models.Project, project_data: schemas.ProjectCreate):
    """Update an existing project with string conversion for URLs."""
    # Convert the URL fields to strings if they are HttpUrl instances
    project_data_dict = project_data.dict()
    project_data_dict['image_url'] = str(project_data.image_url)
    project_data_dict['project_url'] = str(project_data.project_url)

    # Update each attribute on the project instance
    for key, value in project_data_dict.items():
        setattr(project, key, value)
    
    db.commit()
    db.refresh(project)
    return project

def delete_project(db: Session, project: models.Project):
    """Delete a project."""
    db.delete(project)
    db.commit()
