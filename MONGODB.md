# Step 1: Exec into the container
docker exec -it mongo-container bash

# Step 2: Open MongoDB shell
mongosh -u user -p password --authenticationDatabase admin

# Step 3: Show all databases
show dbs

# Step 4: Switch to your desired database
use mydatabase

# Step 5: Show all collections in the selected database
show collections

# Step 6: Inspect a collection's documents
db.mycollection.find().pretty()
