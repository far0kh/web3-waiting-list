"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from '@/components/Icons'
import { useEffect, useState } from "react"
import Link from "next/link";
import { TbNumber1, TbNumber2 } from "react-icons/tb";

const followLink = `https://x.com/intent/user?screen_name=cinecrowd_xyz`
const shareItLink = `https://x.com/intent/post?text=%F0%9F%8E%89%0AI+have+just+joined+the+%40CineCrowd_xyz+waiting+list%21%0ADon%27t+miss+out+on+exclusive+offers+and+airdrops.%0A%0ACineCrowd+is+a+SocialFi+project+for+cinema+lovers+on+Bitcoin.%0A%0AClick+to+see+more%3A+&url=https%3A%2F%2Fwww.cinecrowd.xyz%2F%0A%0A&hashtags=Bitcoin%2COrdinals%2CRunes`

const FormSchema = z.object({
  twitter: z.string().min(1, {
    message: "Please enter a valid twitter.",
  }),
})

interface Props {
  email: string
}

export function TwitterEngagement(props: Props) {

  const [twitter, setTwitter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    findUser(props.email)
  }, []);

  const findUser = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/${email}`);
      const data = await res.json();
      setTwitter(data.user.twitter);
      form.reset(data.user);
    } catch (error) {
      // console.log(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      twitter: twitter!,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await fetch('/api/user/twitter', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: props.email, newTwitter: data.twitter }),
      });
      setTwitter(data.twitter);
      toast({
        title: "well done! keep it up!",
        description: (
          <pre className="mt-1 w-auto rounded-md">
            <code>
              {twitter ? 'The username has been updated successfully.' : 'The username has been saved successfully.'}
            </code>
          </pre>
        ),
      })
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col text-center gap-4 justify-center items-center">
      <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
        Enter your X username (with or without @)
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-center space-x-2">
                  <TbNumber1 size={35} />
                  <FormControl>
                    <Input placeholder="e.g., MyTwitterHandle" className="max-w-52" {...field} />
                  </FormControl>
                  <Button
                    type="submit"
                    size='lg'
                    className="h-[40px]"
                  >
                    {isLoading ? (<Icons.spinner className='size-4.5 animate-spin' />) :
                      twitter ? 'Update' : 'Save'}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <p className='flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border w-full'>
        &#38;
      </p>
      <div className="flex flex-col xs:flex-row gap-4 mt-2">
        <TbNumber2 size={35} />
        <Link href={followLink} target="_blank"
          style={{
            pointerEvents: twitter ? "auto" : "none",
          }}
        >
          <Button
            type="button"
            size='lg'
            disabled={!twitter}
            className="text-gray-700 dark:text-gray-300 bg-transparent hover:bg-transparent border-2 border-gray-700 hover:border-gray-500 rounded text-sm font-semibold w-auto h-[46px]"
          >
            Follow us on X
          </Button>
        </Link>
        <Link href={shareItLink} target="_blank"
          style={{
            pointerEvents: twitter ? "auto" : "none",
          }}
        >
          <Button
            type="button"
            size='lg'
            disabled={!twitter}
            className="text-gray-700 dark:text-gray-300 bg-transparent hover:bg-transparent border-2 border-gray-700 hover:border-gray-500 rounded text-sm font-semibold w-auto h-[46px]"
          >
            Share the Post
          </Button>
        </Link>
      </div>
    </div>
  )
}
