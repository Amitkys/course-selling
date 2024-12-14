"use client";
import { UserType } from "@/lib/definitions";
import { makeAdmin, removeAdmin } from "@/lib/actions/user";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ShowAllUser({ data }: { data: UserType[] }) {
  const [pending, setPending] = useState<{ [key: string]: boolean }>({});

  const handleAction = async (id: string, action: "make" | "remove") => {
    setPending((prev) => ({ ...prev, [id]: true }));
    try {
      if (action === "make") {
        await makeAdmin(id);
      } else {
        await removeAdmin(id);
      }
    } finally {
      setPending((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
      <div>
          <h1 className="text-lg font-bold mb-4 ml-2">Registered users</h1>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>Roll</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {data.map((user: UserType) => (
                      <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name.split(" ")[0]}</TableCell>
                          <TableCell>{user.emailWithRoll.rollNumber}</TableCell>
                          <TableCell className="text-right">
                              {user.isSuperAdmin ? (
                                  // SuperAdmin case: Show disabled button
                                  <Button className="px-4 py-2 min-w-[140px]" disabled>
                                      Remove Admin
                                  </Button>
                              ) : user.isAdmin ? (
                                  // Admin case: Show button with action for "Remove Admin"
                                  <Button
                                      className=" min-w-[140px]"
                                      disabled={pending[user.id]}
                                      onClick={() => handleAction(user.id, "remove")}
                                  >
                                      {pending[user.id] ? "Processing..." : "Remove Admin"}
                                  </Button>
                              ) : (
                                  // Non-admin case: Show button for "Make Admin"
                                  <Button
                                      className=" min-w-[140px]"
                                      disabled={pending[user.id]}
                                      onClick={() => handleAction(user.id, "make")}
                                  >
                                      {pending[user.id] ? "Processing..." : "Make Admin"}
                                  </Button>
                              )}
                          </TableCell>

                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </div>
  );
}

// export default function ShowAllUser({data} : {data: UserType[]}){
//     const {pending} = useFormStatus();
//     return (
//         <div>
//             {data.map((user: UserType) => (
//                 <div key={user.id}>
//                     <div>{user.name}</div>
//                     <div>{user.email}</div>

//                     <form action={user.isAdmin ? removeAdmin: makeAdmin} >
//                         <input type="hidden" name="id" value={user.id} />
//                         <button type="submit">
//                             {user.isAdmin ? "Remove Admin" : "Make Admin"}
//                         </button>
//                     </form>

//                 </div>
//             ))}
//         </div>
//     )
// }