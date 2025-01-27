const fs = require('fs');
const jsmediatags = require('jsmediatags');

// Function to read URLs from a text file
function readUrlsFromFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return data.split('\n').filter(url => url.trim() !== '');
}

// Function to get metadata from a URL using jsmediatags
function getMetadata(url) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(url, {
      onSuccess: function(tag) {
        let metadata = {
          link: url,
          title: tag.tags.title || 'Unknown Title',
          artist: tag.tags.artist || 'Unknown Artist',
          album: tag.tags.album || 'Unknown Album',
          year: tag.tags.year || 'Unknown Year',
        };

        resolve(metadata);
      },
      onError: function(error) {
        reject(`Error fetching metadata for ${url}: ${error}`);
      }
    });
  });
}

// Function to process all URLs and fetch metadata for each
async function processUrls(inputFilePath, outputFilePath) {
  const urls = readUrlsFromFile(inputFilePath);
  const metadataList = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`Processing URL ${i + 1} of ${urls.length}: ${url}`);
      const metadata = await getMetadata(url);
      metadataList.push(metadata);
      console.log(`Done processing URL ${i + 1}: ${url}`);
    } catch (error) {
      console.error(error);
    }
  }

  // Write the list to the output file
  fs.writeFileSync(outputFilePath, JSON.stringify(metadataList, null, 2), 'utf-8');
  console.log(`All URLs processed. Metadata written to ${outputFilePath}`);
}

// Call the function with your input file and output file paths
processUrls('input_urls.txt', 'output_metadata.json');

