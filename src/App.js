import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	FormControl,
	Breadcrumb,
	Navbar
} from 'react-bootstrap';
import { Switch, Route, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import { UserSearch } from '@styled-icons/remix-line/UserSearch';
const UserSearchIcon = styled(UserSearch)`
	color: #6bd4c1;
	font-weight: bold;
	background-color: #142438;
	width: 50px;
`;

const Note = styled('section')`
	color: white;
	font-size: 1.5em;
	margin-top: 200px !important;
	margin-bottom: 30px;
	
	& i{
		color: white;
		text-shadow: 1px 1px 1px green
	}
`


function Header() {
	return (
		<Navbar id='removeOpacityOnHover' className='shadow' fixed='top' style={{ backgroundColor:'#1f2f40', height:70, opacity:'.7'}}>
				<Navbar.Brand href='/' className='justify-content-center'>
					<h6 id='headerTitle' className='mt-2' style={{ fontSize: '2em', textShadow: '1px 1px 7px black' }}>
						{/* <UserSearch size='48' className='mt-n2 text-white mr-2' /> */}
						<span className='text-white'>R</span><span style={{ color: '#6bd4c1' }}>eact-</span>
						<span className='text-white'>S</span><span style={{ color: '#6bd4c1' }}>earch-</span>
						<span className='text-white'>F</span><span style={{ color: '#6bd4c1' }}>ilter</span>
					</h6>
				</Navbar.Brand>
		</Navbar>
	)
}

function SearchBar(props) {
	const history = useHistory();
	const [contacts,] = useState(() => require('./contacts.json'));
	const [matchCount, setMatchCount] = useState(null);
	const [searchText, setSearchText] = useState('');

	function incrementLenVar() {
		let name = '';
		let len = 0;
		const inc = () => (len += 1);
		const getLen = () => len;
		const setName = value => (name = value);
		const getName = () => name;
		return {
			inc,
			getLen,
			setName,
			getName
		};
	}

	const increment = incrementLenVar();
	increment.setName('Increment Value');

	useEffect(() => setMatchCount(increment.getLen()), [increment]);

	return (
		<div>
			<Container>

				<Row>
					<Col>
					<section id='bg-pic-credit' className='position-fixed border border-white text-white rounded p-3' style={{ top:200, marginLeft:'60%' }}>
                        <h6 className='mb-2'>Background Picture by</h6>
                        <a
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                textDecoration: 'none',
                                padding: '4px 6px',
                                fontFamily: '-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif',
                                fontSize: 12, fontWeight: 'bold', lineHeight: '1.2', display: 'inline-block', borderRadius: 3
                            }}
                            href="https://unsplash.com/@hansonluu?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Hanson Lu">
                            <span style={{ display: 'inline-block', padding: '2px 3px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ height: 12, width: 'auto', position: 'relative', verticalAlign: 'middle', top: '-2px', fill: 'white' }}
                                    viewBox="0 0 32 32">
                                    <title>unsplash-logo</title>
                                    <path
                                        d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z">
                                    </path>
                                </svg>
                            </span>
                            <span style={{ display: 'inline-block', padding: '2px 3px' }}> Hanson Lu </span>
                        </a>
                    </section>
					</Col>
				</Row>
				<Row className='' style={{}}>
					<Col xs={12} sm={12} className='align-self-center'>

						<Note id='Note' className='mt-5 w-75 mx-auto' style={{}}>
							<p>
								react-search-filter, is just a basic filter to fiter data, from a input component.
							</p>

							<p>
								The example below loads 100 contacts from json data and will be filtered
								when typing a name. <br/>
								When you click on contact name, you will be routed
								to the contact's information.
							</p>

							<i>
								React-search-filter, utilizes react-bootstrap, for the look
								and it's responsiveness.
							</i>
						</Note>
					</Col>
				</Row>

				<Row>
					<Col id='search-container' className=''>
						<h3
							id='title'
							className='mb-5 pb-3 mt-5 mx-auto'
							style={{
								fontSize: '2.5em',
								borderBottom: '3px solid white',
								textShadow: '1px 1px 7px black'
							}}>
							{/* Contacts: */}
							<span className='text-white'>C</span><span style={{ color: '#6bd4c1' }}>ontacts:</span>

							{/* Matches */}
							<i id='' className='float-right' style={{ color: "#6bd4c1" }}>
								<span className='text-white'>{matchCount}</span> Matches
							</i>
						</h3>

						<h4 className='text-white mb-2'>

							Will search firstname and lastname

						</h4>

						<div
							className='d-flex rounded py-3'
							style={{backgroundColor: '#142438',}}>
							<UserSearchIcon size='36' className='mt-2' />
							<FormControl
								className='shadow-lg'
								style={{ border: 'none', fontSize: '1.7em' }}
								size='lg'
								type='text'
								id='searchBox'
								placeholder='Search for contact . . . '
								onChange={e => setSearchText(e.target.value.toLowerCase())}
							/>
						</div>

						<ListGroup
							style={{display: !searchText ? 'none' : '',fontSize: '1.5em'}}>
							{!searchText
								? ''
								: contacts.map(contact => {
									//convert contact name to lowercase
									let name = contact.firstName.toLowerCase();
									let lastname = contact.lastName.toLowerCase();


									//This eslint, line disables the no-useless-escape error;
									// eslint-disable-next-line no-useless-escape
									let ifItsNotALetter = /[^a-z]/; //Matches any characters except those in the range a-z.

									if (searchText.match(ifItsNotALetter)) return null;


									//Build RegEx, search for first character match at the beginning of the string
									let regexName = new RegExp(`^${searchText}`, 'ig');

									if (name.match(regexName) || lastname.match(regexName)) {
										increment.inc();

										return (
											<ListGroupItem
												key={contact.email}
												className='list-group-item shadow-lg'
												style={{
													backgroundColor: '#142438',
													cursor: 'pointer',
													opacity:'.7'
												}}
												onClick={() =>
													history.push(`/contact/${name}`, [
														contact
													])
												}>
												<h5
													className='text-secondary'
													style={{ fontSize: '1.5em' }}>
													<span
														id='listItemFirstName'
														style={{
															color: '#2d5d8e',
															fontWeight: 'bold'
														}}>
														{contact.firstName.toLowerCase()}
													</span>{' '}
														&nbsp;
														<span style={{ color: '#6bd4c1' }}>
														{contact.lastName.toLowerCase()}
													</span>
												</h5>
											</ListGroupItem>
										);
									} else {
										return ''
									}
								})}
						</ListGroup>
				
					</Col>
				</Row>
			</Container>
		</div >
	);
}

function Contactpage(props) {
	const history = useHistory();
	const [contact, setcontact] = useState([]);

	useEffect(() => {
		if (history.location.state) {
			setcontact(history.location.state[0]);
		} else {
			history.push('/');
		}
	}, [history]);

	return (
		<div>
			<Container>
				<Row id='contact-container' style={{height: 700}}>
					<Col
						id='contact'
						className='text-white align-self-end rounded shadow-lg'
						style={{backgroundColor: '#142438',opacity: '.7',}}>
						<div id='contactCard' className='p-5'>
							<Breadcrumb
								className='breadcrumb ml-n3'
								style={{ backgroundColor: '#142438', fontSize:'1.5em' }}>
								<Breadcrumb.Item onClick={() => history.push('/')}>
									Home
								</Breadcrumb.Item>
								<Breadcrumb.Item active>contact</Breadcrumb.Item>
							</Breadcrumb>

							<h1 style={{ fontSize: '3em' }}>
								{contact.firstName} {contact.lastName}
							</h1>{' '}
							<hr style={{ backgroundColor: '#6bd4c1' }} />
							<section style={{ fontSize: '2em' }}>
								<p>
									<small
										style={{ color: '#2d5d8e', fontWeight: 'bold' }}>
										Phone:
									</small>
									<small style={{ color: '#6bd4c1' }}>
										{' '}
										{contact.phoneNumber}{' '}
									</small>
								</p>
								<p>
									<small
										style={{ color: '#2d5d8e', fontWeight: 'bold' }}>
										Email:{' '}
									</small>
									<small style={{ color: '#6bd4c1' }}>
										{contact.email}
									</small>
								</p>
								<p>
									<small
										style={{ color: '#2d5d8e', fontWeight: 'bold' }}>
										Address:{' '}
									</small>
									<small style={{ color: '#6bd4c1' }}>
										{contact.address}
									</small>
								</p>
								<p>
									<small>
										<span
											style={{
												fontWeight: 'bold',
												color: '#2d5d8e',
												marginRight: 3
											}}>
											{' '}
											City:{' '}
										</span>{' '}
										{contact.city} &nbsp;
										<span
											style={{
												fontWeight: 'bold',
												color: '#2d5d8e'
											}}>
											{' '}
											State:{' '}
										</span>{' '}
										{contact.state} &nbsp;
										<span
											style={{
												fontWeight: 'bold',
												color: '#2d5d8e'
											}}>
											{' '}
											Zipcode:{' '}
										</span>{' '}
										{contact.zipcode}
									</small>
								</p>
							</section>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}



function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<SearchBar />
				</Route>
				<Route path='/contact/:name'>
					<Contactpage />
				</Route>			
			</Switch>
			
		</div>
	);
}

export default App;
