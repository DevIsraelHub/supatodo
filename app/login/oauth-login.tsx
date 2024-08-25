"use client";

import { Button } from "@/components/ui/button"
import { Provider } from "@supabase/supabase-js"
import { Github } from "lucide-react"
import { OAuthSignin } from "./actions";


type OAuthLoginProps = {
  name: Provider,
  displayName: string,
  icon?: JSX.Element,
}

export function OAuthButtons() {
  const oAuthProviders: OAuthLoginProps[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="size-5" />,
    },
  ]

  return <>
    {
      oAuthProviders.map(({ name, displayName, icon }) => (
        <Button
          variant="ghost"
          onClick={async () => {
            await OAuthSignin(name)
          }}
          className="mt-3 md:mt-4 flex items-center justify-center w-full gap-2 py-3 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          {icon} Login with {displayName}
        </Button>
      ))
    }
  </>
}