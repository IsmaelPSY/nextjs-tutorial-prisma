"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least characters.",
  }),
  description: z.string()
})

export default function TodoForm({ initialData }) {

  const { toast } = useToast()
  
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const toastMessage = initialData ? "Guardado!!! :D" : "Creado!!! :D"
  const action = initialData ? "Guardar" : "Crear"

  const defaultValues = initialData ? initialData : {
    title: "",
    description: ""
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  async function onSubmit(values) {
    try {
      setLoading(true)

      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type" : "application/json"
        }
      })

      const data = await res.json()
      toast({
        variant: "success",
        title: toastMessage,
      })

      router.push("/")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo salio mal :(",
        description: "Intentalo de nuevo"
      })
      console.log({ error })
    } finally {
      setLoading(false)

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/4 bg-slate-200 p-5 rounded-xl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type="submit"
        >
          {loading &&
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          }
          {action}
        </Button>
      </form>
    </Form>
  )
}
