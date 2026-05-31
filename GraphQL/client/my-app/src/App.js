import './App.css';
// App.js
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";


const query = gql`
query GetTodosWithUser {
  getTodos {
    title
    completed
    id
    user {
      name
      id
    }
  }
}
`;


function App() {
  console.log("App rendered");

  const { data, loading, error } = useQuery(query);

  console.log({ loading, data, error });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="App">
     {JSON.stringify(data)}
    </div>
  );
}

export default App;
