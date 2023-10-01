import axios from "axios";
import { API } from "../constants/API";

export const tasksService = {
  get: () => axios.get(API).then(({ data }) => data),
  detele: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),
  post: (task) => axios.post(API, task).then(({ data }) => data),
  put: (id, task) => axios.put(`${API}/${id}`, task).then(({ data }) => data),
};
