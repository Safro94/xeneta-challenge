import { createContext, useContext, useReducer } from 'react';

const SET_GRAPH_DATA = 'SET_GRAPH_DATA';
const SET_DATES_PERIOD = 'SET_DATES_PERIOD';

const initialState = {
	data: [],
	dates: {},
};

const BenchmarksContext = createContext(initialState);

const useBenchmarks = () => {
	const [benchmarks, setBenchmarks] = useContext(BenchmarksContext);

	const setGraphData = data => {
		setBenchmarks({ type: SET_GRAPH_DATA, value: data });
	};

	const setDates = dates => {
		setBenchmarks({ type: SET_DATES_PERIOD, value: dates });
	};

	return { ...benchmarks, setGraphData, setDates };
};

const BenchmarksProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case SET_GRAPH_DATA:
				return { ...state, data: action.value };
			case SET_DATES_PERIOD:
				return { ...state, dates: action.value };
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
