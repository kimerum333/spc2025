from flask import Flask, request,make_response, jsonify #jsonyfy 는 딕셔너리의 json 화를 담당.


app = Flask(__name__)

users = [
    { 'id': 1, 'name': 'Alice', 'age': 25, 'phone': '123-456-7890' },
    { 'id': 2, 'name': 'Bob', 'age': 30, 'phone': '234-567-8901' },
    { 'id': 3, 'name': 'Charlie', 'age': 22, 'phone': '345-678-9012' },
    { 'id': 4, 'name': 'Diana', 'age': 28, 'phone': '456-789-0123' },
    { 'id': 5, 'name': 'Eve', 'age': 35, 'phone': '567-890-1234' },
    { 'id': 6, 'name': 'Frank', 'age': 27, 'phone': '678-901-2345' },
    { 'id': 7, 'name': 'Grace', 'age': 24, 'phone': '789-012-3456' },
    { 'id': 8, 'name': 'Hank', 'age': 31, 'phone': '890-123-4567' },
    { 'id': 9, 'name': 'Ivy', 'age': 29, 'phone': '901-234-5678' },
    { 'id': 10, 'name': 'Jack', 'age': 26, 'phone': '012-345-6789' },
    { 'id': 11, 'name': 'Karen', 'age': 33, 'phone': '111-222-3333' },
    { 'id': 12, 'name': 'Leo', 'age': 21, 'phone': '222-333-4444' },
    { 'id': 13, 'name': 'Mia', 'age': 34, 'phone': '333-444-5555' },
    { 'id': 14, 'name': 'Nate', 'age': 23, 'phone': '444-555-6666' },
    { 'id': 15, 'name': 'Alice', 'age': 32, 'phone': '555-666-7777' },
]


@app.route('/')
def main():
    return "메인"

@app.route('/users')
def user():
    return jsonify(users)


@app.route('/users/<int:user_id>')
def get_user_by_id(user_id):
    # user = None
    # for u in users:
    #     if u['id'] == user_id:
    #         user = u
    #         break
    # 리스트 컴프리헨션
    user = next((user for user in users if user['id'] == user_id), None)

    if user is not None:
        return jsonify(user)
    else:
        return jsonify({ "code":'errer', "message":'User not found'}), 404

@app.route('/search') # search?name=Alice
def search_user():
    query = request.args.get("name")
    if not query :
        reply = {"error" : "name is necessary 이름은 필수."}
        response = make_response(jsonify(reply))
        response.headers["Content-Type"] = "application/json; charset = utf-8"
        return jsonify(), 400
    
    results = [user for user in users if query.lower() in user['name'].lower()]
    return jsonify(results)

if __name__ == "__main__":
    app.run()