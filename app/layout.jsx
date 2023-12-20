import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "Kinder",
    description: "Filtered Social Media",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}
