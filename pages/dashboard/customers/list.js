import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { Col, Row, Card, Button, Modal, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const fetchCustomers = async () => {
  try {
    const response = await fetch('/api/getCustomers');
    if (!response.ok) throw new Error('Failed to fetch customers');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

const ViewCustomers = () => {
  // State to manage data and modal visibility
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const getCustomers = async () => {
      const customerData = await fetchCustomers();
      setData(customerData);
      setFilteredData(customerData); // Initialize filtered data
    };
    getCustomers();
  }, []);

  // Filter customers based on search input
  useEffect(() => {
    const result = data.filter(item => {
      return item.cardName.toLowerCase().includes(search.toLowerCase()) ||
        item.cardCode.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  // Handle opening modal with customer details
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  // Table columns definition
  const columns = [
    { name: '#', selector: (row, index) => index + 1, width: '50px' }, // Auto index
    { name: 'Customer Code', selector: row => row.cardCode, sortable: true, width: '250px' },
    { name: 'Customer Name', selector: row => row.cardName, sortable: true, width: '250px' },
    {
      name: 'Actions',
      cell: (row) => (
        <Button variant="outline-primary" size="sm" onClick={() => handleViewDetails(row)}>
          View Details
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  // Custom styles for the DataTable
  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: "#F1F5FC",
      },
    },
    cells: {
      style: {
        color: '#64748b',
        fontSize: '14px',
      },
    },
  };

  // Search component in the table header
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        type="text"
        className="form-control me-4 mb-4"
        placeholder="Search by Customer Code or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  }, [search]);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Customers List</h1>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} xs={12} className="mb-5">
          <Card>
            <Card.Header>
              <h4 className="mb-1">Customers Table</h4>
            </Card.Header>
            <Card.Body className="px-0">
              <DataTable
                customStyles={customStyles}
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                paginationRowsPerPageOptions={[3, 5, 10]}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Customer Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer ? (
            <Fragment>
              <Form.Group className="mb-3">
                <Form.Label>Customer Code:</Form.Label>
                <Form.Control type="text" value={selectedCustomer.cardCode} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name:</Form.Label>
                <Form.Control type="text" value={selectedCustomer.cardName} readOnly />
              </Form.Group>
            </Fragment>
          ) : (
            <p>No customer details available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ViewCustomers;
