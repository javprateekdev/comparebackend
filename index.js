const express = require("express");
const cors = require("cors");
const pool = require("./config");
const pool2 = require("./config2");
const pool3 = require("./config3");
const app = express();
 
app.use(express.json());


app.use(cors());
/*----------------------login----------------------------*/ 
/*
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
*/
app.post('/login', (req, res) => {
 const username = req.body.username;
 const password = req.body.password;
 
 pool.query(
     "SELECT * FROM users WHERE username = ? AND password = ?",
     [username, password],
     (err, result)=> {
         if (err) {
             res.send({err: err});
         }
 
         if (result.length > 0) {
             res.send( result);
             }else({message: "Wrong username/password comination!"});
         }
     
 );
});


 /*----------------------All Property Data-------------------------------------*/

 app.get("/compare/data", (req, resp) => {
  pool3.query("select * from project", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});
app.post("/compare/data", (req, res) => {
  const q = "INSERT INTO `project`(`u_id`, `name`, `label`, `ProjectPlotArea`, `GreenArea`, `PropertyStatus`, `PriceRange`, `TotalTowers`, `TotalFlats`, `OCStatus`, `Density`, `PodiumNonPodium`, `ApprovedBank`, `ClubHouseSize`, `ConstructionType`, `TowerHeights`, `LiftperTower`, `FloorvsFlats`, `PossessionDate`, `Lobby`, `Distance`, `Segment`) VALUES (?)";

  const values = [
    req.body.u_id,
    req.body.name,
    req.body.label,
    req.body.ProjectPlotArea,
    req.body.GreenArea,
    req.body.PropertyStatus,
    req.body.PriceRange,
    req.body.TotalTowers,
    req.body.TotalFlats,
    req.body.OCStatus,
    req.body.Density,
    req.body.PodiumNonPodium,
    req.body.ApprovedBank,
    req.body.ClubHouseSize,
    req.body.ConstructionType,
    req.body.TowerHeights,
    req.body.LiftperTower,
    req.body.FloorvsFlats,
    req.body.PossessionDate,
    req.body.Lobby,
    req.body.Distance,
    req.body.Segment,
    
  ];

  pool3.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/compare/data/:id",(req,resp)=>{
   pool3.query("DELETE FROM project WHERE u_id ="+req.params.id,(error,results)=>{
    if(error) throw error;
    console.log(req.params.id)
    resp.send(results)
  })
})

/*-----------------------All flat data---------------------------------------------------------------------------------*/

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  res.status(500).json({
    message: "Something went rely wrong",
  });
});
app.use(cors());

app.get("/flatdata", (req, resp) => {
  pool2.query("select * from flatbased", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});

app.post("/flatdata", (req, res) => {
  const q = "INSERT INTO `flatbased` (`id`, `title`, `label`, `serviceTime`, `category`, `rating`, `price`, `coverSrc`, `SuperArea`, `CarpetArea`, `NoofBalconies`, `Loading`, `Electricload`, `Powerbackup`, `FurnishedorSemifernished`, `CeilingHeight`, `MainDoorHeight`, `InternalDoorHeights`) VALUES (?)";

  const values = [
    req.body.id,
    req.body.title,
    req.body.label,
    req.body.serviceTime,
    req.body.category,
    req.body.rating,
    req.body.price,
    req.body.coverSrc,
    req.body.SuperArea,
    req.body.CarpetArea,
    req.body.NoofBalconies,
    req.body.Loading,
    req.body.Electricload,
    req.body.Powerbackup,
    req.body.FurnishedorSemifernished,
    req.body.CeilingHeight,
    req.body.MainDoorHeight,
    req.body.FloorvsFlats,
    req.body.PossessionDate,
    req.body.InternalDoorHeights,
    
    
  ];

 pool2.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/flatdata/:id",(req,resp)=>{
  pool2.query("DELETE FROM flatbased WHERE id ="+req.params.id,(error,results)=>{
    if(error) throw error;
    console.log(req.params.id)
    resp.send(results)
  })
})



const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server is running succesfully on PORT ${PORT}`))