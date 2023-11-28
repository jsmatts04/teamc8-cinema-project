/*
    This file serves as a reference that contains the structures of objects that are related to the backend.
    These are represented as JSON objects, so I am only providing the key names. Ctrl+F if you need
*/

// ENUMS
TICKET_TYPE_ENUM = {
    1: 'Child',
    2: 'Adult',
    3: 'Senior'
}

// RESPONSE OBJECTS - Objects you can expect to receive from endpoints.
// ----------------
MOVIE_COVER = { 
    id: 1, 
    title: '', 
    trailerPicture: '', 
    releaseDate: '', 
    filmRating: '',
    movieStatus: ''
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

USER_INFO = { 
    id: 1, 
    email: '',
    firstName: '', 
    lastName: '',
    userStatus: '', 
    userType: '',
    phoneNumber: '',
    promotionEligibility: true
}

PROMOTION_INFO = {
    id: 1,
    discountAmount: 1,
    startDate: '2023-11-25',
    endDate: '2023-11-25',
    code: 'ABCD'
}

SEAT_INFO = {
    id: 1,
    seatNum: 1,
    seatRow: 'A',
    reserved: false,
    showtime: SHOWTIME_INFO
}

TICKET_INFO = {
    id: 1,
    type: '',
    seat: SEAT_INFO
}

ROOM_INFO = {
    id: 1,
    numSeats: 1
}

SHOWTIME_INFO = {
    id: 1,
    timestamp: '2023-11-25T12:00:00',
    room: ROOM_INFO,
    movie: MOVIE_INFO
}

BOOKING_INFO ={
    id: 1,
    userEmail: '',
    showtime: SHOWTIME_INFO,
    paymentCardLastFourDigits: 1,
    promotion: PROMOTION_INFO,
    total: 1.50,
    date: '2023-11-25'
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

NEW_BOOKING_REQUEST = {
    showtimeId: 1,
    paymentCardId: 1,
    promotionId: 1,
    total: 1.50,
    date: "2023-11-25"
}

NEW_TICKET_REQUEST = {
    bookingId: 1,
    seatId: 1,
    typeId: 1
}