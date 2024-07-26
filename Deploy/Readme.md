step to setup
docker-compose up -d --build  
set up database
CREATE DATABASE IF NOT EXISTS card_todo_db;

     USE card_todo_db;

     CREATE TABLE IF NOT EXISTS Todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    detail TEXT,
    done BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );

     docker exec -it card_todo_db mysql -u root -p
     CREATE USER 'appuser'@'%' IDENTIFIED BY '1234';
     GRANT ALL PRIVILEGES ON card_todo_db.* TO 'appuser'@'%';
     FLUSH PRIVILEGES;

