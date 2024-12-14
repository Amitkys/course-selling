import { ButtonGroup } from "@/components/ui/buttonGroup"
import FeedbackServer from "@/app/feedback/page"
import { Suspense } from "react"
import PageUsers from "@/app/admin/users/page";
import Teacher from "@/app/teacher/page";

export default function HomePage() {
  return (
    <>

      <div>
        <ButtonGroup />
      </div>

      <div className="overflow-y-auto scrollbar-hidden ">
        <Suspense fallback={<div>Loding</div>}>
          <FeedbackServer />
        </Suspense>
      </div>

      <div className="grid grid-rows-2">
        <PageUsers />
        <div className="border-t ">
          <Teacher></Teacher>
        </div>
      </div>
    </>
  ) 

}