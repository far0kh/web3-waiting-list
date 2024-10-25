import { SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { MdLeaderboard } from "react-icons/md";
import Link from "next/link";

export default function Header() {
  return (
    <header className='p-4'>
      <nav className='max-w-6xl mx-auto flex items-center justify-between'>
        <div className="flex gap-5 item-center">
          <Link href="https://www.tezuka.xyz" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src="/logo.webp" className="h-8" alt="Tezuka Logo" />
            <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tezuka</span>
          </Link>
          <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <span className="self-center text-xl font-semibold whitespace-nowrap hover:text-green-600 dark:hover:text-green-600 mt-1 border-b-2 border-green-600">Waitlist</span>
          </Link>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <SignedOut>
            <SignUpButton>
              <Button
                size='lg'
                className="text-white bg-green-600 hover:bg-green-700 rounded"
              >Join Waitlist</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            {/* <Link href="/leaderboard" className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="md:hidden self-center text-2xl whitespace-nowrap dark:text-white"><MdLeaderboard /></span>
              <span className="hidden md:block self-center text-xl font-semibold whitespace-nowrap text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200">Leaderboard</span>
            </Link> */}
            <UserButton
              appearance={{
                layout: {
                  logoPlacement: "none",
                },
                elements: {
                  userButtonAvatarBox: "h-9 w-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}