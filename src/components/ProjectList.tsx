import { Project } from './types';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-500 text-center">No projects found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow p-4 border border-gray-200"
        >
          <h4 className="font-semibold mb-2">{project.name}</h4>
          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Start: {project.startDate}</span>
              {project.endDate && <span>End: {project.endDate}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;