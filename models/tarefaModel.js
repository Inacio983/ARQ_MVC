class Tarefa { 
	constructor(id, title, description) { 
		this.id = id; 
		this.title = title; 
		this.description = description; 
	} 

	static async listarTarefas(){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM tarefa");		
	}

	static async buscarTarefa(id_tarefa){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM tarefa WHERE id_tarefa="+id_tarefa);
	}

	static async deleteTarefa(id_tarefa){
		const Database= require('./Database');
		const resp= await Database.query("DELETE FROM tarefa WHERE id_tarefa="+id_tarefa);
		if(resp){
			if(resp.affectedRows >0)
				return true;
			else
				return false;''
		}else{
			return false;
		}		
	}

	async salvar(){
		const Database= require('./Database');
		let resp = await Database.query(`INSERT INTO tarefa (title,description) VALUES ('${this.title}','${this.description}')`);
		console.log(resp);
		this.id=resp.insertId;
	}
} 

module.exports = Tarefa;
	