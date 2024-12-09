import { getTeacher } from "@/lib/actions/action";
import { Suspense } from "react";

// Server-side TeacherList rendering
async function TeacherList() {
  const teachers = await getTeacher();

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">All Teachers</h1>
      {teachers.length > 0 ? (
        <ul className="space-y-2">
          {teachers.map((teacher) => (
            <li key={teacher.id} className="p-2 border-b">
              <strong>Name:</strong> {teacher.name} | <strong>Email:</strong> {teacher.email}
            </li>
          ))}
        </ul>
      ) : (
        <div>No teachers found.</div>
      )}
    </div>
  );
}

// Main server component using suspense
export default function Teacher() {
  return (
    <Suspense fallback={<div>Loading teachers...</div>}>
      <TeacherList />
    </Suspense>
  );
}
