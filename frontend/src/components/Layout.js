import React, { useEffect, useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import http from '../http'

function Layout(props) {
	const [photos, setPhotos] = useState([])
	const [isloading, setIsLoading] = useState(false)
	const [page, setPage] = useState(0)
	const [prevOffset, setPrevOffset] = useState(0)
	const [method, setMethod] = useState('recent')
	const [filterText, setFilterText] = useState('')
	const [error, setError] = useState(null)

	const loadingRef = useRef(null);

	useEffect(() => {
		if (method === 'search' && !filterText) { return setPhotos([])}
		getPhotos()
	}, [page, method, filterText])

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "50px",
			threshold: 1.0
		}
		  
		const observer = new IntersectionObserver(handleObserver, options)
		observer.observe(loadingRef.current)
	}, [])

	function handleObserver(entities, observer) {
		const currentOffset = entities[0].boundingClientRect.y

		if (currentOffset > prevOffset) {
			setPage(p => p + 1)
		}

		setPrevOffset(currentOffset)
	}

	async function getPhotos() {
		try {
			setIsLoading(true)
			setError(null)
			const response = await http.get(`/api/photos/${method}/?page=${page}&size=5&filter=${filterText}`)

			if (response.data) {
				setPhotos([
					...photos,
					...response.data.filter(newPhoto => !photos.some(oldPhoto => oldPhoto.id === newPhoto.id)),
				])
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			if (error.response.status === 400) {
				if (error.response.data.data === 'NotSupportedFlickrMethod') {
					return setError('Could not get the photos. Not supported flickr method provided.')
				}
			}
			setError('Could not get the photos.')
		}
	}

	return (
		<>
			<nav className="navbar bg-light navbar-expand-md">
				<div className="container d-flex justify-content-start">
					<Button className="nav-link px-4 btn-warning mr-3" onClick={() => { 
						setPhotos([])
						setMethod('recent') 
					}}>
						Recent
					</Button>
					<Button className="nav-link px-4 btn-warning mr-3" onClick={() => { 
						setPhotos([])
						setMethod('search')
					}}>
						Search
					</Button>
					<Form className="form-inline">
						<Form.Group>
							<Form.Control 
								type="text" 
								name="filter" 
								value={filterText}
								onChange={(e) => {
									if (method === 'search') {
										setPhotos([])
									}
									setFilterText(e.target.value) 
								}}
							/>
						</Form.Group>
					</Form>
				</div>
			</nav>
			<div className="container mt-5">
				{photos && photos.map(p => <>
					<div className="row justify-content-center align-items-center mb-4">
						<div className="col-sm-5 d-flex">
							<img src={p.photoUrl} alt={p.title} key={p.id} className="ml-sm-auto" />
						</div>
						<div className="col-sm-5">
							<h6 className="mt-4 mt-sm-0">{p.title}</h6>
						</div>
					</div>
				</>)}
				<div ref={loadingRef} >
					{ isloading && <span> Loading... </span> }
				</div>
				<div className="text-danger">
					{error}
				</div>
			</div>
		</>
	)
}

export default Layout
