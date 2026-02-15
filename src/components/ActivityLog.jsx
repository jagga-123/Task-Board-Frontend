import { loadLog } from "../storage";

export default function ActivityLog() {
  const logs = loadLog();
  return (
    <div>
      <h3>Activity Log</h3>
      {logs.map((l, i) => (
        <div key={i}>{l.time} — {l.msg}</div>
      ))}
    </div>
  );
}