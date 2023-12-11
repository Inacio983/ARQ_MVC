class Usuario { 
	constructor(id, title, description) { 
		this.id = id; 
		this.title = title; 
		this.description = description; 
	} 
	static async autenticar(email, senha){
		const md5 = require('md5');
		const Database= require('./Database');
		let sql=`SELECT * FROM usuario WHERE email ='${email}' AND senha ='${md5(senha)}';`;
		console.log(sql);
		return await Database.query(sql);
		
	}

	static async listarUsuarios(){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM usuario");
		
	}

	static async buscarUsuario(idUsuario) {
		const Database= require('./Database');
		return await Database.query(`SELECT * FROM usuario WHERE id_usuario=${idUsuario}`);
		
	}

	static async salvar(req, idUsuario){
		const Database= require('./Database');
		await Database.query(`UPDATE usuario SET nome='${req.nome}' , email= '${req.email}' WHERE id_usuario=${idUsuario};`);
		
		return await Database.query(`SELECT * FROM usuario WHERE id_usuario=${idUsuario}`);
		
	}

} 

module.exports = Usuario;
	