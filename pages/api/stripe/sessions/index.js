import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { lineItems, paymentMethod, customerData } = req.body
      if (!lineItems.length) {
        return res.status(400).json({ error: 'Bad Request!' })
      }
      const customer = await stripe.customers.create({
        description:
          'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
        name: customerData.name,
        email: customerData.email,
        address: {
          country: customerData.country,
          city: customerData.city,
          postal_code: customerData.postalCode
        }
      })

      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card', 'p24', 'blik'],
        payment_method_types: paymentMethod,
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin,
        phone_number_collection: {
          enabled: true
        },
        customer: customer.id,
        invoice_creation: {
          enabled: true
        },

        shipping_address_collection: {
          allowed_countries: ['US', 'PL', 'DE', 'ES']
        },
        // shipping_options: [
        //   {
        //     shipping_rate_data: {
        //       type: 'fixed_amount',
        //       fixed_amount: {
        //         amount: 150,
        //         currency: 'pln'
        //       },
        //       display_name: 'Next day air',
        //       delivery_estimate: {
        //         minimum: {
        //           unit: 'business_day',
        //           value: 1
        //         },
        //         maximum: {
        //           unit: 'business_day',
        //           value: 1
        //         }
        //       }
        //     }
        //   }
        // ],
        shipping_options: [
          {
            shipping_rate: 'shr_1NQxZSLcxuTTAZuyOSeoxWDb'
          }
        ],
        allow_promotion_codes: true
      })
      return res.status(201).json({ session })

      // If using HTML forms you can redirect here
      // return res.redirect(303, session.url)
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message })
    }
  }

  res.setHeader('Allow', 'POST')
  res.status(405).end('Method Not Allowed')
}

export default handler
