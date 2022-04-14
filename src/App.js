import logo from './logo.svg';
import './App.css';
import Pelicula from './Peliculas';
import PageWraper from './PageWrapper';
import Paginacion from './Paginacion';
import { useEffect, useState } from 'react';


function App() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const PELIS_POR_PAGINA = 5;

  useEffect(() => {
    buscarPeliculas();
  }, []);

  const buscarPeliculas = async () => {
    let url = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/lucasmoy-dev/Curso-de-React/main/Proyecto%202%20-%20Web%20de%20Peliculas/Proyecto%20Terminado/src/peliculas.json';

    let respuesta = await fetch(url, {
      "method": 'GET',
      "mode": 'no-cors',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'https://raw.githubusercontent.com/'

      }
    });

    let result = await respuesta.json();
    setPeliculas(result);
  }


  const cargarPeliculas = () => {
    /* 
      peliculas = peliculas.slice(
       (paginaActual - 1) * PELIS_POR_PAGINA,
       paginaActual * PELIS_POR_PAGINA
      );
   */
  }


  const getTotalPaginas = () => {
    let totalPeliculas = peliculas.length;
    return Math.ceil(totalPeliculas / PELIS_POR_PAGINA);
  }



  return (

    <PageWraper>

      {peliculas.map(pelicula =>
        <Pelicula
          titulo={pelicula.titulo}
          calificacion={pelicula.calificacion}
          director={pelicula.director}
          actores={pelicula.actores}
          fecha={pelicula.fecha}
          duracion={pelicula.duracion}
          img={pelicula.img}>
          {pelicula.descripcion}
        </Pelicula>
      )}

      <Paginacion

        pagina={paginaActual}
        total={getTotalPaginas()}
        onChange={(pagina) => {
          setPaginaActual(pagina);
        }} />

    </PageWraper>
  );
}
export default App;