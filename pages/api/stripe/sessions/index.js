import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { lineItems, paymentMethod, customerData } = req.body
      if (!lineItems.length) {
        return res.status(400).json({ error: 'Bad Request!' })
      }

      let currencyDevider = 1
      if (customerData.currency === 'eur') currencyDevider = 4.6
      if (customerData.currency === 'usd') currencyDevider = 4

      let deliveryPricePLN = 2900
      switch (customerData.shipping.country || customerData.country) {
        case 'US':
          deliveryPricePLN = 15000
          break
        case 'DE':
          deliveryPricePLN = 6000
          break
        case 'ES':
          deliveryPricePLN = 7000
          break
        default:
          deliveryPricePLN = deliveryPricePLN
      }

      const deliveryPrice = Math.round(deliveryPricePLN / currencyDevider)

      const customer = await stripe.customers.create({
        name: customerData.name,
        email: customerData.email,
        address: {
          country: customerData.country,
          city: customerData.city,
          postal_code: customerData.postalCode,
          state: customerData.state,
          line1: customerData.street
        },
        shipping: {
          name: customerData.name,
          address: {
            country: customerData.shipping.country || customerData.country,
            city: customerData.shipping.city || customerData.city,
            postal_code:
              customerData.shipping.postalCode || customerData.postalCode,
            state: customerData.shipping.state || customerData.state,
            line1: customerData.shipping.street || customerData.street
          }
        }
      })

      const session = await stripe.checkout.sessions.create({
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

        // shipping_address_collection: {
        //   allowed_countries: ['US', 'PL', 'DE', 'ES']
        // },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: deliveryPrice,
                currency: customerData.currency
              },
              display_name: 'DHL',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 2
                },
                maximum: {
                  unit: 'business_day',
                  value: 5
                }
              }
            }
          }
        ],
        // shipping_options: [
        //   {
        //     shipping_rate: 'shr_1NcvVqLcxuTTAZuyTKTtzsYf'
        //   }
        // ],
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
