import ShowAllTeacher from "@/components/ui/teachers/showAllTeacher";
import { getTeacher } from "@/lib/actions/action";
import { Suspense } from "react";


export default async function Teacher() {
  const teachers = await getTeacher();
  return (
    <Suspense fallback={<div>Loading teachers...</div>}>
      <ShowAllTeacher teachers={teachers}></ShowAllTeacher>
    </Suspense>
  );
}
