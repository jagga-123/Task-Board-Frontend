import { useState, useEffect } from "react";
import { loadBoard, saveBoard, addLog, resetBoard } from "../storage";
import ActivityLog from "./ActivityLog";
import { logoutUser } from "../auth";
import TaskModal from "./TaskModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Board() {
  const [board, setBoard] = useState(loadBoard());
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => saveBoard(board), [board]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const from = result.source.droppableId;
    const to = result.destination.droppableId;

    const task = board[from][result.source.index];

    setBoard({
      ...board,
      [from]: board[from].filter((_, i) => i !== result.source.index),
      [to]: [...board[to], task],
    });

    addLog("Task moved");
  };

  const saveTask = (task) => {
    if (editTask) {
      const col = editTask.col;
      setBoard({
        ...board,
        [col]: board[col].map((t) => (t.id === task.id ? task : t)),
      });
      addLog("Task edited");
    } else {
      setBoard({ ...board, Todo: [...board.Todo, task] });
      addLog("Task created");
    }
    setEditTask(null);
  };

  const deleteTask = (task, col) => {
    setBoard({ ...board, [col]: board[col].filter((t) => t.id !== task.id) });
    addLog("Task deleted");
  };

  const filteredTasks = (tasks) => {
    return tasks
      .filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((t) =>
        priorityFilter ? t.priority === priorityFilter : true
      )
      .sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Board</h2>

      <button onClick={() => setShowModal(true)}>New Task</button>
      <button onClick={() => { logoutUser(); location.reload(); }}>
        Logout
      </button>

      <button
        onClick={() => {
          if (confirm("Reset board?")) {
            resetBoard();
            location.reload();
          }
        }}
      >
        Reset Board
      </button>

      <div style={{ marginTop: 10 }}>
        <input
          placeholder="Search task..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          {Object.keys(board).map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ border: "1px solid black", padding: 10, width: 250 }}
                >
                  <h3>{col}</h3>

                  {filteredTasks(board[col]).map((task, index) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            border: "1px solid gray",
                            margin: 5,
                            padding: 5,
                            background: "white",
                          }}
                        >
                          <b>{task.title}</b>
                          <br />
                          <small>{task.priority}</small>
                          <br />

                          <button
                            onClick={() => {
                              setEditTask({ ...task, col });
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </button>

                          <button onClick={() => deleteTask(task, col)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <ActivityLog />

      {showModal && (
        <TaskModal
          existing={editTask}
          onSave={saveTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
