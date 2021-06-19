const express = require('express');
const app = express();

app.use(express.json());
//get
app.get("/", (req, res) => {
    res.send("Hello postman");
});

//post
const todos = [];
app.post("/todos", (req, res) => {
    todos.push(req.body);
    res.send("successfully");
  
    res.status(204).end();
  });
  app.get("/todos", (req, res) => {
    res.json(todos);
  });
  app.get('/todos/:id',(req,res)=>{
    const {id}= req.params
    const data2= todos.find((d)=>d.id == id) 
    if(!data2)
    {
        res.status(404).end()
    }
    res.json(data2)
  })
  app.patch("/todos/:id", (req, res) => {
    const {id}= req.params
    const data_update = req.body;
    console.log(data_update.title);
    for (let da of todos) {
      if (da.id ==id) {
        if (data_update.title != null || undefined)
          da.title = data_update.title;
        return res
          .status(200)
          .json({ message: "Updated Succesfully", todos: da });
      }
    }
    res.status(404).json({ message: "Invalid Order Id" });
  });
app.delete("/todos/:id", (req, res) => {
  const {id}= req.params
    for (let da of todos) {
      if (da.id == id) {
        todos.splice(todos.indexOf(da), 1);
        return res.status(200).json({
          message: "Deleted Successfully"
        });
      }
    }
    res.status(404).json({ message: "Invalid Order Id" });
  });

app.listen(3000)