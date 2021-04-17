const express = require("express");
const app = express();

let PRUDCT_DB = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/productos", (req, res) => {
    if(PRUDCT_DB.length<1){
        return res.status(404).json({
            mensaje: 'No hay productos registrados',
        })

    }
  res.json(PRUDCT_DB);
});
app.post("/api/productos", (req, res) => {
  const data = req.body;
  data.id = PRUDCT_DB.length + 1;
  PRUDCT_DB.push(data);
  res.status(201).json(data);
});

app.get("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const userFiltered = PRUDCT_DB.filter((user) => user.id === parseInt(id))[0];
  if(userFiltered){
    return res.json(userFiltered);
  }
  return res.status(404).json({
    error: 'Usuario no encontrado',
})
});

app.listen(8080, () => {
  console.log("El express server esta corriendo");
});