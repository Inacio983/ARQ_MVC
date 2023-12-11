const Tarefa = require('../models/tarefaModel');
let tarefas = [];
async function getTarefas(req, res) {
	tarefas= await Tarefa.listarTarefas(req.session.user.id_usuario);
	res.render('tarefas', { tarefas });
}

async function getTarefa(req, res) { 
	let tarefa= await Tarefa.buscarTarefa(req.params.idTarefa);  	
	if(tarefa.length > 0){
		console.log(tarefa);
		tarefa=tarefa[0];

		res.render('tarefa', {tarefa});
	}else{
		res.render('404');
	}
	 
} 

async function addTarefa(req, res) { 
	const { titulo, descricao } = req.body; 
	const idUsu = req.session.user.id_usuario;
	const tarefa = new Tarefa(null, titulo, descricao, idUsu); 
	await tarefa.salvar();
	res.redirect('/tarefas'); 
} 


async function deleteTarefa(req, res){
	let msg = null;
	if(await Tarefa.deleteTarefa(req.params.idTarefa)){
		msg = {
			class: "alert-success",
			msg: "Tarefa excluida com extremo sucesso!"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}else{
		msg = {
			class: "alert-danger",
			msg: "A exclusão falhou miseravelmente!"
		}
		req.session.msg=msg
		res.redirect("/tarefas");
	}
}

async function checar(req, res){
await Tarefa.checar(req.params.idTarefa, req.session.user.id_usuario);
res.redirect("/tarefas");
}

async function editTarefa(req, res){

}

module.exports = { getTarefas, getTarefa, addTarefa, deleteTarefa, editTarefa, checar };
