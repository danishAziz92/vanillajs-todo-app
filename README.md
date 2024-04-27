Little Todo app built using vanilla Js and Vite
Do npm run dev to start locally


Todo creation/load logic:

data created via user action --> create uuid(need uuid to associate ui element with it's state) --> create local state(to represent ui element data in Js and provide methods to interact with the state/associated UI using a class based state manager) --> create/update uuid-state map --> append node --> save data and uuid to storage

data loaded from server --> uuid and data is already there. skip create uuid --> create local state --> create/update local uuid-state mapping --> append node --> Skip saving to local storage

core/common adding item to node functionality: Expect data(text, status, uuid) --> create local state --> create/update local uuid-state map --> append node



Observer pattern for the todo app:
We will have a store factory. With a todo object which will store todo data keyed to uuids. On add, we will push todo data into this object. on other actions, we will need to pass uuid from the event handler to the store state modifiers, which will get the todo data and modify them. Once we modify the state, we will have to notify functions which will perform certain UI and local storage updates.

For notify, below are the actions we need to perform:
1: edit: Fetch parent, pull the action buttons and toggle their visibility
2: cancel edit: Fetch parent, pull the row, update the row text. Pull action buttons and hide them
3: save
4: status
5: delete
6: add

//Looks like there are different types of UI actions needed to be performed. Like todo item action buttons toggle,
//status toggle, and adding/deleting todo rows from the list. Can't update any random UI element for any random state update
//Ex: If a todo is added, on it's notify I can't run the subscriber function which updates the toggle of todo item action button
//So I have 2 options:
1: Have a pub-sub pattern where topics will be the type of UI actions needed to be performed and accordingly we can fire it's subscriber
2: We can have a render function, which will clear the UI and re-render the list again with the latest todo list. But in this case, need to think about how to handle UI updates for individual todo item buttons, because that data is not stored in the store which will let the render function know that if we need to show/hide action buttons for a todo item or not. For this we will have to have the pub-sub method. Think more on this

Have to go with option 2 with pub-sub pattern