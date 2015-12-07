# Banger Gallery

## Data Scraping
- Scrape top 500 mixtapes from DatPiff
  - Convert to JSON
- Run mixtape covers through color summarizer API
  - Analyze color data and push JSON as object into mixtape data JSON

## Filtering and Sorting
- User can filter by **color & location OR artist**
  - If user selects a color, the covers are clustered by state (alphabetical)
  - If user selects a location, the covers are clustered by color (spectrum)
  - If user selects an artist, the covers are clustered by color (spectrum)
- Stretch:
  - Clusters are organized by minimal to complex (i.e. minimal yellow to complex yellow)

## Tooltip
- User can hover over the cover to get a tooltip with:
  - Artist
  - Title
  - City, State
  - Number of downloads

## Detail Page
- User can click on a single cover to access an overlay of the mixtape detail page with:
  - Material transition grow of artwork thumb to overlay
  - Mixtape artwork
    - Color spread
      - Set most dominant color for preloading color
    - Complexity score
      - Evenness of the color spread
      - Comparison of the RGB values to see how disparate they are
  - Mixtape release date
  - Artist name
  - Artist location
  - Number of downloads
  - Related covers (by different artists)
  - More from the artist (if applicable)

## Color Rounding
- Users can only select from 15 colors, so the color analysis needs to be able to bucket an RGB value into the 15 values.
- Approach:
  - Round each R, G, B value to either 0, 125, or 255 (12 total combinations)
  - If the values are 0, 0, 0 then the color is black
  - If the values are 125, 125, 125 then the color is gray
  - If the values are 255, 255, 255 then the color is white

![Color Wheel](http://i.imgur.com/CWFDM5k.jpg)

## Research
- Wireframes
- Isotope Research
- Dynamic Filtering (Search vs Location/Color)
- Angular Autocomplete
- Image Color Summarizer API
  - Seed mixtape data with analysis data
- Complexity Analysis Algorithm
- Tooltip
- Preloading and AJAX lazy loading
  - Before the image loads and fades in, each cover is represented by it's predominant hex value
  - Images don't load in until user scrolls to that section

### Initial Tests
- Make a MEAN stack app that displays the top 20
- Make an app that runs the top 20 image URLs through the API and saves the analysis to the object
- Use JSON data that has the analysis and run isotope on it
- Create color rounding function that updates the JSON data
- Create data visualization for color spread

### Technologies
- MEAN Stack
- [Import.io](https://import.io/): Data scraper
- [CSV2JSON](http://www.csvjson.com/csv2json): Converts CSV files to JSON
- [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback): Write a file from a route
- [Angular Autocomplete](https://material.angularjs.org/latest/demo/autocomplete)
- [Isotope](http://isotope.metafizzy.co/): Sorting/Filtering plugin
- [Color Summarizer API](http://mkweb.bcgsc.ca/color-summarizer/): Color analysis

### Inspiration
- [Frightgeist](https://frightgeist.withgoogle.com/): Data visualization of Halloween costume Google searches
