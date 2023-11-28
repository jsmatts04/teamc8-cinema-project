import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getBookingsForUser } from './api/BookingApi';

const columns = [
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
  },
  {
    name: 'Movie Title',
    selector: 'showtime.movieTitle', // Assuming 'showtime' has 'movieTitle' property
    sortable: true,
  },
  {
    name: 'Order Total',
    selector: 'total',
    sortable: true,
    cell: (row) => `$${row.total.toFixed(2)}`, // Format total as currency
  },
  {
    name: 'Booking Confirmation #',
    selector: 'id',
    sortable: true,
  },
];

const OrderHistory = () => {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    getBookingsForUser()
        .then((response) => {
          setUserBookings(response.data); // Assuming API response returns user bookings
          console.log('User Bookings:', response.data);
        })
        .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  const tableStyles = {
    backgroundColor: '#444',
  };

  const headerRowStyles = {
    backgroundColor: '#333',
    color: '#fff',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    paddingTop: '20px',
    paddingBottom: '250px',
  };

  const tableContainerStyle = {
    width: '80%', // Adjust the table width as needed
    maxHeight: '600px',
  };

  const titleStyle = {
    color: '#fff',
    textAlign: 'center',
  };

  return (
      <div style={containerStyle}>
        <div style={tableContainerStyle}>
          <h2 style={titleStyle}>Order History</h2>
          <DataTable
              columns={columns}
              data={userBookings} // Use fetched user bookings as data
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20]}
              theme="dark"
              customStyles={{
                rows: {
                  style: tableStyles,
                },
                headRow: {
                  style: headerRowStyles,
                },
              }}
          />
        </div>
      </div>
  );
};

export default OrderHistory;
