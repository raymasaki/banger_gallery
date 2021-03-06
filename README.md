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

## Detail Page
- User can click on a single cover to access an overlay of the mixtape detail page with:
  - Material transition grow of artwork thumb to overlay
  - Mixtape artwork
    - Color spread
      - Set most dominant color for preloading color
    - Complexity score
  - Mixtape release date
  - Artist name
  - Artist location
  - Number of downloads
  - Related covers (by different artists)
  - More from the artist (if applicable)

## Complexity Score
- Complexity score is a score out of 100 depending on several factors:
  - Comparison of the RGB values to see how varied they are
    - RGB values are each 0-255, so you can compare each color value set to its adjacent value set. The larger the difference the more colorful the cover is.
    - If the RGB value sets are similar to one another, they are similar in color and can get grouped together as a single percentage value.
  - Evenness of the color spread
    - Once the colors have been grouped by percentage (i.e. blue, navy, teal get grouped as one), you can compare the overall minimalism by checking the spread
      - If the overall number of colors is low and one of the values is particularly high, the cover is minimal
      - If the overall number of colors is large and all values have even low percentages, the cover is complex

## Color Rounding
- Users can only select from 18 colors, so the color analysis needs to be able to bucket an RGB value into the 18 values.
- Approach:
  - Round each R, G, B value to either 0, 125, or 255 (12 total combinations)
  - If the values are 0, 0, 0 then the color is black
  - If the values are 125, 125, 125 then the color is gray
  - If the values are 255, 255, 255 then the color is white

![Color Wheel](http://i.imgur.com/CWFDM5k.jpg)

## Wireframes

#### Color Filter
![Banger Gallery 1](http://i.imgur.com/TQiLN5n.png)
#### Location Filter
![Banger Gallery 2](http://i.imgur.com/xIMOR7y.png)
#### Artist Search
![Banger Gallery 3](http://i.imgur.com/Cl1OtPE.png)
#### Sorting
![Banger Gallery 4](http://i.imgur.com/UxvVicw.png)
#### Detail Modal
![Banger Gallery 5](http://i.imgur.com/IUGRSw5.png)

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
- Create complexity score and cover comparison for detail modal
- Create UI animation test

### Technologies
- MEAN Stack
- [Import.io](https://import.io/): Data scraper
- [CSV2JSON](http://www.csvjson.com/csv2json): Converts CSV files to JSON
- [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback): Write a file from a route
- [Angucomplete](http://ghiden.github.io/angucomplete-alt/): Auto-fill search results
- [Isotope](http://isotope.metafizzy.co/): Sorting/Filtering plugin
- [Color Summarizer API](http://mkweb.bcgsc.ca/color-summarizer/): Color analysis

### Inspiration
- [Frightgeist](https://frightgeist.withgoogle.com/): Data visualization of Halloween costume Google searches
- [Most Successful Labels](http://poly-graph.co/labels/): Data vis of most successful hip-hop labels by year
- [Predominant.ly](http://predominant.ly/): Album covers by color-picker

### Known Bugs / Unresolved Problems
- Bug: If you search for artists like YG or Lil B results with those characters will show e.g. T'yg'a or 'Lil B'oosie
- Bug: Artist search only works on keypress 'enter', it should work on click as well
- Bug: After closing the modal, use can't scroll until you move the mouse
- Improvement: Hide the scrollbars for overflow elements
- Improvement: When a detail modal is open, the URL route should update
