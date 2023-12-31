
import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { homeConfig } from "@/config/home";
import MainNav from "@/components/main-nav";
import signw from "../../public/singnw.png";
import signb from "../../public/signb.png";
import Image from "next/image";
import { ModeToggle } from "@/components/modeToggle";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="container z-40 bg-background border-b-2 py-2">
            <div className="flex justify-between items-center space-x-3">
              <MainNav items={homeConfig.mainNav} />
              <nav>
                <Link href="/">
                  <Image
                    src={signw}
                    className="h-fit w-fit dark:inline-block hidden"
                    alt="sign"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src={signb}
                    className="h-fit w-fit dark:hidden inline-block"
                    alt="sign"
                  />
                </Link>
              </nav>

              <div>
                <ModeToggle />
              </div>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
