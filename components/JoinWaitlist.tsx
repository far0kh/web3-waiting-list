"use client";

import { Button } from '@/components/ui/button'
import { SignUpButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { useEffect } from 'react';

interface Props {
  invitedBy: string
}

const JoinWaitlist = (props: Props) => {
  useEffect(() => {
    localStorage.setItem("invitedBy", props.invitedBy);
  }, [props])

  const { isLoaded, isSignedIn } = useUser()
  if (!isLoaded || isSignedIn) {
    return null
  }

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-10 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Tezuka Waitlist
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Join our limited waitlist for early access and exclusive offers!
          </p>
          <div className="flex flex-col gap-4 justify-center mx-auto">
            <SignedOut>
              <SignUpButton>
                <Button
                  size='lg'
                  className="text-white bg-orange-500 hover:bg-orange-600 rounded text-lg font-semibold"
                >
                  Start
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                size='lg'
                className="text-white bg-orange-500 hover:bg-orange-600 rounded text-lg font-semibold"
              >
                Start
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>
    </>
  );
}

export default JoinWaitlist