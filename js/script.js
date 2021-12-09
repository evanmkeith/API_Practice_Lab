const genres = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'}
]

async function getMovieData(e) {
	e.preventDefault();

    let userInputGenre = $('#genres').val();
    let randNum = Math.floor(Math.random() * (461 - 1)) + 1;
    let randPage = 0;
    let newMovArray = [];
    const apiKey = "5eb8160a2b66b932e3381a55d388ba1a";

    let chosenMov;
    let moviePoster = '';
    let movieTitle = '';
    let movieRelease = '';
    let movieOverView = '';


    console.log(userInputGenre);
    //Checking what genre selected with if statement
    if(parseInt(userInputGenre) < 1){
        //If user doesn't select a genre - it runs one random page and chooses a random movie to display
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${randNum}`;
    
        const response = await fetch(url);
        const data = await response.json();

        chosenMov = data.results[Math.floor(Math.random() * 20)];
        moviePoster = `https://image.tmdb.org/t/p/original/${chosenMov['poster_path']}`;
        movieTitle = `${chosenMov['title']}`;
        movieRelease = `${chosenMov['release_date']}`;
        movieOverView = `${chosenMov['overview']}`;

        $('#results h2').html('');
        $('#results h4').html('');
        $('#results p').html('');
        $('.saveMovie').remove();
        $('#moviePoster').attr("src",`${moviePoster}`);
        $('#results h2').html(movieTitle);
        $('#results h4').html(`Released: ${movieRelease}`);
        $('#results p').html(movieOverView);
        const trailer = $(`<a href="https://www.youtube.com/results?search_query=${movieTitle.split("+")}+${movieRelease}+movie+trailer" target="_blank">Watch Trailer</a><br><br>`);
        $('#results').append(trailer);

        const saveBtn = $('<button class="saveMovie">Save Movie</button>');
        $('#results').append(saveBtn); 
        saveBtn.click(function(){
            let newLiMovie = $('<li></li>');
            newLiMovie.html(`Title: ${movieTitle}<br>Overview: ${movieOverView}<br><a href="https://www.youtube.com/results?search_query=${movieTitle.split("+")}+${movieRelease}+movie+trailer" target="_blank">Trailer</a><br><br>`)
            $('#movieList').append(newLiMovie);
            return
        });

    } else {
        for(x=0; x<10; x++){
            //finding a random starting page then moving 5 up from that.
            randPage = randNum + x;
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${randPage}`;
    
            const response = await fetch(url);
            const data = await response.json();

            //going through each page and adding the movies that match the genre to the newMovArray 
            data.results.forEach((movie) => {
                movie['genre_ids'].forEach((id) => {
                    if(id === parseInt(userInputGenre)){
                        newMovArray.push(movie);
                    };
                });
            });
        };
        
        if(newMovArray.length === 0){
            //if no movies were found we ask the user to try again
            //first we clear the content that may have been there prior
            $('#results h1').html('');
            $('#results p').html('');
            $('#results p').html("Because this is random, sometimes we come up with zero matches in the sample we've collected. Try running the same search again and I'm sure you'll find a movie! :D")
        } else {
            //if a match is found we choose a random one to show them
            //first we clear the content that may have been there prior 
            let chosenMov = newMovArray[Math.floor(Math.random() * newMovArray.length)];

            $('#results h2').html('');
            $('#results h4').html('');
            $('#results p').html('');
            $('#moviePoster').attr("src",`https://image.tmdb.org/t/p/original${chosenMov['poster_path']}`);
            $('#results h2').html(chosenMov['title']);
            $('#results h4').html(`Released: ${chosenMov['release_date']}`);
            $('#results p').html(chosenMov['overview']);
        }
    };

    console.log(newMovArray);    
};

$("#randMovForm").on("submit", getMovieData);