# Assignment 3 — Animal Adoption Board

In Assignment 2, you worked with the shelter's animals in the console. Now you
will put them on the page. The HTML, CSS, and animal data are provided. Your job
is to write the JavaScript that displays the animals and responds to the user.

Every feature in this app follows the same pattern from Week 5:

1. The user does something (clicks a button, picks a sort option).
2. An event listener runs a callback function.
3. The callback updates the data or decides what should be shown.
4. The page is redrawn so the user can see the result.

By completing the assignment, you will practice the main ideas from Weeks 4
and 5:

- using callback functions with `forEach()`, `find()`, `filter()`, and `sort()`;
- creating and updating page elements with the DOM;
- listening for button clicks and changes to a menu; and
- updating the page after the data changes.

## Setting up

1. Open the project folder in VS Code.
2. Open `index.html` with Live Server.
3. Press **F12** and select the **Console** tab. Keep it open the whole time.

Use a hard refresh (**Ctrl+Shift+R**) to reset the page.

## Files

- `index.html` contains the page and its filter and sort controls.
- `style.css` contains the provided page styles.
- `script.js` contains the animal data and all five TODO sections.

**You only need to edit `script.js` for the required tasks.** You may edit
`index.html` and `style.css` for extra credit.

## The data

These are the same eight animals from Assignment 2: three cats, four dogs, and
one rabbit. Four have been adopted and four are still available.

```js
{ id: 1, name: "Luna", species: "cat", age: 3, adopted: false }
```

**Do not change the starting `animals` array.** The expected results below
depend on it.

---

## Your tasks

Complete the five TODO sections in `script.js`, in order.

The TODOs depend on each other. A TODO can call a function you haven't
written yet, so some features won't work until a later TODO is complete.
This is expected and doesn't mean your code is wrong. Use this table to
check what should work after each TODO:

| After you complete… | What should work |
| --- | --- |
| TODO 1 | The eight animal cards appear. The buttons do nothing yet. |
| TODO 2 | Nothing new is visible. Clicking a button changes the data, but the page doesn't redraw until TODO 3 is complete. |
| TODO 3 | Adopt and Return work. The filter buttons and sort menu do nothing yet. |
| TODO 4 | The available count appears and updates when you adopt or return an animal. |
| TODO 5 | Everything works, including filtering and sorting. |

If something in the table doesn't work at the right step, check the console
for errors before you move on.

### TODO 1: Display the animals

Complete `displayAnimals(animalArray)` so it creates one card for every animal
in the array it receives. Use `forEach()`.

Each card must:

- use the `animal-card` class;
- show the animal's name, species, and age;
- say whether the animal is **Available** or **Adopted**;
- also use the `adopted` class when the animal has been adopted;
- include an **Adopt** button for an available animal or a **Return** button
  for an adopted animal; and
- attach a click listener to that button that calls `toggleAdoption()` with
  the animal's id.

Create the card and its contents with DOM methods such as
`document.createElement()`, `textContent`, `classList.add()`, and
`append()` or `appendChild()`.

**Required comment:** above your click listener, explain *when* its callback
runs and *how* it knows which animal to change. (Hint: think back to closures
in Assignment 2.)

### TODO 2: Adopt or return an animal

Complete `toggleAdoption(animalId)`.

Use `find()` to locate the animal with the matching id. If no animal matches,
the function should return without causing an error. Otherwise, change the
animal's `adopted` value to its opposite and call `updateDisplay()`.

The same function handles both adopting and returning an animal.

### TODO 3: Filter and sort the animals

Complete `updateDisplay()`.

The variables `activeFilter` and `activeSort` describe what the user currently
wants to see.

- When the filter is `available`, use `filter()` to keep animals whose
  `adopted` value is `false`.
- When the filter is `adopted`, use `filter()` to keep animals whose `adopted`
  value is `true`.
- When the sort is `name`, use `sort()` to order animals alphabetically.
- When the sort is `age`, use `sort()` to order animals from youngest to
  oldest.

Pass the filtered and sorted array to `displayAnimals()`, then call
`updateCount()`.

`sort()` changes the array it is called on. Sort a copy so that the original
`animals` array stays in its original order. You can make a copy with
`slice()`.

**Required comment:** explain why you sort a copy instead of sorting `animals`
itself.

### TODO 4: Show the available count

Complete `updateCount()`. It should set the text of the `#animal-count`
paragraph to a message like:

```
4 of 8 animals are available for adoption.
```

Count the available animals in the **full** `animals` array, not just the
cards that are showing. The count should not change when you filter or sort,
only when an animal is adopted or returned. Calculate both numbers; don't type
them in.

### TODO 5: Connect the page controls

Use `addEventListener()` to connect the three filter buttons and the sort menu
to your code.

- **All** sets `activeFilter` to `"all"`.
- **Available** sets it to `"available"`.
- **Adopted** sets it to `"adopted"`.
- Changing the sort menu sets `activeSort` to the menu's current value.

Call `updateDisplay()` after every change so the page immediately shows the
new result.

---

## Expected results

Use these to check your work. All of them assume you have not adopted or
returned anything since the last refresh.

| Filter | Sort | Cards shown, in order |
| --- | --- | --- |
| All | Original order | Luna, Biscuit, Pepper, Moose, Charly, Bill, Chompers, Beowulf |
| All | Name | Beowulf, Bill, Biscuit, Charly, Chompers, Luna, Moose, Pepper |
| Available | Original order | Luna, Moose, Charly, Chompers |
| Available | Age | Chompers, Luna, Charly, Moose |
| Adopted | Age | Bill, Pepper, Biscuit, Beowulf |

The count starts at **4 of 8 animals are available for adoption.**

Also test the following:

- Clicking **Adopt** changes an available animal to Adopted, changes its
  button to **Return**, and lowers the count by one.
- Clicking **Return** changes it back to Available.
- Adopting an animal while the **Available** filter is on makes its card
  disappear, because it no longer matches the filter.
- The filter and sort stay the same after you adopt or return an animal.
- If you adopt all four available animals and click **Available**, the
  empty-list message appears.

---

## Extra credit (up to +3 points)

Extra credit is for students who finish the required tasks and want to go
further. **It is only graded if the required tasks work.** A broken required
feature can't be made up with an extra one.

Each feature below is worth **1 point**, up to a maximum of **3 points**. To
count, a feature must:

- work completely, without console errors;
- still work together with the filters, sort, and count (for example, a search
  box that ignores the Available filter is not complete);
- be commented in your own words; and
- be listed in the **EXTRA CREDIT** comment at the top of `script.js`.

You will need to add HTML to `index.html` for most of these. That's expected.

1. **Name search.** Add a text box. As the user types (the `input` event), show
   only animals whose names contain the text, ignoring upper and lower case.
2. **Species filter.** Add a menu or buttons for All species, Dogs, Cats, and
   Rabbits. It must combine with the availability filter, so "Available dogs"
   works.
3. **Add an animal.** Add a form with name, species, and age. On `submit`, use
   `preventDefault()`, give the new animal a unique id, add it to the `animals`
   array as available, and redraw. Don't allow a blank name.
4. **Remove button.** Add a **Remove** button to each card that removes that
   animal from the data. The count must update.
5. **Event delegation.** Instead of attaching a listener to every card's
   button, attach **one** click listener to `#animal-list`. Use `event.target`
   and a `data-id` attribute on each button to work out which animal was
   clicked.
6. **Shelter stats.** Add a section showing the number of animals of each
   species and the average age of the available animals (use `reduce()`). It
   must update whenever the data changes.
7. **Your own idea.** A feature of similar size that you design. **Ask me
   before you start** so I can confirm it counts.

---

## Comment your code

**Comments are graded.** Replace the TODO comments in `script.js` with your own
comments explaining what your code does and why. Answer the two required
comments in TODO 1 and TODO 3.

You don't need a comment on every line, but a reader should be able to follow
your logic from your comments alone. Comments that only restate the code, like
`// add a click listener` above a line that adds a click listener, don't count.

## Debugging tips

- If something isn't working, find the source and add `console.log()`
  messages to trace what's happening. For example, if a filter button does
  nothing, first check that its listener runs at all by adding
  `console.log("available clicked")` to its callback.
- If a card shows the wrong animal, log the animal inside your `forEach()`
  callback.
- `filter()` does not change the array you call it on. It **returns** a new
  array with the matching items, so you must save that result in a variable:
  `list = list.filter(...)`, not just `list.filter(...)`. If your filter
  buttons seem to do nothing, check this first.
- You can copy an array by calling `slice()` with no arguments:
  `const copy = animals.slice();`. Sorting `copy` leaves `animals` in its
  original order.
- Check for simple typos. If Prettier isn't formatting your code on save,
  there's a syntax error somewhere.
- Always keep the Console tab open. Errors appear there and point to the exact
  line causing the problem.

## Commit and push

Make **at least three commits of your own** while working. The starter commit
does not count. Spread them across your work and write messages that explain
what changed, for example:

- `Display animal cards`
- `Add adopt and return`
- `Connect filter buttons and sort menu`

A commit saves your work locally. It does not put it on GitHub. Push before you
submit:

```
git push
```

## Before you submit

- All five TODOs are complete and match the expected results.
- The console shows **no JavaScript errors**. (Errors like
  `GET http://127.0.0.1:5500/favicon.ico` are not a problem.)
- You did not change the starting `animals` array.
- `script.js` is commented in your own words, including the two required
  comments.
- Any extra credit features are listed at the top of `script.js`.
- Your repository has at least three commits you made.
