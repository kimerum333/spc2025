import requests

url = 'https://jsonplaceholder.typicode.com/users'

# dictionary!
new_post = {
    "userId" : 1,
    "title" : "hello",
    "body" : "world"
}


# response = requests.post(url,json=new_post)
# print(response.json())

## Put 
post_id = 1
updated = {
    "userId" : 1,
    "title" : "hello2",
    "body" : "world2"    
}

# response = requests.put(f"{url}/{post_id}", json=updated)
# print(response.json())

## Patch / 풋과 달리 일부만 수정할 때 쓴다.
post_id = 1
patched = {
    "name" : "changed!"
}

# response = requests.patch(f"{url}/{post_id}", json=patched)
# print(response.json())

# delete
response = requests.delete(f"{url}/{post_id}")
print(response.status_code)
print(response.json())