'use client';

import { useUser } from '@clerk/nextjs'
import { SubmitAddress } from './SubmitAddress';

const WelcomeWaitlist = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-10 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
          </h1>
          <SubmitAddress email={user.emailAddresses[0]?.emailAddress as string} />
        </div>
      </section>
    </>
  );
}

export default WelcomeWaitlist