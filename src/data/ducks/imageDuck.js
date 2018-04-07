// Types
const SAVE_IMAGE = 'image/save_image';

// Reducer
const initialState = {
	images: []
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SAVE_IMAGE: {
			return { ...state, images: [...state.images, action.payload] };
		}

		default: {
			return state;
		}
	}
}

// Action creators
export function saveImage(image) {
	return { type: SAVE_IMAGE, payload: image };
}
