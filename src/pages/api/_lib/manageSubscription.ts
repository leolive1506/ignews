import { query as q } from 'faunadb'
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  // buscar user no faunadb com id (stripe_customerId)
  // salvar os dados da subscription no faunadb
  const userRef = await fauna.query(
    // pegar so um campo do fauna
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_customer_id'),
          customerId
        )
      )
    )
  )

  // mais detalhes subscription user
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  if (createAction) {
    await fauna.query(
      // criar
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    await fauna.query(
      // 2 metodos atualizar registro, update e replace
      // Update atualiza alguns campos, Replace
      // Replace substitui todo registro
      q.Replace( 
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }
}