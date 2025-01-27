path="cover_arts"

# Create the cover_arts directory if it doesn't exist
mkdir -p "$path"

for i in *; do
    # Ensure $i is a file and not a directory
    if [ -f "$i" ]; then
        # Extract title
        title=$(eyeD3 "$i" | grep title | sed 's/title: //g' | sed 's/^[[:space:]]*//')  # Strip any leading spaces
        if [ -z "$title" ]; then
            title="untitled"  # In case there's no title, set a default
        fi
        
        # Write the cover art to the $path directory
        eyeD3 --write-images="$path" "$i"
        
        # If the image is present, rename it with the title
        if [ -f "$path/FRONT_COVER.jpg" ]; then
            mv "$path/FRONT_COVER.jpg" "$path/$title.jpg"
            echo "$title completed"
        else
            echo "No cover art found for $i"
        fi
    fi
done

