import sqlite3

def login(username:str, password:str):
    con  = sqlite3.connect('users.db')
    cur = con.cursor()
    query = 'SELECT COUNT(*) FROM users WHERE username = ? AND password = ?'
    cur.execute(query,(username,password))
    count:tuple = cur.fetchone()
    con.close()
    return count[0]

#print (login('user1','password1'))

