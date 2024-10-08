import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { Row, Col, Card, Button, Badge, Image, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MoreVertical, Trash, Edit } from 'react-feather';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';




// import utility functions
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

// DataTable component
import DataTable from 'react-data-table-component';


const WorkersListItems = () => {
	const [workers, setWorkers] = useState([]);
	const [search, setSearch] = useState('');
	const [filteredWorkers, setFilteredWorkers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchWorkers = async () => {
			const usersRef = collection(db, 'users');
			const snapshot = await getDocs(usersRef);
			const workersData = snapshot.docs.map((doc, index) => ({
				id: doc.id,
				index: index + 1, // Index starting from 1
				name: `${doc.data().firstName} ${doc.data().middleName} ${doc.data().lastName}`,
				profilePicture: doc.data().profilePicture,
				workerId: doc.data().workerId,
				email: doc.data().email,
				primaryPhone: doc.data().primaryPhone,
				address: `${doc.data().streetAddress}, ${doc.data().stateProvince}, ${doc.data().zipCode}`,
				skills: doc.data().skills,
				isActive: doc.data().activeUser,
			}));
			setWorkers(workersData);
			setFilteredWorkers(workersData);
			setLoading(false);
		};

		fetchWorkers();
	}, []);

	useEffect(() => {
		const result = workers.filter(worker => {
			return (
				worker.name.toLowerCase().includes(search.toLowerCase()) ||
				worker.workerId.toLowerCase().includes(search.toLowerCase()) ||
				worker.email.toLowerCase().includes(search.toLowerCase()) ||
				worker.primaryPhone.toLowerCase().includes(search.toLowerCase()) ||
				worker.address.toLowerCase().includes(search.toLowerCase())
			);
		});
		setFilteredWorkers(result);
	}, [search, workers]);

	// Custom toggle for the dropdown action menu
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Button
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className="btn-icon btn btn-ghost btn-sm rounded-circle"
		>
			{children}
		</Button>
	));
	CustomToggle.displayName = 'CustomToggle';

	// Action Menu for each row
	const ActionMenu = ({ workerId }) => {
		const router = useRouter();

		const handleEditClick = () => {
			router.push({
				pathname: '/dashboard/workers/edit-worker',
				query: { workerId },
			});
		};

		return (
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<MoreVertical size="15px" className="text-secondary" />
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>SETTINGS</Dropdown.Header>
					<Dropdown.Item onClick={handleEditClick}>
						<Edit size="15px" className="dropdown-item-icon" /> Edit
					</Dropdown.Item>
					<Dropdown.Item>
						<Trash size="15px" className="dropdown-item-icon" /> Remove
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	// Table columns
	const columns = [
		{
			name: '',
			cell: row => <ActionMenu workerId={row.workerId} />,
			width: '50px',
		},
		{
			name: '#',
			selector: row => row.index,
			sortable: true,
			width: '60px',
		},
		{
			name: 'W-ID',
			selector: row => row.workerId,
			sortable: true,
			width: '100px',
		},
		{
			name: 'Name',
			cell: row => (
				<div className="d-flex align-items-center">
					<Image
						src={row.profilePicture}
						alt="profile"
						className="rounded-circle avatar-md me-2"
						style={{ width: '40px', height: '40px', objectFit: 'cover' }}
					/>
					<OverlayTrigger
						placement="top"
						overlay={<Tooltip id={`tooltip-${row.id}-name`}>{row.name}</Tooltip>}
					>
						<span className="mb-0 text-truncate fw-bold" style={{ maxWidth: '200px' }}>
							{row.name}
						</span>
					</OverlayTrigger>
				</div>
			),
			sortable: true,
			width: '250px', // Increased width for better readability
		},
		
		{
			name: 'Email',
			cell: row => (
				<OverlayTrigger
					placement="top"
					overlay={<Tooltip id={`tooltip-${row.id}-email`}>{row.email}</Tooltip>}
				>
					<span
						className="text-truncate"
						style={{ maxWidth: '200px', cursor: 'pointer' }}
						onClick={() => {
							navigator.clipboard.writeText(row.email);
							toast.success(`Email copied to clipboard: ${row.email}`, {
								position: "top-right",
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						}}
					>
						{row.email}
					</span>
				</OverlayTrigger>
			),
			sortable: true,
			width: '200px',
			style: {
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
		},
		
		
		
		{
			name: 'Primary Phone',
			selector: row => row.primaryPhone,
			sortable: true,
			width: '150px',
		},
		{
			name: 'Address',
			cell: row => (
				<OverlayTrigger
					placement="top"
					overlay={<Tooltip id={`tooltip-${row.id}`}>{row.address}</Tooltip>}
				>
					<div className="text-truncate" style={{ maxWidth: '220px' }}>
						{row.address}
					</div>
				</OverlayTrigger>
			),
			sortable: true,
			width: '240px', // Increased width to accommodate longer addresses
		},
		{
			name: 'Skills',
			cell: row => (
				<div className="d-flex flex-wrap gap-1">
					{row.skills.length
						? row.skills.map((skill, index) => (
								<Badge pill bg="primary" className="me-1 mb-1" key={index}>
									{skill}
								</Badge>
						  ))
						: (
							<Badge pill bg="secondary" className="me-1 mb-1">
								None
							</Badge>
						  )}
				</div>
			),
			width: '150px',
		},
		{
			name: 'Status',
			cell: row =>
				row.isActive ? (
					<Badge pill bg="success" className="me-1">
						Active
					</Badge>
				) : (
					<Badge pill bg="danger" className="me-1">
						Inactive
					</Badge>
				),
			width: '80px',
		},
		
	];

	const subHeaderComponentMemo = useMemo(() => {
		return (
			<Fragment>
				<input
					type="text"
					className="form-control me-4 mb-4"
					placeholder="Search Workers"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Fragment>
		);
	}, [search]);

	const customStyles = {
		headCells: {
			style: {
				fontWeight: 'bold',
				fontSize: '14px',
				backgroundColor: "#F1F5FC"
			},
		},
		cells: {
			style: {
				color: '#64748b',
				fontSize: '14px',
			},
		},
	};

	return (
		<Fragment>
			<Row>
				<Col md={12} xs={12} className="mb-5">
					<Card>
						<Card.Body className="px-0">
							<DataTable
								customStyles={customStyles}
								columns={columns}
								data={filteredWorkers}
								pagination
								highlightOnHover
								subHeader
								subHeaderComponent={subHeaderComponentMemo}
								paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
								subHeaderAlign="left"
							/>
							<ToastContainer
								position="top-right"
								autoClose={2000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="light"  // You can use 'light', 'dark', or 'colored'
							/>

						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default WorkersListItems;
