// "use client";
export default function Test() {
    async function kys(formData: FormData) {
        "use server"

        const rawFormData = {
            name: formData.get('name'),
        }
        console.log(rawFormData);
    }
    return (
        <div>
        <form action={kys}>
            <label htmlFor="name">Enter your name</label> <br />
            <input type="text" name="name" id="name" /> <br />
            <button type="submit">add</button>
        </form>
        </div>
    )
}
