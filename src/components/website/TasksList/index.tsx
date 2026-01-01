import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelector";
import {
  fetchTasks,
  // deleteTask,
} from "../../../redux/features/task/tasksSlice";

import type { Task } from "../../../redux/features/task/tasksSlice";
import DashboardHUD from "../DashboardHUD";
import TaskForm from "../TaskForm";
import type { RootState } from "../../../redux/store";

const POLL_INTERVAL = 6000000; // 50 seconds

const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(
    (state: RootState) => state.tasks
  );

  const userRole = useAppSelector(
    (state: RootState) => state.auth.userData?.role
  );

  const currentUserId = useAppSelector(
    (state: RootState) => state.auth.userData?._id
  );

  console.log(currentUserId);

  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchTasks());

    // Polling interval
    const interval = setInterval(() => {
      dispatch(fetchTasks());
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <DashboardHUD />

      {/* Admin Create Button */}
      {userRole === "ADMIN" && (
        <button
          onClick={() => {
            setModalTask(null);
            setShowModal(true);
          }}
          className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Status:{" "}
                <span
                  className={`font-medium ${
                    task.status === "OPEN"
                      ? "text-green-600"
                      : task.status === "IN_PROGRESS"
                      ? "text-blue-600"
                      : task.status === "COMPLETED"
                      ? "text-gray-400 line-through"
                      : "text-red-600"
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Assigned To:
                {task.assignedTo?.firstname
                  ? `${task.assignedTo.firstname} ${task.assignedTo.lastname}`
                  : "Unassigned"}
              </p>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>

            <div className="mt-4 flex gap-2">
              {/* Admin sees edit and delete */}
              {userRole === "ADMIN" && (
                <>
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm">
                    Delete
                  </button>
                </>
              )}

              {/* All users can claim if task is open */}
              {task.status === "OPEN" && (
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm">
                  Claim
                </button>
              )}
              {task.status === "IN_PROGRESS" &&
                task.assignedTo?._id === currentUserId && (
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-sm"
                    // onClick={() =>
                    //   dispatch(
                    //     updateTask({
                    //       id: task.id,
                    //       data: { status: "COMPLETED" },
                    //     })
                    //   )
                    // }
                  >
                    Complete
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <TaskForm
          task={modalTask ?? undefined}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TasksList;
