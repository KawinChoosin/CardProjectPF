step to setup 
 docker-compose up -d --build    
set up database 
     docker exec -it card_todo_db mysql -u root -p 
     CREATE USER 'appuser'@'%' IDENTIFIED BY '1234';
     GRANT ALL PRIVILEGES ON card_todo_db.* TO 'appuser'@'%';
     FLUSH PRIVILEGES;