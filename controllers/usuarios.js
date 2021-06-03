const { response, request } = require('express');
const Usuario = require('../models/user');
const { Model, json } = require('sequelize')


const usuariosGet = async (req = request, res = response) => {

    const usuarios = await Usuario.findAll();
    res.json({
        msg: 'Hola Get API',
        usuarios
    });
}
const usuariosPost = async (req, res = response) => {
    const { name } = req.body;
    console.log(name)
    if (name) {
        try {

            const usuario = await Usuario.create({ name });
            console.log(usuario);
            return res.json({
                msg: 'API POST - ' + `USER ID : ${name} ADDED`,
                usuario
            });
        }
        catch {
            return res.status(402).json({
                msg: 'API POST - ' + `USER ID : ${name} CANT ADDED`
            });
        }
    }

    return res.json({
        msg: 'API POST - ' + `USER ID : ${name} ADDED`
    });

}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            msg: `[BAD REQUEST] - Name Not Exist in Body`
        })
    }
    try {

        const usuario = await Usuario.findByPk(id);
        usuario.name = name;
        await usuario.save();
        return res.json({
            msg: 'API PUT - ' + `[OK] - USER UPDATED`,
            usuario
        });
    }
    catch {
        return res.status(402).json({
            msg: 'API PUT' + `[DB FAIL] USER CANT UPDATED`
        });
    }
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            msg: 'ID NOT IN PARAMS'
        })
    }
    try {

        const user = await Usuario.findByPk(id);
        console.log(user);
        await user.destroy();
        return res.json({
            msg: 'API DELETE - ' + `USER ID : ${id} DELETED`
        });
    }
    catch {
        return res.status(402).json({
            msg: 'API DELETE - ' + `USER ID : ${id} CANT DELETE`
        });
    }

}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}