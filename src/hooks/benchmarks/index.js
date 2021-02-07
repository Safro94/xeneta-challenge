import { createContext, useContext, useReducer } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';

import groupByMarketPosition from 'utils/groupBy';

const SET_GRAPH_DATA = 'SET_GRAPH_DATA';
const SET_DATES_PERIOD = 'SET_DATES_PERIOD';

const initialState = {
	data: {
		labels: [],
		types: {},
		hasElements: false,
		renderGraph: false,
	},
	period: {
		departureDate: null,
		returnDate: null,
	},
};

const BenchmarksContext = createContext(initialState);

const useBenchmarks = () => {
	const [benchmarks, setBenchmarks] = useContext(BenchmarksContext);

	const validateDatePeriod = (day, dates) => {
		return isWithinInterval(new Date(day), {
			start: new Date(dates.departureDate),
			end: new Date(dates.returnDate),
		});
	};

	const getData = (data, dates) =>
		data.filter(item => {
			if (validateDatePeriod(item.day, dates)) {
				return item;
			}

			return false;
		});

	const setGraphData = (data, dates) => {
		const itemsInDateRange = getData(data, dates);
		const labels = itemsInDateRange?.map(item => item.day);

		if (!itemsInDateRange.length) {
			const graphData = {
				hasElements: false,
				renderGraph: true,
			};

			setBenchmarks({ type: SET_GRAPH_DATA, value: graphData });
		} else {
			const types = groupByMarketPosition(itemsInDateRange);

			const graphData = {
				types,
				labels,
				renderGraph: true,
				hasElements: true,
			};

			setBenchmarks({ type: SET_GRAPH_DATA, value: graphData });
		}
	};

	const setPeriod = dates => {
		setBenchmarks({ type: SET_DATES_PERIOD, value: dates });
	};

	return { ...benchmarks, setGraphData, setPeriod };
};

const BenchmarksProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case SET_GRAPH_DATA:
				return { ...state, data: { ...state.data, ...action.value } };
			case SET_DATES_PERIOD:
				return { ...state, period: { ...state.period, ...action.value } };
			default:
				return state;
		}
	};

	return (
		<BenchmarksContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</BenchmarksContext.Provider>
	);
};

export { useBenchmarks, BenchmarksProvider };
