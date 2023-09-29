import React from 'react';
import DataTable from 'react-data-table-component';

const data = [
  {
    date: '2023-09-28',
    movieTitle: 'Oppenheimer',
    orderTotal: '$38.96',
    bookingConfirmation: '10056794',
  },
  // Add more data entries as needed
];

const columns = [
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
  },
  {
    name: 'Movie Title',
    selector: 'movieTitle',
    sortable: true,
  },
  {
    name: 'Order Total',
    selector: 'orderTotal',
    sortable: true,
  },
  {
    name: 'Booking Confirmation #',
    selector: 'bookingConfirmation',
    sortable: true,
  },
];

const tableStyles = {
  backgroundColor: '#444', // Dark background color for data rows
};

const headerRowStyles = {
  backgroundColor: '#333', // Dark background color for header row
  color: '#fff', // Text color for header cells
};

function OrderHistory() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '80vh', // Adjust as needed to move the content up
    paddingTop: '20px', // Add padding to the top to move content up
    paddingBottom: '250px'
  };

  const tableContainerStyle = {
    width: '50%', // Adjust the table width as needed
    maxHeight: '600px', // Increase the maximum height of the table
  };

  const titleStyle = {
    color: '#fff', // Text color for the title (white)
    textAlign: 'center', // Center the text horizontally
  };

  return (
    <div style={containerStyle}>
      <div style={tableContainerStyle}>
        <h2 style={titleStyle}>Order History</h2>
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          theme="dark" // Apply dark theme
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
}

export default OrderHistory;
