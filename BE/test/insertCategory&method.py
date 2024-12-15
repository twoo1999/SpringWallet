import pymysql
import uuid

conn = pymysql.connect(host='127.0.0.1', user='root', password='0000', db='springwallet', charset='utf8')


cur = conn.cursor()

def insert(table, row, value):
    sql = 'insert into '
    sql += table + ' '
    if(len(row) != 0):
        sql += '('+','.join(row)+')'
    sql += ' values('

    sql += ','.join(['%s']*len(value))
    sql += ')'
    cur.execute(sql, value)




def select(dbname, row, where):
    sql = 'select '
    sql += ','.join(row)
    sql += ' from ' + dbname
    sql += ' where ' + where[0] + "=%s"
    cur.execute(sql, where[1])
    return cur.fetchone()[0]

names = []
for i in range(0, 1000):
    names.append('test'+str(i))
    


crows = ['user_id', 'category_name', 'type', 'status']
mrows = ['user_id', 'method_name', 'status']
status = 'ACTIVE'
etype = 'EXPENSE'
rtype = 'REVENUE'
rcategories =['월급', '용돈']
ecategories =['식비', '뷰티', '패션', '교통비', '취미', '공부']
methods = ['현금', '카드']

for i in range(0, 1000):
    uid = select('member', ['id'], ['name', 'test'+str(i)])
    for rcategory in rcategories:
        insert('category', crows, [uid, rcategory, rtype, status])
    for ecategory in ecategories:
        insert('category', crows, [uid, ecategory, etype, status])

    for method in methods:
        insert('method', mrows, [uid, method, status])

    

conn.commit()

