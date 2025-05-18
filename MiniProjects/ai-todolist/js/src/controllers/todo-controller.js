const todoRepo = require('../repositories/db');

// 모든 할 일 가져오기
function getAllTodos(req, res) {
    const todos = todoRepo.getAllTodos();
    res.json(todos);
}

// 할 일 추가
function addTodo(req, res) {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });
    const newTodo = todoRepo.addTodo(text);
    res.status(201).json(newTodo);
}

// 할 일 토글 (완료/미완료)
function toggleTodo(req, res) {
    const { id } = req.body;
    if (typeof id !== 'number') return res.status(400).json({ error: 'id is required and must be a number' });
    const updated = todoRepo.toggleTodo(id);
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    res.json(updated);
}

// 할 일 삭제
function deleteTodo(req, res) {
    const { id } = req.body;
    if (typeof id !== 'number') return res.status(400).json({ error: 'id is required and must be a number' });
    const deleted = todoRepo.deleteTodo(id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    res.json(deleted);
}

module.exports = {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
};