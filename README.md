Little Todo app built using vanilla Js and Vite
Do npm run dev to start locally


Todo creation/load logic:

data created via user action --> create uuid(need uuid to associate ui element with it's state) --> create local state(to represent ui element data in Js and provide methods to interact with the state/associated UI using a class based state manager) --> create/update uuid-state map --> append node --> save data and uuid to storage

data loaded from server --> uuid and data is already there. skip create uuid --> create local state --> create/update local uuid-state mapping --> append node --> Skip saving to local storage

core/common adding item to node functionality: Expect data(text, status, uuid) --> create local state --> create/update local uuid-state map --> append node
