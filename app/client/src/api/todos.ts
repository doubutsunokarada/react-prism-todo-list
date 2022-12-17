import { Todo } from "../@types";
import axios from "axios";

const todoDataUrl = "http://localhost:3001"

export const getAllTodosData = async () => {
  const response = await axios.get(`${todoDataUrl}/todos`);
  console.log(response.data);
  return response.data;
};

export const addTodoData = async (todo: Todo) => {
  const response = await axios.post(`${todoDataUrl}/todos`, todo);
  return response.data;
};

export const deleteTodoData = async (id: string) => {
  const response = await axios.delete(`${todoDataUrl}/todos/${id}`);
  return response.data.id;
};

export const updateTodoData = async (id: string, todo: Todo) => {
  const response = await axios.put(`${todoDataUrl}/todos/${id}`, todo);
  return response.data;
};
