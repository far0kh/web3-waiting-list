import { auth } from '@clerk/nextjs/server';
import JoinWaitlist from "@/components/JoinWaitlist";
import WelcomeWaitlist from '@/components/WelcomeWaitlist';

type SearchParams = Promise<{ [key: string]: string | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;
  const invitedBy = searchParams?.r || "";

  const { userId } = await auth()

  if (!userId) {
    return (
      <JoinWaitlist invitedBy={invitedBy} />
    );
  }

  return (
    <WelcomeWaitlist />
  );
}
