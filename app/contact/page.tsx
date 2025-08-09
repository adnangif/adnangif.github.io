"use client";

import { FormEvent, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "34094b40-70e0-4ddd-b659-c38fd7ff0e20";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.set("access_key", WEB3FORMS_ACCESS_KEY);
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (!response.ok || !json?.success) {
        const message = json?.body?.message || json?.message || "Something went wrong.";
        throw new Error(message);
      }
      return json as unknown;
    },
    onSuccess: () => {
      toast.success("Message sent successfully.");
      formRef.current?.reset();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to send. Please try again later.";
      toast.error(message);
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("botcheck")) return; // honeypot
    mutation.mutate(formData);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl">Contact</CardTitle>
          <CardDescription>Send me a message. I usually reply within 24 - 48 hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="contact-form" ref={formRef} className="grid gap-6" onSubmit={onSubmit}>
            <input type="hidden" name="subject" value="New message from portfolio contact form" />

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@example.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required placeholder="How can I help you?" rows={6} />
            </div>

            {/* Honeypot field (hidden) */}
            <div style={{ display: "none" }} aria-hidden>
              <Label htmlFor="botcheck">Leave this empty</Label>
              <Input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}


