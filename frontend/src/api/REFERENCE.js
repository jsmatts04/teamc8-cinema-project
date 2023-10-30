/*
    This file serves as a reference that contains the structures of objects that are related to the backend.
    These are represented as JSON objects, so I am only providing the key names. Ctrl+F if you need
*/


// RESPONSE OBJECTS - Objects you can expect to receive from endpoints.
// ----------------
MOVIE_COVER = { 
    id: 1, 
    title: '', 
    trailerPicture: '', 
    releaseDate: '', 
    filmRating: ''
}

MOVIE_INFO = {
    id: 1,
    title: '',
    synopsis: '',
    category: '',
    actors: '',
    director: '',
    producer: '',
    reviewScore: 1,
    trailerPicture: '',
    trailerVideo: '',
    filmRating: '',
    filmLength: 1,
    releaseDate: '',
    movieStatus: {
        id: 1,
        statusType: ''
    }
}

AUTHENTICATION_RESPONSE = {
    jwtToken: '',
    user: {USER_INFO}
}

USER_INFO = { id, 
    email: '',
    firstName: '', 
    lastName: '',
    userStatus: '', 
    userType: '',
    phoneNumber: '',
    promotionEligibility: true
}

ADDRESS = { 
    id: 1, 
    userId: 1,
    street: '', 
    city: '', 
    state: '', 
    postalCode: ''
}

PAYMENT_CARD = { 
    id: 1,
    userId: 1,
    nameOnCard: '',
    cardNumber: '',
    cardType: '',
    lastFourDigits: ''
}

ALL_USER_INFO = { 
    user: { USER_INFO }, 
    paymentCards: [{PAYMENT_CARD}], 
    address: {ADDRESS}
}

// REQUEST OBJECTS - Objects you should be providing to endpoints.
// ---------------
EDIT_ADDRESS_REQUEST = {
    id: 1,
    street: '',
    city: '',
    state: '',
    postalCode: ''
}

NEW_PAYMENT_CARD_REQUEST = {
    email: '',
    cardType: '',
    expirationDate: '',
    cardNumber: '',
    nameOnCard: ''
}

EDIT_PAYMENT_CARD_REQUEST = {
    id: 1,
    cardType: '',
    expirationDate: '',
    cardNumber: '',
    nameOnCard: '' 
}
