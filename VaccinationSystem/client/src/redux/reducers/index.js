import { combineReducers } from "redux";
import { hospitalListReducer, hospitalVaccinesReducer } from "./hospitalReducers";
import { appointmentCreateReducer, appointmentListReducer } from "./appointmentReducers";

export default combineReducers({
  hospitalList:      hospitalListReducer,
  hospitalVaccines:  hospitalVaccinesReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentList:   appointmentListReducer,
});
