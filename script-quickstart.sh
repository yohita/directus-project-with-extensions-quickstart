#!/bin/bash

# Get the directory where this script is located
script_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#run npm i if node_modules does not exist
if [ ! -d "$script_directory/node_modules" ]; then
  npm i
fi

# Parent directory where your subdirectories are located
parent_directory="$script_directory/src-extensions"

# Directory where you want to copy the 'dist' folders
destination_directory="$script_directory/extensions"

# Loop through each subdirectory in the parent directory
for directory in $parent_directory/*; do

    # Go to Directory
    cd $directory
    echo  $directory;
    
    #check if node_modules exists, if not run npm i
    if [ ! -d "$directory/node_modules" ]; then
      npm i
    fi

    # Build the extension
    npm run build

    # Get the name of the subdirectory
    directory_name=${directory##*/}

    # Target Directory name with directus-extension prefix
    directory_name="directus-extension-$directory_name"

    # Create the destination directory if it doesn't exist
    mkdir -p $destination_directory/$directory_name

    # Copy the 'dist' folder to the destination directory
    cp -r $directory/dist $destination_directory/$directory_name
    # copy package-json
    cp $directory/package.json $destination_directory/$directory_name
done

#check if uploads folder exists if not create it
if [ ! -d "$script_directory/uploads" ]; then
  mkdir -p $script_directory/uploads
fi


#check if .env file exists if not copy .env-sample to .env
if [ ! -f "$script_directory/.env" ]; then
  cp $script_directory/.env-sample $script_directory/.env 

  # Define the new value for DB_FILENAME
  new_db_filename="$script_directory/data.db"

  # Escape the special characters in the new value
  escaped_db_filename=$(echo "$new_db_filename" | sed 's/[\/&]/\\&/g')

  # Use sed to update the DB_FILENAME variable in the .env file
  sed -i.bak "s|^\(DB_FILENAME=\)\".*\"$|\1\"$new_db_filename\"|" "$script_directory/.env" && rm "$script_directory/.env.bak"

fi
  

#cd to script_directory
cd $script_directory

# Run the index.cjs file to start the server
node index.cjs


