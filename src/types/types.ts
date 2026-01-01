export type TaskStatus = "OPEN" | "IN_PROGRESS" | "EXPIRED" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assignedTo?: string | null;
  claimedAt?: string | null;
  expiresAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskPayloadProps = {
  taskId: string;
};

export type AddNewTaskPayload = {
  title: string;
  description: string;
  projectId: string;
};

export type UserPayloadProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export interface CreateTaskPayload {
  title: string;
  description: string;
  projectId: string;
}

export interface UpdateTaskPayload {
  id: string;
  data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>;
}
