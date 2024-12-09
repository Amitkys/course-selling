// "use client";
// import { Button } from "@/components/test";
// export default function Test() {
//     async function kys(formData: FormData) {
//         "use server"

//         const rawFormData = {
//             name: formData.get('name'),
//         }
//         console.log(rawFormData);
//     }
//     return (
//         <div>
//             <form action={kys}>
//                 <label htmlFor="name">Enter your name</label> <br />
//                 <input type="text" name="name" id="name" /> <br />
//                 {/* <button disabled={pending} type="submit">add</button> */}
//             </form>
//         </div>
//     )
// }

// import {HelloWorld} from "@/lib/actions/user"
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function InputDemo() {
//   return (
//     <div className="space-y-2">
//       <Label htmlFor="input-06">Input with error</Label>
//       <Input
//         type="email"
//         name="email"
//         id="email"
//       />
//       <p className="mt-2 text-sm text-destructive" role="alert" aria-live="polite">
//         Email is invalidV
//       </p>
//       <button onClick={HelloWorld(6)}>test</button>
//     </div>
//   );
// }

