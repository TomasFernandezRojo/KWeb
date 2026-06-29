const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const Anthropic = require('@anthropic-ai/sdk')
const fs = require('fs')
const path = require('path')
const pino = require('pino')

const MY_NUMBER = '5491130720743'
const MY_JID = MY_NUMBER + '@s.whatsapp.net'
const AUTH_PATH = path.join(__dirname, '.baileys_auth')
const PENDING_PATH = path.join(__dirname, 'pending_responses.json')

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Sos el asistente de ventas de KWebs, agencia de desarrollo web argentina.
Respondés en nombre de Tomas y Santiago (18 años, fundadores).

SERVICIOS Y PRECIOS:
- Web profesional completa: $300.000 ARS — lista en 7 días
- Mantenimiento mensual: $45.000 ARS/mes
- Incluye diseño moderno, dominio, hosting, adaptado a celular y contacto directo

TONO:
- Amigable, respetuoso, sin presionar nunca
- Respuestas cortas (máx 3-4 líneas)
- Si preguntan precio: darlo directamente y sin rodeos
- Si ya tienen web y no les interesa: agradecer amablemente y cerrar bien
- Si muestran interés: proponer agendar una llamada o videollamada para mostrar ejemplos del portfolio
- Si preguntan quiénes son: "Somos Tomas y Santiago, tenemos 18 años y nos dedicamos al desarrollo web"
- No inventar información que no esté en este contexto`

function loadPending() {
  if (!fs.existsSync(PENDING_PATH)) return []
  return JSON.parse(fs.readFileSync(PENDING_PATH, 'utf8'))
}

function savePending(data) {
  fs.writeFileSync(PENDING_PATH, JSON.stringify(data, null, 2))
}

async function generateResponse(message, name) {
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `${name} dice: "${message}"` }]
  })
  return res.content[0].text
}

async function main() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_PATH)

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' })
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode
      if (code !== DisconnectReason.loggedOut) {
        console.log('Reconectando...')
        main()
      } else {
        console.log('Sesión cerrada. Corré de nuevo para escanear QR.')
      }
    } else if (connection === 'open') {
      console.log('✅ Bot conectado. Escuchando mensajes entrantes...')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return

    for (const msg of messages) {
      if (!msg.message) continue

      const jid = msg.key.remoteJid
      const fromMe = msg.key.fromMe
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
      if (!text) continue

      // Mensaje de aprobación — Tomas respondió en el chat "Mensajes para mí mismo"
      if (fromMe && jid === MY_JID) {
        const pending = loadPending()
        if (pending.length === 0) continue

        const lower = text.toLowerCase().trim()
        const next = pending[0]

        let toSend
        if (lower === 'ok') {
          toSend = next.suggested
        } else if (lower === 'skip') {
          pending.shift()
          savePending(pending)
          const remaining = pending.length
          await sock.sendMessage(MY_JID, {
            text: `⏭ Saltado.\n${remaining > 0 ? `📬 Quedan ${remaining} pendientes.` : '📭 No hay más pendientes.'}`
          })
          continue
        } else {
          // Tomas escribió su propia respuesta
          toSend = text
        }

        await sock.sendMessage(next.jid, { text: toSend })
        pending.shift()
        savePending(pending)

        const remaining = pending.length
        await sock.sendMessage(MY_JID, {
          text: `✅ Enviado a *${next.name}*\n${remaining > 0 ? `📬 Quedan ${remaining} pendientes.` : '📭 No hay más pendientes.'}`
        })
        continue
      }

      // Mensaje entrante de un prospecto
      if (!fromMe && jid !== MY_JID) {
        const name = msg.pushName || jid.replace('@s.whatsapp.net', '')
        console.log(`📩 ${name}: "${text}"`)

        try {
          const suggested = await generateResponse(text, name)

          const pending = loadPending()
          pending.push({ jid, name, message: text, suggested, timestamp: new Date().toISOString() })
          savePending(pending)

          const notification =
            `📩 *${name}* dice:\n"${text}"\n\n` +
            `💬 *Sugerida:*\n${suggested}\n\n` +
            `_• "ok" → enviar esta respuesta\n• "skip" → saltarla\n• Cualquier otro texto → enviarlo como respuesta_`

          await sock.sendMessage(MY_JID, { text: notification })
          console.log(`💬 Sugerencia enviada para aprobar`)
        } catch (err) {
          console.error('Error Claude:', err.message)
        }
      }
    }
  })
}

main()
