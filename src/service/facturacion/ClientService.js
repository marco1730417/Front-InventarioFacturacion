const contextPath = import.meta.env.BASE_URL;
const token = localStorage.getItem("token");
      
export default class ClientService {
    
    getClients() {
        return fetch('http://127.0.0.1:8000/api' + '/get-clientes'
        , {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
        
              "x-access-token": token
            },
          }
        )
            .then((res) => res.json()
            )
          /*   .then((d) => d.data); */
            
    }
}
