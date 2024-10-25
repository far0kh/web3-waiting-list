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
import { useToast } from "@/hooks/use-toast"
import { Icons } from '@/components/Icons'
import { useEffect, useState } from "react"
import Link from "next/link";

const runConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const shareItLink = `https://x.com/intent/post?text=%F0%9F%8E%89%0AI+have+just+joined+the+%40CineCrowd_xyz+waiting+list%21%0ADon%27t+miss+out+on+exclusive+offers+and+airdrops.%0A%0ACineCrowd+is+a+SocialFi+project+for+cinema+lovers+on+Bitcoin.%0A%0AClick+to+see+more%3A+&url=https%3A%2F%2Fwww.cinecrowd.xyz%2F%0A%0A&hashtags=Bitcoin%2COrdinals%2CRunes`

const FormSchema = z.object({
  address: z.string().toLowerCase().startsWith("0x", {
    message: "Please enter a valid address.",
  }).min(42, {
    message: "Please enter a valid address.",
  }).max(62, {
    message: "Please enter a valid address.",
  }),
})

interface Props {
  email: string
}

export function SubmitAddress(props: Props) {
  const { toast } = useToast()

  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    findUser(props.email)
  }, []);

  const findUser = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/${email}`);
      const data = await res.json();
      setAddress(data.user.address);
      form.reset(data.user);
    } catch (error) {
      // console.log(error);
      createUser(email);
      setInvitedBy(email);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (email: string) => {
    setIsLoading(true);
    try {
      await fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, address: '' }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setInvitedBy = async (email: string) => {
    setIsLoading(true);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        if (localStorage.getItem("invitedBy")) {
          await fetch('/api/user/invited', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, invitedBy: localStorage.getItem("invitedBy") }),
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: address!,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await fetch('/api/user/submit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: props.email, newAddress: data.address }),
      });
      setAddress(data.address);
      runConfetti();
      toast({
        title: "Thank you!",
        description: (
          <pre className="mt-1 w-auto rounded-md">
            <code>
              {address ? 'Your address has been updated successfully.' : 'You have successfully joined.'}
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
        Please enter your EVM Wallet Address
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size='lg'
            className="text-white bg-orange-500 hover:bg-orange-600 rounded text-lg font-semibold w-[133px] h-[46px] mx-2"
          >
            {isLoading ? (<Icons.spinner className='size-4.5 animate-spin' />) :
              address ? 'Update' : 'Submit'}
          </Button>
          {/* To Do */}
          {false && !isLoading && <Link href='/twitter'
            style={{
              pointerEvents: address ? "auto" : "none",
            }}
          >
            <Button
              type="button"
              size='lg'
              disabled={!address}
              className="text-gray-700 dark:text-gray-300 bg-transparent hover:bg-transparent border-2 border-gray-700 hover:border-gray-500 rounded text-lg font-semibold w-[133px] h-[46px] mx-2"
            >
              Boost 🚀
            </Button>
          </Link>}
        </form>
      </Form>
    </div>
  )
}
