import {Button} from "@/components/ui/button"
export  function ButtonGroup(){ 
    return (
    <div className="flex flex-col items-center justify-center text-right space-y-4 h-screen">
  <Button variant={"secondary"} className="w-[70%]">Home</Button>
  <Button variant={"secondary"} className="w-[70%]">Profile</Button>
  <Button variant={"secondary"} className="w-[70%]">request to be an admin</Button>
  <Button variant={"secondary"} className="w-[70%]">Liked post</Button>
  <Button variant={"secondary"} className="w-[70%]">Disliked post</Button>
  <Button  className="w-[70%]">Create post</Button>
  <Button variant={"destructive"}  className="w-[70%]">Logout</Button>
</div>

    )
}

