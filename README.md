##server for 
-storing data
-user register
-subscriber

api server for lib system

fine system
user 6/3/2025 - 6/6/2025
9/6/2025 => 50*3=150/-
3 months - basic
6 months - std
12 months - premium
if the sub type is std && sub date is 6/3/2025
=> then sub valid till 6/9/2025
within sub date if we  miss the renewal then >> 50/- day
sub date is also been missed >> and also miss the renewal >> 100 + 50/- day
>>book1
basic
6/3/2025 -> sub date
7/3/2025 -> borrowed book from lib
book renewal date is on 21/3/2025
23/3/2025 -> we need to pay a fine of 50*2=100/-

>>book2
basic
6/3/2025 -> sub date
7/3/2025 -> borrowed book from lib
book renewal date is on 21/3/2025
23/6/2025 -> we need to pay a fine of 100+(50*no.of days)/-


#routes and endpoints

/users
POST : create a new user
GET : get all user info here

user/id
GET : get a user by id
PUT : update a user by their id
DELETE : delete a user by id

users/subscription-details/id
GET : get user subscription details
        date of sub
        valid till
        is there any fine

/books
GET : get all the books
POST : create add a new book

books/id
GET : get a book by id
PUT : update a book by id 

books/issuedd
GET : get all the issued books

books/issued/withFine


npm init
npm i nodemon --save-dev