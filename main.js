const express = require("express");
const app = express();
const router = express.Router();

//router.use(express.json());

let PRUDCT_DB = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/productos", (req, res) => {
  if (PRUDCT_DB.length < 1) {
    return res.status(404).json({
      mensaje: "No hay productos registrados",
    });
  }
  res.json(PRUDCT_DB);
});
router.post("/productos", (req, res) => {
  const data = req.body;
  data.id = PRUDCT_DB.length + 1;
  PRUDCT_DB.push(data);
  res.status(201).json(data);
});

router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const userFiltered = PRUDCT_DB.filter((user) => user.id === parseInt(id))[0];
  if (userFiltered) {
    return res.json(userFiltered);
  }
  return res.status(404).json({
    error: "Usuario no encontrado",
  });
});

router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  PRUDCT_DB = PRUDCT_DB.filter((product) => product.id === parseInt(id));
  //res.send();
  if (PRUDCT_DB) {
    return res.json(PRUDCT_DB);
  }
  return res.status(404).json({
    error: "Usuario no encontrado",
  });
});

router.put("/productos/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  PRUDCT_DB = PRUDCT_DB.map((product) => {
    if (product.id === parseInt(id)) {
      return Object.assign(product, data);
    }

    return product;
  });
  return res.status(200).json(PRUDCT_DB);
});

app.use(express.static('public'));



app.use('/api', router)

const server= app.listen(8080, () => {
  console.log("El express server esta corriendo");
})
server.on('error', error=>{
  console.log(error.messaje);
})
