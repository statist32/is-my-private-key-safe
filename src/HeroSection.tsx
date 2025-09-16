import { useEffect, useState } from "react";

interface HeroSectionProps {
    heading?: string;
    description?: string;
    refetch: boolean;
    setRefetch: (a: boolean) => void;
}

async function getCounter(retries = 3): Promise<number> {
    const url = `${import.meta.env.VITE_SERVER_URL}/checks`

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, { method: "GET" })
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            const text = await response.text()
            const value = parseInt(text, 10)
            return value
        } catch (error) {
        }
    }
    return 0 // fallback
}

const HeroSection = ({
    heading = "Is your private key safe?",
    description = "Millions of private keys have already been exposed and are publicly accessible. Our super-secure Private Key Checker instantly verifies if yours is at risk.",
    refetch,
    setRefetch
}: HeroSectionProps) => {
    const [counter, setCounter] = useState<number | null>(11)
    const [iniitalFetchFinished, setInitialFetchFinished] = useState(false);

    useEffect(() => {
        if (refetch || !iniitalFetchFinished) {
            getCounter()
                .then((value) => {
                    setCounter(value)
                    setInitialFetchFinished(true)
                    setRefetch(false)
                })
                .catch((err) => console.error("Failed to fetch counter:", err))
        }
    }, [refetch])
    return (
        <section className="pt-32 flex flex-row justify-center items-center">
            <div className="container text-center">
                <div className="mx-auto flex max-w-5xl flex-col gap-6">
                    <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
                    <p className="text-muted-foreground text-balance lg:text-lg">
                        {description}
                    </p>
                </div>
                <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">

                    <div>
                        <h2 className="text-muted-foreground text-left font-bold">
                            {counter} keys have been checked until now.
                        </h2>
                    </div>
                </div>
            </div>
        </section >
    );
};

export { HeroSection };

