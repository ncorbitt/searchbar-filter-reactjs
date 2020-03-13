import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	FormControl,
	Breadcrumb
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
				<Row className='' style={{ marginTop: 'calc(25vh)' }}>
					<Col className='align-self-center'>
						<h3
							className='mb-5 pb-3 mt-5'
							style={{
								fontSize: '3em',
								borderBottom: '3px solid white',
								textShadow: '1px 1px 7px black'
							}}>
							<span className='text-white'>C</span>
							<span style={{ color: '#6bd4c1' }}>ontacts:</span>

							<i className='float-right' style={{ color: "#6bd4c1" }}>
								<span className='text-white'>{matchCount}</span> Matches
							</i>
						</h3>

						<h6 className='text-white mb-2'
							onMouseEnter={e => {
								e.target.style.backgroundColor = '#142438';
								e.target.style.padding = '7px';
								e.target.style.border = '3px solid #6bd4c1';
							}}
							onMouseLeave={e => {
								e.target.style.backgroundColor = '';
								e.target.style.padding = '0px';
								e.target.style.border = '';
							}}>

							Will search firstname and lastname
						</h6>

						<div
							className='d-flex rounded py-3'
							style={{
								backgroundColor: '#142438',
								border: '3px solid #6bd4c1'
							}}>
							<UserSearchIcon size='36' className='mt-2' />
							<FormControl
								className='shadow-lg'
								style={{ border: 'none', fontSize: '1.7em' }}
								size='lg'
								type='text'
								id='searchBox'
								placeholder='Search for contact . . . '
								onChange={e => setSearchText(e.target.value)}
							/>
						</div>

						<ListGroup
							style={{
								display: !searchText ? 'none' : '',
								fontSize: '1.5em'
							}}>
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
													cursor: 'pointer'
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
										return null
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
				<Row id='contact-container'>
					<Col
						className='text-white text-cente align-self-center rounded shadow-lg'
						style={{
							backgroundColor: '#142438',
							border: '3px solid #6bd4c1'
						}}>
						<div className='p-5'>
							<Breadcrumb
								className='breadcrumb'
								style={{ backgroundColor: '#142438' }}>
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
