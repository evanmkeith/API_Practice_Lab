async function getMovieData(e) {
	e.preventDefault();

    //let ranPage = Math.floor(Math.random() * 501);
    let userInputYear = $('#year[type="text"]').val();
	const apiKey = "5eb8160a2b66b932e3381a55d388ba1a";
	const url1 = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${userInputYear}&with_watch_monetization_types=flatrate`;
    
	const response = await fetch(url1);
	const data = await response.json();


    let ranPage = Math.floor(Math.random() * (data.total_pages+1));
    const url2 = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${ranPage}&primary_release_year=${userInputYear}&with_watch_monetization_types=flatrate`;
    
	const response2 = await fetch(url2);
	const data2 = await response2.json();


    let newMovArray = []

    data2.results.forEach((movie) => {
        if(movie['vote_average'] >= 7){
            newMovArray.push(movie);
        };
    });

    console.log(newMovArray);
}

$("#randMovForm").on("submit", getMovieData);