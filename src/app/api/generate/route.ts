import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = 'gpt-3.5-turbo' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt requerido' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY no configurada' }, { status: 503 })
    }

    return NextResponse.json({ 
      text: `[Demo] Generado con modelo ${model}. Prompt recibido: ${prompt.substring(0, 50)}...` 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error generando respuesta' }, { status: 500 })
  }
}
