import { ButtonGroup } from "@/components/ui/buttonGroup"
import FeedbackServer from "@/app/feedback/page"
import { Suspense } from "react"
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

      <div>
        hello
      </div>
    </>
  ) 

}