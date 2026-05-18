"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function CreateTournament() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("tournaments").insert([
      {
        name,
        location,
        date,
      },
    ])

    setLoading(false)

    if (!error) {
      router.push("/tournaments")
    } else {
      alert(error.message)
    }
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Create Tournament</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Tournament name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Tournament"}
        </button>
      </form>
    </main>
  )
}