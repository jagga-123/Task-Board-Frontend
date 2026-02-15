const KEY = "task-board";
const LOG_KEY = "activity-log";

export const loadBoard = () => {
  const data = localStorage.getItem(KEY);
  return data
    ? JSON.parse(data)
    : { Todo: [], Doing: [], Done: [] };
};

export const saveBoard = (board) => {
  localStorage.setItem(KEY, JSON.stringify(board));
};

export const addLog = (msg) => {
  const logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  logs.unshift({ msg, time: new Date().toLocaleString() });
  localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(0, 10)));
};

export const loadLog = () =>
  JSON.parse(localStorage.getItem(LOG_KEY) || "[]");

export const resetBoard = () => {
  localStorage.removeItem(KEY);
  localStorage.removeItem(LOG_KEY);
};