import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Home, Lightbulb, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full py-6 px-4 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <Home className="h-6 w-6" />
          <span className="text-2xl font-bold">AI Banner Generator</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <SignedOut>
            <Link
              href="#features"
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Features</span>
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <Info className="h-4 w-4" />
              <span>How It Works</span>
            </Link>
          </SignedOut>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="text-white border-white bg-purple-500 bg-opacity-50 hover:bg-white hover:text-purple-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}