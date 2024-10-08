import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Breadcrumb } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FaCog, FaUser, FaTools, FaClipboardList } from 'react-icons/fa';

const Settings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('company-info');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };

  const handleMenuClick = (menu) => {
    console.log(`Navigating to: ${menu}`);
    // You can replace the console.log with router.push(menu) to navigate
    // For example: router.push(`/${menu}`)
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'company-info':
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Company Information</h5>
              <Row>
                <Col xs={4} className="fw-bold">Logo:</Col>
                <Col xs={8}><img src="/images/SAS-LOGO.png" height={150} width={200} alt="Company Logo" /></Col>
              </Row>
              <Row>
                <Col xs={4} className="fw-bold">Company Name:</Col>
                <Col xs={8}>SAS Air Conditioning</Col>
              </Row>
              <Row>
                <Col xs={4} className="fw-bold">Address:</Col>
                <Col xs={8}>123 Cool Breeze Avenue, CityName, 12345</Col>
              </Row>
              <Row>
                <Col xs={4} className="fw-bold">Email:</Col>
                <Col xs={8}>contact@sasairconditioning.com</Col>
              </Row>
              <Row>
                <Col xs={4} className="fw-bold">Phone:</Col>
                <Col xs={8}>(123) 456-7890</Col>
              </Row>
              <Row>
                <Col xs={4} className="fw-bold">Website:</Col>
                <Col xs={8}><a href="https://www.sasairconditioning.com" target="_blank" rel="noreferrer">www.sasairconditioning.com</a></Col>
              </Row>
            </Card.Body>
          </Card>
        );
      case 'options':
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Options</h5>
              <h6>General</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('general/company-info')}>Company Information</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('general/company-preferences')}>Company Preferences</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('general/estimate-job-status')}>Estimate & Job Statuses</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('general/field-worker-app-settings')}>Field Worker App Settings</ListGroup.Item>
              </ListGroup>

              {/* <h6 className="mt-4">Accounting</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('accounting/quickbooks-online')}>QuickBooks Online</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('accounting/quickbooks-desktop')}>QuickBooks Desktop/Enterprise</ListGroup.Item>
              </ListGroup> */}

              <h6 className="mt-4">Access Management</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('access-management/login-history')}>Login History</ListGroup.Item>
              </ListGroup>

              <h6 className="mt-4">Tools</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('tools/data-import')}>Data Import</ListGroup.Item>
              </ListGroup>

              <h6 className="mt-4">List Management</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('list-management/job-categories')}>Job Categories</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('list-management/product-service-categories')}>Product/Service Categories</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('list-management/warehouse-management')}>Warehouse Management</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('list-management/equipment-manufacturers')}>Equipment Manufacturers</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('list-management/equipment-types')}>Equipment Types</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('list-management/equipment-models')}>Equipment Models</ListGroup.Item>
              </ListGroup>

              {/* <h6 className="mt-4">Sherpa Criteria</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('sherpa/worker-criteria')}>Sherpa Worker Criteria</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('sherpa/assets-criteria')}>Sherpa Assets Criteria</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('sherpa/plus-criteria')}>Sherpa+ Criteria</ListGroup.Item>
              </ListGroup> */}

{/* 
              <h6 className="mt-4">Products & Services</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('products-services/catalog')}>Catalog</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('products-services/inventory-list')}>Inventory List</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('products-services/inventory-management')}>Inventory Management</ListGroup.Item>
                <ListGroup.Item action onClick={() => handleMenuClick('products-services/inventory-transfer-history')}>Inventory Transfer History</ListGroup.Item>
              </ListGroup>

              <h6 className="mt-4">Tax Management</h6>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => handleMenuClick('tax-management')}>Tax Management</ListGroup.Item>
              </ListGroup> */}
            </Card.Body>
          </Card>
        );
      case 'users':
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Users</h5>
              <p>Manage users, add new users, and assign roles.</p>
            </Card.Body>
          </Card>
        );
      case 'teams':
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Teams</h5>
              <p>Manage your teams and team members.</p>
            </Card.Body>
          </Card>
        );
      case 'job-types':
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Job Types</h5>
              <p>Configure different job types for your system.</p>
            </Card.Body>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="py-1">
      {/* Dynamic Breadcrumb */}
      <Row className="mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Settings</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Main Content */}
      <Row>
        {/* Sidebar */}
        <Col lg={3} md={4} sm={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">Settings</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => handleNavigation('company-info')}>
                <FaUser className="me-2" /> Company Information
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => handleNavigation('options')}>
                <FaCog className="me-2" /> Options
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => handleNavigation('users')}>
                <FaUser className="me-2" /> Users
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => handleNavigation('teams')}>
                <FaTools className="me-2" /> Teams
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => handleNavigation('job-types')}>
                <FaClipboardList className="me-2" /> Job Types
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Main Settings Sections */}
        <Col lg={9} md={8} sm={12}>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
