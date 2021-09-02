// Getting All DOM elements 
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const bookContainer = document.getElementById('book-container');
const searchResult = document.getElementById('search-result');

//Search and Load Data from API
searchButton.addEventListener('click',() => {
	const searchValue = searchInput.value;
	if(searchValue){
		searchResult.style.display = 'none';
		//Clear bookcontainer
		bookContainer.innerHTML = '';
		//Fetch Data from API
		const url = `https://openlibrary.org/search.json?q=${searchValue}`;
		fetch(url)
		.then(res => res.json())
		.then(data => displayBooks(data))
	}
	else{
		searchResult.innerHTML = `<p class="container bg-danger fs-2 text-center text-white py-1 my-2"> Search Field Can not Be Empty</p>`;
		bookContainer.innerText = '';
		searchResult.style.display = 'block';
	}
	//Clear Search Input Value
	searchInput.value = '';
});
//Showing the Books in Cards
const displayBooks = (data) => {
	bookContainer.innerHTML = '';
	const totalResults = data.numFound;
	//Search Status
	if(totalResults === 0){
		searchResult.innerHTML = `<p class="container bg-danger fs-2 text-center text-white py-1 my-3"> No Results Found </p>`;
	}
	else{
		//Total Search Results
		searchResult.innerHTML = `<p class="container bg-success fs-2 text-center text-white py-1 my-3"> ${totalResults} Books Found</p>`;
	}
	searchResult.style.display = 'block';
	//forEach loop for all Books
	data.docs.forEach(book => {
		//Create Div for Show Books
		const div = document.createElement("div");
    	div.classList.add("col-md-4");
    	div.innerHTML = `
      	<!-- Image -->
      	<div class="rounded overflow-hidden border p-2">
        	<img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 10909258}-M.jpg" class="w-100" height="500"alt=""/>
     	</div>
      	<!-- Body -->
      	<div class="py-2 d-flex justify-content-between align-items-center d-md-block">
			<h3 class="my-2 fw-bold text-success">${book.title}</h3>
        	<h5> <span class = "fw-bold text-success py-1 my-2">Written by : </span> ${book.author_name ? book.author_name[0] : ''}</h5>
			<p class="my-2"><span class="fw-bold text-success">Publisher : </span>${book.publisher ? book.publisher[0] : ''} </p>
			<p class="my-2"><span class="fw-bold text-success">First Published in : </span> ${book.first_publish_year ? book.first_publish_year : ''} </p>
      	</div>
    	`;
		//  Append to Parent Container 
    	bookContainer.appendChild(div);
	});
};
