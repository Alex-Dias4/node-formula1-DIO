import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
})

const teams = [
  { id: 1, name: "McLaren", base: "Woking, UK" },
  { id: 2, name: "Mercedes", base: "Brackley, UK" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, UK" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Aston Martin", base: "Silverstone, UK" },
  { id: 6, name: "Alpine", base: "Enstone, UK" },
  { id: 7, name: "Williams", base: "Grove, UK" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Sauber", base: "Hinwil, Switzerland" },
  { id: 10, name: "Haas", base: "Kannapolis, USA" },
  { id: 11, name: "Andretti (proposed)", base: "Indianapolis, USA" },
  { id: 12, name: "Hitech GP (proposed)", base: "Silverstone, UK" }
]

const drivers = [
    { id: 1, name:"max verstappen", team: "red bull racing"},
    { id: 2, name: "Lewis Hamilton", team: "Mercedes-AMG Petronas" },
    { id: 3, name: "Charles Leclerc", team: "Scuderia Ferrari" },
    { id: 4, name: "Lando Norris", team: "McLaren F1 Team" }

]


server.get("/teams", async (request, response)=>{
    response.type("application/json").code(200);
    return { teams };
});

server.get("/drivers", async (request, response)=>{
    response.type("application/json").code(200);
    return{ drivers }
})

interface RouteParams{
    id: string
}

server.get<{Params: RouteParams}>("/drivers/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if (!driver){
        response.type("application/json").code(404);
        return {message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return {driver};
    }
})


server.listen({port:3333}, ()=>{
    console.log("Server init"); 
});