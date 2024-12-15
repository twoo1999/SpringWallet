import pymysql
import uuid

conn = pymysql.connect(host='127.0.0.1', user='root', password='0000', db='springwallet', charset='utf8')


cur = conn.cursor()

def insert(dbname, row, value):
    sql = 'insert into '
    sql += dbname + ' '
    if(len(row) != 0):
        sql += '('+','.join(row)+')'
    sql += ' values('

    sql += ','.join(['%s']*len(value))
    sql += ')'
    cur.execute(sql, value)


names = []
emails = []
rows = ['id', 'email', 'name', 'role', 'socialtype', 'analysis_token', 'last_analysis_date']
for i in range(0, 1000):
    names.append('test'+str(i))
    
for name in names:
    emails.append(name + '@test.com')


role = 'USER'
socialtype = 'GOOGLE'
analysis_token = 5
last_analysis_date = "2024-12-16"


for i in range(0, len(names)):
    insert('member', rows, [uuid.uuid4().bytes, emails[i], names[i], role, socialtype, analysis_token, last_analysis_date])


conn.commit()