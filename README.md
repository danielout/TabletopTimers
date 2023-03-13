# Tabletop Timers

Tabletop Timers is a tool to help GMs/DMs/storytellers/etc keep an eye on all their players. Especially with large groups, it is easy for quiet players to go unnoticed for a while. This tool lets you keep a timer running for each player, and reset it whenever they contribute to the scene. If one timer starts to get much higher than the rest, we highlight it to call it out. Tabletop Timers also runs a single large timer at the top intended to help manage how long you spend on a scene if you're juggling a split party.

Hopefully this tool helps people! Remember, this tool is here to help make your game smoother, not control its every move. I tried to provide enough customization in the settings to help tailor it to what you need, but at the end of the day I can't account for _every_ preference.

Everything was built using TypeScript, VueJS, Pinia, and Vuetify. The real heavy lifting is done by easytimers.js, though, which prevented me from having to write my own complex timer implementation. Huge thanks to all those projects, without whom making this would have been a huge hassle.

Extra, extra special thanks to Brandon who lovingly runs our Blades in the Dark campaign, without whom this tracker would never exist for so many reasons. Also to all the other characters in that campaign, who everyone plays with such gusto and spirit they Duskvol truly does not know that the ghosts are the least of its problems.

If you'd like to contribute to this project, please do! I'm most definitely not a software engineer by trade, so anything from tidying up ugly code to tackling a feature from the todo list would be super awesome.

## Project To-Do List
- Add count-down timer support for the non-player timers
- Expose extra player timer on each player card w/config settings
- Write up some good descriptions and tooltip hovers for the options screen
- Support adding/removing additional header timers
- Support optional audio cues
- More robust local storage support - resume timers from last state, etc
- Quick tutorial maybe?
- Better formatting for larger screens
- Auto-expanding expansion panels if we have room to do so
- Support for building standalone version
- Add better themes
- Localization?
- Optional session stat tracking? (Partially done)

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
