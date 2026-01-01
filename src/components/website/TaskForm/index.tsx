import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Task } from "../../../redux/features/task/tasksSlice";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import {
  createTask,
  updateTask,
} from "../../../redux/features/task/tasksSlice";
import projectAPI from "../../../redux/api/project";

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

interface Project {
  _id: string;
  name: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useAppDispatch();
  const [projects, setProjects] = useState<Project[]>([]); // local state for projects
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await projectAPI.getProjects(); // call API
        console.log("project response :", response);
        setProjects(response.data.data); // adjust based on API shape
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      projectId: task?.projectId || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      projectId: Yup.string().required("Project ID is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (task) {
          await dispatch(updateTask({ id: task.id, data: values }));
        } else {
          await dispatch(createTask(values));
        }
        onClose();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full h-25 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Project</label>
            <select
              name="projectId"
              value={formik.values.projectId}
              onChange={formik.handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loadingProjects}
            >
              <option value="">Select a project</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
