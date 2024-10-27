import React, { ReactNode, createContext, useContext, useReducer } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface ProjectState {
  projects: Project[];
}

type ProjectAction =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: number };

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { projects: action.payload };
    case 'ADD_PROJECT':
      return { projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return { projects: state.projects.map(project => project.id === action.payload.id ? action.payload : project) };
    case 'DELETE_PROJECT':
      return { projects: state.projects.filter(project => project.id !== action.payload) };
    default:
      return state;
  }
};

const ProjectContext = createContext<{ state: ProjectState; dispatch: React.Dispatch<ProjectAction> } | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, { projects: [] });
  return <ProjectContext.Provider value={{ state, dispatch }}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used within a ProjectProvider");
  return context;
};
