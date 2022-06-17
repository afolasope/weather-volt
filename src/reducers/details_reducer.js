import {
  LOAD_CITIES,
  GET_CITY_DETAIL_BEGIN,
  GET_CITY_DETAIL_SUCCESS,
  GET_CITY_DETAIL_ERROR,
  ADD_TO_NOTE,
  DELETENOTE,
  EDITNOTE,
} from '../actions';

export const details_reducer = (state, action) => {
  if (action.type === GET_CITY_DETAIL_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_CITY_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      displayedDetails: action.payload,
      city_error: false,
    };
  }
  if (action.type === GET_CITY_DETAIL_ERROR) {
    return { ...state, isLoading: false, city_error: true };
  }

  if (action.type === LOAD_CITIES) {
    return {
      ...state,
      cities: action.payload.top_cities,
      fav_cities: action.payload.fav_cities,
    };
  }

  // note
  if (action.type === ADD_TO_NOTE) {
    const { id, value, textId } = action.payload;

    if (!state.notes[id] && state.is_editing === false) {
      let tempNote = [
        {
          textId,
          text: value,
        },
      ];
      state.notes[id] = tempNote;
    } else if (state.notes[id] && state.is_editing === false) {
      const note = state.notes[id].find((note) => note.textId === textId);
      if (!note) {
        state.notes[id].push({
          textId: textId,
          text: value,
        });
      }
    } else if (state.notes[id] && state.is_editing === true) {
      let tempNote = state.notes[id].map((item) => {
        if (item.textId === state.edit_id) {
          return { ...item, text: value };
        }
        return item;
      });
      state.notes[id] = tempNote;
    }
    return {
      ...state,
      is_editing: false,
      notes: { ...state.notes },
    };
  }
  if (action.type === DELETENOTE) {
    const { id, textId } = action.payload;
    const tempNote = state.notes[id].filter((item) => {
      return item.textId !== textId;
    });
    return {
      ...state,
      notes: { ...state.notes, [id]: tempNote },
    };
  }
  if (action.type === EDITNOTE) {
    const { editId } = action.payload;
    return {
      ...state,
      is_editing: true,
      edit_id: editId,
    };
  }
  return state;
};

export default details_reducer;
