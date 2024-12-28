import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "mx-auto w-full max-w-sm",
          card: "bg-background rounded-lg shadow-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "text-foreground",
          formFieldLabel: "text-foreground",
          formFieldInput: "bg-background text-foreground",
          footerActionLink: "text-primary hover:text-primary/90",
        },
      }}
    />
  )
}

