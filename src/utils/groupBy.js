import { marketPositions } from 'constants/marketPositions';

const groupBy = data =>
	data.reduce((accum, item) => {
		if (!accum[marketPositions.low]) accum[marketPositions.low] = [];
		if (!accum[marketPositions.average]) accum[marketPositions.average] = [];
		if (!accum[marketPositions.high]) accum[marketPositions.high] = [];

		accum[marketPositions.low].push({ x: item.day, y: item.low });
		accum[marketPositions.average].push({ x: item.day, y: item.mean });
		accum[marketPositions.high].push({ x: item.day, y: item.high });

		return accum;
	}, {});

export default groupBy;
