import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'
import { saveSubscription } from "./_lib/manageSubscription";

// função converte readable stream em string
async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunks === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

// disable o entendimento padrão do next sobre oq vem na req
export const config = {
  api: { 
    bodyParser: false
  }
}

// eventos que importam p app
const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])

export default async function Webhooks (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // ler usando readable
    const buf = await buffer(req)

        const secret = req.headers['stripe-signature'] // campo enviado pelo stripe

    // verificando se valores batem com variaveis ambientes
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      return res.status(400).send(`Webhooks error: ${err.message}`)
    }

    const { type } = event // tipos eventos
    if(relevantEvents.has(type)) {
      // console.log('Evento recebido', event)
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':

            const subscription = event.data.object as Stripe.Subscription
            await saveSubscription(
              subscription.id.toString(), 
              subscription.customer.toString(),
              false
            ) 
            break
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            )
            break;
          default:
            throw new Error('Unhandled event')
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed.'})
      }
    }
    res.json({ received: true })
  } else {
      // falando que so aceita somente metodos post
      res.setHeader('Allow', 'POST')
      res.status(405).end('Method not allowed')
  }
}

