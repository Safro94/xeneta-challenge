require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

const app = express();

app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get(
	'/api/ports',
	asyncHandler(async (req, res, next) => {
		try {
			const { data } = await axios.get(`${process.env.API_URL}/ports`, {
				headers: {
					'x-api-key': process.env.API_KEY,
				},
			});

			const formattedData = data.map(item => ({
				code: item.code,
				text: item.name,
			}));

			res.json(formattedData);
		} catch (error) {
			next(error);
		}
	})
);

app.get(
	'/api/rates/:origin/:destination',
	asyncHandler(async (req, res, next) => {
		try {
			const { data } = await axios.get(
				`${process.env.API_URL}/rates?origin=${req.params.origin}&destination=${req.params.destination}`,
				{
					headers: {
						'x-api-key': process.env.API_KEY,
					},
				}
			);

			res.json(data);
		} catch (error) {
			next(error);
		}
	})
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
