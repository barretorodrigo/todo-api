const express = require('express'); // framework
const app = express(); 
const port = 3000;
const bodyParser = require('body-parser'); // interpretação do json
const { Tarefa, User } = require('./models');
const cors = require('cors');

app.use(bodyParser.json());
//app.use(cors());

app.get('/', async(req, res)=>{
    console.log('Running')
    res.send('Running =)');
})

app.get('/tarefas', async(req,res)=>{
    const tarefas = await Tarefa.findAll({
        include:[
            {
                model: User,
                as: 'Users',
                through: { attributes: [] }
            }
        ]
    });
    res.status(200).json(tarefas);
})

app.get('/tarefas/:id', async(req, res)=>{
    const tarefa = await Tarefa.findAll({
        where:{
            id: req.params.id
        }
    });
    res.status(200).json(tarefa);
});

app.post('/tarefas', async(req, res)=>{
    const { users, ...data } = req.body;
    const tarefa = await Tarefa.create(data);
    tarefa.setUsers(users);
    res.status(201).json(tarefa);
});

app.delete('/tarefas/:id', async(req, res)=>{
    const tarefa = await Tarefa.destroy({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json(tarefa);
});

app.put('/tarefas/:id', async(req, res)=>{
    const tarefa = await Tarefa.update(req.body, {
        where:{
            id: req.params.id
        }
    });
    res.status(200).json(tarefa);  
});

app.post('/users', async(req, res)=>{
    const user = await User.create(req.body);
    res.status(201).json(user);
});

app.listen(process.env.PORT || port);
