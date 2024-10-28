const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res)=>{
    const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}
const validateUser = async (req, res) => {
    const { username, password } = req.body;  
    try {
        
        const usersData = await fs.readFile(path.join(__dirname, '../../db/usuarios.json'), 'utf-8');
        const usuarios = JSON.parse(usersData).usuarios;

        const userFound = usuarios.find(user => user.username === username && user.password === password);

        if (userFound) {
            res.status(200).json({ role: userFound.role });
        } else {
            res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al validar el usuario.' });
    }
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    validateUser
}