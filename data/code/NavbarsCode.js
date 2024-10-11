export const Default = `   
< expand="lg">                             
    <.Brand href="#home">
        <Image src={Logo} alt="" loading="lazy"/> 
    </.Brand>
    <.Toggle aria-controls="basic--nav" />
    <.Collapse id="basic--nav">
    <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#link" disabled>Disabled</Nav.Link>
    </Nav>
    </.Collapse>
</>
    `.trim();

export const Brand = `   
<>
    <.Brand href="#home">
        <Image src={LogoIcon} width="30" height="30" alt="" loading="lazy"/>                                        
    </.Brand>
</> 
    `.trim();

export const ColorSchemesCode = `   
< bg="dark" variant="dark">
    <.Brand href="#home"> <Image src={Logo} alt="" loading="lazy" /></.Brand>
    <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
</>
<br />
< bg="primary" variant="dark">
    <Container>
        <.Brand href="#home"> <Image src={Logo} alt="" loading="lazy" /></.Brand>
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
    </Container>
</>
<br />
< bg="light" variant="light">
    <Container>
        <.Brand href="#home"> <Image src={Logo} alt="" loading="lazy" /></.Brand>
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
    </Container>
</>
`.trim();
export const sCode = [Default, Brand, ColorSchemesCode];

export default sCode;
