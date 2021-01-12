const functions = require('firebase-functions');
const app = require('express')()
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')
const unirest= require('unirest');
const nodemailer= require('nodemailer');
var request = unirest("POST", "https://www.fast2sms.com/dev/bulk");



app.use(cors({ origin: true}));
app.use(bodyParser.json())


request.headers({
	authorization: '6ohvTa8gpjsAdEJCrHOkZn245XuKmSc703UwifeIqMDtPVl1FQsIoz6X9l3Jy4qmTx0MABD7kLtQRfGa'
  });


const razorpay = new Razorpay({
	key_id: 'rzp_test_Yw9rV4usIyk5O1',
	key_secret: '4GHCjWdl8Ylpg7YwjrpFqTrw'
})



 
   var transporter = nodemailer.createTransport({
	host: "smtp-pulse.com",
	port: 2525,
	auth: {
	  user: "vandoreofficial@gmail.com",
	  pass: "pEcSkMiPp7624"
	}
  });   

  /* var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		   user: 'vandoreofficial@gmail.com',
		   pass: 'il0vemyc0untry119424'
	   }
   }) */
  
  // verifying the connection configuration
  transporter.verify(function(error, success) {
	if (error) {
	  console.log(error);
	} else {
	  console.log("Server is ready to take our messages!");
	}
  });
  
  
  app.post('/orderEmail', async (req, res) => {
	 
	var email = req.query.email
	var message = req.query.message
	var business= req.query.business
	var subject= req.query.subject
  
	var mail = {
	  from: `${business} <web@vandore.in>`, 
	  to: email, 
	  subject: subject,
	  text: message
	}
  
   await transporter.sendMail(mail, (err, data) => {
	
	  if (err) {
		res.json({
		  status: 'fail',
		  err: err
		})
	
	  } else {
		res.json({
		 status: 'success'
		})
	
	  }
	})
  })



  app.post('/feedbackEmail', async (req, res) => {
	 
	var email = req.query.email
	var message = req.query.message
	var business= req.query.business
	var subject= req.query.subject
  
	var mail = {
	  from: `${business} <web@vandore.in>`, 
	  to: email, 
	  subject: subject,
	  text: message
	}
  
   await transporter.sendMail(mail, (err, data) => {
	
	  if (err) {
		res.json({
		  status: 'fail',
		  err: err
		})
	
	  } else {
		res.json({
		 status: 'success'
		})
	
	  }
	})
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

app.post("/orderSMS", (req, res) => {
	request.form({
		"sender_id": "FSTSMS",
		"message": req.query.message,
		"language": "english",
		"route": "p",
		"numbers": req.query.phone,
	  });
	  
	  request.end(function (res) {
		if (res.error) throw new Error(res.error);
	  
		
	  });

      res.status(200).json({
		  status: 'success'
	  })
	  
  });









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