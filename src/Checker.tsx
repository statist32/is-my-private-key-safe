import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./components/ui/alert-dialog"


async function incrementCounter(retries = 3) {
    const url = `${import.meta.env.VITE_SERVER_URL}/increment`

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, { method: 'POST' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            return text;
        } catch (error) {
        }
    }
}

function Checker({ setRefetch }: { setRefetch: (a: boolean) => void; }) {
    const [key, setKey] = useState("")

    return (
        <AlertDialog>
            <div className="max-w-2xl mx-auto mt-12">
                <Card className="shadow-lg border-2 border-slate-200 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Enter Your Private Key
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="Paste your private key here..."
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="min-h-[200px] text-base p-4 rounded-xl border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-400 shadow-inner resize-none"
                        />
                        <div className="flex justify-center mt-6">
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" disabled={key.length === 0} onClick={() => { incrementCounter(); setRefetch(true) }}>Check My Key</Button>
                            </AlertDialogTrigger>
                        </div>
                    </CardContent>
                </Card>
            </div>


            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Your key is compromised!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your key has been compromised.
                        We strongly recommend that you stop using this key immediately due to security concerns.
                        Please refer to this guide on <a className="underline" href="https://www.geeksforgeeks.org/computer-networks/how-to-manage-ssh-keys/" target="_blank">best practices to handle ssh keys</a>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Thanks</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>




    )
}


export default Checker