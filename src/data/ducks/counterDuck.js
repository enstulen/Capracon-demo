/*
    README
    This duck is for demonstration purposes only!
*/

// Types
const INCREMENT = 'counter/increment';
const INCREMENT_ASYNC = 'counter/increment_async';
const INCREMENT_ASYNC_PENDING = 'counter/increment_async_PENDING';
const INCREMENT_ASYNC_FULFILLED = 'counter/increment_async_FULFILLED';
const DECREMENT = 'counter/decrement';

// Reducer
const initialState = {
	counter: 0,
	isLoading: false
};

export default function reducer(state = initialState, action = {}) {
	// Set loading to true if an action containe _PENDING
	if (action.type.includes('_PENDING')) {
		return { ...state, isLoading: true };
	}

	switch (action.type) {
		case INCREMENT: {
			return { ...state, counter: state.counter + 1 };
		}

		case INCREMENT_ASYNC_FULFILLED: {
			return { ...state, counter: state.counter + 1, isLoading: false };
		}

		case DECREMENT: {
			return { ...state, counter: state.counter - 1 };
		}

		default: {
			return state;
		}
	}
}

// Action creators
export function increment() {
	return { type: INCREMENT };
}

export function decrement() {
	return { type: DECREMENT };
}

// Simulate a slow API call
const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

// Exampe of what an async action could look like
export function incrementAsync() {
	return {
		type: INCREMENT
	};
}
