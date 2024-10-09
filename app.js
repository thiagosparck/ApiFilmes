document.getElementById('search-btn').addEventListener('click', async () => {
    const name = document.getElementById('director-name').value;
    console.log("Nome do diretor enviado:", name);

    if (!name) {
        alert('Por favor, insira o nome de um diretor.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/directors?name=${encodeURIComponent(name)}`);
        const directors = await response.json();
        
        if (response.ok && directors.length > 0) {
            displayDirectors(directors);
        } else {
            alert('Nenhum diretor encontrado.');
            document.getElementById('director-list').innerHTML = ''; // Limpa a lista
        }
    } catch (error) {
        console.error('Erro ao buscar diretores:', error);
    }
});

// Função para exibir diretores e filmes no DOM
function displayDirectors(directors) {
    const directorList = document.getElementById('director-list');
    directorList.innerHTML = ''; // Limpa a lista atual

    directors.forEach((director) => {
        const directorDiv = document.createElement('div');
        directorDiv.classList.add('director');

        // Adiciona o nome do diretor
        const directorInfo = document.createElement('h3');
        directorInfo.textContent = director.name;
        directorDiv.appendChild(directorInfo);

        // Cria uma lista de filmes
        const filmsList = document.createElement('ul');
        filmsList.classList.add('films');

        if (director.films.length > 0) {
            director.films.forEach((film) => {
                const filmItem = document.createElement('li');
                filmItem.textContent = film.title_pt || film.title_en; // Usar título em português, se disponível
                filmsList.appendChild(filmItem);
            });
        } else {
            const noFilms = document.createElement('p');
            noFilms.textContent = 'Nenhum filme encontrado para este diretor.';
            filmsList.appendChild(noFilms);
        }

        directorDiv.appendChild(filmsList);
        directorList.appendChild(directorDiv);
    });
}
