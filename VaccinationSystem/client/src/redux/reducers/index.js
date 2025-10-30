import { combineReducers } from "redux";
import { hospitalListReducer, hospitalVaccinesReducer } from "./hospitalReducers";
import { appointmentCreateReducer, appointmentListReducer } from "./appointmentReducers";
import { userListReducer, currentUserReducer } from "./userReducers";
import { hvListReducer, hvMutateReducer } from "./hvReducers";



export default combineReducers({
  hospitalList:      hospitalListReducer,
  hospitalVaccines:  hospitalVaccinesReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentList:   appointmentListReducer,
  users:             userListReducer,
  currentUser:       currentUserReducer,
  hvList:            hvListReducer,
  hvMutate:          hvMutateReducer,
});
