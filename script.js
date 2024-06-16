document.addEventListener('DOMContentLoaded', () => {
  const moviesContainer = document.getElementById('movies-container');
  const movieTitle = document.getElementById('movie-title');
  const movieDescription = document.getElementById('movie-description');
  const playerContainer = document.getElementById('player');
  const moviePoster = document.getElementById('movie-poster');

  if (moviesContainer) {
    // We are on the main page
    fetch('movies.json')
      .then(response => response.json())
      .then(movies => {
        movies.forEach(movie => {
          const card = document.createElement('div');
          card.className = 'movie-card';
          
          const poster = document.createElement('img');
          poster.className = 'movie-poster';
          poster.src = movie.poster;
          
          const title = document.createElement('h2');
          title.className = 'movie-title';
          title.textContent = movie.title;
          
          const description = document.createElement('p');
          description.className = 'movie-description';
          description.textContent = movie.description;
          
          const link = document.createElement('a');
          link.href = `movie.html?id=${movie.id}`;
          link.textContent = 'Watch Now';
          
          card.appendChild(poster);
          card.appendChild(title);
          card.appendChild(description);
          card.appendChild(link);
          moviesContainer.appendChild(card);
        });
      });
  } else if (movieTitle && movieDescription && playerContainer && moviePoster) {
    // We are on the movie page
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    fetch('movies.json')
      .then(response => response.json())
      .then(movies => {
        const movie = movies.find(m => m.id == movieId);
        if (movie) {
          movieTitle.textContent = movie.title;
          movieDescription.textContent = movie.description;
          moviePoster.src = movie.poster;
          
          new Clappr.Player({
            source: movie.url,
            parentId: '#player',
            width: '100%',
            height: '360px',
          });
        }
      });
  }
});
