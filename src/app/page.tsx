'use client'

import { useState, useEffect } from 'react'
import { Bot, Github, Rocket, ShieldCheck } from 'lucide-react'

interface Project {
  name: string
  type: string
  status: string
  instructions: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [name, setName] = useState('')
  const [type, setType] = useState('Chatbot')
  const [instructions, setInstructions] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai-projects')
      if (saved) {
        setProjects(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error reading projects from localStorage', error)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem('ai-projects', JSON.stringify(projects))
  }, [projects, isLoaded])

  const addProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !instructions) return

    setProjects((prev) => [
      ...prev,
      { name, type, status: 'Borrador', instructions },
    ])

    setName('')
    setInstructions('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <Bot className="text-blue-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold">AI Deployment Hub</h1>
              <p className="text-sm text-slate-500">Panel de control para crear y desplegar apps con IA</p>
            </div>
          </div>
          <a
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white"
            href="https://github.com/geovanniconstantino084-cmyk/ai-deployment-hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} /> Repositorio
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Proyectos</p>
            <b className="text-3xl">{projects.length}</b>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Estado</p>
            <b className="text-3xl text-emerald-600">Listo</b>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Coste inicial</p>
            <b className="text-3xl text-blue-600">Gratis</b>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <form onSubmit={addProject} className="rounded-xl bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="mb-5 text-xl font-bold">Instrucciones del dueño</h2>

            <label className="mb-1 block text-sm font-medium">Nombre de la app</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full rounded-lg border p-3"
              placeholder="Mi app IA"
            />

            <label className="mb-1 block text-sm font-medium">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mb-4 w-full rounded-lg border p-3"
            >
              <option>Chatbot</option>
              <option>Generador</option>
              <option>Analizador</option>
              <option>Otra</option>
            </select>

            <label className="mb-1 block text-sm font-medium">Instrucciones</label>
            <textarea
              required
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="mb-5 h-32 w-full rounded-lg border p-3"
              placeholder="Describe lo que debe construir la IA..."
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">
              <Rocket size={18} /> Guardar proyecto
            </button>

            <p className="mt-4 flex gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} /> Las claves permanecen en el servidor y nunca se muestran en el panel.
            </p>
          </form>

          <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-5 text-xl font-bold">Tabla de control</h2>

            {projects.length === 0 ? (
              <p className="py-12 text-center text-slate-500">
                Aún no hay proyectos. Escribe las instrucciones del dueño para comenzar.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-sm text-slate-500">
                      <th className="p-3">App</th>
                      <th className="p-3">Tipo</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Instrucciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3">{p.type}</td>
                        <td className="p-3">
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">{p.status}</span>
                        </td>
                        <td className="max-w-xs truncate p-3 text-sm text-slate-500">{p.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  )
}
