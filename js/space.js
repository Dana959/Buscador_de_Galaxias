document.getElementById('btnSearch').addEventListener('click', function() {
    const inputSearch = document.getElementById('inputSearch').value;
    const contenedor = document.getElementById('container');
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(inputSearch)}`;

    // Limpiar el contenedor antes de mostrar los resultados
    contenedor.innerHTML = '';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.collection.items.length > 0) {
              console
                data.collection.items.forEach(item => {
                    if (item.links && item.links.length > 0) {
                        // Crear columna
                        const column = document.createElement('div');
                        console.log("Columna creada");                        
                        
                        // Crear tarjeta de Bootstrap
                        const card = document.createElement('div');
                        card.className = 'card mb-4 shadow-sm d-flex flex-column h-100';
                        console.log("Tarjeta creada");
                        // Imagen
                        const img = document.createElement('img');
                        img.src = item.links[0].href;
                        img.className = 'card-img-top';
                        img.alt = item.data[0].title;
                        console.log("Imagen creada");

                        // Cuerpo de la tarjeta
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';
                        console.log("Tarjeta creada");
                        
                        // Título
                        const title = document.createElement('h5');
                        title.className = 'card-title';
                        title.innerText = item.data[0].title;
                        console.log("Titulo creada");

                        // Descripción con scroll
                        const description = document.createElement('div');
                        description.className = 'card-text overflow-auto';
                        description.innerText = item.data[0].description || 'No description available';
                        
                        //Fecha
                        const date = document.createElement('p');
                        date.className = 'card-date';
                        date.innerText = item.data[0].date_created || 'Fecha no disponible';

                        console.log("Scroll creado");

                        // Añadir elementos al cuerpo de la tarjeta
                        cardBody.appendChild(title);
                        cardBody.appendChild(description);
                        cardBody.appendChild(date); 

                        // Añadir imagen y cuerpo a la tarjeta
                        card.appendChild(img);
                        card.appendChild(cardBody);

                        // Añadir tarjeta a la columna
                        column.appendChild(card);

                        // Añadir columna al contenedor
                        contenedor.appendChild(column);
                    }
                });
            } else {
                const noResults = document.createElement('p');
                noResults.innerText = 'No se encontraron resultados para tu búsqueda.';
                contenedor.appendChild(noResults);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Hubo un error al realizar la búsqueda. Intenta nuevamente.';
            contenedor.appendChild(errorMessage);
        });
});

