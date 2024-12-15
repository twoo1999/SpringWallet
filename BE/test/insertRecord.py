import pymysql
import uuid
import random
from datetime import datetime, timedelta
conn = pymysql.connect(host='127.0.0.1', user='root', password='0000', db='springwallet', charset='utf8')


cur = conn.cursor()

# category 리스트 가져오고
# method 리스트 가져오고

# category에 따라 금액 정하고 

start_date = datetime(2023, 1, 1)
end_date = datetime(2024, 11, 25)
date_range = (end_date - start_date).days


for i in range(0, 100):

    name = 'test' + str(i)

    cur.execute("select m.id, c.id, c.type from member m join category c on m.id = c.user_id where m.name=%s", name)

    categories = cur.fetchall()
    cur.execute("select mm.id from member m join method mm on m.id = mm.user_id where m.name=%s", name)
    methods = cur.fetchall()

    clen = len(categories)
    mlen = len(methods)
    uid = categories[0][0]
    for i in range(1000):   
        cidx = random.randint(0, clen-1)
        midx = random.randint(0, mlen-1)
        category = categories[cidx][1]
        method = methods[midx][0]
        type = categories[cidx][2]
        amount = 0
        if(type == 'REVENUE'):
            amount = random.randint(1, 1000000)
        else:
            amount = random.randint(1, 1000000) * -1

        item = 'item' + str(i)
        memo = 'memo' + str(i)

        timestamp = (start_date + timedelta(days=random.randint(0, date_range))).strftime("%Y-%m-%d")
        data = [uid, category, item, timestamp, method, amount, memo]

        cur.execute("insert into record (user_id, category_id, item, timestamp, method_id, amount, memo) values(%s, %s, %s, %s, %s, %s, %s)", data) 


conn.commit()