import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";
import { query as q } from "faunadb";

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_custormer_id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  


  if (req.method === "POST") {
    // accessing cookies for get user
    const session = await getSession({ req })
    // ! = Non-null assertion operator
    const email = session!.user!.email!

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(email)
        )
      )
    )

    

    let customerId = user.data.stripe_custormer_id

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: String(email),
        // metadata
      })
  
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1M8QelBXifr0D2T0RqHal4jw', quantity: 1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: String(process.env.STRIPE_SUCCESS_URL),
      cancel_url: String(process.env.STRIPE_CANCEL_URL)
    })

    return res.status(200).json({sessionId: stripeCheckoutSession.id})

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }

}