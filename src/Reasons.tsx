import { LockOpen, SearchCheck, Timer, Zap, ZoomIn } from "lucide-react";

const Reasons = () => {
    return (
        <section className="m-16 flex flex-row justify-center items-center">
            <div className="container">
                <h2 className="text-3xl font-medium lg:text-4xl">Why Choose Us?</h2>
                <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
                    <div className="rounded-lg bg-accent p-5">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <SearchCheck className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Unmatched Accuracy</h3>
                        <p className="leading-7 text-muted-foreground">
                            Our advanced checker guarantees 100% detection of compromised private keys.
                            In short: no false negatives.
                        </p>
                    </div>
                    <div className="rounded-lg bg-accent p-5">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <LockOpen className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Enterprise-Grade Security</h3>
                        <p className="leading-7 text-muted-foreground">
                            We follow industry-leading standards to ensure your private key is handled appropriatly. We work accirdingly to DIN 820-5 and ISO 3103.
                        </p>
                    </div>
                    <div className="rounded-lg bg-accent p-5">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <Zap className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Instant Results</h3>
                        <p className="leading-7 text-muted-foreground">
                            No waiting, no delays. Find out immediately if your private key has been leaked to the public.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Reasons };

