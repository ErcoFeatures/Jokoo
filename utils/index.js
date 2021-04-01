import { filter } from "dom-helpers"

export const getRecipientEmail = (users, userLoggedIn) => users?.filter(user => user !== userLoggedIn?.email)[0];

export const isMobileDevice = width => {return  width < 767} ;


