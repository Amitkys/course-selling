import { ButtonGroup } from "@/components/ui/buttonGroup"
import FeedbackServer from "@/app/feedback/page"
export default function HomePage() {
  return (
    <>

      <div>
        <ButtonGroup />
      </div>

      <div className="overflow-y-auto scrollbar-hidden ">
        <FeedbackServer />
      </div>

      <div>
        hello
      </div>
    </>
  ) 

}