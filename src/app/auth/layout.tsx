import Logo from "@/components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="lg:grid lg:grid-cols-2">

                <div className="bg-purple-950 bg-auth bg-30 bg-no-repeat bg-left-bo flex justify-center">
                    <div className="w-96 py-10 lg:py-20">
                        <Logo />
                    </div>

                </div>

                <div className="p-10 lg:py-28">
                    <div className="max-w-3xl">
                        {children}
                    </div>
                </div>

            </div>
            <ToastNotification />
        </>
    );
}
