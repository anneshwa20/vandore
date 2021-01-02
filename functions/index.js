const functions = require('firebase-functions');
const app = require('express')()
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')



app.use(cors({ origin: true}));
app.use(bodyParser.json())




const razorpay = new Razorpay({
	key_id: 'rzp_test_Yw9rV4usIyk5O1',
	key_secret: '4GHCjWdl8Ylpg7YwjrpFqTrw'
})



/* app.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
}) */

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = req.query.total * 1
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})



// - LISTEN COMMAND
exports.api= functions.https.onRequest(app);


//http://localhost:5001/restro-e4874/us-central1/api