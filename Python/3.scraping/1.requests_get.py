import requests

url = 'https://jsonplaceholder.typicode.com/users'
response = requests.get(url)
print(response)
users = response.json()
# print(users)

#404 : 서버는 찾았지만, 요청하는 리소스를 서버가 찾지 못했기에.
#아예 에러 서버 자체를 찾지 못한 경우


for user in users:
    # print(user,end='\n')
    id = user['id']
    name = user['name']
    username = user['username']
    email = user['email']

    print(f"{id:<2} {name:30} {username:20} {email:>30}")
    
