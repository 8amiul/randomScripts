#!/bin/bash

# Check if a file argument was passed
if [ $# -ne 1 ]; then
    echo "Usage: $0 <file_with_urls>"
    exit 1
fi

# Read the input file
input_file="$1"

# Start the JavaScript array
echo "const urls = [" > urls_to_list.js

# Read each URL from the file and append it to the JavaScript array
while IFS= read -r url; do
    echo "    \"$url\"," >> urls_to_list.js
done < "$input_file"

# Remove the last comma (to make it valid JavaScript)
sed -i '$ s/,$//' urls_to_list.js

# Close the array
echo "];" >> urls_to_list.js

echo "JavaScript array has been written to 'urls_to_list.js'."
