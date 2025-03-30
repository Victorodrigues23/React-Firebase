import { useState } from "react";
import { db } from "./firebaseConnection";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import "./app.css";

function App() {
  // Estados para armazenar os dados do formulário e os posts
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");
  const [posts, setPosts] = useState([]);

  // Função para adicionar um novo post no Firebase
  async function handleAdd() {
    /* Alternativamente, poderíamos usar setDoc para definir um documento com ID fixo
    try {
      await setDoc(doc(db, "posts", "12345"), {
        titulo: titulo,
        autor: autor,
      });
      console.log("DADOS REGISTRADOS NO BANCO!");
    }
    catch (error) {
      console.log("GEROU ERRO: " + error);
    }
    */

    // Usando addDoc para adicionar um novo post com ID gerado automaticamente
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("CADASTRO COM SUCESSO !!! ");
        setAutor(""); // Limpa o campo do autor
        setTitulo(""); // Limpa o campo do título
      })
      .catch((error) => {
        console.log("ERROR " + error);
      });
  }

  // Função para buscar todos os posts no Firebase
  async function buscarPost() {
    /* Outra forma seria buscar um post específico pelo ID
    const postRef = doc(db, "posts", "vbru3ufmszlHoRLo2vJK");
    await getDoc(postRef)
      .then((snapshot) => {
        setAutor(snapshot.data().autor);
        setTitulo(snapshot.data().titulo);
      })
      .catch(() => {
        console.log("ËRROR AO BUSCAR");
      });
    */

    // Referência para a coleção "posts"
    const postsRef = collection(db, "posts");

    await getDocs(postsRef)
      .then((snapshot) => {
        let listas = [];
        snapshot.forEach((doc) => {
          listas.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor, // Obtendo os dados de cada post
          });
        });

        setPosts(listas); // Atualiza o estado com os posts buscados
      })
      .catch((error) => {
        alert("ERROR AO BUSCAR POST");
      });
  }

  // Função para editar um post (ainda não implementada)
  async function editarPost() {
    const docRef = doc(db, "posts", idPost); // Obtém a referência do documento pelo ID
    // Implementar a lógica para atualizar o post

    try {
      await updateDoc(docRef, {
        titulo: titulo,
        autor: autor,
      });

      console.log("POST ATUALIZADO");
      setIdPost("");
      setAutor("");
      setTitulo("");
    } catch (error) {
      console.log("error ao atualizar o post !!", error);
    }
  }

  return (
    <div>
      <h1>React JS + Firebase :)</h1>

      <div className="container">
        {/* Campo para inserir o ID do post */}
        <label>ID do Post :</label>
        <input
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => {
            setIdPost(e.target.value);
          }}
        />
        <br />
        {/* Campo para inserir o título do post */}
        <label>Titulo :</label>
        <textarea
          placeholder="Digite o Titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        {/* Campo para inserir o autor do post */}
        <label>Autor: </label>
        <input
          type="text"
          placeholder="Autor do Post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        ></input>
        {/* Botão para cadastrar um novo post */}
        <button onClick={handleAdd}>Cadastrar</button> <br />
        <br />
        {/* Botão para buscar posts cadastrados */}
        <button onClick={buscarPost}>Buscar Post</button> <br />
        <br />
        {/* Botão para atualizar um post */}
        <button onClick={editarPost}>Atualizar Post</button>
        {/* Lista de posts cadastrados */}
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Titulo: {post.titulo}</span>
                <br></br>
                <span>Autor: {post.autor} </span>
                <br></br>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
