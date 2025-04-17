start = 1
end = 6

for i in range(start,end):
    print('*'*i)


for i in range(start,end):
    blank = end-start-i
    print(' '*blank+'*'*i)

for i in range(start,end):
    blank = blank = end-start-i
    print(' ' * blank + '*' * (i*2-1 ) + ' ' * blank)

for i in range(start,end+end-1):
    j = i
    blank = blank = end-start-i
    print(' ' * blank + '*' * (i*2-1 ) + ' ' * blank)
