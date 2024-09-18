import { json } from "sequelize"
import Tarefa from "../models/tarefaModel.js"
import { z } from "zod"
import formatZodError from "../helpers/zodError.js"

// Validações com ZOD
const createSchema = z.object({
    tarefa: z.string().min(3, {message:"A tarefa deve ter pelo menos 3 caracteres"}).transform((txt)=>txt.toLowerCase()),
    descricao: z.string().min(5, {message: "A descrição deve ter pelo menos 5 caracteres"})
})

// tarefas?page=1&limit=10
export const getAll = async (request, response) => {
    // try {
    //     const tarefas = await Tarefa.findAll()
    //     response.status(200).json(tarefas)
    // } catch (error) {
    //     response.status(500).json({message: "Erro ao listar tarefas"})
    // }

    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const tarefas = await Tarefa.findAndCountAll({
            limit,
            offset
        })
        // console.log(tarefas)
        // console.log(page, limit, offset)
        const totalPaginas = Math.ceil(tarefas.count/ limit);
        response.status(200).json({
            totalTarefas: tarefas.count,
            totalPaginas,
            paginaAtual: page,
            itemnsPorPagina: limit,
            proximaPagina: totalPaginas === 0 ? null : `http://localhost:3333/tarefas?page=${page + 1}`,
            tarefas: tarefas.rows
        })
    } catch (error) {
        response.status(500).json({message: "Erro ao buscar tarefas "})
    }
}

// Precisa de Validação
export const create = async (request, response) => {

    // Implementar a validação
    const bodyValidation = createSchema.safeParse(request.body)
    // console.log(bodyValidation)
    if(!bodyValidation.success){
        response.status(400).json({message:"Os dados recebidos do corpo da requisição são inválidos", 
        detalhes: formatZodError(bodyValidation.error)
    })
        return
    }
    return

    const {tarefa, descricao} = request.body
    const status = "pendente"

    if(!tarefa){
        response.status(400).json({err: "A tarefa é obrigatória"})
        return
    }
    if(!descricao){
        response.status(400).json({err: "A descrição é obrigatória"})
        return
    }

    const novaTarefa = {
        tarefa, 
        descricao, 
        status
    }

    try {
        await Tarefa.create(novaTarefa)
        response.status(201).json({message: "Tarefa cadastrada"})
    } catch (error) {
        console.error(error)
        response.status(500).json({message: "Erro ao cadastrar tarefa"})
    }
}

// Precisa de Validação
export const getTarefa = async (request, response) => {
    const {id} = request.params

    try {
        // const tarefa = await Tarefa.findOne({ where: {id} })
        const tarefa = await Tarefa.findByPk(id)
        if(tarefatarefa === null){
            response.status(404).json({message: "Tarefa não encontrada"})
            return
        }
        response.status(200).json(tarefa)
    } catch (error) {
        response.status(500).json({message: "Erro ao buscar tarefa"})
    }
}

export const updateTarefa = async (request, response) => {
    const {id} = request.params
    const {tarefa, descricao, status} = request.body

    // Validações
    if(!tarefa){
        response.status(400).json({message: "A tarefa é obrigatória"})
    }
    if(!descricao){
        response.status(400).json({message: "A descrição é obrigatória"})
    }
    if(!status){
        response.status(400).json({message: "O status é obrigatória"})
    }
    
    const tarefaAtualizada = {
        tarefa,
        descricao,
        status
    }

    try {
        const [linhasAfetadas] = await Tarefa.update(tarefaAtualizada, { where: {id} })

        if(linhasAfetadas <= 0){
            response.status(404).json({message: "Tarefa não encontrada"})
            return
        }
        response.status(200).json({message: "Tarefa atualizada"})
    } catch (error) {
        response.status(500).json({message: "Erro ao atualizar tarefa"})
    }
}

export const updateStatusTarefa = async (request, response) => {
    const {id} = request.params
    
    try {
        const tarefa = await Tarefa.findOne({ raw: true,  where: {id}})
        if(tarefa === null){
            response.status(404).json({message: "Tarefa não encontrada"})
            return
        }

        if(tarefa.status === "pendente"){
            await Tarefa.update({status: "concluida"}, {where: {id}}) //Quando a propriedade e valor for o mesmo nome, pode colocar apenas um
        } else if(tarefa.status === "concluida"){
            await Tarefa.update({status: "pendente"}, {where: {id}})
        }

        const tarefaAatualizada =  await Tarefa.update({status: "pendente"}, {where: {id}})
        response.status(200).json(tarefaAatualizada)
    } catch (error) {
        console.error(error)
        response.status(500).json({err: "Erro ao atualizar tarefa"})
    }
}

export const getTarefaPorSituacao = async (request, response) => {
    const {situacao} = request.params 

    if(situacao !== "pendente" && situacao !== "concluida"){
        response.status(400).json({message: "Situação inválida"})
        return
    }

    try {
        const tarefas = await Tarefa.findAll({where: { status: situacao}, raw: true})
        response.status(200).json(tarefas)
    } catch (error) {
        response.status(500).json({err: "Erro ao buscar tarefas"})
    }
}