import sqlite3

con  = sqlite3.connect('users.db')

cur = con.cursor()
cur.execute('''
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
    )            
''')

cur.execute('SELECT COUNT(*) FROM users')
count = cur.fetchone()
#print(count)
if count == 0 :
    cur.execute('''
    INSERT INTO users (name, age) VALUES (?,?)
    ''', ('Alice',30)
    )

    cur.execute('''
        INSERT INTO users (name, age) VALUES (?,?)
        ''', ('Bob',15)
    )
    con.commit()
else:
    print(f"이미 데이터가 {cur}개 존재함.")

con.close()