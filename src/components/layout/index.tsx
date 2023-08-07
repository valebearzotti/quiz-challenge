import Header from "@/components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 items-center">
                <div className="container flex flex-col items-center gap-6 px-4 py-16">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Layout;