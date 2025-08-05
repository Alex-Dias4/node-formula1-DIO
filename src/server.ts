import fastify from "fastify";
import { request } from "http";

const server = fastify({logger: true});

const teams = [
    {id:1, name: "mcLaren", base: "Woking, UK"},
    {id: 2, name: "mercedes", base:"Brackley, UK"},
    {id: 3, name: "red bull racing", base:"Milton keynes, UK"},
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