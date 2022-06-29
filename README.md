# Fork this repo then follow the instructions in this README.

# Development Tasks:
### <a name="task1"></a>**1: Live search**
You'll have to develop a live search for both characters and locations. The live search should not send a request for every keystroke but instead should have a 300ms cooldown(debounce) on it.

A basic example of a similar component can be found here: https://github.com/dom-the-dev/react-search-bar

<br>

### **2: Historical data**
You'll have to develop a container for the previously viewed items on the right side of the webpage that should contain all previously viewed(clicked) characters and locations in chronological order. This data can either be stored in the browser's local storage or in a redux store, the choice is up to you.

The container should not take up more than half the height of the screen. Make it scrollable should its content overflow.

<br>

### **3: Extended filters**
You'll have to develop a customizable filter that lets you search characters by the following attributes:
- status
- species
- type
- gendeer

You can look up the possible values on the [Rick&Morty Api Documentation page](https://rickandmortyapi.com/documentation/#filter-characters).

<br>

### **3: Episode tab**
Extend the current two tabs (characters and locations) with an "Episodes" tab that also has the live search developed in [Task 1](#task1). Clicking on an episode card should bring up a modal that contains the current episodes name, it's airing date, the episode identifier (S00E00) and the pictures of all available characters in that episode. The character pictures should be clickable, and should navigat to the filtered characters screen. 

*For example if you click on Rick Sanchez on episode 1, you should be navigated to the characters screen with the results filtered down to Rick Sanchez.*

<br>

# UI tasks:
#### **1: The landing page has no boundaries for the description:**
![Alt text](./tasks/screenshots/fullwidth.png?raw=true "Fullwidth")

<br>

#### **2: Character cards are overlapping:**
The page currently "breaks" on a larger screen. Open up the application, scroll down a bit and check the images on the character cards. You should see that the images are being overlapped by the next row of cards:
![Alt text](./tasks/screenshots/overlapping_cards.png?raw=true "Overlapping cards")

<br>

#### **3: Clickable elements don't change the cursors appearance on hover:**
![Alt text](./tasks/recordings/cursor.gif?raw=true "Cursor")

#### **4: The page should support the following breakpoints:**
```
'sm': '640px',
// => @media (min-width: 640px) { ... }

'md': '768px',
// => @media (min-width: 768px) { ... }

'lg': '1024px',
// => @media (min-width: 1024px) { ... }

'xl': '1280px',
// => @media (min-width: 1280px) { ... }

'2xl': '1536px',
// => @media (min-width: 1536px) { ... }
```




---

<br>

## To run this project in docker locally with HOT reload
```
docker build . -t cc/react-morty && \ 
docker run -it -v ${PWD}/src:/usr/src/app/src -p 8080:3000 cc/react-morty
```

Then visit http://localhost:8080

